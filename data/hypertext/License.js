HyperText("License",function(){return Licenses.join(`
`)})

var Licenses={//People
	"MIT":{url:"https://opensource.org/licenses/MIT"},
	"CC-BY-4.0":{url:"https://creativecommons.org/licenses/by/4"},
	"CC-BY-SA-4.0":{url:"https://creativecommons.org/licenses/BY_nc_SA/4.0"},
}

LicenseHTML=function(linkObj,name){
	return AHTML(name,linkObj.url);
}
	
RegisterLicense=function(key){
	HyperText("License/"+key,()=>LicenseHTML(Licenses[key],key));
}

Keys(Licenses).map(RegisterLicense);

