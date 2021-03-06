var Module = typeof Module !== "undefined" ? Module : {};
var moduleOverrides = {};
var key;
for (key in Module) {
	if (Module.hasOwnProperty(key)) {
		moduleOverrides[key] = Module[key]
	}
}
var arguments_ = [];
var thisProgram = "./this.program";
var quit_ = function(status, toThrow) {
	throw toThrow
};
var ENVIRONMENT_IS_WEB = false;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;
ENVIRONMENT_IS_WEB = typeof window === "object";
ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
ENVIRONMENT_IS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";
ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
var scriptDirectory = "https://pedropsi.github.io/codes/game/star-battle/";

function locateFile(path) {
	if (Module["locateFile"]) {
		return Module["locateFile"](path, scriptDirectory)
	}
	return scriptDirectory + path
}
var read_, readAsync, readBinary, setWindowTitle;
var nodeFS;
var nodePath;
if (ENVIRONMENT_IS_NODE) {
	if (ENVIRONMENT_IS_WORKER) {
		scriptDirectory = require("path").dirname(scriptDirectory) + "/"
	} else {
		scriptDirectory = __dirname + "/"
	}
	read_ = function shell_read(filename, binary) {
		if (!nodeFS) nodeFS = require("fs");
		if (!nodePath) nodePath = require("path");
		filename = nodePath["normalize"](filename);
		return nodeFS["readFileSync"](filename, binary ? null : "utf8")
	};
	readBinary = function readBinary(filename) {
		var ret = read_(filename, true);
		if (!ret.buffer) {
			ret = new Uint8Array(ret)
		}
		assert(ret.buffer);
		return ret
	};
	if (process["argv"].length > 1) {
		thisProgram = process["argv"][1].replace(/\\/g, "/")
	}
	arguments_ = process["argv"].slice(2);
	if (typeof module !== "undefined") {
		module["exports"] = Module
	}
	process["on"]("uncaughtException", function(ex) {
		if (!(ex instanceof ExitStatus)) {
			throw ex
		}
	});
	process["on"]("unhandledRejection", abort);
	quit_ = function(status) {
		process["exit"](status)
	};
	Module["inspect"] = function() {
		return "[Emscripten Module object]"
	}
} else if (ENVIRONMENT_IS_SHELL) {
	if (typeof read != "undefined") {
		read_ = function shell_read(f) {
			return read(f)
		}
	}
	readBinary = function readBinary(f) {
		var data;
		if (typeof readbuffer === "function") {
			return new Uint8Array(readbuffer(f))
		}
		data = read(f, "binary");
		assert(typeof data === "object");
		return data
	};
	if (typeof scriptArgs != "undefined") {
		arguments_ = scriptArgs
	} else if (typeof arguments != "undefined") {
		arguments_ = arguments
	}
	if (typeof quit === "function") {
		quit_ = function(status) {
			quit(status)
		}
	}
	if (typeof print !== "undefined") {
		if (typeof console === "undefined") console = {};
		console.log = print;
		console.warn = console.error = typeof printErr !== "undefined" ? printErr : print
	}
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
	if (ENVIRONMENT_IS_WORKER) {
		scriptDirectory = self.location.href
	} else if (document.currentScript) {
		scriptDirectory = document.currentScript.src
	}
	if (scriptDirectory.indexOf("blob:") !== 0) {
		scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1)
	} else {
		scriptDirectory = ""
	} {
		read_ = function shell_read(url) {
			var xhr = new XMLHttpRequest;
			xhr.open("GET", url, false);
			xhr.send(null);
			return xhr.responseText
		};
		if (ENVIRONMENT_IS_WORKER) {
			readBinary = function readBinary(url) {
				var xhr = new XMLHttpRequest;
				xhr.open("GET", url, false);
				xhr.responseType = "arraybuffer";
				xhr.send(null);
				return new Uint8Array(xhr.response)
			}
		}
		readAsync = function readAsync(url, onload, onerror) {
			var xhr = new XMLHttpRequest;
			xhr.open("GET", url, true);
			xhr.responseType = "arraybuffer";
			xhr.onload = function xhr_onload() {
				if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
					onload(xhr.response);
					return
				}
				onerror()
			};
			xhr.onerror = onerror;
			xhr.send(null)
		}
	}
	setWindowTitle = function(title) {
		document.title = title
	}
} else {}
var out = Module["print"] || console.log.bind(console);
var err = Module["printErr"] || console.warn.bind(console);
for (key in moduleOverrides) {
	if (moduleOverrides.hasOwnProperty(key)) {
		Module[key] = moduleOverrides[key]
	}
}
moduleOverrides = null;
if (Module["arguments"]) arguments_ = Module["arguments"];
if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
if (Module["quit"]) quit_ = Module["quit"];
var STACK_ALIGN = 16;

function dynamicAlloc(size) {
	var ret = HEAP32[DYNAMICTOP_PTR >> 2];
	var end = ret + size + 15 & -16;
	HEAP32[DYNAMICTOP_PTR >> 2] = end;
	return ret
}

function alignMemory(size, factor) {
	if (!factor) factor = STACK_ALIGN;
	return Math.ceil(size / factor) * factor
}

function getNativeTypeSize(type) {
	switch (type) {
		case "i1":
		case "i8":
			return 1;
		case "i16":
			return 2;
		case "i32":
			return 4;
		case "i64":
			return 8;
		case "float":
			return 4;
		case "double":
			return 8;
		default: {
			if (type[type.length - 1] === "*") {
				return 4
			} else if (type[0] === "i") {
				var bits = Number(type.substr(1));
				assert(bits % 8 === 0, "getNativeTypeSize invalid bits " + bits + ", type " + type);
				return bits / 8
			} else {
				return 0
			}
		}
	}
}

function warnOnce(text) {
	if (!warnOnce.shown) warnOnce.shown = {};
	if (!warnOnce.shown[text]) {
		warnOnce.shown[text] = 1;
		err(text)
	}
}

function convertJsFunctionToWasm(func, sig) {
	if (typeof WebAssembly.Function === "function") {
		var typeNames = {
			"i": "i32",
			"j": "i64",
			"f": "f32",
			"d": "f64"
		};
		var type = {
			parameters: [],
			results: sig[0] == "v" ? [] : [typeNames[sig[0]]]
		};
		for (var i = 1; i < sig.length; ++i) {
			type.parameters.push(typeNames[sig[i]])
		}
		return new WebAssembly.Function(type, func)
	}
	var typeSection = [1, 0, 1, 96];
	var sigRet = sig.slice(0, 1);
	var sigParam = sig.slice(1);
	var typeCodes = {
		"i": 127,
		"j": 126,
		"f": 125,
		"d": 124
	};
	typeSection.push(sigParam.length);
	for (var i = 0; i < sigParam.length; ++i) {
		typeSection.push(typeCodes[sigParam[i]])
	}
	if (sigRet == "v") {
		typeSection.push(0)
	} else {
		typeSection = typeSection.concat([1, typeCodes[sigRet]])
	}
	typeSection[1] = typeSection.length - 2;
	var bytes = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0].concat(typeSection, [2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0]));
	var module = new WebAssembly.Module(bytes);
	var instance = new WebAssembly.Instance(module, {
		"e": {
			"f": func
		}
	});
	var wrappedFunc = instance.exports["f"];
	return wrappedFunc
}
var freeTableIndexes = [];
var functionsInTableMap;

function addFunctionWasm(func, sig) {
	var table = wasmTable;
	if (!functionsInTableMap) {
		functionsInTableMap = new WeakMap;
		for (var i = 0; i < table.length; i++) {
			var item = table.get(i);
			if (item) {
				functionsInTableMap.set(item, i)
			}
		}
	}
	if (functionsInTableMap.has(func)) {
		return functionsInTableMap.get(func)
	}
	var ret;
	if (freeTableIndexes.length) {
		ret = freeTableIndexes.pop()
	} else {
		ret = table.length;
		try {
			table.grow(1)
		} catch (err) {
			if (!(err instanceof RangeError)) {
				throw err
			}
			throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH."
		}
	}
	try {
		table.set(ret, func)
	} catch (err) {
		if (!(err instanceof TypeError)) {
			throw err
		}
		var wrapped = convertJsFunctionToWasm(func, sig);
		table.set(ret, wrapped)
	}
	functionsInTableMap.set(func, ret);
	return ret
}

function removeFunctionWasm(index) {
	functionsInTableMap.delete(wasmTable.get(index));
	freeTableIndexes.push(index)
}
var funcWrappers = {};

function dynCall(sig, ptr, args) {
	if (args && args.length) {
		return Module["dynCall_" + sig].apply(null, [ptr].concat(args))
	} else {
		return Module["dynCall_" + sig].call(null, ptr)
	}
}
var tempRet0 = 0;
var setTempRet0 = function(value) {
	tempRet0 = value
};
var getTempRet0 = function() {
	return tempRet0
};
var wasmBinary;
if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
var noExitRuntime;
if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
if (typeof WebAssembly !== "object") {
	abort("no native wasm support detected")
}

function setValue(ptr, value, type, noSafe) {
	type = type || "i8";
	if (type.charAt(type.length - 1) === "*") type = "i32";
	switch (type) {
		case "i1":
			HEAP8[ptr >> 0] = value;
			break;
		case "i8":
			HEAP8[ptr >> 0] = value;
			break;
		case "i16":
			HEAP16[ptr >> 1] = value;
			break;
		case "i32":
			HEAP32[ptr >> 2] = value;
			break;
		case "i64":
			tempI64 = [value >>> 0, (tempDouble = value, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[ptr >> 2] = tempI64[0], HEAP32[ptr + 4 >> 2] = tempI64[1];
			break;
		case "float":
			HEAPF32[ptr >> 2] = value;
			break;
		case "double":
			HEAPF64[ptr >> 3] = value;
			break;
		default:
			abort("invalid type for setValue: " + type)
	}
}
var wasmMemory;
var wasmTable = new WebAssembly.Table({
	"initial": 5163,
	"maximum": 5163 + 0,
	"element": "anyfunc"
});
var ABORT = false;
var EXITSTATUS = 0;

function assert(condition, text) {
	if (!condition) {
		abort("Assertion failed: " + text)
	}
}

function getCFunc(ident) {
	var func = Module["_" + ident];
	assert(func, "Cannot call unknown function " + ident + ", make sure it is exported");
	return func
}

function ccall(ident, returnType, argTypes, args, opts) {
	var toC = {
		"string": function(str) {
			var ret = 0;
			if (str !== null && str !== undefined && str !== 0) {
				var len = (str.length << 2) + 1;
				ret = stackAlloc(len);
				stringToUTF8(str, ret, len)
			}
			return ret
		},
		"array": function(arr) {
			var ret = stackAlloc(arr.length);
			writeArrayToMemory(arr, ret);
			return ret
		}
	};

	function convertReturnValue(ret) {
		if (returnType === "string") return UTF8ToString(ret);
		if (returnType === "boolean") return Boolean(ret);
		return ret
	}
	var func = getCFunc(ident);
	var cArgs = [];
	var stack = 0;
	if (args) {
		for (var i = 0; i < args.length; i++) {
			var converter = toC[argTypes[i]];
			if (converter) {
				if (stack === 0) stack = stackSave();
				cArgs[i] = converter(args[i])
			} else {
				cArgs[i] = args[i]
			}
		}
	}
	var ret = func.apply(null, cArgs);
	ret = convertReturnValue(ret);
	if (stack !== 0) stackRestore(stack);
	return ret
}
var ALLOC_NORMAL = 0;
var ALLOC_NONE = 3;

function allocate(slab, types, allocator, ptr) {
	var zeroinit, size;
	if (typeof slab === "number") {
		zeroinit = true;
		size = slab
	} else {
		zeroinit = false;
		size = slab.length
	}
	var singleType = typeof types === "string" ? types : null;
	var ret;
	if (allocator == ALLOC_NONE) {
		ret = ptr
	} else {
		ret = [_malloc, stackAlloc, dynamicAlloc][allocator](Math.max(size, singleType ? 1 : types.length))
	}
	if (zeroinit) {
		var stop;
		ptr = ret;
		assert((ret & 3) == 0);
		stop = ret + (size & ~3);
		for (; ptr < stop; ptr += 4) {
			HEAP32[ptr >> 2] = 0
		}
		stop = ret + size;
		while (ptr < stop) {
			HEAP8[ptr++ >> 0] = 0
		}
		return ret
	}
	if (singleType === "i8") {
		if (slab.subarray || slab.slice) {
			HEAPU8.set(slab, ret)
		} else {
			HEAPU8.set(new Uint8Array(slab), ret)
		}
		return ret
	}
	var i = 0,
		type, typeSize, previousType;
	while (i < size) {
		var curr = slab[i];
		type = singleType || types[i];
		if (type === 0) {
			i++;
			continue
		}
		if (type == "i64") type = "i32";
		setValue(ret + i, curr, type);
		if (previousType !== type) {
			typeSize = getNativeTypeSize(type);
			previousType = type
		}
		i += typeSize
	}
	return ret
}
var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;

function UTF8ArrayToString(heap, idx, maxBytesToRead) {
	var endIdx = idx + maxBytesToRead;
	var endPtr = idx;
	while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;
	if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
		return UTF8Decoder.decode(heap.subarray(idx, endPtr))
	} else {
		var str = "";
		while (idx < endPtr) {
			var u0 = heap[idx++];
			if (!(u0 & 128)) {
				str += String.fromCharCode(u0);
				continue
			}
			var u1 = heap[idx++] & 63;
			if ((u0 & 224) == 192) {
				str += String.fromCharCode((u0 & 31) << 6 | u1);
				continue
			}
			var u2 = heap[idx++] & 63;
			if ((u0 & 240) == 224) {
				u0 = (u0 & 15) << 12 | u1 << 6 | u2
			} else {
				u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heap[idx++] & 63
			}
			if (u0 < 65536) {
				str += String.fromCharCode(u0)
			} else {
				var ch = u0 - 65536;
				str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
			}
		}
	}
	return str
}

function UTF8ToString(ptr, maxBytesToRead) {
	return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""
}

function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
	if (!(maxBytesToWrite > 0)) return 0;
	var startIdx = outIdx;
	var endIdx = outIdx + maxBytesToWrite - 1;
	for (var i = 0; i < str.length; ++i) {
		var u = str.charCodeAt(i);
		if (u >= 55296 && u <= 57343) {
			var u1 = str.charCodeAt(++i);
			u = 65536 + ((u & 1023) << 10) | u1 & 1023
		}
		if (u <= 127) {
			if (outIdx >= endIdx) break;
			heap[outIdx++] = u
		} else if (u <= 2047) {
			if (outIdx + 1 >= endIdx) break;
			heap[outIdx++] = 192 | u >> 6;
			heap[outIdx++] = 128 | u & 63
		} else if (u <= 65535) {
			if (outIdx + 2 >= endIdx) break;
			heap[outIdx++] = 224 | u >> 12;
			heap[outIdx++] = 128 | u >> 6 & 63;
			heap[outIdx++] = 128 | u & 63
		} else {
			if (outIdx + 3 >= endIdx) break;
			heap[outIdx++] = 240 | u >> 18;
			heap[outIdx++] = 128 | u >> 12 & 63;
			heap[outIdx++] = 128 | u >> 6 & 63;
			heap[outIdx++] = 128 | u & 63
		}
	}
	heap[outIdx] = 0;
	return outIdx - startIdx
}

function stringToUTF8(str, outPtr, maxBytesToWrite) {
	return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite)
}

function lengthBytesUTF8(str) {
	var len = 0;
	for (var i = 0; i < str.length; ++i) {
		var u = str.charCodeAt(i);
		if (u >= 55296 && u <= 57343) u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
		if (u <= 127) ++len;
		else if (u <= 2047) len += 2;
		else if (u <= 65535) len += 3;
		else len += 4
	}
	return len
}
var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;

function allocateUTF8(str) {
	var size = lengthBytesUTF8(str) + 1;
	var ret = _malloc(size);
	if (ret) stringToUTF8Array(str, HEAP8, ret, size);
	return ret
}

function allocateUTF8OnStack(str) {
	var size = lengthBytesUTF8(str) + 1;
	var ret = stackAlloc(size);
	stringToUTF8Array(str, HEAP8, ret, size);
	return ret
}

function writeArrayToMemory(array, buffer) {
	HEAP8.set(array, buffer)
}

function writeAsciiToMemory(str, buffer, dontAddNull) {
	for (var i = 0; i < str.length; ++i) {
		HEAP8[buffer++ >> 0] = str.charCodeAt(i)
	}
	if (!dontAddNull) HEAP8[buffer >> 0] = 0
}
var WASM_PAGE_SIZE = 65536;
var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

function updateGlobalBufferAndViews(buf) {
	buffer = buf;
	Module["HEAP8"] = HEAP8 = new Int8Array(buf);
	Module["HEAP16"] = HEAP16 = new Int16Array(buf);
	Module["HEAP32"] = HEAP32 = new Int32Array(buf);
	Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
	Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
	Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
	Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
	Module["HEAPF64"] = HEAPF64 = new Float64Array(buf)
}
var STACK_BASE = 15450096,
	DYNAMIC_BASE = 15450096,
	DYNAMICTOP_PTR = 10207040;
var INITIAL_INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 536870912;
if (Module["wasmMemory"]) {
	wasmMemory = Module["wasmMemory"]
} else {
	wasmMemory = new WebAssembly.Memory({
		"initial": INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE,
		"maximum": INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE
	})
}
if (wasmMemory) {
	buffer = wasmMemory.buffer
}
INITIAL_INITIAL_MEMORY = buffer.byteLength;
updateGlobalBufferAndViews(buffer);
HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;

function callRuntimeCallbacks(callbacks) {
	while (callbacks.length > 0) {
		var callback = callbacks.shift();
		if (typeof callback == "function") {
			callback(Module);
			continue
		}
		var func = callback.func;
		if (typeof func === "number") {
			if (callback.arg === undefined) {
				Module["dynCall_v"](func)
			} else {
				Module["dynCall_vi"](func, callback.arg)
			}
		} else {
			func(callback.arg === undefined ? null : callback.arg)
		}
	}
}
var __ATPRERUN__ = [];
var __ATINIT__ = [];
var __ATMAIN__ = [];
var __ATEXIT__ = [];
var __ATPOSTRUN__ = [];
var runtimeInitialized = false;
var runtimeExited = false;

function preRun() {
	if (Module["preRun"]) {
		if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
		while (Module["preRun"].length) {
			addOnPreRun(Module["preRun"].shift())
		}
	}
	callRuntimeCallbacks(__ATPRERUN__)
}

function initRuntime() {
	runtimeInitialized = true;
	if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
	TTY.init();
	callRuntimeCallbacks(__ATINIT__)
}

function preMain() {
	FS.ignorePermissions = false;
	callRuntimeCallbacks(__ATMAIN__)
}

function exitRuntime() {
	runtimeExited = true
}

function postRun() {
	if (Module["postRun"]) {
		if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
		while (Module["postRun"].length) {
			addOnPostRun(Module["postRun"].shift())
		}
	}
	callRuntimeCallbacks(__ATPOSTRUN__)
}

function addOnPreRun(cb) {
	__ATPRERUN__.unshift(cb)
}

function addOnPostRun(cb) {
	__ATPOSTRUN__.unshift(cb)
}
var Math_abs = Math.abs;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_min = Math.min;
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null;

function getUniqueRunDependency(id) {
	return id
}

function addRunDependency(id) {
	runDependencies++;
	if (Module["monitorRunDependencies"]) {
		Module["monitorRunDependencies"](runDependencies)
	}
}

function removeRunDependency(id) {
	runDependencies--;
	if (Module["monitorRunDependencies"]) {
		Module["monitorRunDependencies"](runDependencies)
	}
	if (runDependencies == 0) {
		if (runDependencyWatcher !== null) {
			clearInterval(runDependencyWatcher);
			runDependencyWatcher = null
		}
		if (dependenciesFulfilled) {
			var callback = dependenciesFulfilled;
			dependenciesFulfilled = null;
			callback()
		}
	}
}
Module["preloadedImages"] = {};
Module["preloadedAudios"] = {};

function abort(what) {
	if (Module["onAbort"]) {
		Module["onAbort"](what)
	}
	what += "";
	err(what);
	ABORT = true;
	EXITSTATUS = 1;
	what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
	var e = new WebAssembly.RuntimeError(what);
	throw e
}

function hasPrefix(str, prefix) {
	return String.prototype.startsWith ? str.startsWith(prefix) : str.indexOf(prefix) === 0
}
var dataURIPrefix = "data:application/octet-stream;base64,";

function isDataURI(filename) {
	return hasPrefix(filename, dataURIPrefix)
}
var fileURIPrefix = "file://";

function isFileURI(filename) {
	return hasPrefix(filename, fileURIPrefix)
}
var wasmBinaryFile = "hyper.wasm";
if (!isDataURI(wasmBinaryFile)) {
	//wasmBinaryFile = locateFile(wasmBinaryFile);
	wasmBinaryFile = "https://pedropsi.github.io/codes/game/star-battle/hyper.wasm"
}

function getBinary() {
	try {
		if (wasmBinary) {
			return new Uint8Array(wasmBinary)
		}
		if (readBinary) {
			return readBinary(wasmBinaryFile)
		} else {
			throw "both async and sync fetching of the wasm failed"
		}
	} catch (err) {
		abort(err)
	}
}

function getBinaryPromise() {
	console.log("PRONIMSE",wasmBinary,wasmBinaryFile);
	if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function" && !isFileURI(wasmBinaryFile)) {
		return fetch(wasmBinaryFile, {
			credentials: "same-origin"
		}).then(function(response) {
			if (!response["ok"]) {
				throw "failed to load wasm binary file at '" + wasmBinaryFile + "'"
			}
			return response["arrayBuffer"]()
		}).catch(function() {
			return getBinary()
		})
	}
	return new Promise(function(resolve, reject) {
		resolve(getBinary())
	})
}

function createWasm() {
	var info = {
		"env": asmLibraryArg,
		"wasi_snapshot_preview1": asmLibraryArg
	};

	function receiveInstance(instance, module) {
		var exports = instance.exports;
		Module["asm"] = exports;
		removeRunDependency("wasm-instantiate")
	}
	addRunDependency("wasm-instantiate");

	function receiveInstantiatedSource(output) {
		receiveInstance(output["instance"])
	}

	function instantiateArrayBuffer(receiver) {
		return getBinaryPromise().then(function(binary) {
			return WebAssembly.instantiate(binary, info)
		}).then(receiver, function(reason) {
			err("failed to asynchronously prepare wasm: " + reason);
			abort(reason)
		})
	}

	function instantiateAsync() {
		if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && !isFileURI(wasmBinaryFile) && typeof fetch === "function") {
			fetch(wasmBinaryFile, {
				credentials: "same-origin"
			}).then(function(response) {
				var result = WebAssembly.instantiateStreaming(response, info);
				return result.then(receiveInstantiatedSource, function(reason) {
					err("wasm streaming compile failed: " + reason);
					err("falling back to ArrayBuffer instantiation");
					return instantiateArrayBuffer(receiveInstantiatedSource)
				})
			})
		} else {
			return instantiateArrayBuffer(receiveInstantiatedSource)
		}
	}
	if (Module["instantiateWasm"]) {
		try {
			var exports = Module["instantiateWasm"](info, receiveInstance);
			return exports
		} catch (e) {
			err("Module.instantiateWasm callback failed with error: " + e);
			return false
		}
	}
	instantiateAsync();
	return {}
}
var tempDouble;
var tempI64;
var ASM_CONSTS = {
	359157: function($0) {
		var x = window.open();
		x.document.open();
		x.document.write(UTF8ToString($0));
		x.document.close()
	},
	404648: function($0, $1, $2, $3) {
		var name = UTF8ToString($0, $1);
		var mime = UTF8ToString($2, $3);
		let content = Module.FS.readFile(name);
		console.log(`Offering download of "${name}", with ${content.length} bytes...`);
		var a = document.createElement("a");
		a.download = name;
		a.href = URL.createObjectURL(new Blob([content], {
			type: mime
		}));
		a.style.display = "none";
		document.body.appendChild(a);
		a.click();
		setTimeout(() => {
			document.body.removeChild(a);
			URL.revokeObjectURL(a.href)
		}, 2e3)
	},
	405119: function() {
		fileElem.click()
	},
	405280: function() {
		return rotation_alpha
	},
	405307: function() {
		return rotation_beta
	},
	405333: function() {
		return rotation_gamma
	},
	405360: function() {
		var jsString = document.location.href;
		if (typeof default_arg != "undefined" && jsString.indexOf("?") == -1) jsString = default_arg;
		var lengthBytes = lengthBytesUTF8(jsString) + 1;
		var stringOnWasmHeap = _malloc(lengthBytes);
		stringToUTF8(jsString, stringOnWasmHeap, lengthBytes + 1);
		return stringOnWasmHeap
	}
};

function _emscripten_asm_const_dii(code, sigPtr, argbuf) {
	var args = readAsmConstArgs(sigPtr, argbuf);
	return ASM_CONSTS[code].apply(null, args)
}

function _emscripten_asm_const_iii(code, sigPtr, argbuf) {
	var args = readAsmConstArgs(sigPtr, argbuf);
	return ASM_CONSTS[code].apply(null, args)
}
__ATINIT__.push({
	func: function() {
		___wasm_call_ctors()
	}
});

function demangle(func) {
	return func
}

function demangleAll(text) {
	var regex = /\b_Z[\w\d_]+/g;
	return text.replace(regex, function(x) {
		var y = demangle(x);
		return x === y ? x : y + " [" + x + "]"
	})
}

function jsStackTrace() {
	var err = new Error;
	if (!err.stack) {
		try {
			throw new Error
		} catch (e) {
			err = e
		}
		if (!err.stack) {
			return "(no stack trace available)"
		}
	}
	return err.stack.toString()
}

function stackTrace() {
	var js = jsStackTrace();
	if (Module["extraStackTrace"]) js += "\n" + Module["extraStackTrace"]();
	return demangleAll(js)
}

