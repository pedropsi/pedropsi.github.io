var statusElement = document.getElementById('status');
var progressElement = document.getElementById('progress');
showconsole = false;

function getQueryVariable(variable){
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return(false);
}

function mayload(name){
	q = getQueryVariable(name);
	if(q && q != "") {
		q = q.replace(/%2F/g, "/");
		FS.createPreloadedFile("/", name, q, true, false);
	}
}

function mayloadOr(name, dft){
	q = getQueryVariable(name);
	if(q && q != "") {
	  q = q.replace(/%2F/g, "/");
	  FS.createPreloadedFile("/", name, q, true, false);
	  }
	else
	  FS.createPreloadedFile("/", name, dft, true, false);
}

var Module = {
  preRun: [function() {
	mayloadOr("1", "starbattle-triangle1.lev");
	mayload("2");
	mayload("3");
	mayload("4");
	mayload("5");
	}],
  postRun: [],
  print: (function() {
	var element = document.getElementById('output');
	if (element) element.value = ''; // clear browser cache
	return function(text) {
	  if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
	  // These replacements are necessary if you render to raw HTML
	  //text = text.replace(/&/g, "&amp;");
	  //text = text.replace(/</g, "&lt;");
	  //text = text.replace(/>/g, "&gt;");
	  //text = text.replace('\n', '<br>', 'g');
	  console.log(text);
	  if (element) {
		element.value += text + "\n";
		element.scrollTop = element.scrollHeight; // focus on bottom
	  }
	};
  })(),
  printErr: function(text) {
	if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
	if (0) { // XXX disabled for safety typeof dump == 'function') {
	  dump(text + '\n'); // fast, straight to the real console
	} else {
	  console.error(text);
	}
  },
  canvas: (function() {
	var canvas = document.getElementById('canvas');

	// As a default initial behavior, pop up an alert when webgl context is lost. To make your
	// application robust, you may want to override this behavior before shipping!
	// See http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15.2
	canvas.addEventListener("webglcontextlost", function(e) { alert('WebGL context lost. You will need to reload the page.'); e.preventDefault(); }, false);

	return canvas;
  })(),
  setStatus: function(text) {
	if (!Module.setStatus.last) Module.setStatus.last = { time: Date.now(), text: '' };
	if (text === Module.setStatus.text) return;
	var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
	var now = Date.now();
	if (m && now - Date.now() < 30) return; // if this is a progress update, skip it if too soon
	if (m) {
	  text = m[1];
	  progressElement.value = parseInt(m[2])*100;
	  progressElement.max = parseInt(m[4])*100;
	  progressElement.hidden = false;
	} else {
	  progressElement.value = null;
	  progressElement.max = null;
	  progressElement.hidden = true;
	}
	statusElement.innerHTML = text;
  },
  totalDependencies: 0,
  monitorRunDependencies: function(left) {
	this.totalDependencies = Math.max(this.totalDependencies, left);
	Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
  }
};

Module.setStatus('Downloading...');
window.onerror = function(event) {
  // TODO: do not warn on ok events like simulating an infinite loop or exitStatus
  Module.setStatus('Exception thrown, see JavaScript console');
  Module.setStatus = function(text) {
	if (text) Module.printErr('[post-exception status] ' + text);
  };
};


(function() {
	var memoryInitializer = 'hyper.html.mem';
	if (typeof Module['locateFile'] === 'function') {
	memoryInitializer = Module['locateFile'](memoryInitializer);
	} else if (Module['memoryInitializerPrefixURL']) {
	memoryInitializer = Module['memoryInitializerPrefixURL'] + memoryInitializer;
	}
	var xhr = Module['memoryInitializerRequest'] = new XMLHttpRequest();
	xhr.open('GET', memoryInitializer, true);
	xhr.responseType = 'arraybuffer';
	xhr.send(null);
})();

var script = document.createElement('script');
script.src = "hyper.js";
document.body.appendChild(script);

var default_arg = "?c=-sb+-zoom+.6"

fileElem.addEventListener("change", handleFiles, false);

function handleFiles() {
	const fileList = this.files; /* now you can work with the file list */
	const numFiles = fileList.length;
	for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
		const file = fileList[i];
		file.arrayBuffer().then(buffer => {
			view = new Uint8Array(buffer);
			Module.FS.createDataFile("/", "data.txt", view, true, true);
			Module.ccall('use_file', 'null', [], []);
			Module.FS.unlink("/data.txt");
		});
	}
}

rotation_alpha = 0
rotation_beta = 0
rotation_gamma = 0
window.addEventListener('deviceorientation', function(event) {
	rotation_alpha = event.alpha;
	rotation_beta = event.beta;
	rotation_gamma = event.gamma;
});