function setErrNo(value) {
	HEAP32[___errno_location() >> 2] = value;
	return value
}
var PATH = {
	splitPath: function(filename) {
		var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
		return splitPathRe.exec(filename).slice(1)
	},
	normalizeArray: function(parts, allowAboveRoot) {
		var up = 0;
		for (var i = parts.length - 1; i >= 0; i--) {
			var last = parts[i];
			if (last === ".") {
				parts.splice(i, 1)
			} else if (last === "..") {
				parts.splice(i, 1);
				up++
			} else if (up) {
				parts.splice(i, 1);
				up--
			}
		}
		if (allowAboveRoot) {
			for (; up; up--) {
				parts.unshift("..")
			}
		}
		return parts
	},
	normalize: function(path) {
		var isAbsolute = path.charAt(0) === "/",
			trailingSlash = path.substr(-1) === "/";
		path = PATH.normalizeArray(path.split("/").filter(function(p) {
			return !!p
		}), !isAbsolute).join("/");
		if (!path && !isAbsolute) {
			path = "."
		}
		if (path && trailingSlash) {
			path += "/"
		}
		return (isAbsolute ? "/" : "") + path
	},
	dirname: function(path) {
		var result = PATH.splitPath(path),
			root = result[0],
			dir = result[1];
		if (!root && !dir) {
			return "."
		}
		if (dir) {
			dir = dir.substr(0, dir.length - 1)
		}
		return root + dir
	},
	basename: function(path) {
		if (path === "/") return "/";
		var lastSlash = path.lastIndexOf("/");
		if (lastSlash === -1) return path;
		return path.substr(lastSlash + 1)
	},
	extname: function(path) {
		return PATH.splitPath(path)[3]
	},
	join: function() {
		var paths = Array.prototype.slice.call(arguments, 0);
		return PATH.normalize(paths.join("/"))
	},
	join2: function(l, r) {
		return PATH.normalize(l + "/" + r)
	}
};
var PATH_FS = {
	resolve: function() {
		var resolvedPath = "",
			resolvedAbsolute = false;
		for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
			var path = i >= 0 ? arguments[i] : FS.cwd();
			if (typeof path !== "string") {
				throw new TypeError("Arguments to path.resolve must be strings")
			} else if (!path) {
				return ""
			}
			resolvedPath = path + "/" + resolvedPath;
			resolvedAbsolute = path.charAt(0) === "/"
		}
		resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(function(p) {
			return !!p
		}), !resolvedAbsolute).join("/");
		return (resolvedAbsolute ? "/" : "") + resolvedPath || "."
	},
	relative: function(from, to) {
		from = PATH_FS.resolve(from).substr(1);
		to = PATH_FS.resolve(to).substr(1);

		function trim(arr) {
			var start = 0;
			for (; start < arr.length; start++) {
				if (arr[start] !== "") break
			}
			var end = arr.length - 1;
			for (; end >= 0; end--) {
				if (arr[end] !== "") break
			}
			if (start > end) return [];
			return arr.slice(start, end - start + 1)
		}
		var fromParts = trim(from.split("/"));
		var toParts = trim(to.split("/"));
		var length = Math.min(fromParts.length, toParts.length);
		var samePartsLength = length;
		for (var i = 0; i < length; i++) {
			if (fromParts[i] !== toParts[i]) {
				samePartsLength = i;
				break
			}
		}
		var outputParts = [];
		for (var i = samePartsLength; i < fromParts.length; i++) {
			outputParts.push("..")
		}
		outputParts = outputParts.concat(toParts.slice(samePartsLength));
		return outputParts.join("/")
	}
};
var TTY = {
	ttys: [],
	init: function() {},
	shutdown: function() {},
	register: function(dev, ops) {
		TTY.ttys[dev] = {
			input: [],
			output: [],
			ops: ops
		};
		FS.registerDevice(dev, TTY.stream_ops)
	},
	stream_ops: {
		open: function(stream) {
			var tty = TTY.ttys[stream.node.rdev];
			if (!tty) {
				throw new FS.ErrnoError(43)
			}
			stream.tty = tty;
			stream.seekable = false
		},
		close: function(stream) {
			stream.tty.ops.flush(stream.tty)
		},
		flush: function(stream) {
			stream.tty.ops.flush(stream.tty)
		},
		read: function(stream, buffer, offset, length, pos) {
			if (!stream.tty || !stream.tty.ops.get_char) {
				throw new FS.ErrnoError(60)
			}
			var bytesRead = 0;
			for (var i = 0; i < length; i++) {
				var result;
				try {
					result = stream.tty.ops.get_char(stream.tty)
				} catch (e) {
					throw new FS.ErrnoError(29)
				}
				if (result === undefined && bytesRead === 0) {
					throw new FS.ErrnoError(6)
				}
				if (result === null || result === undefined) break;
				bytesRead++;
				buffer[offset + i] = result
			}
			if (bytesRead) {
				stream.node.timestamp = Date.now()
			}
			return bytesRead
		},
		write: function(stream, buffer, offset, length, pos) {
			if (!stream.tty || !stream.tty.ops.put_char) {
				throw new FS.ErrnoError(60)
			}
			try {
				for (var i = 0; i < length; i++) {
					stream.tty.ops.put_char(stream.tty, buffer[offset + i])
				}
			} catch (e) {
				throw new FS.ErrnoError(29)
			}
			if (length) {
				stream.node.timestamp = Date.now()
			}
			return i
		}
	},
	default_tty_ops: {
		get_char: function(tty) {
			if (!tty.input.length) {
				var result = null;
				if (ENVIRONMENT_IS_NODE) {
					var BUFSIZE = 256;
					var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
					var bytesRead = 0;
					try {
						bytesRead = nodeFS.readSync(process.stdin.fd, buf, 0, BUFSIZE, null)
					} catch (e) {
						if (e.toString().indexOf("EOF") != -1) bytesRead = 0;
						else throw e
					}
					if (bytesRead > 0) {
						result = buf.slice(0, bytesRead).toString("utf-8")
					} else {
						result = null
					}
				} else if (typeof window != "undefined" && typeof window.prompt == "function") {
					result = window.prompt("Input: ");
					if (result !== null) {
						result += "\n"
					}
				} else if (typeof readline == "function") {
					result = readline();
					if (result !== null) {
						result += "\n"
					}
				}
				if (!result) {
					return null
				}
				tty.input = intArrayFromString(result, true)
			}
			return tty.input.shift()
		},
		put_char: function(tty, val) {
			if (val === null || val === 10) {
				out(UTF8ArrayToString(tty.output, 0));
				tty.output = []
			} else {
				if (val != 0) tty.output.push(val)
			}
		},
		flush: function(tty) {
			if (tty.output && tty.output.length > 0) {
				out(UTF8ArrayToString(tty.output, 0));
				tty.output = []
			}
		}
	},
	default_tty1_ops: {
		put_char: function(tty, val) {
			if (val === null || val === 10) {
				err(UTF8ArrayToString(tty.output, 0));
				tty.output = []
			} else {
				if (val != 0) tty.output.push(val)
			}
		},
		flush: function(tty) {
			if (tty.output && tty.output.length > 0) {
				err(UTF8ArrayToString(tty.output, 0));
				tty.output = []
			}
		}
	}
};
var MEMFS = {
	ops_table: null,
	mount: function(mount) {
		return MEMFS.createNode(null, "/", 16384 | 511, 0)
	},
	createNode: function(parent, name, mode, dev) {
		if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
			throw new FS.ErrnoError(63)
		}
		if (!MEMFS.ops_table) {
			MEMFS.ops_table = {
				dir: {
					node: {
						getattr: MEMFS.node_ops.getattr,
						setattr: MEMFS.node_ops.setattr,
						lookup: MEMFS.node_ops.lookup,
						mknod: MEMFS.node_ops.mknod,
						rename: MEMFS.node_ops.rename,
						unlink: MEMFS.node_ops.unlink,
						rmdir: MEMFS.node_ops.rmdir,
						readdir: MEMFS.node_ops.readdir,
						symlink: MEMFS.node_ops.symlink
					},
					stream: {
						llseek: MEMFS.stream_ops.llseek
					}
				},
				file: {
					node: {
						getattr: MEMFS.node_ops.getattr,
						setattr: MEMFS.node_ops.setattr
					},
					stream: {
						llseek: MEMFS.stream_ops.llseek,
						read: MEMFS.stream_ops.read,
						write: MEMFS.stream_ops.write,
						allocate: MEMFS.stream_ops.allocate,
						mmap: MEMFS.stream_ops.mmap,
						msync: MEMFS.stream_ops.msync
					}
				},
				link: {
					node: {
						getattr: MEMFS.node_ops.getattr,
						setattr: MEMFS.node_ops.setattr,
						readlink: MEMFS.node_ops.readlink
					},
					stream: {}
				},
				chrdev: {
					node: {
						getattr: MEMFS.node_ops.getattr,
						setattr: MEMFS.node_ops.setattr
					},
					stream: FS.chrdev_stream_ops
				}
			}
		}
		var node = FS.createNode(parent, name, mode, dev);
		if (FS.isDir(node.mode)) {
			node.node_ops = MEMFS.ops_table.dir.node;
			node.stream_ops = MEMFS.ops_table.dir.stream;
			node.contents = {}
		} else if (FS.isFile(node.mode)) {
			node.node_ops = MEMFS.ops_table.file.node;
			node.stream_ops = MEMFS.ops_table.file.stream;
			node.usedBytes = 0;
			node.contents = null
		} else if (FS.isLink(node.mode)) {
			node.node_ops = MEMFS.ops_table.link.node;
			node.stream_ops = MEMFS.ops_table.link.stream
		} else if (FS.isChrdev(node.mode)) {
			node.node_ops = MEMFS.ops_table.chrdev.node;
			node.stream_ops = MEMFS.ops_table.chrdev.stream
		}
		node.timestamp = Date.now();
		if (parent) {
			parent.contents[name] = node
		}
		return node
	},
	getFileDataAsRegularArray: function(node) {
		if (node.contents && node.contents.subarray) {
			var arr = [];
			for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
			return arr
		}
		return node.contents
	},
	getFileDataAsTypedArray: function(node) {
		if (!node.contents) return new Uint8Array(0);
		if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
		return new Uint8Array(node.contents)
	},
	expandFileStorage: function(node, newCapacity) {
		var prevCapacity = node.contents ? node.contents.length : 0;
		if (prevCapacity >= newCapacity) return;
		var CAPACITY_DOUBLING_MAX = 1024 * 1024;
		newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
		if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
		var oldContents = node.contents;
		node.contents = new Uint8Array(newCapacity);
		if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
		return
	},
	resizeFileStorage: function(node, newSize) {
		if (node.usedBytes == newSize) return;
		if (newSize == 0) {
			node.contents = null;
			node.usedBytes = 0;
			return
		}
		if (!node.contents || node.contents.subarray) {
			var oldContents = node.contents;
			node.contents = new Uint8Array(newSize);
			if (oldContents) {
				node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)))
			}
			node.usedBytes = newSize;
			return
		}
		if (!node.contents) node.contents = [];
		if (node.contents.length > newSize) node.contents.length = newSize;
		else
			while (node.contents.length < newSize) node.contents.push(0);
		node.usedBytes = newSize
	},
	node_ops: {
		getattr: function(node) {
			var attr = {};
			attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
			attr.ino = node.id;
			attr.mode = node.mode;
			attr.nlink = 1;
			attr.uid = 0;
			attr.gid = 0;
			attr.rdev = node.rdev;
			if (FS.isDir(node.mode)) {
				attr.size = 4096
			} else if (FS.isFile(node.mode)) {
				attr.size = node.usedBytes
			} else if (FS.isLink(node.mode)) {
				attr.size = node.link.length
			} else {
				attr.size = 0
			}
			attr.atime = new Date(node.timestamp);
			attr.mtime = new Date(node.timestamp);
			attr.ctime = new Date(node.timestamp);
			attr.blksize = 4096;
			attr.blocks = Math.ceil(attr.size / attr.blksize);
			return attr
		},
		setattr: function(node, attr) {
			if (attr.mode !== undefined) {
				node.mode = attr.mode
			}
			if (attr.timestamp !== undefined) {
				node.timestamp = attr.timestamp
			}
			if (attr.size !== undefined) {
				MEMFS.resizeFileStorage(node, attr.size)
			}
		},
		lookup: function(parent, name) {
			throw FS.genericErrors[44]
		},
		mknod: function(parent, name, mode, dev) {
			return MEMFS.createNode(parent, name, mode, dev)
		},
		rename: function(old_node, new_dir, new_name) {
			if (FS.isDir(old_node.mode)) {
				var new_node;
				try {
					new_node = FS.lookupNode(new_dir, new_name)
				} catch (e) {}
				if (new_node) {
					for (var i in new_node.contents) {
						throw new FS.ErrnoError(55)
					}
				}
			}
			delete old_node.parent.contents[old_node.name];
			old_node.name = new_name;
			new_dir.contents[new_name] = old_node;
			old_node.parent = new_dir
		},
		unlink: function(parent, name) {
			delete parent.contents[name]
		},
		rmdir: function(parent, name) {
			var node = FS.lookupNode(parent, name);
			for (var i in node.contents) {
				throw new FS.ErrnoError(55)
			}
			delete parent.contents[name]
		},
		readdir: function(node) {
			var entries = [".", ".."];
			for (var key in node.contents) {
				if (!node.contents.hasOwnProperty(key)) {
					continue
				}
				entries.push(key)
			}
			return entries
		},
		symlink: function(parent, newname, oldpath) {
			var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
			node.link = oldpath;
			return node
		},
		readlink: function(node) {
			if (!FS.isLink(node.mode)) {
				throw new FS.ErrnoError(28)
			}
			return node.link
		}
	},
	stream_ops: {
		read: function(stream, buffer, offset, length, position) {
			var contents = stream.node.contents;
			if (position >= stream.node.usedBytes) return 0;
			var size = Math.min(stream.node.usedBytes - position, length);
			if (size > 8 && contents.subarray) {
				buffer.set(contents.subarray(position, position + size), offset)
			} else {
				for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i]
			}
			return size
		},
		write: function(stream, buffer, offset, length, position, canOwn) {
			if (!length) return 0;
			var node = stream.node;
			node.timestamp = Date.now();
			if (buffer.subarray && (!node.contents || node.contents.subarray)) {
				if (canOwn) {
					node.contents = buffer.subarray(offset, offset + length);
					node.usedBytes = length;
					return length
				} else if (node.usedBytes === 0 && position === 0) {
					node.contents = buffer.slice(offset, offset + length);
					node.usedBytes = length;
					return length
				} else if (position + length <= node.usedBytes) {
					node.contents.set(buffer.subarray(offset, offset + length), position);
					return length
				}
			}
			MEMFS.expandFileStorage(node, position + length);
			if (node.contents.subarray && buffer.subarray) {
				node.contents.set(buffer.subarray(offset, offset + length), position)
			} else {
				for (var i = 0; i < length; i++) {
					node.contents[position + i] = buffer[offset + i]
				}
			}
			node.usedBytes = Math.max(node.usedBytes, position + length);
			return length
		},
		llseek: function(stream, offset, whence) {
			var position = offset;
			if (whence === 1) {
				position += stream.position
			} else if (whence === 2) {
				if (FS.isFile(stream.node.mode)) {
					position += stream.node.usedBytes
				}
			}
			if (position < 0) {
				throw new FS.ErrnoError(28)
			}
			return position
		},
		allocate: function(stream, offset, length) {
			MEMFS.expandFileStorage(stream.node, offset + length);
			stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length)
		},
		mmap: function(stream, address, length, position, prot, flags) {
			assert(address === 0);
			if (!FS.isFile(stream.node.mode)) {
				throw new FS.ErrnoError(43)
			}
			var ptr;
			var allocated;
			var contents = stream.node.contents;
			if (!(flags & 2) && contents.buffer === buffer) {
				allocated = false;
				ptr = contents.byteOffset
			} else {
				if (position > 0 || position + length < contents.length) {
					if (contents.subarray) {
						contents = contents.subarray(position, position + length)
					} else {
						contents = Array.prototype.slice.call(contents, position, position + length)
					}
				}
				allocated = true;
				ptr = FS.mmapAlloc(length);
				if (!ptr) {
					throw new FS.ErrnoError(48)
				}
				HEAP8.set(contents, ptr)
			}
			return {
				ptr: ptr,
				allocated: allocated
			}
		},
		msync: function(stream, buffer, offset, length, mmapFlags) {
			if (!FS.isFile(stream.node.mode)) {
				throw new FS.ErrnoError(43)
			}
			if (mmapFlags & 2) {
				return 0
			}
			var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
			return 0
		}
	}
};
var FS = {
	root: null,
	mounts: [],
	devices: {},
	streams: [],
	nextInode: 1,
	nameTable: null,
	currentPath: "/",
	initialized: false,
	ignorePermissions: true,
	trackingDelegate: {},
	tracking: {
		openFlags: {
			READ: 1,
			WRITE: 2
		}
	},
	ErrnoError: null,
	genericErrors: {},
	filesystems: null,
	syncFSRequests: 0,
	handleFSError: function(e) {
		if (!(e instanceof FS.ErrnoError)) throw e + " : " + stackTrace();
		return setErrNo(e.errno)
	},
	lookupPath: function(path, opts) {
		path = PATH_FS.resolve(FS.cwd(), path);
		opts = opts || {};
		if (!path) return {
			path: "",
			node: null
		};
		var defaults = {
			follow_mount: true,
			recurse_count: 0
		};
		for (var key in defaults) {
			if (opts[key] === undefined) {
				opts[key] = defaults[key]
			}
		}
		if (opts.recurse_count > 8) {
			throw new FS.ErrnoError(32)
		}
		var parts = PATH.normalizeArray(path.split("/").filter(function(p) {
			return !!p
		}), false);
		var current = FS.root;
		var current_path = "/";
		for (var i = 0; i < parts.length; i++) {
			var islast = i === parts.length - 1;
			if (islast && opts.parent) {
				break
			}
			current = FS.lookupNode(current, parts[i]);
			current_path = PATH.join2(current_path, parts[i]);
			if (FS.isMountpoint(current)) {
				if (!islast || islast && opts.follow_mount) {
					current = current.mounted.root
				}
			}
			if (!islast || opts.follow) {
				var count = 0;
				while (FS.isLink(current.mode)) {
					var link = FS.readlink(current_path);
					current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
					var lookup = FS.lookupPath(current_path, {
						recurse_count: opts.recurse_count
					});
					current = lookup.node;
					if (count++ > 40) {
						throw new FS.ErrnoError(32)
					}
				}
			}
		}
		return {
			path: current_path,
			node: current
		}
	},
	getPath: function(node) {
		var path;
		while (true) {
			if (FS.isRoot(node)) {
				var mount = node.mount.mountpoint;
				if (!path) return mount;
				return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path
			}
			path = path ? node.name + "/" + path : node.name;
			node = node.parent
		}
	},
	hashName: function(parentid, name) {
		var hash = 0;
		for (var i = 0; i < name.length; i++) {
			hash = (hash << 5) - hash + name.charCodeAt(i) | 0
		}
		return (parentid + hash >>> 0) % FS.nameTable.length
	},
	hashAddNode: function(node) {
		var hash = FS.hashName(node.parent.id, node.name);
		node.name_next = FS.nameTable[hash];
		FS.nameTable[hash] = node
	},
	hashRemoveNode: function(node) {
		var hash = FS.hashName(node.parent.id, node.name);
		if (FS.nameTable[hash] === node) {
			FS.nameTable[hash] = node.name_next
		} else {
			var current = FS.nameTable[hash];
			while (current) {
				if (current.name_next === node) {
					current.name_next = node.name_next;
					break
				}
				current = current.name_next
			}
		}
	},
	lookupNode: function(parent, name) {
		var errCode = FS.mayLookup(parent);
		if (errCode) {
			throw new FS.ErrnoError(errCode, parent)
		}
		var hash = FS.hashName(parent.id, name);
		for (var node = FS.nameTable[hash]; node; node = node.name_next) {
			var nodeName = node.name;
			if (node.parent.id === parent.id && nodeName === name) {
				return node
			}
		}
		return FS.lookup(parent, name)
	},
	createNode: function(parent, name, mode, rdev) {
		var node = new FS.FSNode(parent, name, mode, rdev);
		FS.hashAddNode(node);
		return node
	},
	destroyNode: function(node) {
		FS.hashRemoveNode(node)
	},
	isRoot: function(node) {
		return node === node.parent
	},
	isMountpoint: function(node) {
		return !!node.mounted
	},
	isFile: function(mode) {
		return (mode & 61440) === 32768
	},
	isDir: function(mode) {
		return (mode & 61440) === 16384
	},
	isLink: function(mode) {
		return (mode & 61440) === 40960
	},
	isChrdev: function(mode) {
		return (mode & 61440) === 8192
	},
	isBlkdev: function(mode) {
		return (mode & 61440) === 24576
	},
	isFIFO: function(mode) {
		return (mode & 61440) === 4096
	},
	isSocket: function(mode) {
		return (mode & 49152) === 49152
	},
	flagModes: {
		"r": 0,
		"rs": 1052672,
		"r+": 2,
		"w": 577,
		"wx": 705,
		"xw": 705,
		"w+": 578,
		"wx+": 706,
		"xw+": 706,
		"a": 1089,
		"ax": 1217,
		"xa": 1217,
		"a+": 1090,
		"ax+": 1218,
		"xa+": 1218
	},
	modeStringToFlags: function(str) {
		var flags = FS.flagModes[str];
		if (typeof flags === "undefined") {
			throw new Error("Unknown file open mode: " + str)
		}
		return flags
	},
	flagsToPermissionString: function(flag) {
		var perms = ["r", "w", "rw"][flag & 3];
		if (flag & 512) {
			perms += "w"
		}
		return perms
	},
	nodePermissions: function(node, perms) {
		if (FS.ignorePermissions) {
			return 0
		}
		if (perms.indexOf("r") !== -1 && !(node.mode & 292)) {
			return 2
		} else if (perms.indexOf("w") !== -1 && !(node.mode & 146)) {
			return 2
		} else if (perms.indexOf("x") !== -1 && !(node.mode & 73)) {
			return 2
		}
		return 0
	},
	mayLookup: function(dir) {
		var errCode = FS.nodePermissions(dir, "x");
		if (errCode) return errCode;
		if (!dir.node_ops.lookup) return 2;
		return 0
	},
	mayCreate: function(dir, name) {
		try {
			var node = FS.lookupNode(dir, name);
			return 20
		} catch (e) {}
		return FS.nodePermissions(dir, "wx")
	},
	mayDelete: function(dir, name, isdir) {
		var node;
		try {
			node = FS.lookupNode(dir, name)
		} catch (e) {
			return e.errno
		}
		var errCode = FS.nodePermissions(dir, "wx");
		if (errCode) {
			return errCode
		}
		if (isdir) {
			if (!FS.isDir(node.mode)) {
				return 54
			}
			if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
				return 10
			}
		} else {
			if (FS.isDir(node.mode)) {
				return 31
			}
		}
		return 0
	},
	mayOpen: function(node, flags) {
		if (!node) {
			return 44
		}
		if (FS.isLink(node.mode)) {
			return 32
		} else if (FS.isDir(node.mode)) {
			if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
				return 31
			}
		}
		return FS.nodePermissions(node, FS.flagsToPermissionString(flags))
	},
	MAX_OPEN_FDS: 4096,
	nextfd: function(fd_start, fd_end) {
		fd_start = fd_start || 0;
		fd_end = fd_end || FS.MAX_OPEN_FDS;
		for (var fd = fd_start; fd <= fd_end; fd++) {
			if (!FS.streams[fd]) {
				return fd
			}
		}
		throw new FS.ErrnoError(33)
	},
	getStream: function(fd) {
		return FS.streams[fd]
	},
	createStream: function(stream, fd_start, fd_end) {
		if (!FS.FSStream) {
			FS.FSStream = function() {};
			FS.FSStream.prototype = {
				object: {
					get: function() {
						return this.node
					},
					set: function(val) {
						this.node = val
					}
				},
				isRead: {
					get: function() {
						return (this.flags & 2097155) !== 1
					}
				},
				isWrite: {
					get: function() {
						return (this.flags & 2097155) !== 0
					}
				},
				isAppend: {
					get: function() {
						return this.flags & 1024
					}
				}
			}
		}
		var newStream = new FS.FSStream;
		for (var p in stream) {
			newStream[p] = stream[p]
		}
		stream = newStream;
		var fd = FS.nextfd(fd_start, fd_end);
		stream.fd = fd;
		FS.streams[fd] = stream;
		return stream
	},
	closeStream: function(fd) {
		FS.streams[fd] = null
	},
	chrdev_stream_ops: {
		open: function(stream) {
			var device = FS.getDevice(stream.node.rdev);
			stream.stream_ops = device.stream_ops;
			if (stream.stream_ops.open) {
				stream.stream_ops.open(stream)
			}
		},
		llseek: function() {
			throw new FS.ErrnoError(70)
		}
	},
	major: function(dev) {
		return dev >> 8
	},
	minor: function(dev) {
		return dev & 255
	},
	makedev: function(ma, mi) {
		return ma << 8 | mi
	},
	registerDevice: function(dev, ops) {
		FS.devices[dev] = {
			stream_ops: ops
		}
	},
	getDevice: function(dev) {
		return FS.devices[dev]
	},
	getMounts: function(mount) {
		var mounts = [];
		var check = [mount];
		while (check.length) {
			var m = check.pop();
			mounts.push(m);
			check.push.apply(check, m.mounts)
		}
		return mounts
	},
	syncfs: function(populate, callback) {
		if (typeof populate === "function") {
			callback = populate;
			populate = false
		}
		FS.syncFSRequests++;
		if (FS.syncFSRequests > 1) {
			err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work")
		}
		var mounts = FS.getMounts(FS.root.mount);
		var completed = 0;

		function doCallback(errCode) {
			FS.syncFSRequests--;
			return callback(errCode)
		}

		function done(errCode) {
			if (errCode) {
				if (!done.errored) {
					done.errored = true;
					return doCallback(errCode)
				}
				return
			}
			if (++completed >= mounts.length) {
				doCallback(null)
			}
		}
		mounts.forEach(function(mount) {
			if (!mount.type.syncfs) {
				return done(null)
			}
			mount.type.syncfs(mount, populate, done)
		})
	},
	mount: function(type, opts, mountpoint) {
		var root = mountpoint === "/";
		var pseudo = !mountpoint;
		var node;
		if (root && FS.root) {
			throw new FS.ErrnoError(10)
		} else if (!root && !pseudo) {
			var lookup = FS.lookupPath(mountpoint, {
				follow_mount: false
			});
			mountpoint = lookup.path;
			node = lookup.node;
			if (FS.isMountpoint(node)) {
				throw new FS.ErrnoError(10)
			}
			if (!FS.isDir(node.mode)) {
				throw new FS.ErrnoError(54)
			}
		}
		var mount = {
			type: type,
			opts: opts,
			mountpoint: mountpoint,
			mounts: []
		};
		var mountRoot = type.mount(mount);
		mountRoot.mount = mount;
		mount.root = mountRoot;
		if (root) {
			FS.root = mountRoot
		} else if (node) {
			node.mounted = mount;
			if (node.mount) {
				node.mount.mounts.push(mount)
			}
		}
		return mountRoot
	},
	unmount: function(mountpoint) {
		var lookup = FS.lookupPath(mountpoint, {
			follow_mount: false
		});
		if (!FS.isMountpoint(lookup.node)) {
			throw new FS.ErrnoError(28)
		}
		var node = lookup.node;
		var mount = node.mounted;
		var mounts = FS.getMounts(mount);
		Object.keys(FS.nameTable).forEach(function(hash) {
			var current = FS.nameTable[hash];
			while (current) {
				var next = current.name_next;
				if (mounts.indexOf(current.mount) !== -1) {
					FS.destroyNode(current)
				}
				current = next
			}
		});
		node.mounted = null;
		var idx = node.mount.mounts.indexOf(mount);
		node.mount.mounts.splice(idx, 1)
	},
	lookup: function(parent, name) {
		return parent.node_ops.lookup(parent, name)
	},
	mknod: function(path, mode, dev) {
		var lookup = FS.lookupPath(path, {
			parent: true
		});
		var parent = lookup.node;
		var name = PATH.basename(path);
		if (!name || name === "." || name === "..") {
			throw new FS.ErrnoError(28)
		}
		var errCode = FS.mayCreate(parent, name);
		if (errCode) {
			throw new FS.ErrnoError(errCode)
		}
		if (!parent.node_ops.mknod) {
			throw new FS.ErrnoError(63)
		}
		return parent.node_ops.mknod(parent, name, mode, dev)
	},
	create: function(path, mode) {
		mode = mode !== undefined ? mode : 438;
		mode &= 4095;
		mode |= 32768;
		return FS.mknod(path, mode, 0)
	},
	mkdir: function(path, mode) {
		mode = mode !== undefined ? mode : 511;
		mode &= 511 | 512;
		mode |= 16384;
		return FS.mknod(path, mode, 0)
	},
	mkdirTree: function(path, mode) {
		var dirs = path.split("/");
		var d = "";
		for (var i = 0; i < dirs.length; ++i) {
			if (!dirs[i]) continue;
			d += "/" + dirs[i];
			try {
				FS.mkdir(d, mode)
			} catch (e) {
				if (e.errno != 20) throw e
			}
		}
	},
	mkdev: function(path, mode, dev) {
		if (typeof dev === "undefined") {
			dev = mode;
			mode = 438
		}
		mode |= 8192;
		return FS.mknod(path, mode, dev)
	},
	symlink: function(oldpath, newpath) {
		if (!PATH_FS.resolve(oldpath)) {
			throw new FS.ErrnoError(44)
		}
		var lookup = FS.lookupPath(newpath, {
			parent: true
		});
		var parent = lookup.node;
		if (!parent) {
			throw new FS.ErrnoError(44)
		}
		var newname = PATH.basename(newpath);
		var errCode = FS.mayCreate(parent, newname);
		if (errCode) {
			throw new FS.ErrnoError(errCode)
		}
		if (!parent.node_ops.symlink) {
			throw new FS.ErrnoError(63)
		}
		return parent.node_ops.symlink(parent, newname, oldpath)
	},
	rename: function(old_path, new_path) {
		var old_dirname = PATH.dirname(old_path);
		var new_dirname = PATH.dirname(new_path);
		var old_name = PATH.basename(old_path);
		var new_name = PATH.basename(new_path);
		var lookup, old_dir, new_dir;
		try {
			lookup = FS.lookupPath(old_path, {
				parent: true
			});
			old_dir = lookup.node;
			lookup = FS.lookupPath(new_path, {
				parent: true
			});
			new_dir = lookup.node
		} catch (e) {
			throw new FS.ErrnoError(10)
		}
		if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
		if (old_dir.mount !== new_dir.mount) {
			throw new FS.ErrnoError(75)
		}
		var old_node = FS.lookupNode(old_dir, old_name);
		var relative = PATH_FS.relative(old_path, new_dirname);
		if (relative.charAt(0) !== ".") {
			throw new FS.ErrnoError(28)
		}
		relative = PATH_FS.relative(new_path, old_dirname);
		if (relative.charAt(0) !== ".") {
			throw new FS.ErrnoError(55)
		}
		var new_node;
		try {
			new_node = FS.lookupNode(new_dir, new_name)
		} catch (e) {}
		if (old_node === new_node) {
			return
		}
		var isdir = FS.isDir(old_node.mode);
		var errCode = FS.mayDelete(old_dir, old_name, isdir);
		if (errCode) {
			throw new FS.ErrnoError(errCode)
		}
		errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
		if (errCode) {
			throw new FS.ErrnoError(errCode)
		}
		if (!old_dir.node_ops.rename) {
			throw new FS.ErrnoError(63)
		}
		if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
			throw new FS.ErrnoError(10)
		}
		if (new_dir !== old_dir) {
			errCode = FS.nodePermissions(old_dir, "w");
			if (errCode) {
				throw new FS.ErrnoError(errCode)
			}
		}
		try {
			if (FS.trackingDelegate["willMovePath"]) {
				FS.trackingDelegate["willMovePath"](old_path, new_path)
			}
		} catch (e) {
			err("FS.trackingDelegate['willMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message)
		}
		FS.hashRemoveNode(old_node);
		try {
			old_dir.node_ops.rename(old_node, new_dir, new_name)
		} catch (e) {
			throw e
		} finally {
			FS.hashAddNode(old_node)
		}
		try {
			if (FS.trackingDelegate["onMovePath"]) FS.trackingDelegate["onMovePath"](old_path, new_path)
		} catch (e) {
			err("FS.trackingDelegate['onMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message)
		}
	},
	rmdir: function(path) {
		var lookup = FS.lookupPath(path, {
			parent: true
		});
		var parent = lookup.node;
		var name = PATH.basename(path);
		var node = FS.lookupNode(parent, name);
		var errCode = FS.mayDelete(parent, name, true);
		if (errCode) {
			throw new FS.ErrnoError(errCode)
		}
		if (!parent.node_ops.rmdir) {
			throw new FS.ErrnoError(63)
		}
		if (FS.isMountpoint(node)) {
			throw new FS.ErrnoError(10)
		}
		try {
			if (FS.trackingDelegate["willDeletePath"]) {
				FS.trackingDelegate["willDeletePath"](path)
			}
		} catch (e) {
			err("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message)
		}
		parent.node_ops.rmdir(parent, name);
		FS.destroyNode(node);
		try {
			if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path)
		} catch (e) {
			err("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message)
		}
	},
	readdir: function(path) {
		var lookup = FS.lookupPath(path, {
			follow: true
		});
		var node = lookup.node;
		if (!node.node_ops.readdir) {
			throw new FS.ErrnoError(54)
		}
		return node.node_ops.readdir(node)
	},
	unlink: function(path) {
		var lookup = FS.lookupPath(path, {
			parent: true
		});
		var parent = lookup.node;
		var name = PATH.basename(path);
		var node = FS.lookupNode(parent, name);
		var errCode = FS.mayDelete(parent, name, false);
		if (errCode) {
			throw new FS.ErrnoError(errCode)
		}
		if (!parent.node_ops.unlink) {
			throw new FS.ErrnoError(63)
		}
		if (FS.isMountpoint(node)) {
			throw new FS.ErrnoError(10)
		}
		try {
			if (FS.trackingDelegate["willDeletePath"]) {
				FS.trackingDelegate["willDeletePath"](path)
			}
		} catch (e) {
			err("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message)
		}
		parent.node_ops.unlink(parent, name);
		FS.destroyNode(node);
		try {
			if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path)
		} catch (e) {
			err("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message)
		}
	},
	readlink: function(path) {
		var lookup = FS.lookupPath(path);
		var link = lookup.node;
		if (!link) {
			throw new FS.ErrnoError(44)
		}
		if (!link.node_ops.readlink) {
			throw new FS.ErrnoError(28)
		}
		return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link))
	},
	stat: function(path, dontFollow) {
		var lookup = FS.lookupPath(path, {
			follow: !dontFollow
		});
		var node = lookup.node;
		if (!node) {
			throw new FS.ErrnoError(44)
		}
		if (!node.node_ops.getattr) {
			throw new FS.ErrnoError(63)
		}
		return node.node_ops.getattr(node)
	},
	lstat: function(path) {
		return FS.stat(path, true)
	},
	chmod: function(path, mode, dontFollow) {
		var node;
		if (typeof path === "string") {
			var lookup = FS.lookupPath(path, {
				follow: !dontFollow
			});
			node = lookup.node
		} else {
			node = path
		}
		if (!node.node_ops.setattr) {
			throw new FS.ErrnoError(63)
		}
		node.node_ops.setattr(node, {
			mode: mode & 4095 | node.mode & ~4095,
			timestamp: Date.now()
		})
	},
	lchmod: function(path, mode) {
		FS.chmod(path, mode, true)
	},
	fchmod: function(fd, mode) {
		var stream = FS.getStream(fd);
		if (!stream) {
			throw new FS.ErrnoError(8)
		}
		FS.chmod(stream.node, mode)
	},
	chown: function(path, uid, gid, dontFollow) {
		var node;
		if (typeof path === "string") {
			var lookup = FS.lookupPath(path, {
				follow: !dontFollow
			});
			node = lookup.node
		} else {
			node = path
		}
		if (!node.node_ops.setattr) {
			throw new FS.ErrnoError(63)
		}
		node.node_ops.setattr(node, {
			timestamp: Date.now()
		})
	},
	lchown: function(path, uid, gid) {
		FS.chown(path, uid, gid, true)
	},
	fchown: function(fd, uid, gid) {
		var stream = FS.getStream(fd);
		if (!stream) {
			throw new FS.ErrnoError(8)
		}
		FS.chown(stream.node, uid, gid)
	},
	truncate: function(path, len) {
		if (len < 0) {
			throw new FS.ErrnoError(28)
		}
		var node;
		if (typeof path === "string") {
			var lookup = FS.lookupPath(path, {
				follow: true
			});
			node = lookup.node
		} else {
			node = path
		}
		if (!node.node_ops.setattr) {
			throw new FS.ErrnoError(63)
		}
		if (FS.isDir(node.mode)) {
			throw new FS.ErrnoError(31)
		}
		if (!FS.isFile(node.mode)) {
			throw new FS.ErrnoError(28)
		}
		var errCode = FS.nodePermissions(node, "w");
		if (errCode) {
			throw new FS.ErrnoError(errCode)
		}
		node.node_ops.setattr(node, {
			size: len,
			timestamp: Date.now()
		})
	},
	ftruncate: function(fd, len) {
		var stream = FS.getStream(fd);
		if (!stream) {
			throw new FS.ErrnoError(8)
		}
		if ((stream.flags & 2097155) === 0) {
			throw new FS.ErrnoError(28)
		}
		FS.truncate(stream.node, len)
	},
	utime: function(path, atime, mtime) {
		var lookup = FS.lookupPath(path, {
			follow: true
		});
		var node = lookup.node;
		node.node_ops.setattr(node, {
			timestamp: Math.max(atime, mtime)
		})
	},
	open: function(path, flags, mode, fd_start, fd_end) {
		if (path === "") {
			throw new FS.ErrnoError(44)
		}
		flags = typeof flags === "string" ? FS.modeStringToFlags(flags) : flags;
		mode = typeof mode === "undefined" ? 438 : mode;
		if (flags & 64) {
			mode = mode & 4095 | 32768
		} else {
			mode = 0
		}
		var node;
		if (typeof path === "object") {
			node = path
		} else {
			path = PATH.normalize(path);
			try {
				var lookup = FS.lookupPath(path, {
					follow: !(flags & 131072)
				});
				node = lookup.node
			} catch (e) {}
		}
		var created = false;
		if (flags & 64) {
			if (node) {
				if (flags & 128) {
					throw new FS.ErrnoError(20)
				}
			} else {
				node = FS.mknod(path, mode, 0);
				created = true
			}
		}
		if (!node) {
			throw new FS.ErrnoError(44)
		}
		if (FS.isChrdev(node.mode)) {
			flags &= ~512
		}
		if (flags & 65536 && !FS.isDir(node.mode)) {
			throw new FS.ErrnoError(54)
		}
		if (!created) {
			var errCode = FS.mayOpen(node, flags);
			if (errCode) {
				throw new FS.ErrnoError(errCode)
			}
		}
		if (flags & 512) {
			FS.truncate(node, 0)
		}
		flags &= ~(128 | 512 | 131072);
		var stream = FS.createStream({
			node: node,
			path: FS.getPath(node),
			flags: flags,
			seekable: true,
			position: 0,
			stream_ops: node.stream_ops,
			ungotten: [],
			error: false
		}, fd_start, fd_end);
		if (stream.stream_ops.open) {
			stream.stream_ops.open(stream)
		}
		if (Module["logReadFiles"] && !(flags & 1)) {
			if (!FS.readFiles) FS.readFiles = {};
			if (!(path in FS.readFiles)) {
				FS.readFiles[path] = 1;
				err("FS.trackingDelegate error on read file: " + path)
			}
		}
		try {
			if (FS.trackingDelegate["onOpenFile"]) {
				var trackingFlags = 0;
				if ((flags & 2097155) !== 1) {
					trackingFlags |= FS.tracking.openFlags.READ
				}
				if ((flags & 2097155) !== 0) {
					trackingFlags |= FS.tracking.openFlags.WRITE
				}
				FS.trackingDelegate["onOpenFile"](path, trackingFlags)
			}
		} catch (e) {
			err("FS.trackingDelegate['onOpenFile']('" + path + "', flags) threw an exception: " + e.message)
		}
		return stream
	},
	close: function(stream) {
		if (FS.isClosed(stream)) {
			throw new FS.ErrnoError(8)
		}
		if (stream.getdents) stream.getdents = null;
		try {
			if (stream.stream_ops.close) {
				stream.stream_ops.close(stream)
			}
		} catch (e) {
			throw e
		} finally {
			FS.closeStream(stream.fd)
		}
		stream.fd = null
	},
	isClosed: function(stream) {
		return stream.fd === null
	},
	llseek: function(stream, offset, whence) {
		if (FS.isClosed(stream)) {
			throw new FS.ErrnoError(8)
		}
		if (!stream.seekable || !stream.stream_ops.llseek) {
			throw new FS.ErrnoError(70)
		}
		if (whence != 0 && whence != 1 && whence != 2) {
			throw new FS.ErrnoError(28)
		}
		stream.position = stream.stream_ops.llseek(stream, offset, whence);
		stream.ungotten = [];
		return stream.position
	},
	read: function(stream, buffer, offset, length, position) {
		if (length < 0 || position < 0) {
			throw new FS.ErrnoError(28)
		}
		if (FS.isClosed(stream)) {
			throw new FS.ErrnoError(8)
		}
		if ((stream.flags & 2097155) === 1) {
			throw new FS.ErrnoError(8)
		}
		if (FS.isDir(stream.node.mode)) {
			throw new FS.ErrnoError(31)
		}
		if (!stream.stream_ops.read) {
			throw new FS.ErrnoError(28)
		}
		var seeking = typeof position !== "undefined";
		if (!seeking) {
			position = stream.position
		} else if (!stream.seekable) {
			throw new FS.ErrnoError(70)
		}
		var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
		if (!seeking) stream.position += bytesRead;
		return bytesRead
	},
	write: function(stream, buffer, offset, length, position, canOwn) {
		if (length < 0 || position < 0) {
			throw new FS.ErrnoError(28)
		}
		if (FS.isClosed(stream)) {
			throw new FS.ErrnoError(8)
		}
		if ((stream.flags & 2097155) === 0) {
			throw new FS.ErrnoError(8)
		}
		if (FS.isDir(stream.node.mode)) {
			throw new FS.ErrnoError(31)
		}
		if (!stream.stream_ops.write) {
			throw new FS.ErrnoError(28)
		}
		if (stream.seekable && stream.flags & 1024) {
			FS.llseek(stream, 0, 2)
		}
		var seeking = typeof position !== "undefined";
		if (!seeking) {
			position = stream.position
		} else if (!stream.seekable) {
			throw new FS.ErrnoError(70)
		}
		var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
		if (!seeking) stream.position += bytesWritten;
		try {
			if (stream.path && FS.trackingDelegate["onWriteToFile"]) FS.trackingDelegate["onWriteToFile"](stream.path)
		} catch (e) {
			err("FS.trackingDelegate['onWriteToFile']('" + stream.path + "') threw an exception: " + e.message)
		}
		return bytesWritten
	},
	allocate: function(stream, offset, length) {
		if (FS.isClosed(stream)) {
			throw new FS.ErrnoError(8)
		}
		if (offset < 0 || length <= 0) {
			throw new FS.ErrnoError(28)
		}
		if ((stream.flags & 2097155) === 0) {
			throw new FS.ErrnoError(8)
		}
		if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
			throw new FS.ErrnoError(43)
		}
		if (!stream.stream_ops.allocate) {
			throw new FS.ErrnoError(138)
		}
		stream.stream_ops.allocate(stream, offset, length)
	},
	mmap: function(stream, address, length, position, prot, flags) {
		if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
			throw new FS.ErrnoError(2)
		}
		if ((stream.flags & 2097155) === 1) {
			throw new FS.ErrnoError(2)
		}
		if (!stream.stream_ops.mmap) {
			throw new FS.ErrnoError(43)
		}
		return stream.stream_ops.mmap(stream, address, length, position, prot, flags)
	},
	msync: function(stream, buffer, offset, length, mmapFlags) {
		if (!stream || !stream.stream_ops.msync) {
			return 0
		}
		return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags)
	},
	munmap: function(stream) {
		return 0
	},
	ioctl: function(stream, cmd, arg) {
		if (!stream.stream_ops.ioctl) {
			throw new FS.ErrnoError(59)
		}
		return stream.stream_ops.ioctl(stream, cmd, arg)
	},
	readFile: function(path, opts) {
		opts = opts || {};
		opts.flags = opts.flags || "r";
		opts.encoding = opts.encoding || "binary";
		if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
			throw new Error('Invalid encoding type "' + opts.encoding + '"')
		}
		var ret;
		var stream = FS.open(path, opts.flags);
		var stat = FS.stat(path);
		var length = stat.size;
		var buf = new Uint8Array(length);
		FS.read(stream, buf, 0, length, 0);
		if (opts.encoding === "utf8") {
			ret = UTF8ArrayToString(buf, 0)
		} else if (opts.encoding === "binary") {
			ret = buf
		}
		FS.close(stream);
		return ret
	},
	writeFile: function(path, data, opts) {
		opts = opts || {};
		opts.flags = opts.flags || "w";
		var stream = FS.open(path, opts.flags, opts.mode);
		if (typeof data === "string") {
			var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
			var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
			FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn)
		} else if (ArrayBuffer.isView(data)) {
			FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn)
		} else {
			throw new Error("Unsupported data type")
		}
		FS.close(stream)
	},
	cwd: function() {
		return FS.currentPath
	},
	chdir: function(path) {
		var lookup = FS.lookupPath(path, {
			follow: true
		});
		if (lookup.node === null) {
			throw new FS.ErrnoError(44)
		}
		if (!FS.isDir(lookup.node.mode)) {
			throw new FS.ErrnoError(54)
		}
		var errCode = FS.nodePermissions(lookup.node, "x");
		if (errCode) {
			throw new FS.ErrnoError(errCode)
		}
		FS.currentPath = lookup.path
	},
	createDefaultDirectories: function() {
		FS.mkdir("/tmp");
		FS.mkdir("/home");
		FS.mkdir("/home/web_user")
	},
	createDefaultDevices: function() {
		FS.mkdir("/dev");
		FS.registerDevice(FS.makedev(1, 3), {
			read: function() {
				return 0
			},
			write: function(stream, buffer, offset, length, pos) {
				return length
			}
		});
		FS.mkdev("/dev/null", FS.makedev(1, 3));
		TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
		TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
		FS.mkdev("/dev/tty", FS.makedev(5, 0));
		FS.mkdev("/dev/tty1", FS.makedev(6, 0));
		var random_device;
		if (typeof crypto === "object" && typeof crypto["getRandomValues"] === "function") {
			var randomBuffer = new Uint8Array(1);
			random_device = function() {
				crypto.getRandomValues(randomBuffer);
				return randomBuffer[0]
			}
		} else if (ENVIRONMENT_IS_NODE) {
			try {
				var crypto_module = require("crypto");
				random_device = function() {
					return crypto_module["randomBytes"](1)[0]
				}
			} catch (e) {}
		} else {}
		if (!random_device) {
			random_device = function() {
				abort("random_device")
			}
		}
		FS.createDevice("/dev", "random", random_device);
		FS.createDevice("/dev", "urandom", random_device);
		FS.mkdir("/dev/shm");
		FS.mkdir("/dev/shm/tmp")
	},
	createSpecialDirectories: function() {
		FS.mkdir("/proc");
		FS.mkdir("/proc/self");
		FS.mkdir("/proc/self/fd");
		FS.mount({
			mount: function() {
				var node = FS.createNode("/proc/self", "fd", 16384 | 511, 73);
				node.node_ops = {
					lookup: function(parent, name) {
						var fd = +name;
						var stream = FS.getStream(fd);
						if (!stream) throw new FS.ErrnoError(8);
						var ret = {
							parent: null,
							mount: {
								mountpoint: "fake"
							},
							node_ops: {
								readlink: function() {
									return stream.path
								}
							}
						};
						ret.parent = ret;
						return ret
					}
				};
				return node
			}
		}, {}, "/proc/self/fd")
	},
	createStandardStreams: function() {
		if (Module["stdin"]) {
			FS.createDevice("/dev", "stdin", Module["stdin"])
		} else {
			FS.symlink("/dev/tty", "/dev/stdin")
		}
		if (Module["stdout"]) {
			FS.createDevice("/dev", "stdout", null, Module["stdout"])
		} else {
			FS.symlink("/dev/tty", "/dev/stdout")
		}
		if (Module["stderr"]) {
			FS.createDevice("/dev", "stderr", null, Module["stderr"])
		} else {
			FS.symlink("/dev/tty1", "/dev/stderr")
		}
		var stdin = FS.open("/dev/stdin", "r");
		var stdout = FS.open("/dev/stdout", "w");
		var stderr = FS.open("/dev/stderr", "w")
	},
	ensureErrnoError: function() {
		if (FS.ErrnoError) return;
		FS.ErrnoError = function ErrnoError(errno, node) {
			this.node = node;
			this.setErrno = function(errno) {
				this.errno = errno
			};
			this.setErrno(errno);
			this.message = "FS error"
		};
		FS.ErrnoError.prototype = new Error;
		FS.ErrnoError.prototype.constructor = FS.ErrnoError;
		[44].forEach(function(code) {
			FS.genericErrors[code] = new FS.ErrnoError(code);
			FS.genericErrors[code].stack = "<generic error, no stack>"
		})
	},
	staticInit: function() {
		FS.ensureErrnoError();
		FS.nameTable = new Array(4096);
		FS.mount(MEMFS, {}, "/");
		FS.createDefaultDirectories();
		FS.createDefaultDevices();
		FS.createSpecialDirectories();
		FS.filesystems = {
			"MEMFS": MEMFS
		}
	},
	init: function(input, output, error) {
		FS.init.initialized = true;
		FS.ensureErrnoError();
		Module["stdin"] = input || Module["stdin"];
		Module["stdout"] = output || Module["stdout"];
		Module["stderr"] = error || Module["stderr"];
		FS.createStandardStreams()
	},
	quit: function() {
		FS.init.initialized = false;
		var fflush = Module["_fflush"];
		if (fflush) fflush(0);
		for (var i = 0; i < FS.streams.length; i++) {
			var stream = FS.streams[i];
			if (!stream) {
				continue
			}
			FS.close(stream)
		}
	},
	getMode: function(canRead, canWrite) {
		var mode = 0;
		if (canRead) mode |= 292 | 73;
		if (canWrite) mode |= 146;
		return mode
	},
	joinPath: function(parts, forceRelative) {
		var path = PATH.join.apply(null, parts);
		if (forceRelative && path[0] == "/") path = path.substr(1);
		return path
	},
	absolutePath: function(relative, base) {
		return PATH_FS.resolve(base, relative)
	},
	standardizePath: function(path) {
		return PATH.normalize(path)
	},
	findObject: function(path, dontResolveLastLink) {
		var ret = FS.analyzePath(path, dontResolveLastLink);
		if (ret.exists) {
			return ret.object
		} else {
			setErrNo(ret.error);
			return null
		}
	},
	analyzePath: function(path, dontResolveLastLink) {
		try {
			var lookup = FS.lookupPath(path, {
				follow: !dontResolveLastLink
			});
			path = lookup.path
		} catch (e) {}
		var ret = {
			isRoot: false,
			exists: false,
			error: 0,
			name: null,
			path: null,
			object: null,
			parentExists: false,
			parentPath: null,
			parentObject: null
		};
		try {
			var lookup = FS.lookupPath(path, {
				parent: true
			});
			ret.parentExists = true;
			ret.parentPath = lookup.path;
			ret.parentObject = lookup.node;
			ret.name = PATH.basename(path);
			lookup = FS.lookupPath(path, {
				follow: !dontResolveLastLink
			});
			ret.exists = true;
			ret.path = lookup.path;
			ret.object = lookup.node;
			ret.name = lookup.node.name;
			ret.isRoot = lookup.path === "/"
		} catch (e) {
			ret.error = e.errno
		}
		return ret
	},
	createFolder: function(parent, name, canRead, canWrite) {
		var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
		var mode = FS.getMode(canRead, canWrite);
		return FS.mkdir(path, mode)
	},
	createPath: function(parent, path, canRead, canWrite) {
		parent = typeof parent === "string" ? parent : FS.getPath(parent);
		var parts = path.split("/").reverse();
		while (parts.length) {
			var part = parts.pop();
			if (!part) continue;
			var current = PATH.join2(parent, part);
			try {
				FS.mkdir(current)
			} catch (e) {}
			parent = current
		}
		return current
	},
	createFile: function(parent, name, properties, canRead, canWrite) {
		var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
		var mode = FS.getMode(canRead, canWrite);
		return FS.create(path, mode)
	},
	createDataFile: function(parent, name, data, canRead, canWrite, canOwn) {
		var path = name ? PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name) : parent;
		var mode = FS.getMode(canRead, canWrite);
		var node = FS.create(path, mode);
		if (data) {
			if (typeof data === "string") {
				var arr = new Array(data.length);
				for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
				data = arr
			}
			FS.chmod(node, mode | 146);
			var stream = FS.open(node, "w");
			FS.write(stream, data, 0, data.length, 0, canOwn);
			FS.close(stream);
			FS.chmod(node, mode)
		}
		return node
	},
	createDevice: function(parent, name, input, output) {
		var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
		var mode = FS.getMode(!!input, !!output);
		if (!FS.createDevice.major) FS.createDevice.major = 64;
		var dev = FS.makedev(FS.createDevice.major++, 0);
		FS.registerDevice(dev, {
			open: function(stream) {
				stream.seekable = false
			},
			close: function(stream) {
				if (output && output.buffer && output.buffer.length) {
					output(10)
				}
			},
			read: function(stream, buffer, offset, length, pos) {
				var bytesRead = 0;
				for (var i = 0; i < length; i++) {
					var result;
					try {
						result = input()
					} catch (e) {
						throw new FS.ErrnoError(29)
					}
					if (result === undefined && bytesRead === 0) {
						throw new FS.ErrnoError(6)
					}
					if (result === null || result === undefined) break;
					bytesRead++;
					buffer[offset + i] = result
				}
				if (bytesRead) {
					stream.node.timestamp = Date.now()
				}
				return bytesRead
			},
			write: function(stream, buffer, offset, length, pos) {
				for (var i = 0; i < length; i++) {
					try {
						output(buffer[offset + i])
					} catch (e) {
						throw new FS.ErrnoError(29)
					}
				}
				if (length) {
					stream.node.timestamp = Date.now()
				}
				return i
			}
		});
		return FS.mkdev(path, mode, dev)
	},
	createLink: function(parent, name, target, canRead, canWrite) {
		var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
		return FS.symlink(target, path)
	},
	forceLoadFile: function(obj) {
		if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
		var success = true;
		if (typeof XMLHttpRequest !== "undefined") {
			throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.")
		} else if (read_) {
			try {
				obj.contents = intArrayFromString(read_(obj.url), true);
				obj.usedBytes = obj.contents.length
			} catch (e) {
				success = false
			}
		} else {
			throw new Error("Cannot load without read() or XMLHttpRequest.")
		}
		if (!success) setErrNo(29);
		return success
	},
	createLazyFile: function(parent, name, url, canRead, canWrite) {
		function LazyUint8Array() {
			this.lengthKnown = false;
			this.chunks = []
		}
		LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
			if (idx > this.length - 1 || idx < 0) {
				return undefined
			}
			var chunkOffset = idx % this.chunkSize;
			var chunkNum = idx / this.chunkSize | 0;
			return this.getter(chunkNum)[chunkOffset]
		};
		LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
			this.getter = getter
		};
		LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
			var xhr = new XMLHttpRequest;
			xhr.open("HEAD", url, false);
			xhr.send(null);
			if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
			var datalength = Number(xhr.getResponseHeader("Content-length"));
			var header;
			var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
			var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
			var chunkSize = 1024 * 1024;
			if (!hasByteServing) chunkSize = datalength;
			var doXHR = function(from, to) {
				if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
				if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
				var xhr = new XMLHttpRequest;
				xhr.open("GET", url, false);
				if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
				if (typeof Uint8Array != "undefined") xhr.responseType = "arraybuffer";
				if (xhr.overrideMimeType) {
					xhr.overrideMimeType("text/plain; charset=x-user-defined")
				}
				xhr.send(null);
				if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
				if (xhr.response !== undefined) {
					return new Uint8Array(xhr.response || [])
				} else {
					return intArrayFromString(xhr.responseText || "", true)
				}
			};
			var lazyArray = this;
			lazyArray.setDataGetter(function(chunkNum) {
				var start = chunkNum * chunkSize;
				var end = (chunkNum + 1) * chunkSize - 1;
				end = Math.min(end, datalength - 1);
				if (typeof lazyArray.chunks[chunkNum] === "undefined") {
					lazyArray.chunks[chunkNum] = doXHR(start, end)
				}
				if (typeof lazyArray.chunks[chunkNum] === "undefined") throw new Error("doXHR failed!");
				return lazyArray.chunks[chunkNum]
			});
			if (usesGzip || !datalength) {
				chunkSize = datalength = 1;
				datalength = this.getter(0).length;
				chunkSize = datalength;
				out("LazyFiles on gzip forces download of the whole file when length is accessed")
			}
			this._length = datalength;
			this._chunkSize = chunkSize;
			this.lengthKnown = true
		};
		if (typeof XMLHttpRequest !== "undefined") {
			if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
			var lazyArray = new LazyUint8Array;
			Object.defineProperties(lazyArray, {
				length: {
					get: function() {
						if (!this.lengthKnown) {
							this.cacheLength()
						}
						return this._length
					}
				},
				chunkSize: {
					get: function() {
						if (!this.lengthKnown) {
							this.cacheLength()
						}
						return this._chunkSize
					}
				}
			});
			var properties = {
				isDevice: false,
				contents: lazyArray
			}
		} else {
			var properties = {
				isDevice: false,
				url: url
			}
		}
		var node = FS.createFile(parent, name, properties, canRead, canWrite);
		if (properties.contents) {
			node.contents = properties.contents
		} else if (properties.url) {
			node.contents = null;
			node.url = properties.url
		}
		Object.defineProperties(node, {
			usedBytes: {
				get: function() {
					return this.contents.length
				}
			}
		});
		var stream_ops = {};
		var keys = Object.keys(node.stream_ops);
		keys.forEach(function(key) {
			var fn = node.stream_ops[key];
			stream_ops[key] = function forceLoadLazyFile() {
				if (!FS.forceLoadFile(node)) {
					throw new FS.ErrnoError(29)
				}
				return fn.apply(null, arguments)
			}
		});
		stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
			if (!FS.forceLoadFile(node)) {
				throw new FS.ErrnoError(29)
			}
			var contents = stream.node.contents;
			if (position >= contents.length) return 0;
			var size = Math.min(contents.length - position, length);
			if (contents.slice) {
				for (var i = 0; i < size; i++) {
					buffer[offset + i] = contents[position + i]
				}
			} else {
				for (var i = 0; i < size; i++) {
					buffer[offset + i] = contents.get(position + i)
				}
			}
			return size
		};
		node.stream_ops = stream_ops;
		return node
	},
	createPreloadedFile: function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
		Browser.init();
		var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
		var dep = getUniqueRunDependency("cp " + fullname);
		function processData(byteArray) {
			function finish(byteArray) {
				if (preFinish) preFinish();
				if (!dontCreateFile) {
					FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn)
				}
				if (onload) onload();
				removeRunDependency(dep)
			}
			var handled = false;
			Module["preloadPlugins"].forEach(function(plugin) {
				if (handled) return;
				if (plugin["canHandle"](fullname)) {
					plugin["handle"](byteArray, fullname, finish, function() {
						if (onerror) onerror();
						removeRunDependency(dep)
					});
					handled = true
				}
			});
			if (!handled) finish(byteArray)
		}
		addRunDependency(dep);
		if (typeof url == "string") {
			var url="https://pedropsi.github.io/codes/game/star-battle/"+url;
			Browser.asyncLoad(url, function(byteArray) {
				processData(byteArray)
			}, onerror)
		} else {
			processData(url)
		}
	},
	indexedDB: function() {
		return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
	},
	DB_NAME: function() {
		return "EM_FS_" + window.location.pathname
	},
	DB_VERSION: 20,
	DB_STORE_NAME: "FILE_DATA",
	saveFilesToDB: function(paths, onload, onerror) {
		onload = onload || function() {};
		onerror = onerror || function() {};
		var indexedDB = FS.indexedDB();
		try {
			var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
		} catch (e) {
			return onerror(e)
		}
		openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
			out("creating db");
			var db = openRequest.result;
			db.createObjectStore(FS.DB_STORE_NAME)
		};
		openRequest.onsuccess = function openRequest_onsuccess() {
			var db = openRequest.result;
			var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite");
			var files = transaction.objectStore(FS.DB_STORE_NAME);
			var ok = 0,
				fail = 0,
				total = paths.length;

			function finish() {
				if (fail == 0) onload();
				else onerror()
			}
			paths.forEach(function(path) {
				var putRequest = files.put(FS.analyzePath(path).object.contents, path);
				putRequest.onsuccess = function putRequest_onsuccess() {
					ok++;
					if (ok + fail == total) finish()
				};
				putRequest.onerror = function putRequest_onerror() {
					fail++;
					if (ok + fail == total) finish()
				}
			});
			transaction.onerror = onerror
		};
		openRequest.onerror = onerror
	},
	loadFilesFromDB: function(paths, onload, onerror) {
		onload = onload || function() {};
		onerror = onerror || function() {};
		var indexedDB = FS.indexedDB();
		try {
			var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
		} catch (e) {
			return onerror(e)
		}
		openRequest.onupgradeneeded = onerror;
		openRequest.onsuccess = function openRequest_onsuccess() {
			var db = openRequest.result;
			try {
				var transaction = db.transaction([FS.DB_STORE_NAME], "readonly")
			} catch (e) {
				onerror(e);
				return
			}
			var files = transaction.objectStore(FS.DB_STORE_NAME);
			var ok = 0,
				fail = 0,
				total = paths.length;

			function finish() {
				if (fail == 0) onload();
				else onerror()
			}
			paths.forEach(function(path) {
				var getRequest = files.get(path);
				getRequest.onsuccess = function getRequest_onsuccess() {
					if (FS.analyzePath(path).exists) {
						FS.unlink(path)
					}
					FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
					ok++;
					if (ok + fail == total) finish()
				};
				getRequest.onerror = function getRequest_onerror() {
					fail++;
					if (ok + fail == total) finish()
				}
			});
			transaction.onerror = onerror
		};
		openRequest.onerror = onerror
	},
	mmapAlloc: function(size) {
		var alignedSize = alignMemory(size, 16384);
		var ptr = _malloc(alignedSize);
		while (size < alignedSize) HEAP8[ptr + size++] = 0;
		return ptr
	}
};

function _emscripten_set_main_loop_timing(mode, value) {
	Browser.mainLoop.timingMode = mode;
	Browser.mainLoop.timingValue = value;
	if (!Browser.mainLoop.func) {
		return 1
	}
	if (mode == 0) {
		Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
			var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
			setTimeout(Browser.mainLoop.runner, timeUntilNextTick)
		};
		Browser.mainLoop.method = "timeout"
	} else if (mode == 1) {
		Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
			Browser.requestAnimationFrame(Browser.mainLoop.runner)
		};
		Browser.mainLoop.method = "rAF"
	} else if (mode == 2) {
		if (typeof setImmediate === "undefined") {
			var setImmediates = [];
			var emscriptenMainLoopMessageId = "setimmediate";
			var Browser_setImmediate_messageHandler = function(event) {
				if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
					event.stopPropagation();
					setImmediates.shift()()
				}
			};
			addEventListener("message", Browser_setImmediate_messageHandler, true);
			setImmediate = function Browser_emulated_setImmediate(func) {
				setImmediates.push(func);
				if (ENVIRONMENT_IS_WORKER) {
					if (Module["setImmediates"] === undefined) Module["setImmediates"] = [];
					Module["setImmediates"].push(func);
					postMessage({
						target: emscriptenMainLoopMessageId
					})
				} else postMessage(emscriptenMainLoopMessageId, "*")
			}
		}
		Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
			setImmediate(Browser.mainLoop.runner)
		};
		Browser.mainLoop.method = "immediate"
	}
	return 0
}
var _emscripten_get_now;
if (ENVIRONMENT_IS_NODE) {
	_emscripten_get_now = function() {
		var t = process["hrtime"]();
		return t[0] * 1e3 + t[1] / 1e6
	}
} else if (typeof dateNow !== "undefined") {
	_emscripten_get_now = dateNow
} else _emscripten_get_now = function() {
	return performance.now()
};

function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop, arg, noSetTiming) {
	noExitRuntime = true;
	assert(!Browser.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
	Browser.mainLoop.func = func;
	Browser.mainLoop.arg = arg;
	var browserIterationFunc;
	if (typeof arg !== "undefined") {
		browserIterationFunc = function() {
			Module["dynCall_vi"](func, arg)
		}
	} else {
		browserIterationFunc = function() {
			Module["dynCall_v"](func)
		}
	}
	var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
	Browser.mainLoop.runner = function Browser_mainLoop_runner() {
		if (ABORT) return;
		if (Browser.mainLoop.queue.length > 0) {
			var start = Date.now();
			var blocker = Browser.mainLoop.queue.shift();
			blocker.func(blocker.arg);
			if (Browser.mainLoop.remainingBlockers) {
				var remaining = Browser.mainLoop.remainingBlockers;
				var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
				if (blocker.counted) {
					Browser.mainLoop.remainingBlockers = next
				} else {
					next = next + .5;
					Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9
				}
			}
			console.log('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + " ms");
			Browser.mainLoop.updateStatus();
			if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
			setTimeout(Browser.mainLoop.runner, 0);
			return
		}
		if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
		Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
		if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
			Browser.mainLoop.scheduler();
			return
		} else if (Browser.mainLoop.timingMode == 0) {
			Browser.mainLoop.tickStartTime = _emscripten_get_now()
		}
		Browser.mainLoop.runIter(browserIterationFunc);
		if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
		if (typeof SDL === "object" && SDL.audio && SDL.audio.queueNewAudioData) SDL.audio.queueNewAudioData();
		Browser.mainLoop.scheduler()
	};
	if (!noSetTiming) {
		if (fps && fps > 0) _emscripten_set_main_loop_timing(0, 1e3 / fps);
		else _emscripten_set_main_loop_timing(1, 1);
		Browser.mainLoop.scheduler()
	}
	if (simulateInfiniteLoop) {
		throw "unwind"
	}
}
var Browser = {
	mainLoop: {
		scheduler: null,
		method: "",
		currentlyRunningMainloop: 0,
		func: null,
		arg: 0,
		timingMode: 0,
		timingValue: 0,
		currentFrameNumber: 0,
		queue: [],
		pause: function() {
			Browser.mainLoop.scheduler = null;
			Browser.mainLoop.currentlyRunningMainloop++
		},
		resume: function() {
			Browser.mainLoop.currentlyRunningMainloop++;
			var timingMode = Browser.mainLoop.timingMode;
			var timingValue = Browser.mainLoop.timingValue;
			var func = Browser.mainLoop.func;
			Browser.mainLoop.func = null;
			_emscripten_set_main_loop(func, 0, false, Browser.mainLoop.arg, true);
			_emscripten_set_main_loop_timing(timingMode, timingValue);
			Browser.mainLoop.scheduler()
		},
		updateStatus: function() {
			if (Module["setStatus"]) {
				var message = Module["statusMessage"] || "Please wait...";
				var remaining = Browser.mainLoop.remainingBlockers;
				var expected = Browser.mainLoop.expectedBlockers;
				if (remaining) {
					if (remaining < expected) {
						Module["setStatus"](message + " (" + (expected - remaining) + "/" + expected + ")")
					} else {
						Module["setStatus"](message)
					}
				} else {
					Module["setStatus"]("")
				}
			}
		},
		runIter: function(func) {
			if (ABORT) return;
			if (Module["preMainLoop"]) {
				var preRet = Module["preMainLoop"]();
				if (preRet === false) {
					return
				}
			}
			try {
				func()
			} catch (e) {
				if (e instanceof ExitStatus) {
					return
				} else {
					if (e && typeof e === "object" && e.stack) err("exception thrown: " + [e, e.stack]);
					throw e
				}
			}
			if (Module["postMainLoop"]) Module["postMainLoop"]()
		}
	},
	isFullscreen: false,
	pointerLock: false,
	moduleContextCreatedCallbacks: [],
	workers: [],
	init: function() {
		if (!Module["preloadPlugins"]) Module["preloadPlugins"] = [];
		if (Browser.initted) return;
		Browser.initted = true;
		try {
			new Blob;
			Browser.hasBlobConstructor = true
		} catch (e) {
			Browser.hasBlobConstructor = false;
			console.log("warning: no blob constructor, cannot create blobs with mimetypes")
		}
		Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : !Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null;
		Browser.URLObject = typeof window != "undefined" ? window.URL ? window.URL : window.webkitURL : undefined;
		if (!Module.noImageDecoding && typeof Browser.URLObject === "undefined") {
			console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
			Module.noImageDecoding = true
		}
		var imagePlugin = {};
		imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
			return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name)
		};
		imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
			var b = null;
			if (Browser.hasBlobConstructor) {
				try {
					b = new Blob([byteArray], {
						type: Browser.getMimetype(name)
					});
					if (b.size !== byteArray.length) {
						b = new Blob([new Uint8Array(byteArray).buffer], {
							type: Browser.getMimetype(name)
						})
					}
				} catch (e) {
					warnOnce("Blob constructor present but fails: " + e + "; falling back to blob builder")
				}
			}
			if (!b) {
				var bb = new Browser.BlobBuilder;
				bb.append(new Uint8Array(byteArray).buffer);
				b = bb.getBlob()
			}
			var url = Browser.URLObject.createObjectURL(b);
			var img = new Image;
			img.onload = function img_onload() {
				assert(img.complete, "Image " + name + " could not be decoded");
				var canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0);
				Module["preloadedImages"][name] = canvas;
				Browser.URLObject.revokeObjectURL(url);
				if (onload) onload(byteArray)
			};
			img.onerror = function img_onerror(event) {
				console.log("Image " + url + " could not be decoded");
				if (onerror) onerror()
			};
			img.src = url
		};
		Module["preloadPlugins"].push(imagePlugin);
		var audioPlugin = {};
		audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
			return !Module.noAudioDecoding && name.substr(-4) in {
				".ogg": 1,
				".wav": 1,
				".mp3": 1
			}
		};
		audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
			var done = false;

			function finish(audio) {
				if (done) return;
				done = true;
				Module["preloadedAudios"][name] = audio;
				if (onload) onload(byteArray)
			}

			function fail() {
				if (done) return;
				done = true;
				Module["preloadedAudios"][name] = new Audio;
				if (onerror) onerror()
			}
			if (Browser.hasBlobConstructor) {
				try {
					var b = new Blob([byteArray], {
						type: Browser.getMimetype(name)
					})
				} catch (e) {
					return fail()
				}
				var url = Browser.URLObject.createObjectURL(b);
				var audio = new Audio;
				audio.addEventListener("canplaythrough", function() {
					finish(audio)
				}, false);
				audio.onerror = function audio_onerror(event) {
					if (done) return;
					console.log("warning: browser could not fully decode audio " + name + ", trying slower base64 approach");

					function encode64(data) {
						var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
						var PAD = "=";
						var ret = "";
						var leftchar = 0;
						var leftbits = 0;
						for (var i = 0; i < data.length; i++) {
							leftchar = leftchar << 8 | data[i];
							leftbits += 8;
							while (leftbits >= 6) {
								var curr = leftchar >> leftbits - 6 & 63;
								leftbits -= 6;
								ret += BASE[curr]
							}
						}
						if (leftbits == 2) {
							ret += BASE[(leftchar & 3) << 4];
							ret += PAD + PAD
						} else if (leftbits == 4) {
							ret += BASE[(leftchar & 15) << 2];
							ret += PAD
						}
						return ret
					}
					audio.src = "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray);
					finish(audio)
				};
				audio.src = url;
				Browser.safeSetTimeout(function() {
					finish(audio)
				}, 1e4)
			} else {
				return fail()
			}
		};
		Module["preloadPlugins"].push(audioPlugin);

		function pointerLockChange() {
			Browser.pointerLock = document["pointerLockElement"] === Module["canvas"] || document["mozPointerLockElement"] === Module["canvas"] || document["webkitPointerLockElement"] === Module["canvas"] || document["msPointerLockElement"] === Module["canvas"]
		}
		var canvas = Module["canvas"];
		if (canvas) {
			canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || function() {};
			canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || function() {};
			canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
			document.addEventListener("pointerlockchange", pointerLockChange, false);
			document.addEventListener("mozpointerlockchange", pointerLockChange, false);
			document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
			document.addEventListener("mspointerlockchange", pointerLockChange, false);
			if (Module["elementPointerLock"]) {
				canvas.addEventListener("click", function(ev) {
					if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
						Module["canvas"].requestPointerLock();
						ev.preventDefault()
					}
				}, false)
			}
		}
	},
	createContext: function(canvas, useWebGL, setInModule, webGLContextAttributes) {
		if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx;
		var ctx;
		var contextHandle;
		if (useWebGL) {
			var contextAttributes = {
				antialias: false,
				alpha: false,
				majorVersion: 1
			};
			if (webGLContextAttributes) {
				for (var attribute in webGLContextAttributes) {
					contextAttributes[attribute] = webGLContextAttributes[attribute]
				}
			}
			if (typeof GL !== "undefined") {
				contextHandle = GL.createContext(canvas, contextAttributes);
				if (contextHandle) {
					ctx = GL.getContext(contextHandle).GLctx
				}
			}
		} else {
			ctx = canvas.getContext("2d")
		}
		if (!ctx) return null;
		if (setInModule) {
			if (!useWebGL) assert(typeof GLctx === "undefined", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it");
			Module.ctx = ctx;
			if (useWebGL) GL.makeContextCurrent(contextHandle);
			Module.useWebGL = useWebGL;
			Browser.moduleContextCreatedCallbacks.forEach(function(callback) {
				callback()
			});
			Browser.init()
		}
		return ctx
	},
	destroyContext: function(canvas, useWebGL, setInModule) {},
	fullscreenHandlersInstalled: false,
	lockPointer: undefined,
	resizeCanvas: undefined,
	requestFullscreen: function(lockPointer, resizeCanvas) {
		Browser.lockPointer = lockPointer;
		Browser.resizeCanvas = resizeCanvas;
		if (typeof Browser.lockPointer === "undefined") Browser.lockPointer = true;
		if (typeof Browser.resizeCanvas === "undefined") Browser.resizeCanvas = false;
		var canvas = Module["canvas"];

		function fullscreenChange() {
			Browser.isFullscreen = false;
			var canvasContainer = canvas.parentNode;
			if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer) {
				canvas.exitFullscreen = Browser.exitFullscreen;
				if (Browser.lockPointer) canvas.requestPointerLock();
				Browser.isFullscreen = true;
				if (Browser.resizeCanvas) {
					Browser.setFullscreenCanvasSize()
				} else {
					Browser.updateCanvasDimensions(canvas)
				}
			} else {
				canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
				canvasContainer.parentNode.removeChild(canvasContainer);
				if (Browser.resizeCanvas) {
					Browser.setWindowedCanvasSize()
				} else {
					Browser.updateCanvasDimensions(canvas)
				}
			}
			if (Module["onFullScreen"]) Module["onFullScreen"](Browser.isFullscreen);
			if (Module["onFullscreen"]) Module["onFullscreen"](Browser.isFullscreen)
		}
		if (!Browser.fullscreenHandlersInstalled) {
			Browser.fullscreenHandlersInstalled = true;
			document.addEventListener("fullscreenchange", fullscreenChange, false);
			document.addEventListener("mozfullscreenchange", fullscreenChange, false);
			document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
			document.addEventListener("MSFullscreenChange", fullscreenChange, false)
		}
		var canvasContainer = document.createElement("div");
		canvas.parentNode.insertBefore(canvasContainer, canvas);
		canvasContainer.appendChild(canvas);
		canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? function() {
			canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"])
		} : null) || (canvasContainer["webkitRequestFullScreen"] ? function() {
			canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"])
		} : null);
		canvasContainer.requestFullscreen()
	},
	exitFullscreen: function() {
		if (!Browser.isFullscreen) {
			return false
		}
		var CFS = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || function() {};
		CFS.apply(document, []);
		return true
	},
	nextRAF: 0,
	fakeRequestAnimationFrame: function(func) {
		var now = Date.now();
		if (Browser.nextRAF === 0) {
			Browser.nextRAF = now + 1e3 / 60
		} else {
			while (now + 2 >= Browser.nextRAF) {
				Browser.nextRAF += 1e3 / 60
			}
		}
		var delay = Math.max(Browser.nextRAF - now, 0);
		setTimeout(func, delay)
	},
	requestAnimationFrame: function(func) {
		if (typeof requestAnimationFrame === "function") {
			requestAnimationFrame(func);
			return
		}
		var RAF = Browser.fakeRequestAnimationFrame;
		RAF(func)
	},
	safeCallback: function(func) {
		return function() {
			if (!ABORT) return func.apply(null, arguments)
		}
	},
	allowAsyncCallbacks: true,
	queuedAsyncCallbacks: [],
	pauseAsyncCallbacks: function() {
		Browser.allowAsyncCallbacks = false
	},
	resumeAsyncCallbacks: function() {
		Browser.allowAsyncCallbacks = true;
		if (Browser.queuedAsyncCallbacks.length > 0) {
			var callbacks = Browser.queuedAsyncCallbacks;
			Browser.queuedAsyncCallbacks = [];
			callbacks.forEach(function(func) {
				func()
			})
		}
	},
	safeRequestAnimationFrame: function(func) {
		return Browser.requestAnimationFrame(function() {
			if (ABORT) return;
			if (Browser.allowAsyncCallbacks) {
				func()
			} else {
				Browser.queuedAsyncCallbacks.push(func)
			}
		})
	},
	safeSetTimeout: function(func, timeout) {
		noExitRuntime = true;
		return setTimeout(function() {
			if (ABORT) return;
			if (Browser.allowAsyncCallbacks) {
				func()
			} else {
				Browser.queuedAsyncCallbacks.push(func)
			}
		}, timeout)
	},
	safeSetInterval: function(func, timeout) {
		noExitRuntime = true;
		return setInterval(function() {
			if (ABORT) return;
			if (Browser.allowAsyncCallbacks) {
				func()
			}
		}, timeout)
	},
	getMimetype: function(name) {
		return {
			"jpg": "image/jpeg",
			"jpeg": "image/jpeg",
			"png": "image/png",
			"bmp": "image/bmp",
			"ogg": "audio/ogg",
			"wav": "audio/wav",
			"mp3": "audio/mpeg"
		} [name.substr(name.lastIndexOf(".") + 1)]
	},
	getUserMedia: function(func) {
		if (!window.getUserMedia) {
			window.getUserMedia = navigator["getUserMedia"] || navigator["mozGetUserMedia"]
		}
		window.getUserMedia(func)
	},
	getMovementX: function(event) {
		return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0
	},
	getMovementY: function(event) {
		return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0
	},
	getMouseWheelDelta: function(event) {
		var delta = 0;
		switch (event.type) {
			case "DOMMouseScroll":
				delta = event.detail / 3;
				break;
			case "mousewheel":
				delta = event.wheelDelta / 120;
				break;
			case "wheel":
				delta = event.deltaY;
				switch (event.deltaMode) {
					case 0:
						delta /= 100;
						break;
					case 1:
						delta /= 3;
						break;
					case 2:
						delta *= 80;
						break;
					default:
						throw "unrecognized mouse wheel delta mode: " + event.deltaMode
				}
				break;
			default:
				throw "unrecognized mouse wheel event: " + event.type
		}
		return delta
	},
	mouseX: 0,
	mouseY: 0,
	mouseMovementX: 0,
	mouseMovementY: 0,
	touches: {},
	lastTouches: {},
	calculateMouseEvent: function(event) {
		if (Browser.pointerLock) {
			if (event.type != "mousemove" && "mozMovementX" in event) {
				Browser.mouseMovementX = Browser.mouseMovementY = 0
			} else {
				Browser.mouseMovementX = Browser.getMovementX(event);
				Browser.mouseMovementY = Browser.getMovementY(event)
			}
			if (typeof SDL != "undefined") {
				Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
				Browser.mouseY = SDL.mouseY + Browser.mouseMovementY
			} else {
				Browser.mouseX += Browser.mouseMovementX;
				Browser.mouseY += Browser.mouseMovementY
			}
		} else {
			var rect = Module["canvas"].getBoundingClientRect();
			var cw = Module["canvas"].width;
			var ch = Module["canvas"].height;
			var scrollX = typeof window.scrollX !== "undefined" ? window.scrollX : window.pageXOffset;
			var scrollY = typeof window.scrollY !== "undefined" ? window.scrollY : window.pageYOffset;
			if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
				var touch = event.touch;
				if (touch === undefined) {
					return
				}
				var adjustedX = touch.pageX - (scrollX + rect.left);
				var adjustedY = touch.pageY - (scrollY + rect.top);
				adjustedX = adjustedX * (cw / rect.width);
				adjustedY = adjustedY * (ch / rect.height);
				var coords = {
					x: adjustedX,
					y: adjustedY
				};
				if (event.type === "touchstart") {
					Browser.lastTouches[touch.identifier] = coords;
					Browser.touches[touch.identifier] = coords
				} else if (event.type === "touchend" || event.type === "touchmove") {
					var last = Browser.touches[touch.identifier];
					if (!last) last = coords;
					Browser.lastTouches[touch.identifier] = last;
					Browser.touches[touch.identifier] = coords
				}
				return
			}
			var x = event.pageX - (scrollX + rect.left);
			var y = event.pageY - (scrollY + rect.top);
			x = x * (cw / rect.width);
			y = y * (ch / rect.height);
			Browser.mouseMovementX = x - Browser.mouseX;
			Browser.mouseMovementY = y - Browser.mouseY;
			Browser.mouseX = x;
			Browser.mouseY = y
		}
	},
	asyncLoad: function(url, onload, onerror, noRunDep) {
		var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
		readAsync(url, function(arrayBuffer) {
			assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
			onload(new Uint8Array(arrayBuffer));
			if (dep) removeRunDependency(dep)
		}, function(event) {
			if (onerror) {
				onerror()
			} else {
				throw 'Loading data file "' + url + '" failed.'
			}
		});
		if (dep) addRunDependency(dep)
	},
	resizeListeners: [],
	updateResizeListeners: function() {
		var canvas = Module["canvas"];
		Browser.resizeListeners.forEach(function(listener) {
			listener(canvas.width, canvas.height)
		})
	},
	setCanvasSize: function(width, height, noUpdates) {
		var canvas = Module["canvas"];
		Browser.updateCanvasDimensions(canvas, width, height);
		if (!noUpdates) Browser.updateResizeListeners()
	},
	windowedWidth: 0,
	windowedHeight: 0,
	setFullscreenCanvasSize: function() {
		if (typeof SDL != "undefined") {
			var flags = HEAPU32[SDL.screen >> 2];
			flags = flags | 8388608;
			HEAP32[SDL.screen >> 2] = flags
		}
		Browser.updateCanvasDimensions(Module["canvas"]);
		Browser.updateResizeListeners()
	},
	setWindowedCanvasSize: function() {
		if (typeof SDL != "undefined") {
			var flags = HEAPU32[SDL.screen >> 2];
			flags = flags & ~8388608;
			HEAP32[SDL.screen >> 2] = flags
		}
		Browser.updateCanvasDimensions(Module["canvas"]);
		Browser.updateResizeListeners()
	},
	updateCanvasDimensions: function(canvas, wNative, hNative) {
		if (wNative && hNative) {
			canvas.widthNative = wNative;
			canvas.heightNative = hNative
		} else {
			wNative = canvas.widthNative;
			hNative = canvas.heightNative
		}
		var w = wNative;
		var h = hNative;
		if (Module["forcedAspectRatio"] && Module["forcedAspectRatio"] > 0) {
			if (w / h < Module["forcedAspectRatio"]) {
				w = Math.round(h * Module["forcedAspectRatio"])
			} else {
				h = Math.round(w / Module["forcedAspectRatio"])
			}
		}
		if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode && typeof screen != "undefined") {
			var factor = Math.min(screen.width / w, screen.height / h);
			w = Math.round(w * factor);
			h = Math.round(h * factor)
		}
		if (Browser.resizeCanvas) {
			if (canvas.width != w) canvas.width = w;
			if (canvas.height != h) canvas.height = h;
			if (typeof canvas.style != "undefined") {
				canvas.style.removeProperty("width");
				canvas.style.removeProperty("height")
			}
		} else {
			if (canvas.width != wNative) canvas.width = wNative;
			if (canvas.height != hNative) canvas.height = hNative;
			if (typeof canvas.style != "undefined") {
				if (w != wNative || h != hNative) {
					canvas.style.setProperty("width", w + "px", "important");
					canvas.style.setProperty("height", h + "px", "important")
				} else {
					canvas.style.removeProperty("width");
					canvas.style.removeProperty("height")
				}
			}
		}
	},
	wgetRequests: {},
	nextWgetRequestHandle: 0,
	getNextWgetRequestHandle: function() {
		var handle = Browser.nextWgetRequestHandle;
		Browser.nextWgetRequestHandle++;
		return handle
	}
};

function _SDL_GetTicks() {
	return Date.now() - SDL.startTime | 0
}

function _SDL_LockSurface(surf) {
	var surfData = SDL.surfaces[surf];
	surfData.locked++;
	if (surfData.locked > 1) return 0;
	if (!surfData.buffer) {
		surfData.buffer = _malloc(surfData.width * surfData.height * 4);
		HEAP32[surf + 20 >> 2] = surfData.buffer
	}
	HEAP32[surf + 20 >> 2] = surfData.buffer;
	if (surf == SDL.screen && Module.screenIsReadOnly && surfData.image) return 0;
	if (SDL.defaults.discardOnLock) {
		if (!surfData.image) {
			surfData.image = surfData.ctx.createImageData(surfData.width, surfData.height)
		}
		if (!SDL.defaults.opaqueFrontBuffer) return
	} else {
		surfData.image = surfData.ctx.getImageData(0, 0, surfData.width, surfData.height)
	}
	if (surf == SDL.screen && SDL.defaults.opaqueFrontBuffer) {
		var data = surfData.image.data;
		var num = data.length;
		for (var i = 0; i < num / 4; i++) {
			data[i * 4 + 3] = 255
		}
	}
	if (SDL.defaults.copyOnLock && !SDL.defaults.discardOnLock) {
		if (surfData.isFlagSet(2097152)) {
			throw "CopyOnLock is not supported for SDL_LockSurface with SDL_HWPALETTE flag set" + (new Error).stack
		} else {
			HEAPU8.set(surfData.image.data, surfData.buffer)
		}
	}
	return 0
}

function SDL_unicode() {
	return SDL.unicode
}

function SDL_ttfContext() {
	return SDL.ttfContext
}

function SDL_audio() {
	return SDL.audio
}
var SDL = {
	defaults: {
		width: 320,
		height: 200,
		copyOnLock: true,
		discardOnLock: false,
		opaqueFrontBuffer: true
	},
	version: null,
	surfaces: {},
	canvasPool: [],
	events: [],
	fonts: [null],
	audios: [null],
	rwops: [null],
	music: {
		audio: null,
		volume: 1
	},
	mixerFrequency: 22050,
	mixerFormat: 32784,
	mixerNumChannels: 2,
	mixerChunkSize: 1024,
	channelMinimumNumber: 0,
	GL: false,
	glAttributes: {
		0: 3,
		1: 3,
		2: 2,
		3: 0,
		4: 0,
		5: 1,
		6: 16,
		7: 0,
		8: 0,
		9: 0,
		10: 0,
		11: 0,
		12: 0,
		13: 0,
		14: 0,
		15: 1,
		16: 0,
		17: 0,
		18: 0
	},
	keyboardState: null,
	keyboardMap: {},
	canRequestFullscreen: false,
	isRequestingFullscreen: false,
	textInput: false,
	startTime: null,
	initFlags: 0,
	buttonState: 0,
	modState: 0,
	DOMButtons: [0, 0, 0],
	DOMEventToSDLEvent: {},
	TOUCH_DEFAULT_ID: 0,
	eventHandler: null,
	eventHandlerContext: null,
	eventHandlerTemp: 0,
	keyCodes: {
		16: 1249,
		17: 1248,
		18: 1250,
		20: 1081,
		33: 1099,
		34: 1102,
		35: 1101,
		36: 1098,
		37: 1104,
		38: 1106,
		39: 1103,
		40: 1105,
		44: 316,
		45: 1097,
		46: 127,
		91: 1251,
		93: 1125,
		96: 1122,
		97: 1113,
		98: 1114,
		99: 1115,
		100: 1116,
		101: 1117,
		102: 1118,
		103: 1119,
		104: 1120,
		105: 1121,
		106: 1109,
		107: 1111,
		109: 1110,
		110: 1123,
		111: 1108,
		112: 1082,
		113: 1083,
		114: 1084,
		115: 1085,
		116: 1086,
		117: 1087,
		118: 1088,
		119: 1089,
		120: 1090,
		121: 1091,
		122: 1092,
		123: 1093,
		124: 1128,
		125: 1129,
		126: 1130,
		127: 1131,
		128: 1132,
		129: 1133,
		130: 1134,
		131: 1135,
		132: 1136,
		133: 1137,
		134: 1138,
		135: 1139,
		144: 1107,
		160: 94,
		161: 33,
		162: 34,
		163: 35,
		164: 36,
		165: 37,
		166: 38,
		167: 95,
		168: 40,
		169: 41,
		170: 42,
		171: 43,
		172: 124,
		173: 45,
		174: 123,
		175: 125,
		176: 126,
		181: 127,
		182: 129,
		183: 128,
		188: 44,
		190: 46,
		191: 47,
		192: 96,
		219: 91,
		220: 92,
		221: 93,
		222: 39,
		224: 1251
	},
	scanCodes: {
		8: 42,
		9: 43,
		13: 40,
		27: 41,
		32: 44,
		35: 204,
		39: 53,
		44: 54,
		46: 55,
		47: 56,
		48: 39,
		49: 30,
		50: 31,
		51: 32,
		52: 33,
		53: 34,
		54: 35,
		55: 36,
		56: 37,
		57: 38,
		58: 203,
		59: 51,
		61: 46,
		91: 47,
		92: 49,
		93: 48,
		96: 52,
		97: 4,
		98: 5,
		99: 6,
		100: 7,
		101: 8,
		102: 9,
		103: 10,
		104: 11,
		105: 12,
		106: 13,
		107: 14,
		108: 15,
		109: 16,
		110: 17,
		111: 18,
		112: 19,
		113: 20,
		114: 21,
		115: 22,
		116: 23,
		117: 24,
		118: 25,
		119: 26,
		120: 27,
		121: 28,
		122: 29,
		127: 76,
		305: 224,
		308: 226,
		316: 70
	},
	loadRect: function(rect) {
		return {
			x: HEAP32[rect + 0 >> 2],
			y: HEAP32[rect + 4 >> 2],
			w: HEAP32[rect + 8 >> 2],
			h: HEAP32[rect + 12 >> 2]
		}
	},
	updateRect: function(rect, r) {
		HEAP32[rect >> 2] = r.x;
		HEAP32[rect + 4 >> 2] = r.y;
		HEAP32[rect + 8 >> 2] = r.w;
		HEAP32[rect + 12 >> 2] = r.h
	},
	intersectionOfRects: function(first, second) {
		var leftX = Math.max(first.x, second.x);
		var leftY = Math.max(first.y, second.y);
		var rightX = Math.min(first.x + first.w, second.x + second.w);
		var rightY = Math.min(first.y + first.h, second.y + second.h);
		return {
			x: leftX,
			y: leftY,
			w: Math.max(leftX, rightX) - leftX,
			h: Math.max(leftY, rightY) - leftY
		}
	},
	checkPixelFormat: function(fmt) {},
	loadColorToCSSRGB: function(color) {
		var rgba = HEAP32[color >> 2];
		return "rgb(" + (rgba & 255) + "," + (rgba >> 8 & 255) + "," + (rgba >> 16 & 255) + ")"
	},
	loadColorToCSSRGBA: function(color) {
		var rgba = HEAP32[color >> 2];
		return "rgba(" + (rgba & 255) + "," + (rgba >> 8 & 255) + "," + (rgba >> 16 & 255) + "," + (rgba >> 24 & 255) / 255 + ")"
	},
	translateColorToCSSRGBA: function(rgba) {
		return "rgba(" + (rgba & 255) + "," + (rgba >> 8 & 255) + "," + (rgba >> 16 & 255) + "," + (rgba >>> 24) / 255 + ")"
	},
	translateRGBAToCSSRGBA: function(r, g, b, a) {
		return "rgba(" + (r & 255) + "," + (g & 255) + "," + (b & 255) + "," + (a & 255) / 255 + ")"
	},
	translateRGBAToColor: function(r, g, b, a) {
		return r | g << 8 | b << 16 | a << 24
	},
	makeSurface: function(width, height, flags, usePageCanvas, source, rmask, gmask, bmask, amask) {
		flags = flags || 0;
		var is_SDL_HWSURFACE = flags & 1;
		var is_SDL_HWPALETTE = flags & 2097152;
		var is_SDL_OPENGL = flags & 67108864;
		var surf = _malloc(60);
		var pixelFormat = _malloc(44);
		var bpp = is_SDL_HWPALETTE ? 1 : 4;
		var buffer = 0;
		if (!is_SDL_HWSURFACE && !is_SDL_OPENGL) {
			buffer = _malloc(width * height * 4)
		}
		HEAP32[surf >> 2] = flags;
		HEAP32[surf + 4 >> 2] = pixelFormat;
		HEAP32[surf + 8 >> 2] = width;
		HEAP32[surf + 12 >> 2] = height;
		HEAP32[surf + 16 >> 2] = width * bpp;
		HEAP32[surf + 20 >> 2] = buffer;
		HEAP32[surf + 36 >> 2] = 0;
		HEAP32[surf + 40 >> 2] = 0;
		HEAP32[surf + 44 >> 2] = Module["canvas"].width;
		HEAP32[surf + 48 >> 2] = Module["canvas"].height;
		HEAP32[surf + 56 >> 2] = 1;
		HEAP32[pixelFormat >> 2] = -2042224636;
		HEAP32[pixelFormat + 4 >> 2] = 0;
		HEAP8[pixelFormat + 8 >> 0] = bpp * 8;
		HEAP8[pixelFormat + 9 >> 0] = bpp;
		HEAP32[pixelFormat + 12 >> 2] = rmask || 255;
		HEAP32[pixelFormat + 16 >> 2] = gmask || 65280;
		HEAP32[pixelFormat + 20 >> 2] = bmask || 16711680;
		HEAP32[pixelFormat + 24 >> 2] = amask || 4278190080;
		SDL.GL = SDL.GL || is_SDL_OPENGL;
		var canvas;
		if (!usePageCanvas) {
			if (SDL.canvasPool.length > 0) {
				canvas = SDL.canvasPool.pop()
			} else {
				canvas = document.createElement("canvas")
			}
			canvas.width = width;
			canvas.height = height
		} else {
			canvas = Module["canvas"]
		}
		var webGLContextAttributes = {
			antialias: SDL.glAttributes[13] != 0 && SDL.glAttributes[14] > 1,
			depth: SDL.glAttributes[6] > 0,
			stencil: SDL.glAttributes[7] > 0,
			alpha: SDL.glAttributes[3] > 0
		};
		var ctx = Browser.createContext(canvas, is_SDL_OPENGL, usePageCanvas, webGLContextAttributes);
		SDL.surfaces[surf] = {
			width: width,
			height: height,
			canvas: canvas,
			ctx: ctx,
			surf: surf,
			buffer: buffer,
			pixelFormat: pixelFormat,
			alpha: 255,
			flags: flags,
			locked: 0,
			usePageCanvas: usePageCanvas,
			source: source,
			isFlagSet: function(flag) {
				return flags & flag
			}
		};
		return surf
	},
	copyIndexedColorData: function(surfData, rX, rY, rW, rH) {
		if (!surfData.colors) {
			return
		}
		var fullWidth = Module["canvas"].width;
		var fullHeight = Module["canvas"].height;
		var startX = rX || 0;
		var startY = rY || 0;
		var endX = (rW || fullWidth - startX) + startX;
		var endY = (rH || fullHeight - startY) + startY;
		var buffer = surfData.buffer;
		if (!surfData.image.data32) {
			surfData.image.data32 = new Uint32Array(surfData.image.data.buffer)
		}
		var data32 = surfData.image.data32;
		var colors32 = surfData.colors32;
		for (var y = startY; y < endY; ++y) {
			var base = y * fullWidth;
			for (var x = startX; x < endX; ++x) {
				data32[base + x] = colors32[HEAPU8[buffer + base + x >> 0]]
			}
		}
	},
	freeSurface: function(surf) {
		var refcountPointer = surf + 56;
		var refcount = HEAP32[refcountPointer >> 2];
		if (refcount > 1) {
			HEAP32[refcountPointer >> 2] = refcount - 1;
			return
		}
		var info = SDL.surfaces[surf];
		if (!info.usePageCanvas && info.canvas) SDL.canvasPool.push(info.canvas);
		if (info.buffer) _free(info.buffer);
		_free(info.pixelFormat);
		_free(surf);
		SDL.surfaces[surf] = null;
		if (surf === SDL.screen) {
			SDL.screen = null
		}
	},
	blitSurface: function(src, srcrect, dst, dstrect, scale) {
		var srcData = SDL.surfaces[src];
		var dstData = SDL.surfaces[dst];
		var sr, dr;
		if (srcrect) {
			sr = SDL.loadRect(srcrect)
		} else {
			sr = {
				x: 0,
				y: 0,
				w: srcData.width,
				h: srcData.height
			}
		}
		if (dstrect) {
			dr = SDL.loadRect(dstrect)
		} else {
			dr = {
				x: 0,
				y: 0,
				w: srcData.width,
				h: srcData.height
			}
		}
		if (dstData.clipRect) {
			var widthScale = !scale || sr.w === 0 ? 1 : sr.w / dr.w;
			var heightScale = !scale || sr.h === 0 ? 1 : sr.h / dr.h;
			dr = SDL.intersectionOfRects(dstData.clipRect, dr);
			sr.w = dr.w * widthScale;
			sr.h = dr.h * heightScale;
			if (dstrect) {
				SDL.updateRect(dstrect, dr)
			}
		}
		var blitw, blith;
		if (scale) {
			blitw = dr.w;
			blith = dr.h
		} else {
			blitw = sr.w;
			blith = sr.h
		}
		if (sr.w === 0 || sr.h === 0 || blitw === 0 || blith === 0) {
			return 0
		}
		var oldAlpha = dstData.ctx.globalAlpha;
		dstData.ctx.globalAlpha = srcData.alpha / 255;
		dstData.ctx.drawImage(srcData.canvas, sr.x, sr.y, sr.w, sr.h, dr.x, dr.y, blitw, blith);
		dstData.ctx.globalAlpha = oldAlpha;
		if (dst != SDL.screen) {
			warnOnce("WARNING: copying canvas data to memory for compatibility");
			_SDL_LockSurface(dst);
			dstData.locked--
		}
		return 0
	},
	downFingers: {},
	savedKeydown: null,
	receiveEvent: function(event) {
		function unpressAllPressedKeys() {
			for (var code in SDL.keyboardMap) {
				SDL.events.push({
					type: "keyup",
					keyCode: SDL.keyboardMap[code]
				})
			}
		}
		switch (event.type) {
			case "touchstart":
			case "touchmove": {
				event.preventDefault();
				var touches = [];
				if (event.type === "touchstart") {
					for (var i = 0; i < event.touches.length; i++) {
						var touch = event.touches[i];
						if (SDL.downFingers[touch.identifier] != true) {
							SDL.downFingers[touch.identifier] = true;
							touches.push(touch)
						}
					}
				} else {
					touches = event.touches
				}
				var firstTouch = touches[0];
				if (firstTouch) {
					if (event.type == "touchstart") {
						SDL.DOMButtons[0] = 1
					}
					var mouseEventType;
					switch (event.type) {
						case "touchstart":
							mouseEventType = "mousedown";
							break;
						case "touchmove":
							mouseEventType = "mousemove";
							break
					}
					var mouseEvent = {
						type: mouseEventType,
						button: 0,
						pageX: firstTouch.clientX,
						pageY: firstTouch.clientY
					};
					SDL.events.push(mouseEvent)
				}
				for (var i = 0; i < touches.length; i++) {
					var touch = touches[i];
					SDL.events.push({
						type: event.type,
						touch: touch
					})
				}
				break
			}
			case "touchend": {
				event.preventDefault();
				for (var i = 0; i < event.changedTouches.length; i++) {
					var touch = event.changedTouches[i];
					if (SDL.downFingers[touch.identifier] === true) {
						delete SDL.downFingers[touch.identifier]
					}
				}
				var mouseEvent = {
					type: "mouseup",
					button: 0,
					pageX: event.changedTouches[0].clientX,
					pageY: event.changedTouches[0].clientY
				};
				SDL.DOMButtons[0] = 0;
				SDL.events.push(mouseEvent);
				for (var i = 0; i < event.changedTouches.length; i++) {
					var touch = event.changedTouches[i];
					SDL.events.push({
						type: "touchend",
						touch: touch
					})
				}
				break
			}
			case "DOMMouseScroll":
			case "mousewheel":
			case "wheel":
				var delta = -Browser.getMouseWheelDelta(event);
				delta = delta == 0 ? 0 : delta > 0 ? Math.max(delta, 1) : Math.min(delta, -1);
				var button = delta > 0 ? 3 : 4;
				SDL.events.push({
					type: "mousedown",
					button: button,
					pageX: event.pageX,
					pageY: event.pageY
				});
				SDL.events.push({
					type: "mouseup",
					button: button,
					pageX: event.pageX,
					pageY: event.pageY
				});
				SDL.events.push({
					type: "wheel",
					deltaX: 0,
					deltaY: delta
				});
				event.preventDefault();
				break;
			case "mousemove":
				if (SDL.DOMButtons[0] === 1) {
					SDL.events.push({
						type: "touchmove",
						touch: {
							identifier: 0,
							deviceID: -1,
							pageX: event.pageX,
							pageY: event.pageY
						}
					})
				}
				if (Browser.pointerLock) {
					if ("mozMovementX" in event) {
						event["movementX"] = event["mozMovementX"];
						event["movementY"] = event["mozMovementY"]
					}
					if (event["movementX"] == 0 && event["movementY"] == 0) {
						event.preventDefault();
						return
					}
				}
				case "keydown":
				case "keyup":
				case "keypress":
				case "mousedown":
				case "mouseup":
					if (event.type !== "keydown" || !SDL_unicode() && !SDL.textInput || (event.keyCode === 8 || event.keyCode === 9)) {
						event.preventDefault()
					}
					if (event.type == "mousedown") {
						SDL.DOMButtons[event.button] = 1;
						SDL.events.push({
							type: "touchstart",
							touch: {
								identifier: 0,
								deviceID: -1,
								pageX: event.pageX,
								pageY: event.pageY
							}
						})
					} else if (event.type == "mouseup") {
						if (!SDL.DOMButtons[event.button]) {
							return
						}
						SDL.events.push({
							type: "touchend",
							touch: {
								identifier: 0,
								deviceID: -1,
								pageX: event.pageX,
								pageY: event.pageY
							}
						});
						SDL.DOMButtons[event.button] = 0
					}
					if (event.type === "keydown" || event.type === "mousedown") {
						SDL.canRequestFullscreen = true
					} else if (event.type === "keyup" || event.type === "mouseup") {
						if (SDL.isRequestingFullscreen) {
							Module["requestFullscreen"](true, true);
							SDL.isRequestingFullscreen = false
						}
						SDL.canRequestFullscreen = false
					}
					if (event.type === "keypress" && SDL.savedKeydown) {
						SDL.savedKeydown.keypressCharCode = event.charCode;
						SDL.savedKeydown = null
					} else if (event.type === "keydown") {
						SDL.savedKeydown = event
					}
					if (event.type !== "keypress" || SDL.textInput) {
						SDL.events.push(event)
					}
					break;
				case "mouseout":
					for (var i = 0; i < 3; i++) {
						if (SDL.DOMButtons[i]) {
							SDL.events.push({
								type: "mouseup",
								button: i,
								pageX: event.pageX,
								pageY: event.pageY
							});
							SDL.DOMButtons[i] = 0
						}
					}
					event.preventDefault();
					break;
				case "focus":
					SDL.events.push(event);
					event.preventDefault();
					break;
				case "blur":
					SDL.events.push(event);
					unpressAllPressedKeys();
					event.preventDefault();
					break;
				case "visibilitychange":
					SDL.events.push({
						type: "visibilitychange",
						visible: !document.hidden
					});
					unpressAllPressedKeys();
					event.preventDefault();
					break;
				case "unload":
					if (Browser.mainLoop.runner) {
						SDL.events.push(event);
						Browser.mainLoop.runner()
					}
					return;
				case "resize":
					SDL.events.push(event);
					if (event.preventDefault) {
						event.preventDefault()
					}
					break
		}
		if (SDL.events.length >= 1e4) {
			err("SDL event queue full, dropping events");
			SDL.events = SDL.events.slice(0, 1e4)
		}
		SDL.flushEventsToHandler();
		return
	},
	lookupKeyCodeForEvent: function(event) {
		var code = event.keyCode;
		if (code >= 65 && code <= 90) {
			code += 32
		} else {
			code = SDL.keyCodes[event.keyCode] || event.keyCode;
			if (event.location === 2 && code >= (224 | 1 << 10) && code <= (227 | 1 << 10)) {
				code += 4
			}
		}
		return code
	},
	handleEvent: function(event) {
		if (event.handled) return;
		event.handled = true;
		switch (event.type) {
			case "touchstart":
			case "touchend":
			case "touchmove": {
				Browser.calculateMouseEvent(event);
				break
			}
			case "keydown":
			case "keyup": {
				var down = event.type === "keydown";
				var code = SDL.lookupKeyCodeForEvent(event);
				HEAP8[SDL.keyboardState + code >> 0] = down;
				SDL.modState = (HEAP8[SDL.keyboardState + 1248 >> 0] ? 64 : 0) | (HEAP8[SDL.keyboardState + 1249 >> 0] ? 1 : 0) | (HEAP8[SDL.keyboardState + 1250 >> 0] ? 256 : 0) | (HEAP8[SDL.keyboardState + 1252 >> 0] ? 128 : 0) | (HEAP8[SDL.keyboardState + 1253 >> 0] ? 2 : 0) | (HEAP8[SDL.keyboardState + 1254 >> 0] ? 512 : 0);
				if (down) {
					SDL.keyboardMap[code] = event.keyCode
				} else {
					delete SDL.keyboardMap[code]
				}
				break
			}
			case "mousedown":
			case "mouseup":
				if (event.type == "mousedown") {
					SDL.buttonState |= 1 << event.button
				} else if (event.type == "mouseup") {
					SDL.buttonState &= ~(1 << event.button)
				}
				case "mousemove": {
					Browser.calculateMouseEvent(event);
					break
				}
		}
	},
	flushEventsToHandler: function() {
		if (!SDL.eventHandler) return;
		while (SDL.pollEvent(SDL.eventHandlerTemp)) {
			Module["dynCall_iii"](SDL.eventHandler, SDL.eventHandlerContext, SDL.eventHandlerTemp)
		}
	},
	pollEvent: function(ptr) {
		if (SDL.initFlags & 512 && SDL.joystickEventState) {
			SDL.queryJoysticks()
		}
		if (ptr) {
			while (SDL.events.length > 0) {
				if (SDL.makeCEvent(SDL.events.shift(), ptr) !== false) return 1
			}
			return 0
		} else {
			return SDL.events.length > 0
		}
	},
	makeCEvent: function(event, ptr) {
		if (typeof event === "number") {
			_memcpy(ptr, event, 28);
			_free(event);
			return
		}
		SDL.handleEvent(event);
		switch (event.type) {
			case "keydown":
			case "keyup": {
				var down = event.type === "keydown";
				var key = SDL.lookupKeyCodeForEvent(event);
				var scan;
				if (key >= 1024) {
					scan = key - 1024
				} else {
					scan = SDL.scanCodes[key] || key
				}
				HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
				HEAP8[ptr + 8 >> 0] = down ? 1 : 0;
				HEAP8[ptr + 9 >> 0] = 0;
				HEAP32[ptr + 12 >> 2] = scan;
				HEAP32[ptr + 16 >> 2] = key;
				HEAP16[ptr + 20 >> 1] = SDL.modState;
				HEAP32[ptr + 24 >> 2] = event.keypressCharCode || key;
				break
			}
			case "keypress": {
				HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
				var cStr = intArrayFromString(String.fromCharCode(event.charCode));
				for (var i = 0; i < cStr.length; ++i) {
					HEAP8[ptr + (8 + i) >> 0] = cStr[i]
				}
				break
			}
			case "mousedown":
			case "mouseup":
			case "mousemove": {
				if (event.type != "mousemove") {
					var down = event.type === "mousedown";
					HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
					HEAP32[ptr + 4 >> 2] = 0;
					HEAP32[ptr + 8 >> 2] = 0;
					HEAP32[ptr + 12 >> 2] = 0;
					HEAP8[ptr + 16 >> 0] = event.button + 1;
					HEAP8[ptr + 17 >> 0] = down ? 1 : 0;
					HEAP32[ptr + 20 >> 2] = Browser.mouseX;
					HEAP32[ptr + 24 >> 2] = Browser.mouseY
				} else {
					HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
					HEAP32[ptr + 4 >> 2] = 0;
					HEAP32[ptr + 8 >> 2] = 0;
					HEAP32[ptr + 12 >> 2] = 0;
					HEAP32[ptr + 16 >> 2] = SDL.buttonState;
					HEAP32[ptr + 20 >> 2] = Browser.mouseX;
					HEAP32[ptr + 24 >> 2] = Browser.mouseY;
					HEAP32[ptr + 28 >> 2] = Browser.mouseMovementX;
					HEAP32[ptr + 32 >> 2] = Browser.mouseMovementY
				}
				break
			}
			case "wheel": {
				HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
				HEAP32[ptr + 16 >> 2] = event.deltaX;
				HEAP32[ptr + 20 >> 2] = event.deltaY;
				break
			}
			case "touchstart":
			case "touchend":
			case "touchmove": {
				var touch = event.touch;
				if (!Browser.touches[touch.identifier]) break;
				var w = Module["canvas"].width;
				var h = Module["canvas"].height;
				var x = Browser.touches[touch.identifier].x / w;
				var y = Browser.touches[touch.identifier].y / h;
				var lx = Browser.lastTouches[touch.identifier].x / w;
				var ly = Browser.lastTouches[touch.identifier].y / h;
				var dx = x - lx;
				var dy = y - ly;
				if (touch["deviceID"] === undefined) touch.deviceID = SDL.TOUCH_DEFAULT_ID;
				if (dx === 0 && dy === 0 && event.type === "touchmove") return false;
				HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
				HEAP32[ptr + 4 >> 2] = _SDL_GetTicks();
				tempI64 = [touch.deviceID >>> 0, (tempDouble = touch.deviceID, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[ptr + 8 >> 2] = tempI64[0], HEAP32[ptr + 12 >> 2] = tempI64[1];
				tempI64 = [touch.identifier >>> 0, (tempDouble = touch.identifier, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[ptr + 16 >> 2] = tempI64[0], HEAP32[ptr + 20 >> 2] = tempI64[1];
				HEAPF32[ptr + 24 >> 2] = x;
				HEAPF32[ptr + 28 >> 2] = y;
				HEAPF32[ptr + 32 >> 2] = dx;
				HEAPF32[ptr + 36 >> 2] = dy;
				if (touch.force !== undefined) {
					HEAPF32[ptr + 40 >> 2] = touch.force
				} else {
					HEAPF32[ptr + 40 >> 2] = event.type == "touchend" ? 0 : 1
				}
				break
			}
			case "unload": {
				HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
				break
			}
			case "resize": {
				HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
				HEAP32[ptr + 4 >> 2] = event.w;
				HEAP32[ptr + 8 >> 2] = event.h;
				break
			}
			case "joystick_button_up":
			case "joystick_button_down": {
				var state = event.type === "joystick_button_up" ? 0 : 1;
				HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
				HEAP8[ptr + 4 >> 0] = event.index;
				HEAP8[ptr + 5 >> 0] = event.button;
				HEAP8[ptr + 6 >> 0] = state;
				break
			}
			case "joystick_axis_motion": {
				HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
				HEAP8[ptr + 4 >> 0] = event.index;
				HEAP8[ptr + 5 >> 0] = event.axis;
				HEAP32[ptr + 8 >> 2] = SDL.joystickAxisValueConversion(event.value);
				break
			}
			case "focus": {
				var SDL_WINDOWEVENT_FOCUS_GAINED = 12;
				HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
				HEAP32[ptr + 4 >> 2] = 0;
				HEAP8[ptr + 8 >> 0] = SDL_WINDOWEVENT_FOCUS_GAINED;
				break
			}
			case "blur": {
				var SDL_WINDOWEVENT_FOCUS_LOST = 13;
				HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
				HEAP32[ptr + 4 >> 2] = 0;
				HEAP8[ptr + 8 >> 0] = SDL_WINDOWEVENT_FOCUS_LOST;
				break
			}
			case "visibilitychange": {
				var SDL_WINDOWEVENT_SHOWN = 1;
				var SDL_WINDOWEVENT_HIDDEN = 2;
				var visibilityEventID = event.visible ? SDL_WINDOWEVENT_SHOWN : SDL_WINDOWEVENT_HIDDEN;
				HEAP32[ptr >> 2] = SDL.DOMEventToSDLEvent[event.type];
				HEAP32[ptr + 4 >> 2] = 0;
				HEAP8[ptr + 8 >> 0] = visibilityEventID;
				break
			}
			default:
				throw "Unhandled SDL event: " + event.type
		}
	},
	makeFontString: function(height, fontName) {
		if (fontName.charAt(0) != "'" && fontName.charAt(0) != '"') {
			fontName = '"' + fontName + '"'
		}
		return height + "px " + fontName + ", serif"
	},
	estimateTextWidth: function(fontData, text) {
		var h = fontData.size;
		var fontString = SDL.makeFontString(h, fontData.name);
		var tempCtx = SDL_ttfContext();
		tempCtx.font = fontString;
		var ret = tempCtx.measureText(text).width | 0;
		return ret
	},
	allocateChannels: function(num) {
		if (SDL.numChannels && SDL.numChannels >= num && num != 0) return;
		SDL.numChannels = num;
		SDL.channels = [];
		for (var i = 0; i < num; i++) {
			SDL.channels[i] = {
				audio: null,
				volume: 1
			}
		}
	},
	setGetVolume: function(info, volume) {
		if (!info) return 0;
		var ret = info.volume * 128;
		if (volume != -1) {
			info.volume = Math.min(Math.max(volume, 0), 128) / 128;
			if (info.audio) {
				try {
					info.audio.volume = info.volume;
					if (info.audio.webAudioGainNode) info.audio.webAudioGainNode["gain"]["value"] = info.volume
				} catch (e) {
					err("setGetVolume failed to set audio volume: " + e)
				}
			}
		}
		return ret
	},
	setPannerPosition: function(info, x, y, z) {
		if (!info) return;
		if (info.audio) {
			if (info.audio.webAudioPannerNode) {
				info.audio.webAudioPannerNode["setPosition"](x, y, z)
			}
		}
	},
	playWebAudio: function(audio) {
		if (!audio) return;
		if (audio.webAudioNode) return;
		if (!SDL.webAudioAvailable()) return;
		try {
			var webAudio = audio.resource.webAudio;
			audio.paused = false;
			if (!webAudio.decodedBuffer) {
				if (webAudio.onDecodeComplete === undefined) abort("Cannot play back audio object that was not loaded");
				webAudio.onDecodeComplete.push(function() {
					if (!audio.paused) SDL.playWebAudio(audio)
				});
				return
			}
			audio.webAudioNode = SDL.audioContext["createBufferSource"]();
			audio.webAudioNode["buffer"] = webAudio.decodedBuffer;
			audio.webAudioNode["loop"] = audio.loop;
			audio.webAudioNode["onended"] = function() {
				audio["onended"]()
			};
			audio.webAudioPannerNode = SDL.audioContext["createPanner"]();
			audio.webAudioPannerNode["setPosition"](0, 0, -.5);
			audio.webAudioPannerNode["panningModel"] = "equalpower";
			audio.webAudioGainNode = SDL.audioContext["createGain"]();
			audio.webAudioGainNode["gain"]["value"] = audio.volume;
			audio.webAudioNode["connect"](audio.webAudioPannerNode);
			audio.webAudioPannerNode["connect"](audio.webAudioGainNode);
			audio.webAudioGainNode["connect"](SDL.audioContext["destination"]);
			audio.webAudioNode["start"](0, audio.currentPosition);
			audio.startTime = SDL.audioContext["currentTime"] - audio.currentPosition
		} catch (e) {
			err("playWebAudio failed: " + e)
		}
	},
	pauseWebAudio: function(audio) {
		if (!audio) return;
		if (audio.webAudioNode) {
			try {
				audio.currentPosition = (SDL.audioContext["currentTime"] - audio.startTime) % audio.resource.webAudio.decodedBuffer.duration;
				audio.webAudioNode["onended"] = undefined;
				audio.webAudioNode.stop(0);
				audio.webAudioNode = undefined
			} catch (e) {
				err("pauseWebAudio failed: " + e)
			}
		}
		audio.paused = true
	},
	openAudioContext: function() {
		if (!SDL.audioContext) {
			if (typeof AudioContext !== "undefined") SDL.audioContext = new AudioContext;
			else if (typeof webkitAudioContext !== "undefined") SDL.audioContext = new webkitAudioContext
		}
	},
	webAudioAvailable: function() {
		return !!SDL.audioContext
	},
	fillWebAudioBufferFromHeap: function(heapPtr, sizeSamplesPerChannel, dstAudioBuffer) {
		var audio = SDL_audio();
		var numChannels = audio.channels;
		for (var c = 0; c < numChannels; ++c) {
			var channelData = dstAudioBuffer["getChannelData"](c);
			if (channelData.length != sizeSamplesPerChannel) {
				throw "Web Audio output buffer length mismatch! Destination size: " + channelData.length + " samples vs expected " + sizeSamplesPerChannel + " samples!"
			}
			if (audio.format == 32784) {
				for (var j = 0; j < sizeSamplesPerChannel; ++j) {
					channelData[j] = HEAP16[heapPtr + (j * numChannels + c) * 2 >> 1] / 32768
				}
			} else if (audio.format == 8) {
				for (var j = 0; j < sizeSamplesPerChannel; ++j) {
					var v = HEAP8[heapPtr + (j * numChannels + c) >> 0];
					channelData[j] = (v >= 0 ? v - 128 : v + 128) / 128
				}
			} else if (audio.format == 33056) {
				for (var j = 0; j < sizeSamplesPerChannel; ++j) {
					channelData[j] = HEAPF32[heapPtr + (j * numChannels + c) * 4 >> 2]
				}
			} else {
				throw "Invalid SDL audio format " + audio.format + "!"
			}
		}
	},
	debugSurface: function(surfData) {
		console.log("dumping surface " + [surfData.surf, surfData.source, surfData.width, surfData.height]);
		var image = surfData.ctx.getImageData(0, 0, surfData.width, surfData.height);
		var data = image.data;
		var num = Math.min(surfData.width, surfData.height);
		for (var i = 0; i < num; i++) {
			console.log("   diagonal " + i + ":" + [data[i * surfData.width * 4 + i * 4 + 0], data[i * surfData.width * 4 + i * 4 + 1], data[i * surfData.width * 4 + i * 4 + 2], data[i * surfData.width * 4 + i * 4 + 3]])
		}
	},
	joystickEventState: 1,
	lastJoystickState: {},
	joystickNamePool: {},
	recordJoystickState: function(joystick, state) {
		var buttons = new Array(state.buttons.length);
		for (var i = 0; i < state.buttons.length; i++) {
			buttons[i] = SDL.getJoystickButtonState(state.buttons[i])
		}
		SDL.lastJoystickState[joystick] = {
			buttons: buttons,
			axes: state.axes.slice(0),
			timestamp: state.timestamp,
			index: state.index,
			id: state.id
		}
	},
	getJoystickButtonState: function(button) {
		if (typeof button === "object") {
			return button["pressed"]
		} else {
			return button > 0
		}
	},
	queryJoysticks: function() {
		for (var joystick in SDL.lastJoystickState) {
			var state = SDL.getGamepad(joystick - 1);
			var prevState = SDL.lastJoystickState[joystick];
			if (typeof state === "undefined") return;
			if (state === null) return;
			if (typeof state.timestamp !== "number" || state.timestamp !== prevState.timestamp || !state.timestamp) {
				var i;
				for (i = 0; i < state.buttons.length; i++) {
					var buttonState = SDL.getJoystickButtonState(state.buttons[i]);
					if (buttonState !== prevState.buttons[i]) {
						SDL.events.push({
							type: buttonState ? "joystick_button_down" : "joystick_button_up",
							joystick: joystick,
							index: joystick - 1,
							button: i
						})
					}
				}
				for (i = 0; i < state.axes.length; i++) {
					if (state.axes[i] !== prevState.axes[i]) {
						SDL.events.push({
							type: "joystick_axis_motion",
							joystick: joystick,
							index: joystick - 1,
							axis: i,
							value: state.axes[i]
						})
					}
				}
				SDL.recordJoystickState(joystick, state)
			}
		}
	},
	joystickAxisValueConversion: function(value) {
		value = Math.min(1, Math.max(value, -1));
		return Math.ceil((value + 1) * 32767.5 - 32768)
	},
	getGamepads: function() {
		var fcn = navigator.getGamepads || navigator.webkitGamepads || navigator.mozGamepads || navigator.gamepads || navigator.webkitGetGamepads;
		if (fcn !== undefined) {
			return fcn.apply(navigator)
		} else {
			return []
		}
	},
	getGamepad: function(deviceIndex) {
		var gamepads = SDL.getGamepads();
		if (gamepads.length > deviceIndex && deviceIndex >= 0) {
			return gamepads[deviceIndex]
		}
		return null
	}
};

function _SDL_CreateRGBSurface(flags, width, height, depth, rmask, gmask, bmask, amask) {
	return SDL.makeSurface(width, height, flags, false, "CreateRGBSurface", rmask, gmask, bmask, amask)
}

function _SDL_EnableKeyRepeat(delay, interval) {}

function _SDL_EnableUNICODE(on) {
	var ret = SDL.unicode || 0;
	SDL.unicode = on;
	return ret
}

function _SDL_FillRect(surf, rect, color) {
	var surfData = SDL.surfaces[surf];
	assert(!surfData.locked);
	if (surfData.isFlagSet(2097152)) {
		color = surfData.colors32[color]
	}
	var r = rect ? SDL.loadRect(rect) : {
		x: 0,
		y: 0,
		w: surfData.width,
		h: surfData.height
	};
	if (surfData.clipRect) {
		r = SDL.intersectionOfRects(surfData.clipRect, r);
		if (rect) {
			SDL.updateRect(rect, r)
		}
	}
	surfData.ctx.save();
	surfData.ctx.fillStyle = SDL.translateColorToCSSRGBA(color);
	surfData.ctx.fillRect(r.x, r.y, r.w, r.h);
	surfData.ctx.restore();
	return 0
}

function _SDL_FreeSurface(surf) {
	if (surf) SDL.freeSurface(surf)
}

function _SDL_GL_SetAttribute(attr, value) {
	if (!(attr in SDL.glAttributes)) {
		abort("Unknown SDL GL attribute (" + attr + "). Please check if your SDL version is supported.")
	}
	SDL.glAttributes[attr] = value
}

function _SDL_GL_SwapBuffers() {
	if (Browser.doSwapBuffers) Browser.doSwapBuffers()
}

function _SDL_GetKeyName(key) {
	if (!SDL.keyName) {
		SDL.keyName = allocate(intArrayFromString("unknown key"), "i8", ALLOC_NORMAL)
	}
	return SDL.keyName
}

function _SDL_GetKeyboardState(numKeys) {
	if (numKeys) {
		HEAP32[numKeys >> 2] = 65536
	}
	return SDL.keyboardState
}

function _SDL_GetKeyState() {
	return _SDL_GetKeyboardState()
}

function _SDL_GetMouseState(x, y) {
	if (x) HEAP32[x >> 2] = Browser.mouseX;
	if (y) HEAP32[y >> 2] = Browser.mouseY;
	return SDL.buttonState
}

function _SDL_Init(initFlags) {
	SDL.startTime = Date.now();
	SDL.initFlags = initFlags;
	if (!Module["doNotCaptureKeyboard"]) {
		var keyboardListeningElement = Module["keyboardListeningElement"] || document;
		keyboardListeningElement.addEventListener("keydown", SDL.receiveEvent);
		keyboardListeningElement.addEventListener("keyup", SDL.receiveEvent);
		keyboardListeningElement.addEventListener("keypress", SDL.receiveEvent);
		window.addEventListener("focus", SDL.receiveEvent);
		window.addEventListener("blur", SDL.receiveEvent);
		document.addEventListener("visibilitychange", SDL.receiveEvent)
	}
	window.addEventListener("unload", SDL.receiveEvent);
	SDL.keyboardState = _malloc(65536);
	_memset(SDL.keyboardState, 0, 65536);
	SDL.DOMEventToSDLEvent["keydown"] = 768;
	SDL.DOMEventToSDLEvent["keyup"] = 769;
	SDL.DOMEventToSDLEvent["keypress"] = 771;
	SDL.DOMEventToSDLEvent["mousedown"] = 1025;
	SDL.DOMEventToSDLEvent["mouseup"] = 1026;
	SDL.DOMEventToSDLEvent["mousemove"] = 1024;
	SDL.DOMEventToSDLEvent["wheel"] = 1027;
	SDL.DOMEventToSDLEvent["touchstart"] = 1792;
	SDL.DOMEventToSDLEvent["touchend"] = 1793;
	SDL.DOMEventToSDLEvent["touchmove"] = 1794;
	SDL.DOMEventToSDLEvent["unload"] = 256;
	SDL.DOMEventToSDLEvent["resize"] = 28673;
	SDL.DOMEventToSDLEvent["visibilitychange"] = 512;
	SDL.DOMEventToSDLEvent["focus"] = 512;
	SDL.DOMEventToSDLEvent["blur"] = 512;
	SDL.DOMEventToSDLEvent["joystick_axis_motion"] = 1536;
	SDL.DOMEventToSDLEvent["joystick_button_down"] = 1539;
	SDL.DOMEventToSDLEvent["joystick_button_up"] = 1540;
	return 0
}

function _SDL_PollEvent(ptr) {
	return SDL.pollEvent(ptr)
}

function _SDL_AudioQuit() {
	for (var i = 0; i < SDL.numChannels; ++i) {
		if (SDL.channels[i].audio) {
			SDL.channels[i].audio.pause();
			SDL.channels[i].audio = undefined
		}
	}
	if (SDL.music.audio) SDL.music.audio.pause();
	SDL.music.audio = undefined
}

function _SDL_Quit() {
	_SDL_AudioQuit();
	out("SDL_Quit called (and ignored)")
}

function _SDL_RWFromFile(_name, mode) {
	var id = SDL.rwops.length;
	var name = UTF8ToString(_name);
	SDL.rwops.push({
		filename: name,
		mimetype: Browser.getMimetype(name)
	});
	return id
}

function _SDL_SaveBMP_RW() {
	throw "SDL_SaveBMP_RW: TODO"
}

function __webgl_enable_ANGLE_instanced_arrays(ctx) {
	var ext = ctx.getExtension("ANGLE_instanced_arrays");
	if (ext) {
		ctx["vertexAttribDivisor"] = function(index, divisor) {
			ext["vertexAttribDivisorANGLE"](index, divisor)
		};
		ctx["drawArraysInstanced"] = function(mode, first, count, primcount) {
			ext["drawArraysInstancedANGLE"](mode, first, count, primcount)
		};
		ctx["drawElementsInstanced"] = function(mode, count, type, indices, primcount) {
			ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount)
		};
		return 1
	}
}

function __webgl_enable_OES_vertex_array_object(ctx) {
	var ext = ctx.getExtension("OES_vertex_array_object");
	if (ext) {
		ctx["createVertexArray"] = function() {
			return ext["createVertexArrayOES"]()
		};
		ctx["deleteVertexArray"] = function(vao) {
			ext["deleteVertexArrayOES"](vao)
		};
		ctx["bindVertexArray"] = function(vao) {
			ext["bindVertexArrayOES"](vao)
		};
		ctx["isVertexArray"] = function(vao) {
			return ext["isVertexArrayOES"](vao)
		};
		return 1
	}
}

function __webgl_enable_WEBGL_draw_buffers(ctx) {
	var ext = ctx.getExtension("WEBGL_draw_buffers");
	if (ext) {
		ctx["drawBuffers"] = function(n, bufs) {
			ext["drawBuffersWEBGL"](n, bufs)
		};
		return 1
	}
}
var GL = {
	counter: 1,
	buffers: [],
	programs: [],
	framebuffers: [],
	renderbuffers: [],
	textures: [],
	uniforms: [],
	shaders: [],
	vaos: [],
	contexts: [],
	offscreenCanvases: {},
	timerQueriesEXT: [],
	programInfos: {},
	stringCache: {},
	unpackAlignment: 4,
	recordError: function recordError(errorCode) {
		if (!GL.lastError) {
			GL.lastError = errorCode
		}
	},
	getNewId: function(table) {
		var ret = GL.counter++;
		for (var i = table.length; i < ret; i++) {
			table[i] = null
		}
		return ret
	},
	getSource: function(shader, count, string, length) {
		var source = "";
		for (var i = 0; i < count; ++i) {
			var len = length ? HEAP32[length + i * 4 >> 2] : -1;
			source += UTF8ToString(HEAP32[string + i * 4 >> 2], len < 0 ? undefined : len)
		}
		return source
	},
	createContext: function(canvas, webGLContextAttributes) {
		var ctx = canvas.getContext("webgl", webGLContextAttributes);
		if (!ctx) return 0;
		var handle = GL.registerContext(ctx, webGLContextAttributes);
		return handle
	},
	registerContext: function(ctx, webGLContextAttributes) {
		var handle = GL.getNewId(GL.contexts);
		var context = {
			handle: handle,
			attributes: webGLContextAttributes,
			version: webGLContextAttributes.majorVersion,
			GLctx: ctx
		};
		if (ctx.canvas) ctx.canvas.GLctxObject = context;
		GL.contexts[handle] = context;
		if (typeof webGLContextAttributes.enableExtensionsByDefault === "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
			GL.initExtensions(context)
		}
		return handle
	},
	makeContextCurrent: function(contextHandle) {
		GL.currentContext = GL.contexts[contextHandle];
		Module.ctx = GLctx = GL.currentContext && GL.currentContext.GLctx;
		return !(contextHandle && !GLctx)
	},
	getContext: function(contextHandle) {
		return GL.contexts[contextHandle]
	},
	deleteContext: function(contextHandle) {
		if (GL.currentContext === GL.contexts[contextHandle]) GL.currentContext = null;
		if (typeof JSEvents === "object") JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
		if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
		GL.contexts[contextHandle] = null
	},
	initExtensions: function(context) {
		if (!context) context = GL.currentContext;
		if (context.initExtensionsDone) return;
		context.initExtensionsDone = true;
		var GLctx = context.GLctx;
		__webgl_enable_ANGLE_instanced_arrays(GLctx);
		__webgl_enable_OES_vertex_array_object(GLctx);
		__webgl_enable_WEBGL_draw_buffers(GLctx);
		GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
		var automaticallyEnabledExtensions = ["OES_texture_float", "OES_texture_half_float", "OES_standard_derivatives", "OES_vertex_array_object", "WEBGL_compressed_texture_s3tc", "WEBGL_depth_texture", "OES_element_index_uint", "EXT_texture_filter_anisotropic", "EXT_frag_depth", "WEBGL_draw_buffers", "ANGLE_instanced_arrays", "OES_texture_float_linear", "OES_texture_half_float_linear", "EXT_blend_minmax", "EXT_shader_texture_lod", "EXT_texture_norm16", "WEBGL_compressed_texture_pvrtc", "EXT_color_buffer_half_float", "WEBGL_color_buffer_float", "EXT_sRGB", "WEBGL_compressed_texture_etc1", "EXT_disjoint_timer_query", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_astc", "EXT_color_buffer_float", "WEBGL_compressed_texture_s3tc_srgb", "EXT_disjoint_timer_query_webgl2", "WEBKIT_WEBGL_compressed_texture_pvrtc"];
		var exts = GLctx.getSupportedExtensions() || [];
		exts.forEach(function(ext) {
			if (automaticallyEnabledExtensions.indexOf(ext) != -1) {
				GLctx.getExtension(ext)
			}
		})
	},
	populateUniformTable: function(program) {
		var p = GL.programs[program];
		var ptable = GL.programInfos[program] = {
			uniforms: {},
			maxUniformLength: 0,
			maxAttributeLength: -1,
			maxUniformBlockNameLength: -1
		};
		var utable = ptable.uniforms;
		var numUniforms = GLctx.getProgramParameter(p, 35718);
		for (var i = 0; i < numUniforms; ++i) {
			var u = GLctx.getActiveUniform(p, i);
			var name = u.name;
			ptable.maxUniformLength = Math.max(ptable.maxUniformLength, name.length + 1);
			if (name.slice(-1) == "]") {
				name = name.slice(0, name.lastIndexOf("["))
			}
			var loc = GLctx.getUniformLocation(p, name);
			if (loc) {
				var id = GL.getNewId(GL.uniforms);
				utable[name] = [u.size, id];
				GL.uniforms[id] = loc;
				for (var j = 1; j < u.size; ++j) {
					var n = name + "[" + j + "]";
					loc = GLctx.getUniformLocation(p, n);
					id = GL.getNewId(GL.uniforms);
					GL.uniforms[id] = loc
				}
			}
		}
	}
};

function _SDL_SetVideoMode(width, height, depth, flags) {
	["touchstart", "touchend", "touchmove", "mousedown", "mouseup", "mousemove", "DOMMouseScroll", "mousewheel", "wheel", "mouseout"].forEach(function(event) {
		Module["canvas"].addEventListener(event, SDL.receiveEvent, true)
	});
	var canvas = Module["canvas"];
	if (width == 0 && height == 0) {
		width = canvas.width;
		height = canvas.height
	}
	if (!SDL.addedResizeListener) {
		SDL.addedResizeListener = true;
		Browser.resizeListeners.push(function(w, h) {
			if (!SDL.settingVideoMode) {
				SDL.receiveEvent({
					type: "resize",
					w: w,
					h: h
				})
			}
		})
	}
	SDL.settingVideoMode = true;
	Browser.setCanvasSize(width, height);
	SDL.settingVideoMode = false;
	if (SDL.screen) {
		SDL.freeSurface(SDL.screen);
		assert(!SDL.screen)
	}
	if (SDL.GL) flags = flags | 67108864;
	SDL.screen = SDL.makeSurface(width, height, flags, true, "screen");
	return SDL.screen
}

function _SDL_ShowCursor(toggle) {
	switch (toggle) {
		case 0:
			if (Browser.isFullscreen) {
				Module["canvas"].requestPointerLock();
				return 0
			} else {
				return 1
			}
			break;
		case 1:
			Module["canvas"].exitPointerLock();
			return 1;
			break;
		case -1:
			return !Browser.pointerLock;
			break;
		default:
			console.log("SDL_ShowCursor called with unknown toggle parameter value: " + toggle + ".");
			break
	}
}

function _SDL_UnlockSurface(surf) {
	assert(!SDL.GL);
	var surfData = SDL.surfaces[surf];
	if (!surfData.locked || --surfData.locked > 0) {
		return
	}
	if (surfData.isFlagSet(2097152)) {
		SDL.copyIndexedColorData(surfData)
	} else if (!surfData.colors) {
		var data = surfData.image.data;
		var buffer = surfData.buffer;
		assert(buffer % 4 == 0, "Invalid buffer offset: " + buffer);
		var src = buffer >> 2;
		var dst = 0;
		var isScreen = surf == SDL.screen;
		var num;
		if (typeof CanvasPixelArray !== "undefined" && data instanceof CanvasPixelArray) {
			num = data.length;
			while (dst < num) {
				var val = HEAP32[src];
				data[dst] = val & 255;
				data[dst + 1] = val >> 8 & 255;
				data[dst + 2] = val >> 16 & 255;
				data[dst + 3] = isScreen ? 255 : val >> 24 & 255;
				src++;
				dst += 4
			}
		} else {
			var data32 = new Uint32Array(data.buffer);
			if (isScreen && SDL.defaults.opaqueFrontBuffer) {
				num = data32.length;
				data32.set(HEAP32.subarray(src, src + num));
				var data8 = new Uint8Array(data.buffer);
				var i = 3;
				var j = i + 4 * num;
				if (num % 8 == 0) {
					while (i < j) {
						data8[i] = 255;
						i = i + 4 | 0;
						data8[i] = 255;
						i = i + 4 | 0;
						data8[i] = 255;
						i = i + 4 | 0;
						data8[i] = 255;
						i = i + 4 | 0;
						data8[i] = 255;
						i = i + 4 | 0;
						data8[i] = 255;
						i = i + 4 | 0;
						data8[i] = 255;
						i = i + 4 | 0;
						data8[i] = 255;
						i = i + 4 | 0
					}
				} else {
					while (i < j) {
						data8[i] = 255;
						i = i + 4 | 0
					}
				}
			} else {
				data32.set(HEAP32.subarray(src, src + data32.length))
			}
		}
	} else {
		var width = Module["canvas"].width;
		var height = Module["canvas"].height;
		var s = surfData.buffer;
		var data = surfData.image.data;
		var colors = surfData.colors;
		for (var y = 0; y < height; y++) {
			var base = y * width * 4;
			for (var x = 0; x < width; x++) {
				var val = HEAPU8[s++ >> 0] * 4;
				var start = base + x * 4;
				data[start] = colors[val];
				data[start + 1] = colors[val + 1];
				data[start + 2] = colors[val + 2]
			}
			s += width * 3
		}
	}
	surfData.ctx.putImageData(surfData.image, 0, 0)
}

function _SDL_UpdateRect(surf, x, y, w, h) {}

function _SDL_UpperBlit(src, srcrect, dst, dstrect) {
	return SDL.blitSurface(src, srcrect, dst, dstrect, false)
}

function _SDL_WM_GrabInput() {}

function _SDL_WM_SetCaption(title, icon) {
	if (title && typeof setWindowTitle !== "undefined") {
		setWindowTitle(UTF8ToString(title))
	}
	icon = icon && UTF8ToString(icon)
}

function _SDL_WarpMouse(x, y) {
	return
}

function ___assert_fail(condition, filename, line, func) {
	abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"])
}

function ___cxa_allocate_exception(size) {
	return _malloc(size)
}

function _atexit(func, arg) {}

function ___cxa_atexit(a0, a1) {
	return _atexit(a0, a1)
}
var ___exception_infos = {};
var ___exception_caught = [];

function ___exception_addRef(ptr) {
	if (!ptr) return;
	var info = ___exception_infos[ptr];
	info.refcount++
}

function ___exception_deAdjust(adjusted) {
	if (!adjusted || ___exception_infos[adjusted]) return adjusted;
	for (var key in ___exception_infos) {
		var ptr = +key;
		var adj = ___exception_infos[ptr].adjusted;
		var len = adj.length;
		for (var i = 0; i < len; i++) {
			if (adj[i] === adjusted) {
				return ptr
			}
		}
	}
	return adjusted
}

function ___cxa_begin_catch(ptr) {
	var info = ___exception_infos[ptr];
	if (info && !info.caught) {
		info.caught = true;
		__ZSt18uncaught_exceptionv.uncaught_exceptions--
	}
	if (info) info.rethrown = false;
	___exception_caught.push(ptr);
	___exception_addRef(___exception_deAdjust(ptr));
	return ptr
}
var ___exception_last = 0;

function ___cxa_free_exception(ptr) {
	try {
		return _free(ptr)
	} catch (e) {}
}

function ___exception_decRef(ptr) {
	if (!ptr) return;
	var info = ___exception_infos[ptr];
	info.refcount--;
	if (info.refcount === 0 && !info.rethrown) {
		if (info.destructor) {
			Module["dynCall_ii"](info.destructor, ptr)
		}
		delete ___exception_infos[ptr];
		___cxa_free_exception(ptr)
	}
}

function ___cxa_end_catch() {
	_setThrew(0);
	var ptr = ___exception_caught.pop();
	if (ptr) {
		___exception_decRef(___exception_deAdjust(ptr));
		___exception_last = 0
	}
}

function ___cxa_find_matching_catch_2() {
	var thrown = ___exception_last;
	if (!thrown) {
		return (setTempRet0(0), 0) | 0
	}
	var info = ___exception_infos[thrown];
	var throwntype = info.type;
	if (!throwntype) {
		return (setTempRet0(0), thrown) | 0
	}
	var typeArray = Array.prototype.slice.call(arguments);
	var pointer = ___cxa_is_pointer_type(throwntype);
	var buffer = 10207200;
	HEAP32[buffer >> 2] = thrown;
	thrown = buffer;
	for (var i = 0; i < typeArray.length; i++) {
		if (typeArray[i] && ___cxa_can_catch(typeArray[i], throwntype, thrown)) {
			thrown = HEAP32[thrown >> 2];
			info.adjusted.push(thrown);
			return (setTempRet0(typeArray[i]), thrown) | 0
		}
	}
	thrown = HEAP32[thrown >> 2];
	return (setTempRet0(throwntype), thrown) | 0
}

function ___cxa_find_matching_catch_3() {
	var thrown = ___exception_last;
	if (!thrown) {
		return (setTempRet0(0), 0) | 0
	}
	var info = ___exception_infos[thrown];
	var throwntype = info.type;
	if (!throwntype) {
		return (setTempRet0(0), thrown) | 0
	}
	var typeArray = Array.prototype.slice.call(arguments);
	var pointer = ___cxa_is_pointer_type(throwntype);
	var buffer = 10207200;
	HEAP32[buffer >> 2] = thrown;
	thrown = buffer;
	for (var i = 0; i < typeArray.length; i++) {
		if (typeArray[i] && ___cxa_can_catch(typeArray[i], throwntype, thrown)) {
			thrown = HEAP32[thrown >> 2];
			info.adjusted.push(thrown);
			return (setTempRet0(typeArray[i]), thrown) | 0
		}
	}
	thrown = HEAP32[thrown >> 2];
	return (setTempRet0(throwntype), thrown) | 0
}

function ___cxa_find_matching_catch_4() {
	var thrown = ___exception_last;
	if (!thrown) {
		return (setTempRet0(0), 0) | 0
	}
	var info = ___exception_infos[thrown];
	var throwntype = info.type;
	if (!throwntype) {
		return (setTempRet0(0), thrown) | 0
	}
	var typeArray = Array.prototype.slice.call(arguments);
	var pointer = ___cxa_is_pointer_type(throwntype);
	var buffer = 10207200;
	HEAP32[buffer >> 2] = thrown;
	thrown = buffer;
	for (var i = 0; i < typeArray.length; i++) {
		if (typeArray[i] && ___cxa_can_catch(typeArray[i], throwntype, thrown)) {
			thrown = HEAP32[thrown >> 2];
			info.adjusted.push(thrown);
			return (setTempRet0(typeArray[i]), thrown) | 0
		}
	}
	thrown = HEAP32[thrown >> 2];
	return (setTempRet0(throwntype), thrown) | 0
}

function ___cxa_find_matching_catch_5() {
	var thrown = ___exception_last;
	if (!thrown) {
		return (setTempRet0(0), 0) | 0
	}
	var info = ___exception_infos[thrown];
	var throwntype = info.type;
	if (!throwntype) {
		return (setTempRet0(0), thrown) | 0
	}
	var typeArray = Array.prototype.slice.call(arguments);
	var pointer = ___cxa_is_pointer_type(throwntype);
	var buffer = 10207200;
	HEAP32[buffer >> 2] = thrown;
	thrown = buffer;
	for (var i = 0; i < typeArray.length; i++) {
		if (typeArray[i] && ___cxa_can_catch(typeArray[i], throwntype, thrown)) {
			thrown = HEAP32[thrown >> 2];
			info.adjusted.push(thrown);
			return (setTempRet0(typeArray[i]), thrown) | 0
		}
	}
	thrown = HEAP32[thrown >> 2];
	return (setTempRet0(throwntype), thrown) | 0
}

function ___cxa_rethrow() {
	var ptr = ___exception_caught.pop();
	ptr = ___exception_deAdjust(ptr);
	if (!___exception_infos[ptr].rethrown) {
		___exception_caught.push(ptr);
		___exception_infos[ptr].rethrown = true
	}
	___exception_last = ptr;
	throw ptr
}

function ___cxa_throw(ptr, type, destructor) {
	___exception_infos[ptr] = {
		ptr: ptr,
		adjusted: [ptr],
		type: type,
		destructor: destructor,
		refcount: 0,
		caught: false,
		rethrown: false
	};
	___exception_last = ptr;
	if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
		__ZSt18uncaught_exceptionv.uncaught_exceptions = 1
	} else {
		__ZSt18uncaught_exceptionv.uncaught_exceptions++
	}
	throw ptr
}

function ___cxa_uncaught_exceptions() {
	return __ZSt18uncaught_exceptionv.uncaught_exceptions
}

function ___map_file(pathname, size) {
	setErrNo(63);
	return -1
}

function ___resumeException(ptr) {
	if (!___exception_last) {
		___exception_last = ptr
	}
	throw ptr
}
var SYSCALLS = {
	mappings: {},
	DEFAULT_POLLMASK: 5,
	umask: 511,
	calculateAt: function(dirfd, path) {
		if (path[0] !== "/") {
			var dir;
			if (dirfd === -100) {
				dir = FS.cwd()
			} else {
				var dirstream = FS.getStream(dirfd);
				if (!dirstream) throw new FS.ErrnoError(8);
				dir = dirstream.path
			}
			path = PATH.join2(dir, path)
		}
		return path
	},
	doStat: function(func, path, buf) {
		try {
			var stat = func(path)
		} catch (e) {
			if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
				return -54
			}
			throw e
		}
		HEAP32[buf >> 2] = stat.dev;
		HEAP32[buf + 4 >> 2] = 0;
		HEAP32[buf + 8 >> 2] = stat.ino;
		HEAP32[buf + 12 >> 2] = stat.mode;
		HEAP32[buf + 16 >> 2] = stat.nlink;
		HEAP32[buf + 20 >> 2] = stat.uid;
		HEAP32[buf + 24 >> 2] = stat.gid;
		HEAP32[buf + 28 >> 2] = stat.rdev;
		HEAP32[buf + 32 >> 2] = 0;
		tempI64 = [stat.size >>> 0, (tempDouble = stat.size, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
		HEAP32[buf + 48 >> 2] = 4096;
		HEAP32[buf + 52 >> 2] = stat.blocks;
		HEAP32[buf + 56 >> 2] = stat.atime.getTime() / 1e3 | 0;
		HEAP32[buf + 60 >> 2] = 0;
		HEAP32[buf + 64 >> 2] = stat.mtime.getTime() / 1e3 | 0;
		HEAP32[buf + 68 >> 2] = 0;
		HEAP32[buf + 72 >> 2] = stat.ctime.getTime() / 1e3 | 0;
		HEAP32[buf + 76 >> 2] = 0;
		tempI64 = [stat.ino >>> 0, (tempDouble = stat.ino, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 80 >> 2] = tempI64[0], HEAP32[buf + 84 >> 2] = tempI64[1];
		return 0
	},
	doMsync: function(addr, stream, len, flags, offset) {
		var buffer = HEAPU8.slice(addr, addr + len);
		FS.msync(stream, buffer, offset, len, flags)
	},
	doMkdir: function(path, mode) {
		path = PATH.normalize(path);
		if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
		FS.mkdir(path, mode, 0);
		return 0
	},
	doMknod: function(path, mode, dev) {
		switch (mode & 61440) {
			case 32768:
			case 8192:
			case 24576:
			case 4096:
			case 49152:
				break;
			default:
				return -28
		}
		FS.mknod(path, mode, dev);
		return 0
	},
	doReadlink: function(path, buf, bufsize) {
		if (bufsize <= 0) return -28;
		var ret = FS.readlink(path);
		var len = Math.min(bufsize, lengthBytesUTF8(ret));
		var endChar = HEAP8[buf + len];
		stringToUTF8(ret, buf, bufsize + 1);
		HEAP8[buf + len] = endChar;
		return len
	},
	doAccess: function(path, amode) {
		if (amode & ~7) {
			return -28
		}
		var node;
		var lookup = FS.lookupPath(path, {
			follow: true
		});
		node = lookup.node;
		if (!node) {
			return -44
		}
		var perms = "";
		if (amode & 4) perms += "r";
		if (amode & 2) perms += "w";
		if (amode & 1) perms += "x";
		if (perms && FS.nodePermissions(node, perms)) {
			return -2
		}
		return 0
	},
	doDup: function(path, flags, suggestFD) {
		var suggest = FS.getStream(suggestFD);
		if (suggest) FS.close(suggest);
		return FS.open(path, flags, 0, suggestFD, suggestFD).fd
	},
	doReadv: function(stream, iov, iovcnt, offset) {
		var ret = 0;
		for (var i = 0; i < iovcnt; i++) {
			var ptr = HEAP32[iov + i * 8 >> 2];
			var len = HEAP32[iov + (i * 8 + 4) >> 2];
			var curr = FS.read(stream, HEAP8, ptr, len, offset);
			if (curr < 0) return -1;
			ret += curr;
			if (curr < len) break
		}
		return ret
	},
	doWritev: function(stream, iov, iovcnt, offset) {
		var ret = 0;
		for (var i = 0; i < iovcnt; i++) {
			var ptr = HEAP32[iov + i * 8 >> 2];
			var len = HEAP32[iov + (i * 8 + 4) >> 2];
			var curr = FS.write(stream, HEAP8, ptr, len, offset);
			if (curr < 0) return -1;
			ret += curr
		}
		return ret
	},
	varargs: undefined,
	get: function() {
		SYSCALLS.varargs += 4;
		var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
		return ret
	},
	getStr: function(ptr) {
		var ret = UTF8ToString(ptr);
		return ret
	},
	getStreamFromFD: function(fd) {
		var stream = FS.getStream(fd);
		if (!stream) throw new FS.ErrnoError(8);
		return stream
	},
	get64: function(low, high) {
		return low
	}
};

function ___sys_fcntl64(fd, cmd, varargs) {
	SYSCALLS.varargs = varargs;
	try {
		var stream = SYSCALLS.getStreamFromFD(fd);
		switch (cmd) {
			case 0: {
				var arg = SYSCALLS.get();
				if (arg < 0) {
					return -28
				}
				var newStream;
				newStream = FS.open(stream.path, stream.flags, 0, arg);
				return newStream.fd
			}
			case 1:
			case 2:
				return 0;
			case 3:
				return stream.flags;
			case 4: {
				var arg = SYSCALLS.get();
				stream.flags |= arg;
				return 0
			}
			case 12: {
				var arg = SYSCALLS.get();
				var offset = 0;
				HEAP16[arg + offset >> 1] = 2;
				return 0
			}
			case 13:
			case 14:
				return 0;
			case 16:
			case 8:
				return -28;
			case 9:
				setErrNo(28);
				return -1;
			default: {
				return -28
			}
		}
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___sys_getdents64(fd, dirp, count) {
	try {
		var stream = SYSCALLS.getStreamFromFD(fd);
		if (!stream.getdents) {
			stream.getdents = FS.readdir(stream.path)
		}
		var struct_size = 280;
		var pos = 0;
		var off = FS.llseek(stream, 0, 1);
		var idx = Math.floor(off / struct_size);
		while (idx < stream.getdents.length && pos + struct_size <= count) {
			var id;
			var type;
			var name = stream.getdents[idx];
			if (name[0] === ".") {
				id = 1;
				type = 4
			} else {
				var child = FS.lookupNode(stream.node, name);
				id = child.id;
				type = FS.isChrdev(child.mode) ? 2 : FS.isDir(child.mode) ? 4 : FS.isLink(child.mode) ? 10 : 8
			}
			tempI64 = [id >>> 0, (tempDouble = id, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[dirp + pos >> 2] = tempI64[0], HEAP32[dirp + pos + 4 >> 2] = tempI64[1];
			tempI64 = [(idx + 1) * struct_size >>> 0, (tempDouble = (idx + 1) * struct_size, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[dirp + pos + 8 >> 2] = tempI64[0], HEAP32[dirp + pos + 12 >> 2] = tempI64[1];
			HEAP16[dirp + pos + 16 >> 1] = 280;
			HEAP8[dirp + pos + 18 >> 0] = type;
			stringToUTF8(name, dirp + pos + 19, 256);
			pos += struct_size;
			idx += 1
		}
		FS.llseek(stream, idx * struct_size, 0);
		return pos
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___sys_ioctl(fd, op, varargs) {
	SYSCALLS.varargs = varargs;
	try {
		var stream = SYSCALLS.getStreamFromFD(fd);
		switch (op) {
			case 21509:
			case 21505: {
				if (!stream.tty) return -59;
				return 0
			}
			case 21510:
			case 21511:
			case 21512:
			case 21506:
			case 21507:
			case 21508: {
				if (!stream.tty) return -59;
				return 0
			}
			case 21519: {
				if (!stream.tty) return -59;
				var argp = SYSCALLS.get();
				HEAP32[argp >> 2] = 0;
				return 0
			}
			case 21520: {
				if (!stream.tty) return -59;
				return -28
			}
			case 21531: {
				var argp = SYSCALLS.get();
				return FS.ioctl(stream, op, argp)
			}
			case 21523: {
				if (!stream.tty) return -59;
				return 0
			}
			case 21524: {
				if (!stream.tty) return -59;
				return 0
			}
			default:
				abort("bad ioctl syscall " + op)
		}
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function syscallMunmap(addr, len) {
	if ((addr | 0) === -1 || len === 0) {
		return -28
	}
	var info = SYSCALLS.mappings[addr];
	if (!info) return 0;
	if (len === info.len) {
		var stream = FS.getStream(info.fd);
		if (info.prot & 2) {
			SYSCALLS.doMsync(addr, stream, len, info.flags, info.offset)
		}
		FS.munmap(stream);
		SYSCALLS.mappings[addr] = null;
		if (info.allocated) {
			_free(info.malloc)
		}
	}
	return 0
}

function ___sys_munmap(addr, len) {
	try {
		return syscallMunmap(addr, len)
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function ___sys_open(path, flags, varargs) {
	SYSCALLS.varargs = varargs;
	try {
		var pathname = SYSCALLS.getStr(path);
		var mode = SYSCALLS.get();
		var stream = FS.open(pathname, flags, mode);
		return stream.fd
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return -e.errno
	}
}

function _abort() {
	abort()
}

function _emscripten_get_sbrk_ptr() {
	return 10207040
}

function _emscripten_memcpy_big(dest, src, num) {
	HEAPU8.copyWithin(dest, src, src + num)
}

function abortOnCannotGrowMemory(requestedSize) {
	abort("OOM")
}

function _emscripten_resize_heap(requestedSize) {
	requestedSize = requestedSize >>> 0;
	abortOnCannotGrowMemory(requestedSize)
}
var JSEvents = {
	inEventHandler: 0,
	removeAllEventListeners: function() {
		for (var i = JSEvents.eventHandlers.length - 1; i >= 0; --i) {
			JSEvents._removeHandler(i)
		}
		JSEvents.eventHandlers = [];
		JSEvents.deferredCalls = []
	},
	registerRemoveEventListeners: function() {
		if (!JSEvents.removeEventListenersRegistered) {
			__ATEXIT__.push(JSEvents.removeAllEventListeners);
			JSEvents.removeEventListenersRegistered = true
		}
	},
	deferredCalls: [],
	deferCall: function(targetFunction, precedence, argsList) {
		function arraysHaveEqualContent(arrA, arrB) {
			if (arrA.length != arrB.length) return false;
			for (var i in arrA) {
				if (arrA[i] != arrB[i]) return false
			}
			return true
		}
		for (var i in JSEvents.deferredCalls) {
			var call = JSEvents.deferredCalls[i];
			if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
				return
			}
		}
		JSEvents.deferredCalls.push({
			targetFunction: targetFunction,
			precedence: precedence,
			argsList: argsList
		});
		JSEvents.deferredCalls.sort(function(x, y) {
			return x.precedence < y.precedence
		})
	},
	removeDeferredCalls: function(targetFunction) {
		for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
			if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
				JSEvents.deferredCalls.splice(i, 1);
				--i
			}
		}
	},
	canPerformEventHandlerRequests: function() {
		return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls
	},
	runDeferredCalls: function() {
		if (!JSEvents.canPerformEventHandlerRequests()) {
			return
		}
		for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
			var call = JSEvents.deferredCalls[i];
			JSEvents.deferredCalls.splice(i, 1);
			--i;
			call.targetFunction.apply(null, call.argsList)
		}
	},
	eventHandlers: [],
	removeAllHandlersOnTarget: function(target, eventTypeString) {
		for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
			if (JSEvents.eventHandlers[i].target == target && (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
				JSEvents._removeHandler(i--)
			}
		}
	},
	_removeHandler: function(i) {
		var h = JSEvents.eventHandlers[i];
		h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
		JSEvents.eventHandlers.splice(i, 1)
	},
	registerOrRemoveHandler: function(eventHandler) {
		var jsEventHandler = function jsEventHandler(event) {
			++JSEvents.inEventHandler;
			JSEvents.currentEventHandler = eventHandler;
			JSEvents.runDeferredCalls();
			eventHandler.handlerFunc(event);
			JSEvents.runDeferredCalls();
			--JSEvents.inEventHandler
		};
		if (eventHandler.callbackfunc) {
			eventHandler.eventListenerFunc = jsEventHandler;
			eventHandler.target.addEventListener(eventHandler.eventTypeString, jsEventHandler, eventHandler.useCapture);
			JSEvents.eventHandlers.push(eventHandler);
			JSEvents.registerRemoveEventListeners()
		} else {
			for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
				if (JSEvents.eventHandlers[i].target == eventHandler.target && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
					JSEvents._removeHandler(i--)
				}
			}
		}
	},
	getNodeNameForTarget: function(target) {
		if (!target) return "";
		if (target == window) return "#window";
		if (target == screen) return "#screen";
		return target && target.nodeName ? target.nodeName : ""
	},
	fullscreenEnabled: function() {
		return document.fullscreenEnabled || document.webkitFullscreenEnabled
	}
};

function __fillFullscreenChangeEventData(eventStruct) {
	var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
	var isFullscreen = !!fullscreenElement;
	HEAP32[eventStruct >> 2] = isFullscreen;
	HEAP32[eventStruct + 4 >> 2] = JSEvents.fullscreenEnabled();
	var reportedElement = isFullscreen ? fullscreenElement : JSEvents.previousFullscreenElement;
	var nodeName = JSEvents.getNodeNameForTarget(reportedElement);
	var id = reportedElement && reportedElement.id ? reportedElement.id : "";
	stringToUTF8(nodeName, eventStruct + 8, 128);
	stringToUTF8(id, eventStruct + 136, 128);
	HEAP32[eventStruct + 264 >> 2] = reportedElement ? reportedElement.clientWidth : 0;
	HEAP32[eventStruct + 268 >> 2] = reportedElement ? reportedElement.clientHeight : 0;
	HEAP32[eventStruct + 272 >> 2] = screen.width;
	HEAP32[eventStruct + 276 >> 2] = screen.height;
	if (isFullscreen) {
		JSEvents.previousFullscreenElement = fullscreenElement
	}
}
var specialHTMLTargets = [0, typeof document !== "undefined" ? document : 0, typeof window !== "undefined" ? window : 0];

function __findEventTarget(target) {
	try {
		if (!target) return window;
		if (typeof target === "number") target = specialHTMLTargets[target] || UTF8ToString(target);
		if (target === "#window") return window;
		else if (target === "#document") return document;
		else if (target === "#screen") return screen;
		else if (target === "#canvas") return Module["canvas"];
		return typeof target === "string" ? document.getElementById(target) : target
	} catch (e) {
		return null
	}
}

function __registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
	if (!JSEvents.fullscreenChangeEvent) JSEvents.fullscreenChangeEvent = _malloc(280);
	var fullscreenChangeEventhandlerFunc = function(ev) {
		var e = ev || event;
		var fullscreenChangeEvent = JSEvents.fullscreenChangeEvent;
		__fillFullscreenChangeEventData(fullscreenChangeEvent);
		if (dynCall_iiii(callbackfunc, eventTypeId, fullscreenChangeEvent, userData)) e.preventDefault()
	};
	var eventHandler = {
		target: target,
		eventTypeString: eventTypeString,
		callbackfunc: callbackfunc,
		handlerFunc: fullscreenChangeEventhandlerFunc,
		useCapture: useCapture
	};
	JSEvents.registerOrRemoveHandler(eventHandler)
}

function _emscripten_set_fullscreenchange_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
	if (!JSEvents.fullscreenEnabled()) return -1;
	target = target ? __findEventTarget(target) : specialHTMLTargets[1];
	if (!target) return -4;
	__registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "fullscreenchange", targetThread);
	__registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "webkitfullscreenchange", targetThread);
	return 0
}
var ENV = {};

function __getExecutableName() {
	return thisProgram || "./this.program"
}

function getEnvStrings() {
	if (!getEnvStrings.strings) {
		var lang = (typeof navigator === "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
		var env = {
			"USER": "web_user",
			"LOGNAME": "web_user",
			"PATH": "/",
			"PWD": "/",
			"HOME": "/home/web_user",
			"LANG": lang,
			"_": __getExecutableName()
		};
		for (var x in ENV) {
			env[x] = ENV[x]
		}
		var strings = [];
		for (var x in env) {
			strings.push(x + "=" + env[x])
		}
		getEnvStrings.strings = strings
	}
	return getEnvStrings.strings
}

function _environ_get(__environ, environ_buf) {
	var bufSize = 0;
	getEnvStrings().forEach(function(string, i) {
		var ptr = environ_buf + bufSize;
		HEAP32[__environ + i * 4 >> 2] = ptr;
		writeAsciiToMemory(string, ptr);
		bufSize += string.length + 1
	});
	return 0
}

function _environ_sizes_get(penviron_count, penviron_buf_size) {
	var strings = getEnvStrings();
	HEAP32[penviron_count >> 2] = strings.length;
	var bufSize = 0;
	strings.forEach(function(string) {
		bufSize += string.length + 1
	});
	HEAP32[penviron_buf_size >> 2] = bufSize;
	return 0
}

function _exit(status) {
	exit(status)
}

function _fd_close(fd) {
	try {
		var stream = SYSCALLS.getStreamFromFD(fd);
		FS.close(stream);
		return 0
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return e.errno
	}
}

function _fd_read(fd, iov, iovcnt, pnum) {
	try {
		var stream = SYSCALLS.getStreamFromFD(fd);
		var num = SYSCALLS.doReadv(stream, iov, iovcnt);
		HEAP32[pnum >> 2] = num;
		return 0
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return e.errno
	}
}

function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
	try {
		var stream = SYSCALLS.getStreamFromFD(fd);
		var HIGH_OFFSET = 4294967296;
		var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
		var DOUBLE_LIMIT = 9007199254740992;
		if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
			return -61
		}
		FS.llseek(stream, offset, whence);
		tempI64 = [stream.position >>> 0, (tempDouble = stream.position, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
		if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
		return 0
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return e.errno
	}
}

function _fd_write(fd, iov, iovcnt, pnum) {
	try {
		var stream = SYSCALLS.getStreamFromFD(fd);
		var num = SYSCALLS.doWritev(stream, iov, iovcnt);
		HEAP32[pnum >> 2] = num;
		return 0
	} catch (e) {
		if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
		return e.errno
	}
}

function _getTempRet0() {
	return getTempRet0() | 0
}

function _glAttachShader(program, shader) {
	GLctx.attachShader(GL.programs[program], GL.shaders[shader])
}

function _glBindAttribLocation(program, index, name) {
	GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name))
}

function _glBindBuffer(target, buffer) {
	GLctx.bindBuffer(target, GL.buffers[buffer])
}

function _glBindFramebuffer(target, framebuffer) {
	GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer])
}

function _glBindRenderbuffer(target, renderbuffer) {
	GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer])
}

function _glBindTexture(target, texture) {
	GLctx.bindTexture(target, GL.textures[texture])
}

function _glBlendFunc(x0, x1) {
	GLctx["blendFunc"](x0, x1)
}

function _glBufferData(target, size, data, usage) {
	GLctx.bufferData(target, data ? HEAPU8.subarray(data, data + size) : size, usage)
}

function _glCheckFramebufferStatus(x0) {
	return GLctx["checkFramebufferStatus"](x0)
}

function _glClear(x0) {
	GLctx["clear"](x0)
}

function _glClearColor(x0, x1, x2, x3) {
	GLctx["clearColor"](x0, x1, x2, x3)
}

function _glClearDepth(x0) {
	GLctx["clearDepth"](x0)
}

function _glColorMask(red, green, blue, alpha) {
	GLctx.colorMask(!!red, !!green, !!blue, !!alpha)
}

function _glCompileShader(shader) {
	GLctx.compileShader(GL.shaders[shader])
}

function _glCreateProgram() {
	var id = GL.getNewId(GL.programs);
	var program = GLctx.createProgram();
	program.name = id;
	GL.programs[id] = program;
	return id
}

function _glCreateShader(shaderType) {
	var id = GL.getNewId(GL.shaders);
	GL.shaders[id] = GLctx.createShader(shaderType);
	return id
}

function _glDeleteFramebuffers(n, framebuffers) {
	for (var i = 0; i < n; ++i) {
		var id = HEAP32[framebuffers + i * 4 >> 2];
		var framebuffer = GL.framebuffers[id];
		if (!framebuffer) continue;
		GLctx.deleteFramebuffer(framebuffer);
		framebuffer.name = 0;
		GL.framebuffers[id] = null
	}
}

function _glDeleteProgram(id) {
	if (!id) return;
	var program = GL.programs[id];
	if (!program) {
		GL.recordError(1281);
		return
	}
	GLctx.deleteProgram(program);
	program.name = 0;
	GL.programs[id] = null;
	GL.programInfos[id] = null
}

function _glDeleteRenderbuffers(n, renderbuffers) {
	for (var i = 0; i < n; i++) {
		var id = HEAP32[renderbuffers + i * 4 >> 2];
		var renderbuffer = GL.renderbuffers[id];
		if (!renderbuffer) continue;
		GLctx.deleteRenderbuffer(renderbuffer);
		renderbuffer.name = 0;
		GL.renderbuffers[id] = null
	}
}

function _glDeleteShader(id) {
	if (!id) return;
	var shader = GL.shaders[id];
	if (!shader) {
		GL.recordError(1281);
		return
	}
	GLctx.deleteShader(shader);
	GL.shaders[id] = null
}

function _glDeleteTextures(n, textures) {
	for (var i = 0; i < n; i++) {
		var id = HEAP32[textures + i * 4 >> 2];
		var texture = GL.textures[id];
		if (!texture) continue;
		GLctx.deleteTexture(texture);
		texture.name = 0;
		GL.textures[id] = null
	}
}

function _glDepthFunc(x0) {
	GLctx["depthFunc"](x0)
}

function _glDepthMask(flag) {
	GLctx.depthMask(!!flag)
}

function _glDisable(x0) {
	GLctx["disable"](x0)
}

function _glDisableVertexAttribArray(index) {
	GLctx.disableVertexAttribArray(index)
}

function _glDrawArrays(mode, first, count) {
	GLctx.drawArrays(mode, first, count)
}

function _glEnable(x0) {
	GLctx["enable"](x0)
}

function _glEnableVertexAttribArray(index) {
	GLctx.enableVertexAttribArray(index)
}

function _glFramebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer) {
	GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget, GL.renderbuffers[renderbuffer])
}

function _glFramebufferTexture2D(target, attachment, textarget, texture, level) {
	GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level)
}

function __glGenObject(n, buffers, createFunction, objectTable) {
	for (var i = 0; i < n; i++) {
		var buffer = GLctx[createFunction]();
		var id = buffer && GL.getNewId(objectTable);
		if (buffer) {
			buffer.name = id;
			objectTable[id] = buffer
		} else {
			GL.recordError(1282)
		}
		HEAP32[buffers + i * 4 >> 2] = id
	}
}

function _glGenBuffers(n, buffers) {
	__glGenObject(n, buffers, "createBuffer", GL.buffers)
}

function _glGenFramebuffers(n, ids) {
	__glGenObject(n, ids, "createFramebuffer", GL.framebuffers)
}

function _glGenRenderbuffers(n, renderbuffers) {
	__glGenObject(n, renderbuffers, "createRenderbuffer", GL.renderbuffers)
}

function _glGenTextures(n, textures) {
	__glGenObject(n, textures, "createTexture", GL.textures)
}

function _glGetError() {
	var error = GLctx.getError() || GL.lastError;
	GL.lastError = 0;
	return error
}

function writeI53ToI64(ptr, num) {
	HEAPU32[ptr >> 2] = num;
	HEAPU32[ptr + 4 >> 2] = (num - HEAPU32[ptr >> 2]) / 4294967296
}

function emscriptenWebGLGet(name_, p, type) {
	if (!p) {
		GL.recordError(1281);
		return
	}
	var ret = undefined;
	switch (name_) {
		case 36346:
			ret = 1;
			break;
		case 36344:
			if (type != 0 && type != 1) {
				GL.recordError(1280)
			}
			return;
		case 36345:
			ret = 0;
			break;
		case 34466:
			var formats = GLctx.getParameter(34467);
			ret = formats ? formats.length : 0;
			break
	}
	if (ret === undefined) {
		var result = GLctx.getParameter(name_);
		switch (typeof result) {
			case "number":
				ret = result;
				break;
			case "boolean":
				ret = result ? 1 : 0;
				break;
			case "string":
				GL.recordError(1280);
				return;
			case "object":
				if (result === null) {
					switch (name_) {
						case 34964:
						case 35725:
						case 34965:
						case 36006:
						case 36007:
						case 32873:
						case 34229:
						case 34068: {
							ret = 0;
							break
						}
						default: {
							GL.recordError(1280);
							return
						}
					}
				} else if (result instanceof Float32Array || result instanceof Uint32Array || result instanceof Int32Array || result instanceof Array) {
					for (var i = 0; i < result.length; ++i) {
						switch (type) {
							case 0:
								HEAP32[p + i * 4 >> 2] = result[i];
								break;
							case 2:
								HEAPF32[p + i * 4 >> 2] = result[i];
								break;
							case 4:
								HEAP8[p + i >> 0] = result[i] ? 1 : 0;
								break
						}
					}
					return
				} else {
					try {
						ret = result.name | 0
					} catch (e) {
						GL.recordError(1280);
						err("GL_INVALID_ENUM in glGet" + type + "v: Unknown object returned from WebGL getParameter(" + name_ + ")! (error: " + e + ")");
						return
					}
				}
				break;
			default:
				GL.recordError(1280);
				err("GL_INVALID_ENUM in glGet" + type + "v: Native code calling glGet" + type + "v(" + name_ + ") and it returns " + result + " of type " + typeof result + "!");
				return
		}
	}
	switch (type) {
		case 1:
			writeI53ToI64(p, ret);
			break;
		case 0:
			HEAP32[p >> 2] = ret;
			break;
		case 2:
			HEAPF32[p >> 2] = ret;
			break;
		case 4:
			HEAP8[p >> 0] = ret ? 1 : 0;
			break
	}
}

function _glGetIntegerv(name_, p) {
	emscriptenWebGLGet(name_, p, 0)
}

function _glGetProgramInfoLog(program, maxLength, length, infoLog) {
	var log = GLctx.getProgramInfoLog(GL.programs[program]);
	if (log === null) log = "(unknown error)";
	var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
	if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
}

function _glGetProgramiv(program, pname, p) {
	if (!p) {
		GL.recordError(1281);
		return
	}
	if (program >= GL.counter) {
		GL.recordError(1281);
		return
	}
	var ptable = GL.programInfos[program];
	if (!ptable) {
		GL.recordError(1282);
		return
	}
	if (pname == 35716) {
		var log = GLctx.getProgramInfoLog(GL.programs[program]);
		if (log === null) log = "(unknown error)";
		HEAP32[p >> 2] = log.length + 1
	} else if (pname == 35719) {
		HEAP32[p >> 2] = ptable.maxUniformLength
	} else if (pname == 35722) {
		if (ptable.maxAttributeLength == -1) {
			program = GL.programs[program];
			var numAttribs = GLctx.getProgramParameter(program, 35721);
			ptable.maxAttributeLength = 0;
			for (var i = 0; i < numAttribs; ++i) {
				var activeAttrib = GLctx.getActiveAttrib(program, i);
				ptable.maxAttributeLength = Math.max(ptable.maxAttributeLength, activeAttrib.name.length + 1)
			}
		}
		HEAP32[p >> 2] = ptable.maxAttributeLength
	} else if (pname == 35381) {
		if (ptable.maxUniformBlockNameLength == -1) {
			program = GL.programs[program];
			var numBlocks = GLctx.getProgramParameter(program, 35382);
			ptable.maxUniformBlockNameLength = 0;
			for (var i = 0; i < numBlocks; ++i) {
				var activeBlockName = GLctx.getActiveUniformBlockName(program, i);
				ptable.maxUniformBlockNameLength = Math.max(ptable.maxUniformBlockNameLength, activeBlockName.length + 1)
			}
		}
		HEAP32[p >> 2] = ptable.maxUniformBlockNameLength
	} else {
		HEAP32[p >> 2] = GLctx.getProgramParameter(GL.programs[program], pname)
	}
}

function _glGetShaderInfoLog(shader, maxLength, length, infoLog) {
	var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
	if (log === null) log = "(unknown error)";
	var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
	if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
}

function _glGetShaderiv(shader, pname, p) {
	if (!p) {
		GL.recordError(1281);
		return
	}
	if (pname == 35716) {
		var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
		if (log === null) log = "(unknown error)";
		HEAP32[p >> 2] = log.length + 1
	} else if (pname == 35720) {
		var source = GLctx.getShaderSource(GL.shaders[shader]);
		var sourceLength = source === null || source.length == 0 ? 0 : source.length + 1;
		HEAP32[p >> 2] = sourceLength
	} else {
		HEAP32[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname)
	}
}

function jstoi_q(str) {
	return parseInt(str)
}

function _glGetUniformLocation(program, name) {
	name = UTF8ToString(name);
	var arrayIndex = 0;
	if (name[name.length - 1] == "]") {
		var leftBrace = name.lastIndexOf("[");
		arrayIndex = name[leftBrace + 1] != "]" ? jstoi_q(name.slice(leftBrace + 1)) : 0;
		name = name.slice(0, leftBrace)
	}
	var uniformInfo = GL.programInfos[program] && GL.programInfos[program].uniforms[name];
	if (uniformInfo && arrayIndex >= 0 && arrayIndex < uniformInfo[0]) {
		return uniformInfo[1] + arrayIndex
	} else {
		return -1
	}
}

function _glLineWidth(x0) {
	GLctx["lineWidth"](x0)
}

function _glLinkProgram(program) {
	GLctx.linkProgram(GL.programs[program]);
	GL.populateUniformTable(program)
}

function __computeUnpackAlignedImageSize(width, height, sizePerPixel, alignment) {
	function roundedToNextMultipleOf(x, y) {
		return x + y - 1 & -y
	}
	var plainRowSize = width * sizePerPixel;
	var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
	return height * alignedRowSize
}

function __colorChannelsInGlTextureFormat(format) {
	var colorChannels = {
		5: 3,
		6: 4,
		8: 2,
		29502: 3,
		29504: 4
	};
	return colorChannels[format - 6402] || 1
}

function __heapObjectForWebGLType(type) {
	type -= 5120;
	if (type == 1) return HEAPU8;
	if (type == 4) return HEAP32;
	if (type == 6) return HEAPF32;
	if (type == 5 || type == 28922) return HEAPU32;
	return HEAPU16
}

function __heapAccessShiftForWebGLHeap(heap) {
	return 31 - Math.clz32(heap.BYTES_PER_ELEMENT)
}

function emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) {
	var heap = __heapObjectForWebGLType(type);
	var shift = __heapAccessShiftForWebGLHeap(heap);
	var byteSize = 1 << shift;
	var sizePerPixel = __colorChannelsInGlTextureFormat(format) * byteSize;
	var bytes = __computeUnpackAlignedImageSize(width, height, sizePerPixel, GL.unpackAlignment);
	return heap.subarray(pixels >> shift, pixels + bytes >> shift)
}

function _glReadPixels(x, y, width, height, format, type, pixels) {
	var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format);
	if (!pixelData) {
		GL.recordError(1280);
		return
	}
	GLctx.readPixels(x, y, width, height, format, type, pixelData)
}

function _glRenderbufferStorage(x0, x1, x2, x3) {
	GLctx["renderbufferStorage"](x0, x1, x2, x3)
}

function _glShaderSource(shader, count, string, length) {
	var source = GL.getSource(shader, count, string, length);
	GLctx.shaderSource(GL.shaders[shader], source)
}

function _glStencilFunc(x0, x1, x2) {
	GLctx["stencilFunc"](x0, x1, x2)
}

function _glStencilOp(x0, x1, x2) {
	GLctx["stencilOp"](x0, x1, x2)
}

function _glTexImage2D(target, level, internalFormat, width, height, border, format, type, pixels) {
	GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null)
}

function _glTexParameteri(x0, x1, x2) {
	GLctx["texParameteri"](x0, x1, x2)
}

function _glUniform1f(location, v0) {
	GLctx.uniform1f(GL.uniforms[location], v0)
}

function _glUniform1i(location, v0) {
	GLctx.uniform1i(GL.uniforms[location], v0)
}

function _glUniform4f(location, v0, v1, v2, v3) {
	GLctx.uniform4f(GL.uniforms[location], v0, v1, v2, v3)
}
var __miniTempWebGLFloatBuffers = [];

function _glUniformMatrix4fv(location, count, transpose, value) {
	if (count <= 18) {
		var view = __miniTempWebGLFloatBuffers[16 * count - 1];
		var heap = HEAPF32;
		value >>= 2;
		for (var i = 0; i < 16 * count; i += 16) {
			var dst = value + i;
			view[i] = heap[dst];
			view[i + 1] = heap[dst + 1];
			view[i + 2] = heap[dst + 2];
			view[i + 3] = heap[dst + 3];
			view[i + 4] = heap[dst + 4];
			view[i + 5] = heap[dst + 5];
			view[i + 6] = heap[dst + 6];
			view[i + 7] = heap[dst + 7];
			view[i + 8] = heap[dst + 8];
			view[i + 9] = heap[dst + 9];
			view[i + 10] = heap[dst + 10];
			view[i + 11] = heap[dst + 11];
			view[i + 12] = heap[dst + 12];
			view[i + 13] = heap[dst + 13];
			view[i + 14] = heap[dst + 14];
			view[i + 15] = heap[dst + 15]
		}
	} else {
		var view = HEAPF32.subarray(value >> 2, value + count * 64 >> 2)
	}
	GLctx.uniformMatrix4fv(GL.uniforms[location], !!transpose, view)
}

function _glUseProgram(program) {
	GLctx.useProgram(GL.programs[program])
}

function _glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
	GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr)
}

function _glViewport(x0, x1, x2, x3) {
	GLctx["viewport"](x0, x1, x2, x3)
}

function _llvm_eh_typeid_for(type) {
	return type
}
var ___tm_current = 10207056;
var ___tm_timezone = (stringToUTF8("GMT", 10207104, 4), 10207104);

function _tzset() {
	if (_tzset.called) return;
	_tzset.called = true;
	HEAP32[__get_timezone() >> 2] = (new Date).getTimezoneOffset() * 60;
	var currentYear = (new Date).getFullYear();
	var winter = new Date(currentYear, 0, 1);
	var summer = new Date(currentYear, 6, 1);
	HEAP32[__get_daylight() >> 2] = Number(winter.getTimezoneOffset() != summer.getTimezoneOffset());

	function extractZone(date) {
		var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
		return match ? match[1] : "GMT"
	}
	var winterName = extractZone(winter);
	var summerName = extractZone(summer);
	var winterNamePtr = allocateUTF8(winterName);
	var summerNamePtr = allocateUTF8(summerName);
	if (summer.getTimezoneOffset() < winter.getTimezoneOffset()) {
		HEAP32[__get_tzname() >> 2] = winterNamePtr;
		HEAP32[__get_tzname() + 4 >> 2] = summerNamePtr
	} else {
		HEAP32[__get_tzname() >> 2] = summerNamePtr;
		HEAP32[__get_tzname() + 4 >> 2] = winterNamePtr
	}
}

function _localtime_r(time, tmPtr) {
	_tzset();
	var date = new Date(HEAP32[time >> 2] * 1e3);
	HEAP32[tmPtr >> 2] = date.getSeconds();
	HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
	HEAP32[tmPtr + 8 >> 2] = date.getHours();
	HEAP32[tmPtr + 12 >> 2] = date.getDate();
	HEAP32[tmPtr + 16 >> 2] = date.getMonth();
	HEAP32[tmPtr + 20 >> 2] = date.getFullYear() - 1900;
	HEAP32[tmPtr + 24 >> 2] = date.getDay();
	var start = new Date(date.getFullYear(), 0, 1);
	var yday = (date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24) | 0;
	HEAP32[tmPtr + 28 >> 2] = yday;
	HEAP32[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60);
	var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
	var winterOffset = start.getTimezoneOffset();
	var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
	HEAP32[tmPtr + 32 >> 2] = dst;
	var zonePtr = HEAP32[__get_tzname() + (dst ? 4 : 0) >> 2];
	HEAP32[tmPtr + 40 >> 2] = zonePtr;
	return tmPtr
}

function _localtime(time) {
	return _localtime_r(time, ___tm_current)
}

function _setTempRet0($i) {
	setTempRet0($i | 0)
}

function __isLeapYear(year) {
	return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

function __arraySum(array, index) {
	var sum = 0;
	for (var i = 0; i <= index; sum += array[i++]) {}
	return sum
}
var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function __addDays(date, days) {
	var newDate = new Date(date.getTime());
	while (days > 0) {
		var leap = __isLeapYear(newDate.getFullYear());
		var currentMonth = newDate.getMonth();
		var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
		if (days > daysInCurrentMonth - newDate.getDate()) {
			days -= daysInCurrentMonth - newDate.getDate() + 1;
			newDate.setDate(1);
			if (currentMonth < 11) {
				newDate.setMonth(currentMonth + 1)
			} else {
				newDate.setMonth(0);
				newDate.setFullYear(newDate.getFullYear() + 1)
			}
		} else {
			newDate.setDate(newDate.getDate() + days);
			return newDate
		}
	}
	return newDate
}

function _strftime(s, maxsize, format, tm) {
	var tm_zone = HEAP32[tm + 40 >> 2];
	var date = {
		tm_sec: HEAP32[tm >> 2],
		tm_min: HEAP32[tm + 4 >> 2],
		tm_hour: HEAP32[tm + 8 >> 2],
		tm_mday: HEAP32[tm + 12 >> 2],
		tm_mon: HEAP32[tm + 16 >> 2],
		tm_year: HEAP32[tm + 20 >> 2],
		tm_wday: HEAP32[tm + 24 >> 2],
		tm_yday: HEAP32[tm + 28 >> 2],
		tm_isdst: HEAP32[tm + 32 >> 2],
		tm_gmtoff: HEAP32[tm + 36 >> 2],
		tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
	};
	var pattern = UTF8ToString(format);
	var EXPANSION_RULES_1 = {
		"%c": "%a %b %d %H:%M:%S %Y",
		"%D": "%m/%d/%y",
		"%F": "%Y-%m-%d",
		"%h": "%b",
		"%r": "%I:%M:%S %p",
		"%R": "%H:%M",
		"%T": "%H:%M:%S",
		"%x": "%m/%d/%y",
		"%X": "%H:%M:%S",
		"%Ec": "%c",
		"%EC": "%C",
		"%Ex": "%m/%d/%y",
		"%EX": "%H:%M:%S",
		"%Ey": "%y",
		"%EY": "%Y",
		"%Od": "%d",
		"%Oe": "%e",
		"%OH": "%H",
		"%OI": "%I",
		"%Om": "%m",
		"%OM": "%M",
		"%OS": "%S",
		"%Ou": "%u",
		"%OU": "%U",
		"%OV": "%V",
		"%Ow": "%w",
		"%OW": "%W",
		"%Oy": "%y"
	};
	for (var rule in EXPANSION_RULES_1) {
		pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule])
	}
	var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	function leadingSomething(value, digits, character) {
		var str = typeof value === "number" ? value.toString() : value || "";
		while (str.length < digits) {
			str = character[0] + str
		}
		return str
	}

	function leadingNulls(value, digits) {
		return leadingSomething(value, digits, "0")
	}

	function compareByDay(date1, date2) {
		function sgn(value) {
			return value < 0 ? -1 : value > 0 ? 1 : 0
		}
		var compare;
		if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
			if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
				compare = sgn(date1.getDate() - date2.getDate())
			}
		}
		return compare
	}

	function getFirstWeekStartDate(janFourth) {
		switch (janFourth.getDay()) {
			case 0:
				return new Date(janFourth.getFullYear() - 1, 11, 29);
			case 1:
				return janFourth;
			case 2:
				return new Date(janFourth.getFullYear(), 0, 3);
			case 3:
				return new Date(janFourth.getFullYear(), 0, 2);
			case 4:
				return new Date(janFourth.getFullYear(), 0, 1);
			case 5:
				return new Date(janFourth.getFullYear() - 1, 11, 31);
			case 6:
				return new Date(janFourth.getFullYear() - 1, 11, 30)
		}
	}

	function getWeekBasedYear(date) {
		var thisDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
		var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
		var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
		var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
		var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
		if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
			if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
				return thisDate.getFullYear() + 1
			} else {
				return thisDate.getFullYear()
			}
		} else {
			return thisDate.getFullYear() - 1
		}
	}
	var EXPANSION_RULES_2 = {
		"%a": function(date) {
			return WEEKDAYS[date.tm_wday].substring(0, 3)
		},
		"%A": function(date) {
			return WEEKDAYS[date.tm_wday]
		},
		"%b": function(date) {
			return MONTHS[date.tm_mon].substring(0, 3)
		},
		"%B": function(date) {
			return MONTHS[date.tm_mon]
		},
		"%C": function(date) {
			var year = date.tm_year + 1900;
			return leadingNulls(year / 100 | 0, 2)
		},
		"%d": function(date) {
			return leadingNulls(date.tm_mday, 2)
		},
		"%e": function(date) {
			return leadingSomething(date.tm_mday, 2, " ")
		},
		"%g": function(date) {
			return getWeekBasedYear(date).toString().substring(2)
		},
		"%G": function(date) {
			return getWeekBasedYear(date)
		},
		"%H": function(date) {
			return leadingNulls(date.tm_hour, 2)
		},
		"%I": function(date) {
			var twelveHour = date.tm_hour;
			if (twelveHour == 0) twelveHour = 12;
			else if (twelveHour > 12) twelveHour -= 12;
			return leadingNulls(twelveHour, 2)
		},
		"%j": function(date) {
			return leadingNulls(date.tm_mday + __arraySum(__isLeapYear(date.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon - 1), 3)
		},
		"%m": function(date) {
			return leadingNulls(date.tm_mon + 1, 2)
		},
		"%M": function(date) {
			return leadingNulls(date.tm_min, 2)
		},
		"%n": function() {
			return "\n"
		},
		"%p": function(date) {
			if (date.tm_hour >= 0 && date.tm_hour < 12) {
				return "AM"
			} else {
				return "PM"
			}
		},
		"%S": function(date) {
			return leadingNulls(date.tm_sec, 2)
		},
		"%t": function() {
			return "\t"
		},
		"%u": function(date) {
			return date.tm_wday || 7
		},
		"%U": function(date) {
			var janFirst = new Date(date.tm_year + 1900, 0, 1);
			var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7 - janFirst.getDay());
			var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);
			if (compareByDay(firstSunday, endDate) < 0) {
				var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
				var firstSundayUntilEndJanuary = 31 - firstSunday.getDate();
				var days = firstSundayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
				return leadingNulls(Math.ceil(days / 7), 2)
			}
			return compareByDay(firstSunday, janFirst) === 0 ? "01" : "00"
		},
		"%V": function(date) {
			var janFourthThisYear = new Date(date.tm_year + 1900, 0, 4);
			var janFourthNextYear = new Date(date.tm_year + 1901, 0, 4);
			var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
			var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
			var endDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
			if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
				return "53"
			}
			if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
				return "01"
			}
			var daysDifference;
			if (firstWeekStartThisYear.getFullYear() < date.tm_year + 1900) {
				daysDifference = date.tm_yday + 32 - firstWeekStartThisYear.getDate()
			} else {
				daysDifference = date.tm_yday + 1 - firstWeekStartThisYear.getDate()
			}
			return leadingNulls(Math.ceil(daysDifference / 7), 2)
		},
		"%w": function(date) {
			return date.tm_wday
		},
		"%W": function(date) {
			var janFirst = new Date(date.tm_year, 0, 1);
			var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1);
			var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);
			if (compareByDay(firstMonday, endDate) < 0) {
				var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
				var firstMondayUntilEndJanuary = 31 - firstMonday.getDate();
				var days = firstMondayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
				return leadingNulls(Math.ceil(days / 7), 2)
			}
			return compareByDay(firstMonday, janFirst) === 0 ? "01" : "00"
		},
		"%y": function(date) {
			return (date.tm_year + 1900).toString().substring(2)
		},
		"%Y": function(date) {
			return date.tm_year + 1900
		},
		"%z": function(date) {
			var off = date.tm_gmtoff;
			var ahead = off >= 0;
			off = Math.abs(off) / 60;
			off = off / 60 * 100 + off % 60;
			return (ahead ? "+" : "-") + String("0000" + off).slice(-4)
		},
		"%Z": function(date) {
			return date.tm_zone
		},
		"%%": function() {
			return "%"
		}
	};
	for (var rule in EXPANSION_RULES_2) {
		if (pattern.indexOf(rule) >= 0) {
			pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date))
		}
	}
	var bytes = intArrayFromString(pattern, false);
	if (bytes.length > maxsize) {
		return 0
	}
	writeArrayToMemory(bytes, s);
	return bytes.length - 1
}

function _strftime_l(s, maxsize, format, tm) {
	return _strftime(s, maxsize, format, tm)
}

function _time(ptr) {
	var ret = Date.now() / 1e3 | 0;
	if (ptr) {
		HEAP32[ptr >> 2] = ret
	}
	return ret
}
var __readAsmConstArgsArray = [];

function readAsmConstArgs(sigPtr, buf) {
	__readAsmConstArgsArray.length = 0;
	var ch;
	buf >>= 2;
	while (ch = HEAPU8[sigPtr++]) {
		var double = ch < 105;
		if (double && buf & 1) buf++;
		__readAsmConstArgsArray.push(double ? HEAPF64[buf++ >> 1] : HEAP32[buf]);
		++buf
	}
	return __readAsmConstArgsArray
}
var FSNode = function(parent, name, mode, rdev) {
	if (!parent) {
		parent = this
	}
	this.parent = parent;
	this.mount = parent.mount;
	this.mounted = null;
	this.id = FS.nextInode++;
	this.name = name;
	this.mode = mode;
	this.node_ops = {};
	this.stream_ops = {};
	this.rdev = rdev
};
var readMode = 292 | 73;
var writeMode = 146;
Object.defineProperties(FSNode.prototype, {
	read: {
		get: function() {
			return (this.mode & readMode) === readMode
		},
		set: function(val) {
			val ? this.mode |= readMode : this.mode &= ~readMode
		}
	},
	write: {
		get: function() {
			return (this.mode & writeMode) === writeMode
		},
		set: function(val) {
			val ? this.mode |= writeMode : this.mode &= ~writeMode
		}
	},
	isFolder: {
		get: function() {
			return FS.isDir(this.mode)
		}
	},
	isDevice: {
		get: function() {
			return FS.isChrdev(this.mode)
		}
	}
});
FS.FSNode = FSNode;
FS.staticInit();
Module["requestFullscreen"] = function Module_requestFullscreen(lockPointer, resizeCanvas) {
	Browser.requestFullscreen(lockPointer, resizeCanvas)
};
Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) {
	Browser.requestAnimationFrame(func)
};
Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) {
	Browser.setCanvasSize(width, height, noUpdates)
};
Module["pauseMainLoop"] = function Module_pauseMainLoop() {
	Browser.mainLoop.pause()
};
Module["resumeMainLoop"] = function Module_resumeMainLoop() {
	Browser.mainLoop.resume()
};
Module["getUserMedia"] = function Module_getUserMedia() {
	Browser.getUserMedia()
};
Module["createContext"] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
	return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes)
};
var GLctx;
var __miniTempWebGLFloatBuffersStorage = new Float32Array(288);
for (var i = 0; i < 288; ++i) {
	__miniTempWebGLFloatBuffers[i] = __miniTempWebGLFloatBuffersStorage.subarray(0, i + 1)
}
var ASSERTIONS = false;

function intArrayFromString(stringy, dontAddNull, length) {
	var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
	var u8array = new Array(len);
	var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
	if (dontAddNull) u8array.length = numBytesWritten;
	return u8array
}
var asmLibraryArg = {
	"SDL_CreateRGBSurface": _SDL_CreateRGBSurface,
	"SDL_EnableKeyRepeat": _SDL_EnableKeyRepeat,
	"SDL_EnableUNICODE": _SDL_EnableUNICODE,
	"SDL_FillRect": _SDL_FillRect,
	"SDL_FreeSurface": _SDL_FreeSurface,
	"SDL_GL_SetAttribute": _SDL_GL_SetAttribute,
	"SDL_GL_SwapBuffers": _SDL_GL_SwapBuffers,
	"SDL_GetKeyName": _SDL_GetKeyName,
	"SDL_GetKeyState": _SDL_GetKeyState,
	"SDL_GetMouseState": _SDL_GetMouseState,
	"SDL_GetTicks": _SDL_GetTicks,
	"SDL_Init": _SDL_Init,
	"SDL_LockSurface": _SDL_LockSurface,
	"SDL_PollEvent": _SDL_PollEvent,
	"SDL_Quit": _SDL_Quit,
	"SDL_RWFromFile": _SDL_RWFromFile,
	"SDL_SaveBMP_RW": _SDL_SaveBMP_RW,
	"SDL_SetVideoMode": _SDL_SetVideoMode,
	"SDL_ShowCursor": _SDL_ShowCursor,
	"SDL_UnlockSurface": _SDL_UnlockSurface,
	"SDL_UpdateRect": _SDL_UpdateRect,
	"SDL_UpperBlit": _SDL_UpperBlit,
	"SDL_WM_GrabInput": _SDL_WM_GrabInput,
	"SDL_WM_SetCaption": _SDL_WM_SetCaption,
	"SDL_WarpMouse": _SDL_WarpMouse,
	"__assert_fail": ___assert_fail,
	"__cxa_allocate_exception": ___cxa_allocate_exception,
	"__cxa_atexit": ___cxa_atexit,
	"__cxa_begin_catch": ___cxa_begin_catch,
	"__cxa_end_catch": ___cxa_end_catch,
	"__cxa_find_matching_catch_2": ___cxa_find_matching_catch_2,
	"__cxa_find_matching_catch_3": ___cxa_find_matching_catch_3,
	"__cxa_find_matching_catch_4": ___cxa_find_matching_catch_4,
	"__cxa_find_matching_catch_5": ___cxa_find_matching_catch_5,
	"__cxa_free_exception": ___cxa_free_exception,
	"__cxa_rethrow": ___cxa_rethrow,
	"__cxa_throw": ___cxa_throw,
	"__cxa_uncaught_exceptions": ___cxa_uncaught_exceptions,
	"__map_file": ___map_file,
	"__resumeException": ___resumeException,
	"__sys_fcntl64": ___sys_fcntl64,
	"__sys_getdents64": ___sys_getdents64,
	"__sys_ioctl": ___sys_ioctl,
	"__sys_munmap": ___sys_munmap,
	"__sys_open": ___sys_open,
	"abort": _abort,
	"emscripten_asm_const_dii": _emscripten_asm_const_dii,
	"emscripten_asm_const_iii": _emscripten_asm_const_iii,
	"emscripten_get_sbrk_ptr": _emscripten_get_sbrk_ptr,
	"emscripten_memcpy_big": _emscripten_memcpy_big,
	"emscripten_resize_heap": _emscripten_resize_heap,
	"emscripten_set_fullscreenchange_callback_on_thread": _emscripten_set_fullscreenchange_callback_on_thread,
	"emscripten_set_main_loop": _emscripten_set_main_loop,
	"environ_get": _environ_get,
	"environ_sizes_get": _environ_sizes_get,
	"exit": _exit,
	"fd_close": _fd_close,
	"fd_read": _fd_read,
	"fd_seek": _fd_seek,
	"fd_write": _fd_write,
	"getTempRet0": _getTempRet0,
	"glAttachShader": _glAttachShader,
	"glBindAttribLocation": _glBindAttribLocation,
	"glBindBuffer": _glBindBuffer,
	"glBindFramebuffer": _glBindFramebuffer,
	"glBindRenderbuffer": _glBindRenderbuffer,
	"glBindTexture": _glBindTexture,
	"glBlendFunc": _glBlendFunc,
	"glBufferData": _glBufferData,
	"glCheckFramebufferStatus": _glCheckFramebufferStatus,
	"glClear": _glClear,
	"glClearColor": _glClearColor,
	"glClearDepth": _glClearDepth,
	"glColorMask": _glColorMask,
	"glCompileShader": _glCompileShader,
	"glCreateProgram": _glCreateProgram,
	"glCreateShader": _glCreateShader,
	"glDeleteFramebuffers": _glDeleteFramebuffers,
	"glDeleteProgram": _glDeleteProgram,
	"glDeleteRenderbuffers": _glDeleteRenderbuffers,
	"glDeleteShader": _glDeleteShader,
	"glDeleteTextures": _glDeleteTextures,
	"glDepthFunc": _glDepthFunc,
	"glDepthMask": _glDepthMask,
	"glDisable": _glDisable,
	"glDisableVertexAttribArray": _glDisableVertexAttribArray,
	"glDrawArrays": _glDrawArrays,
	"glEnable": _glEnable,
	"glEnableVertexAttribArray": _glEnableVertexAttribArray,
	"glFramebufferRenderbuffer": _glFramebufferRenderbuffer,
	"glFramebufferTexture2D": _glFramebufferTexture2D,
	"glGenBuffers": _glGenBuffers,
	"glGenFramebuffers": _glGenFramebuffers,
	"glGenRenderbuffers": _glGenRenderbuffers,
	"glGenTextures": _glGenTextures,
	"glGetError": _glGetError,
	"glGetIntegerv": _glGetIntegerv,
	"glGetProgramInfoLog": _glGetProgramInfoLog,
	"glGetProgramiv": _glGetProgramiv,
	"glGetShaderInfoLog": _glGetShaderInfoLog,
	"glGetShaderiv": _glGetShaderiv,
	"glGetUniformLocation": _glGetUniformLocation,
	"glLineWidth": _glLineWidth,
	"glLinkProgram": _glLinkProgram,
	"glReadPixels": _glReadPixels,
	"glRenderbufferStorage": _glRenderbufferStorage,
	"glShaderSource": _glShaderSource,
	"glStencilFunc": _glStencilFunc,
	"glStencilOp": _glStencilOp,
	"glTexImage2D": _glTexImage2D,
	"glTexParameteri": _glTexParameteri,
	"glUniform1f": _glUniform1f,
	"glUniform1i": _glUniform1i,
	"glUniform4f": _glUniform4f,
	"glUniformMatrix4fv": _glUniformMatrix4fv,
	"glUseProgram": _glUseProgram,
	"glVertexAttribPointer": _glVertexAttribPointer,
	"glViewport": _glViewport,
	"invoke_d": invoke_d,
	"invoke_dd": invoke_dd,
	"invoke_di": invoke_di,
	"invoke_dii": invoke_dii,
	"invoke_diii": invoke_diii,
	"invoke_diij": invoke_diij,
	"invoke_fiii": invoke_fiii,
	"invoke_i": invoke_i,
	"invoke_ii": invoke_ii,
	"invoke_iid": invoke_iid,
	"invoke_iii": invoke_iii,
	"invoke_iiid": invoke_iiid,
	"invoke_iiii": invoke_iiii,
	"invoke_iiiii": invoke_iiiii,
	"invoke_iiiiid": invoke_iiiiid,
	"invoke_iiiiidi": invoke_iiiiidi,
	"invoke_iiiiii": invoke_iiiiii,
	"invoke_iiiiiii": invoke_iiiiiii,
	"invoke_iiiiiiii": invoke_iiiiiiii,
	"invoke_iiiiiiiii": invoke_iiiiiiiii,
	"invoke_iiiiiiiiii": invoke_iiiiiiiiii,
	"invoke_iiiiiiiiiii": invoke_iiiiiiiiiii,
	"invoke_iiiiiiiiiiii": invoke_iiiiiiiiiiii,
	"invoke_iiiiiiiiiiiii": invoke_iiiiiiiiiiiii,
	"invoke_iiiiij": invoke_iiiiij,
	"invoke_iiiij": invoke_iiiij,
	"invoke_iiij": invoke_iiij,
	"invoke_iij": invoke_iij,
	"invoke_iiji": invoke_iiji,
	"invoke_jiiii": invoke_jiiii,
	"invoke_v": invoke_v,
	"invoke_vd": invoke_vd,
	"invoke_vdd": invoke_vdd,
	"invoke_vdi": invoke_vdi,
	"invoke_vdiii": invoke_vdiii,
	"invoke_vf": invoke_vf,
	"invoke_vffff": invoke_vffff,
	"invoke_vi": invoke_vi,
	"invoke_vid": invoke_vid,
	"invoke_vidd": invoke_vidd,
	"invoke_viddd": invoke_viddd,
	"invoke_viddddii": invoke_viddddii,
	"invoke_viddi": invoke_viddi,
	"invoke_vidi": invoke_vidi,
	"invoke_vidiiii": invoke_vidiiii,
	"invoke_vif": invoke_vif,
	"invoke_viffff": invoke_viffff,
	"invoke_vii": invoke_vii,
	"invoke_viid": invoke_viid,
	"invoke_viiddd": invoke_viiddd,
	"invoke_viii": invoke_viii,
	"invoke_viiid": invoke_viiid,
	"invoke_viiiddii": invoke_viiiddii,
	"invoke_viiididj": invoke_viiididj,
	"invoke_viiidii": invoke_viiidii,
	"invoke_viiidiii": invoke_viiidiii,
	"invoke_viiii": invoke_viiii,
	"invoke_viiiid": invoke_viiiid,
	"invoke_viiiiddi": invoke_viiiiddi,
	"invoke_viiiii": invoke_viiiii,
	"invoke_viiiiii": invoke_viiiiii,
	"invoke_viiiiiii": invoke_viiiiiii,
	"invoke_viiiiiiii": invoke_viiiiiiii,
	"invoke_viiiiiiiii": invoke_viiiiiiiii,
	"invoke_viiiiiiiiii": invoke_viiiiiiiiii,
	"invoke_viiiiiiiiiiiiiii": invoke_viiiiiiiiiiiiiii,
	"invoke_viiiiiiiiiiiiiiii": invoke_viiiiiiiiiiiiiiii,
	"invoke_viij": invoke_viij,
	"invoke_vij": invoke_vij,
	"llvm_eh_typeid_for": _llvm_eh_typeid_for,
	"localtime": _localtime,
	"memory": wasmMemory,
	"setTempRet0": _setTempRet0,
	"strftime": _strftime,
	"strftime_l": _strftime_l,
	"table": wasmTable,
	"time": _time
};
var asm = createWasm();
var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function() {
	return (___wasm_call_ctors = Module["___wasm_call_ctors"] = Module["asm"]["__wasm_call_ctors"]).apply(null, arguments)
};
var _memcpy = Module["_memcpy"] = function() {
	return (_memcpy = Module["_memcpy"] = Module["asm"]["memcpy"]).apply(null, arguments)
};
var _memset = Module["_memset"] = function() {
	return (_memset = Module["_memset"] = Module["asm"]["memset"]).apply(null, arguments)
};
var _free = Module["_free"] = function() {
	return (_free = Module["_free"] = Module["asm"]["free"]).apply(null, arguments)
};
var _main = Module["_main"] = function() {
	return (_main = Module["_main"] = Module["asm"]["main"]).apply(null, arguments)
};
var _use_file = Module["_use_file"] = function() {
	return (_use_file = Module["_use_file"] = Module["asm"]["use_file"]).apply(null, arguments)
};
var _malloc = Module["_malloc"] = function() {
	return (_malloc = Module["_malloc"] = Module["asm"]["malloc"]).apply(null, arguments)
};
var ___errno_location = Module["___errno_location"] = function() {
	return (___errno_location = Module["___errno_location"] = Module["asm"]["__errno_location"]).apply(null, arguments)
};
var __get_tzname = Module["__get_tzname"] = function() {
	return (__get_tzname = Module["__get_tzname"] = Module["asm"]["_get_tzname"]).apply(null, arguments)
};
var __get_daylight = Module["__get_daylight"] = function() {
	return (__get_daylight = Module["__get_daylight"] = Module["asm"]["_get_daylight"]).apply(null, arguments)
};
var __get_timezone = Module["__get_timezone"] = function() {
	return (__get_timezone = Module["__get_timezone"] = Module["asm"]["_get_timezone"]).apply(null, arguments)
};
var _setThrew = Module["_setThrew"] = function() {
	return (_setThrew = Module["_setThrew"] = Module["asm"]["setThrew"]).apply(null, arguments)
};
var stackSave = Module["stackSave"] = function() {
	return (stackSave = Module["stackSave"] = Module["asm"]["stackSave"]).apply(null, arguments)
};
var stackRestore = Module["stackRestore"] = function() {
	return (stackRestore = Module["stackRestore"] = Module["asm"]["stackRestore"]).apply(null, arguments)
};
var stackAlloc = Module["stackAlloc"] = function() {
	return (stackAlloc = Module["stackAlloc"] = Module["asm"]["stackAlloc"]).apply(null, arguments)
};
var __ZSt18uncaught_exceptionv = Module["__ZSt18uncaught_exceptionv"] = function() {
	return (__ZSt18uncaught_exceptionv = Module["__ZSt18uncaught_exceptionv"] = Module["asm"]["_ZSt18uncaught_exceptionv"]).apply(null, arguments)
};
var ___cxa_can_catch = Module["___cxa_can_catch"] = function() {
	return (___cxa_can_catch = Module["___cxa_can_catch"] = Module["asm"]["__cxa_can_catch"]).apply(null, arguments)
};
var ___cxa_is_pointer_type = Module["___cxa_is_pointer_type"] = function() {
	return (___cxa_is_pointer_type = Module["___cxa_is_pointer_type"] = Module["asm"]["__cxa_is_pointer_type"]).apply(null, arguments)
};
var dynCall_v = Module["dynCall_v"] = function() {
	return (dynCall_v = Module["dynCall_v"] = Module["asm"]["dynCall_v"]).apply(null, arguments)
};
var dynCall_vi = Module["dynCall_vi"] = function() {
	return (dynCall_vi = Module["dynCall_vi"] = Module["asm"]["dynCall_vi"]).apply(null, arguments)
};
var dynCall_vii = Module["dynCall_vii"] = function() {
	return (dynCall_vii = Module["dynCall_vii"] = Module["asm"]["dynCall_vii"]).apply(null, arguments)
};
var dynCall_viii = Module["dynCall_viii"] = function() {
	return (dynCall_viii = Module["dynCall_viii"] = Module["asm"]["dynCall_viii"]).apply(null, arguments)
};
var dynCall_viiii = Module["dynCall_viiii"] = function() {
	return (dynCall_viiii = Module["dynCall_viiii"] = Module["asm"]["dynCall_viiii"]).apply(null, arguments)
};
var dynCall_viiiii = Module["dynCall_viiiii"] = function() {
	return (dynCall_viiiii = Module["dynCall_viiiii"] = Module["asm"]["dynCall_viiiii"]).apply(null, arguments)
};
var dynCall_viiiiii = Module["dynCall_viiiiii"] = function() {
	return (dynCall_viiiiii = Module["dynCall_viiiiii"] = Module["asm"]["dynCall_viiiiii"]).apply(null, arguments)
};
var dynCall_viiiiiii = Module["dynCall_viiiiiii"] = function() {
	return (dynCall_viiiiiii = Module["dynCall_viiiiiii"] = Module["asm"]["dynCall_viiiiiii"]).apply(null, arguments)
};
var dynCall_viiiiiiii = Module["dynCall_viiiiiiii"] = function() {
	return (dynCall_viiiiiiii = Module["dynCall_viiiiiiii"] = Module["asm"]["dynCall_viiiiiiii"]).apply(null, arguments)
};
var dynCall_viiiiiiiii = Module["dynCall_viiiiiiiii"] = function() {
	return (dynCall_viiiiiiiii = Module["dynCall_viiiiiiiii"] = Module["asm"]["dynCall_viiiiiiiii"]).apply(null, arguments)
};
var dynCall_viiiiiiiiii = Module["dynCall_viiiiiiiiii"] = function() {
	return (dynCall_viiiiiiiiii = Module["dynCall_viiiiiiiiii"] = Module["asm"]["dynCall_viiiiiiiiii"]).apply(null, arguments)
};
var dynCall_viiiiiiiiiiiiiii = Module["dynCall_viiiiiiiiiiiiiii"] = function() {
	return (dynCall_viiiiiiiiiiiiiii = Module["dynCall_viiiiiiiiiiiiiii"] = Module["asm"]["dynCall_viiiiiiiiiiiiiii"]).apply(null, arguments)
};
var dynCall_viiiiiiiiiiiiiiii = Module["dynCall_viiiiiiiiiiiiiiii"] = function() {
	return (dynCall_viiiiiiiiiiiiiiii = Module["dynCall_viiiiiiiiiiiiiiii"] = Module["asm"]["dynCall_viiiiiiiiiiiiiiii"]).apply(null, arguments)
};
var dynCall_viiiid = Module["dynCall_viiiid"] = function() {
	return (dynCall_viiiid = Module["dynCall_viiiid"] = Module["asm"]["dynCall_viiiid"]).apply(null, arguments)
};
var dynCall_viiiiddi = Module["dynCall_viiiiddi"] = function() {
	return (dynCall_viiiiddi = Module["dynCall_viiiiddi"] = Module["asm"]["dynCall_viiiiddi"]).apply(null, arguments)
};
var dynCall_viiid = Module["dynCall_viiid"] = function() {
	return (dynCall_viiid = Module["dynCall_viiid"] = Module["asm"]["dynCall_viiid"]).apply(null, arguments)
};
var dynCall_viiidii = Module["dynCall_viiidii"] = function() {
	return (dynCall_viiidii = Module["dynCall_viiidii"] = Module["asm"]["dynCall_viiidii"]).apply(null, arguments)
};
var dynCall_viiidiii = Module["dynCall_viiidiii"] = function() {
	return (dynCall_viiidiii = Module["dynCall_viiidiii"] = Module["asm"]["dynCall_viiidiii"]).apply(null, arguments)
};
var dynCall_viiididj = Module["dynCall_viiididj"] = function() {
	return (dynCall_viiididj = Module["dynCall_viiididj"] = Module["asm"]["dynCall_viiididj"]).apply(null, arguments)
};
var dynCall_viiiddii = Module["dynCall_viiiddii"] = function() {
	return (dynCall_viiiddii = Module["dynCall_viiiddii"] = Module["asm"]["dynCall_viiiddii"]).apply(null, arguments)
};
var dynCall_viij = Module["dynCall_viij"] = function() {
	return (dynCall_viij = Module["dynCall_viij"] = Module["asm"]["dynCall_viij"]).apply(null, arguments)
};
var dynCall_viid = Module["dynCall_viid"] = function() {
	return (dynCall_viid = Module["dynCall_viid"] = Module["asm"]["dynCall_viid"]).apply(null, arguments)
};
var dynCall_viiddd = Module["dynCall_viiddd"] = function() {
	return (dynCall_viiddd = Module["dynCall_viiddd"] = Module["asm"]["dynCall_viiddd"]).apply(null, arguments)
};
var dynCall_vij = Module["dynCall_vij"] = function() {
	return (dynCall_vij = Module["dynCall_vij"] = Module["asm"]["dynCall_vij"]).apply(null, arguments)
};
var dynCall_vif = Module["dynCall_vif"] = function() {
	return (dynCall_vif = Module["dynCall_vif"] = Module["asm"]["dynCall_vif"]).apply(null, arguments)
};
var dynCall_viffff = Module["dynCall_viffff"] = function() {
	return (dynCall_viffff = Module["dynCall_viffff"] = Module["asm"]["dynCall_viffff"]).apply(null, arguments)
};
var dynCall_vid = Module["dynCall_vid"] = function() {
	return (dynCall_vid = Module["dynCall_vid"] = Module["asm"]["dynCall_vid"]).apply(null, arguments)
};
var dynCall_vidi = Module["dynCall_vidi"] = function() {
	return (dynCall_vidi = Module["dynCall_vidi"] = Module["asm"]["dynCall_vidi"]).apply(null, arguments)
};
var dynCall_vidiiii = Module["dynCall_vidiiii"] = function() {
	return (dynCall_vidiiii = Module["dynCall_vidiiii"] = Module["asm"]["dynCall_vidiiii"]).apply(null, arguments)
};
var dynCall_vidd = Module["dynCall_vidd"] = function() {
	return (dynCall_vidd = Module["dynCall_vidd"] = Module["asm"]["dynCall_vidd"]).apply(null, arguments)
};
var dynCall_viddi = Module["dynCall_viddi"] = function() {
	return (dynCall_viddi = Module["dynCall_viddi"] = Module["asm"]["dynCall_viddi"]).apply(null, arguments)
};
var dynCall_viddd = Module["dynCall_viddd"] = function() {
	return (dynCall_viddd = Module["dynCall_viddd"] = Module["asm"]["dynCall_viddd"]).apply(null, arguments)
};
var dynCall_viddddii = Module["dynCall_viddddii"] = function() {
	return (dynCall_viddddii = Module["dynCall_viddddii"] = Module["asm"]["dynCall_viddddii"]).apply(null, arguments)
};
var dynCall_vf = Module["dynCall_vf"] = function() {
	return (dynCall_vf = Module["dynCall_vf"] = Module["asm"]["dynCall_vf"]).apply(null, arguments)
};
var dynCall_vffff = Module["dynCall_vffff"] = function() {
	return (dynCall_vffff = Module["dynCall_vffff"] = Module["asm"]["dynCall_vffff"]).apply(null, arguments)
};
var dynCall_vd = Module["dynCall_vd"] = function() {
	return (dynCall_vd = Module["dynCall_vd"] = Module["asm"]["dynCall_vd"]).apply(null, arguments)
};
var dynCall_vdi = Module["dynCall_vdi"] = function() {
	return (dynCall_vdi = Module["dynCall_vdi"] = Module["asm"]["dynCall_vdi"]).apply(null, arguments)
};
var dynCall_vdiii = Module["dynCall_vdiii"] = function() {
	return (dynCall_vdiii = Module["dynCall_vdiii"] = Module["asm"]["dynCall_vdiii"]).apply(null, arguments)
};
var dynCall_vdd = Module["dynCall_vdd"] = function() {
	return (dynCall_vdd = Module["dynCall_vdd"] = Module["asm"]["dynCall_vdd"]).apply(null, arguments)
};
var dynCall_i = Module["dynCall_i"] = function() {
	return (dynCall_i = Module["dynCall_i"] = Module["asm"]["dynCall_i"]).apply(null, arguments)
};
var dynCall_ii = Module["dynCall_ii"] = function() {
	return (dynCall_ii = Module["dynCall_ii"] = Module["asm"]["dynCall_ii"]).apply(null, arguments)
};
var dynCall_iii = Module["dynCall_iii"] = function() {
	return (dynCall_iii = Module["dynCall_iii"] = Module["asm"]["dynCall_iii"]).apply(null, arguments)
};
var dynCall_iiii = Module["dynCall_iiii"] = function() {
	return (dynCall_iiii = Module["dynCall_iiii"] = Module["asm"]["dynCall_iiii"]).apply(null, arguments)
};
var dynCall_iiiii = Module["dynCall_iiiii"] = function() {
	return (dynCall_iiiii = Module["dynCall_iiiii"] = Module["asm"]["dynCall_iiiii"]).apply(null, arguments)
};
var dynCall_iiiiii = Module["dynCall_iiiiii"] = function() {
	return (dynCall_iiiiii = Module["dynCall_iiiiii"] = Module["asm"]["dynCall_iiiiii"]).apply(null, arguments)
};
var dynCall_iiiiiii = Module["dynCall_iiiiiii"] = function() {
	return (dynCall_iiiiiii = Module["dynCall_iiiiiii"] = Module["asm"]["dynCall_iiiiiii"]).apply(null, arguments)
};
var dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = function() {
	return (dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = Module["asm"]["dynCall_iiiiiiii"]).apply(null, arguments)
};
var dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = function() {
	return (dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = Module["asm"]["dynCall_iiiiiiiii"]).apply(null, arguments)
};
var dynCall_iiiiiiiiii = Module["dynCall_iiiiiiiiii"] = function() {
	return (dynCall_iiiiiiiiii = Module["dynCall_iiiiiiiiii"] = Module["asm"]["dynCall_iiiiiiiiii"]).apply(null, arguments)
};
var dynCall_iiiiiiiiiii = Module["dynCall_iiiiiiiiiii"] = function() {
	return (dynCall_iiiiiiiiiii = Module["dynCall_iiiiiiiiiii"] = Module["asm"]["dynCall_iiiiiiiiiii"]).apply(null, arguments)
};
var dynCall_iiiiiiiiiiii = Module["dynCall_iiiiiiiiiiii"] = function() {
	return (dynCall_iiiiiiiiiiii = Module["dynCall_iiiiiiiiiiii"] = Module["asm"]["dynCall_iiiiiiiiiiii"]).apply(null, arguments)
};
var dynCall_iiiiiiiiiiiii = Module["dynCall_iiiiiiiiiiiii"] = function() {
	return (dynCall_iiiiiiiiiiiii = Module["dynCall_iiiiiiiiiiiii"] = Module["asm"]["dynCall_iiiiiiiiiiiii"]).apply(null, arguments)
};
var dynCall_iiiiij = Module["dynCall_iiiiij"] = function() {
	return (dynCall_iiiiij = Module["dynCall_iiiiij"] = Module["asm"]["dynCall_iiiiij"]).apply(null, arguments)
};
var dynCall_iiiiid = Module["dynCall_iiiiid"] = function() {
	return (dynCall_iiiiid = Module["dynCall_iiiiid"] = Module["asm"]["dynCall_iiiiid"]).apply(null, arguments)
};
var dynCall_iiiiidi = Module["dynCall_iiiiidi"] = function() {
	return (dynCall_iiiiidi = Module["dynCall_iiiiidi"] = Module["asm"]["dynCall_iiiiidi"]).apply(null, arguments)
};
var dynCall_iiiij = Module["dynCall_iiiij"] = function() {
	return (dynCall_iiiij = Module["dynCall_iiiij"] = Module["asm"]["dynCall_iiiij"]).apply(null, arguments)
};
var dynCall_iiij = Module["dynCall_iiij"] = function() {
	return (dynCall_iiij = Module["dynCall_iiij"] = Module["asm"]["dynCall_iiij"]).apply(null, arguments)
};
var dynCall_iiid = Module["dynCall_iiid"] = function() {
	return (dynCall_iiid = Module["dynCall_iiid"] = Module["asm"]["dynCall_iiid"]).apply(null, arguments)
};
var dynCall_iij = Module["dynCall_iij"] = function() {
	return (dynCall_iij = Module["dynCall_iij"] = Module["asm"]["dynCall_iij"]).apply(null, arguments)
};
var dynCall_iiji = Module["dynCall_iiji"] = function() {
	return (dynCall_iiji = Module["dynCall_iiji"] = Module["asm"]["dynCall_iiji"]).apply(null, arguments)
};
var dynCall_iid = Module["dynCall_iid"] = function() {
	return (dynCall_iid = Module["dynCall_iid"] = Module["asm"]["dynCall_iid"]).apply(null, arguments)
};
var dynCall_jiiii = Module["dynCall_jiiii"] = function() {
	return (dynCall_jiiii = Module["dynCall_jiiii"] = Module["asm"]["dynCall_jiiii"]).apply(null, arguments)
};
var dynCall_fiii = Module["dynCall_fiii"] = function() {
	return (dynCall_fiii = Module["dynCall_fiii"] = Module["asm"]["dynCall_fiii"]).apply(null, arguments)
};
var dynCall_d = Module["dynCall_d"] = function() {
	return (dynCall_d = Module["dynCall_d"] = Module["asm"]["dynCall_d"]).apply(null, arguments)
};
var dynCall_di = Module["dynCall_di"] = function() {
	return (dynCall_di = Module["dynCall_di"] = Module["asm"]["dynCall_di"]).apply(null, arguments)
};
var dynCall_dii = Module["dynCall_dii"] = function() {
	return (dynCall_dii = Module["dynCall_dii"] = Module["asm"]["dynCall_dii"]).apply(null, arguments)
};
var dynCall_diii = Module["dynCall_diii"] = function() {
	return (dynCall_diii = Module["dynCall_diii"] = Module["asm"]["dynCall_diii"]).apply(null, arguments)
};
var dynCall_diij = Module["dynCall_diij"] = function() {
	return (dynCall_diij = Module["dynCall_diij"] = Module["asm"]["dynCall_diij"]).apply(null, arguments)
};
var dynCall_dd = Module["dynCall_dd"] = function() {
	return (dynCall_dd = Module["dynCall_dd"] = Module["asm"]["dynCall_dd"]).apply(null, arguments)
};
var __growWasmMemory = Module["__growWasmMemory"] = function() {
	return (__growWasmMemory = Module["__growWasmMemory"] = Module["asm"]["__growWasmMemory"]).apply(null, arguments)
};
var dynCall_viijii = Module["dynCall_viijii"] = function() {
	return (dynCall_viijii = Module["dynCall_viijii"] = Module["asm"]["dynCall_viijii"]).apply(null, arguments)
};
var dynCall_jiji = Module["dynCall_jiji"] = function() {
	return (dynCall_jiji = Module["dynCall_jiji"] = Module["asm"]["dynCall_jiji"]).apply(null, arguments)
};
var dynCall_iidiiii = Module["dynCall_iidiiii"] = function() {
	return (dynCall_iidiiii = Module["dynCall_iidiiii"] = Module["asm"]["dynCall_iidiiii"]).apply(null, arguments)
};
var dynCall_iiiiijj = Module["dynCall_iiiiijj"] = function() {
	return (dynCall_iiiiijj = Module["dynCall_iiiiijj"] = Module["asm"]["dynCall_iiiiijj"]).apply(null, arguments)
};
var dynCall_iiiiiijj = Module["dynCall_iiiiiijj"] = function() {
	return (dynCall_iiiiiijj = Module["dynCall_iiiiiijj"] = Module["asm"]["dynCall_iiiiiijj"]).apply(null, arguments)
};

function invoke_vi(index, a1) {
	var sp = stackSave();
	try {
		dynCall_vi(index, a1)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_ii(index, a1) {
	var sp = stackSave();
	try {
		return dynCall_ii(index, a1)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iii(index, a1, a2) {
	var sp = stackSave();
	try {
		return dynCall_iii(index, a1, a2)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viii(index, a1, a2, a3) {
	var sp = stackSave();
	try {
		dynCall_viii(index, a1, a2, a3)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vii(index, a1, a2) {
	var sp = stackSave();
	try {
		dynCall_vii(index, a1, a2)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiii(index, a1, a2, a3) {
	var sp = stackSave();
	try {
		return dynCall_iiii(index, a1, a2, a3)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiii(index, a1, a2, a3, a4) {
	var sp = stackSave();
	try {
		dynCall_viiii(index, a1, a2, a3, a4)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_i(index) {
	var sp = stackSave();
	try {
		return dynCall_i(index)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
	var sp = stackSave();
	try {
		dynCall_viiiiii(index, a1, a2, a3, a4, a5, a6)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viid(index, a1, a2, a3) {
	var sp = stackSave();
	try {
		dynCall_viid(index, a1, a2, a3)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
	var sp = stackSave();
	try {
		return dynCall_iiiiii(index, a1, a2, a3, a4, a5)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vif(index, a1, a2) {
	var sp = stackSave();
	try {
		dynCall_vif(index, a1, a2)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vidd(index, a1, a2, a3) {
	var sp = stackSave();
	try {
		dynCall_vidd(index, a1, a2, a3)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viffff(index, a1, a2, a3, a4, a5) {
	var sp = stackSave();
	try {
		dynCall_viffff(index, a1, a2, a3, a4, a5)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iid(index, a1, a2) {
	var sp = stackSave();
	try {
		return dynCall_iid(index, a1, a2)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_dii(index, a1, a2) {
	var sp = stackSave();
	try {
		return dynCall_dii(index, a1, a2)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vidi(index, a1, a2, a3) {
	var sp = stackSave();
	try {
		dynCall_vidi(index, a1, a2, a3)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
	var sp = stackSave();
	try {
		dynCall_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_di(index, a1) {
	var sp = stackSave();
	try {
		return dynCall_di(index, a1)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_dd(index, a1) {
	var sp = stackSave();
	try {
		return dynCall_dd(index, a1)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	var sp = stackSave();
	try {
		dynCall_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiii(index, a1, a2, a3, a4, a5) {
	var sp = stackSave();
	try {
		dynCall_viiiii(index, a1, a2, a3, a4, a5)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_v(index) {
	var sp = stackSave();
	try {
		dynCall_v(index)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiii(index, a1, a2, a3, a4) {
	var sp = stackSave();
	try {
		return dynCall_iiiii(index, a1, a2, a3, a4)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	var sp = stackSave();
	try {
		return dynCall_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiid(index, a1, a2, a3, a4) {
	var sp = stackSave();
	try {
		dynCall_viiid(index, a1, a2, a3, a4)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiid(index, a1, a2, a3, a4, a5) {
	var sp = stackSave();
	try {
		dynCall_viiiid(index, a1, a2, a3, a4, a5)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiidiii(index, a1, a2, a3, a4, a5, a6, a7) {
	var sp = stackSave();
	try {
		dynCall_viiidiii(index, a1, a2, a3, a4, a5, a6, a7)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vd(index, a1) {
	var sp = stackSave();
	try {
		dynCall_vd(index, a1)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viddddii(index, a1, a2, a3, a4, a5, a6, a7) {
	var sp = stackSave();
	try {
		dynCall_viddddii(index, a1, a2, a3, a4, a5, a6, a7)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_d(index) {
	var sp = stackSave();
	try {
		return dynCall_d(index)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
	var sp = stackSave();
	try {
		dynCall_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vid(index, a1, a2) {
	var sp = stackSave();
	try {
		dynCall_vid(index, a1, a2)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
	var sp = stackSave();
	try {
		return dynCall_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viddd(index, a1, a2, a3, a4) {
	var sp = stackSave();
	try {
		dynCall_viddd(index, a1, a2, a3, a4)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
	var sp = stackSave();
	try {
		dynCall_viiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vidiiii(index, a1, a2, a3, a4, a5, a6) {
	var sp = stackSave();
	try {
		dynCall_vidiiii(index, a1, a2, a3, a4, a5, a6)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viddi(index, a1, a2, a3, a4) {
	var sp = stackSave();
	try {
		dynCall_viddi(index, a1, a2, a3, a4)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiddd(index, a1, a2, a3, a4, a5) {
	var sp = stackSave();
	try {
		dynCall_viiddd(index, a1, a2, a3, a4, a5)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiddi(index, a1, a2, a3, a4, a5, a6, a7) {
	var sp = stackSave();
	try {
		dynCall_viiiiddi(index, a1, a2, a3, a4, a5, a6, a7)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vdi(index, a1, a2) {
	var sp = stackSave();
	try {
		dynCall_vdi(index, a1, a2)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vf(index, a1) {
	var sp = stackSave();
	try {
		dynCall_vf(index, a1)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
	var sp = stackSave();
	try {
		return dynCall_iiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
	var sp = stackSave();
	try {
		return dynCall_iiiiiii(index, a1, a2, a3, a4, a5, a6)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiidi(index, a1, a2, a3, a4, a5, a6) {
	var sp = stackSave();
	try {
		return dynCall_iiiiidi(index, a1, a2, a3, a4, a5, a6)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vffff(index, a1, a2, a3, a4) {
	var sp = stackSave();
	try {
		dynCall_vffff(index, a1, a2, a3, a4)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiid(index, a1, a2, a3) {
	var sp = stackSave();
	try {
		return dynCall_iiid(index, a1, a2, a3)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vdd(index, a1, a2) {
	var sp = stackSave();
	try {
		dynCall_vdd(index, a1, a2)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vdiii(index, a1, a2, a3, a4) {
	var sp = stackSave();
	try {
		dynCall_vdiii(index, a1, a2, a3, a4)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiidii(index, a1, a2, a3, a4, a5, a6) {
	var sp = stackSave();
	try {
		dynCall_viiidii(index, a1, a2, a3, a4, a5, a6)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_diii(index, a1, a2, a3) {
	var sp = stackSave();
	try {
		return dynCall_diii(index, a1, a2, a3)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiddii(index, a1, a2, a3, a4, a5, a6, a7) {
	var sp = stackSave();
	try {
		dynCall_viiiddii(index, a1, a2, a3, a4, a5, a6, a7)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiid(index, a1, a2, a3, a4, a5) {
	var sp = stackSave();
	try {
		return dynCall_iiiiid(index, a1, a2, a3, a4, a5)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
	var sp = stackSave();
	try {
		return dynCall_iiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
	var sp = stackSave();
	try {
		return dynCall_iiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_fiii(index, a1, a2, a3) {
	var sp = stackSave();
	try {
		return dynCall_fiii(index, a1, a2, a3)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
	var sp = stackSave();
	try {
		return dynCall_iiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
	var sp = stackSave();
	try {
		dynCall_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
	var sp = stackSave();
	try {
		dynCall_viiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_vij(index, a1, a2, a3) {
	var sp = stackSave();
	try {
		dynCall_vij(index, a1, a2, a3)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viij(index, a1, a2, a3, a4) {
	var sp = stackSave();
	try {
		dynCall_viij(index, a1, a2, a3, a4)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiij(index, a1, a2, a3, a4) {
	var sp = stackSave();
	try {
		return dynCall_iiij(index, a1, a2, a3, a4)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiji(index, a1, a2, a3, a4) {
	var sp = stackSave();
	try {
		return dynCall_iiji(index, a1, a2, a3, a4)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiiij(index, a1, a2, a3, a4, a5, a6) {
	var sp = stackSave();
	try {
		return dynCall_iiiiij(index, a1, a2, a3, a4, a5, a6)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iiiij(index, a1, a2, a3, a4, a5) {
	var sp = stackSave();
	try {
		return dynCall_iiiij(index, a1, a2, a3, a4, a5)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_iij(index, a1, a2, a3) {
	var sp = stackSave();
	try {
		return dynCall_iij(index, a1, a2, a3)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_viiididj(index, a1, a2, a3, a4, a5, a6, a7, a8) {
	var sp = stackSave();
	try {
		dynCall_viiididj(index, a1, a2, a3, a4, a5, a6, a7, a8)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_diij(index, a1, a2, a3, a4) {
	var sp = stackSave();
	try {
		return dynCall_diij(index, a1, a2, a3, a4)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}

function invoke_jiiii(index, a1, a2, a3, a4) {
	var sp = stackSave();
	try {
		return dynCall_jiiii(index, a1, a2, a3, a4)
	} catch (e) {
		stackRestore(sp);
		if (e !== e + 0 && e !== "longjmp") throw e;
		_setThrew(1, 0)
	}
}
Module["ccall"] = ccall;
Module["FS"] = FS;
var calledRun;

function ExitStatus(status) {
	this.name = "ExitStatus";
	this.message = "Program terminated with exit(" + status + ")";
	this.status = status
}
var calledMain = false;
dependenciesFulfilled = function runCaller() {
	if (!calledRun) run();
	if (!calledRun) dependenciesFulfilled = runCaller
};

function callMain(args) {
	var entryFunction = Module["_main"];
	args = args || [];
	var argc = args.length + 1;
	var argv = stackAlloc((argc + 1) * 4);
	HEAP32[argv >> 2] = allocateUTF8OnStack(thisProgram);
	for (var i = 1; i < argc; i++) {
		HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1])
	}
	HEAP32[(argv >> 2) + argc] = 0;
	try {
		var ret = entryFunction(argc, argv);
		exit(ret, true)
	} catch (e) {
		if (e instanceof ExitStatus) {
			return
		} else if (e == "unwind") {
			noExitRuntime = true;
			return
		} else {
			var toLog = e;
			if (e && typeof e === "object" && e.stack) {
				toLog = [e, e.stack]
			}
			err("exception thrown: " + toLog);
			quit_(1, e)
		}
	} finally {
		calledMain = true
	}
}

function run(args) {
	args = args || arguments_;
	if (runDependencies > 0) {
		return
	}
	preRun();
	if (runDependencies > 0) return;

	function doRun() {
		if (calledRun) return;
		calledRun = true;
		Module["calledRun"] = true;
		if (ABORT) return;
		initRuntime();
		preMain();
		if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
		if (shouldRunNow) callMain(args);
		postRun()
	}
	if (Module["setStatus"]) {
		Module["setStatus"]("Running...");
		setTimeout(function() {
			setTimeout(function() {
				Module["setStatus"]("")
			}, 1);
			doRun()
		}, 1)
	} else {
		doRun()
	}
}
Module["run"] = run;

function exit(status, implicit) {
	if (implicit && noExitRuntime && status === 0) {
		return
	}
	if (noExitRuntime) {} else {
		ABORT = true;
		EXITSTATUS = status;
		exitRuntime();
		if (Module["onExit"]) Module["onExit"](status)
	}
	quit_(status, new ExitStatus(status))
}
if (Module["preInit"]) {
	if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
	while (Module["preInit"].length > 0) {
		Module["preInit"].pop()()
	}
}
var shouldRunNow = true;
if (Module["noInitialRun"]) shouldRunNow = false;
noExitRuntime = true;
run();