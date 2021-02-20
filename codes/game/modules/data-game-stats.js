//////////////////////////////////////////////////
// Stats

DisplayWon=function(){
	var url=MacroURL(Inflows("won"));
	LoadData(url,DeployWon);
}

DeployWon=function(jsonstring){
	var identifier=PageIdentifier();
	if(identifier==="game-console")
		return;
	
	var row=JSON.parse(jsonstring).filter(
		function(row){return row[0]===identifier}
	);
	
	if(row.length===0)
		return;
	row=row[0].filter(function(s){return s!==""});
	var wins=row.slice(3,Infinity).map(Number);
	var max=Max(wins);

	AddChart({
		"cla":"chart",
		//"XGridline":{major:wins.length,minor:1},
		"YGridline":{major:4,minor:5,horizontal:true},
		"XAxis":{horizontal:true},
		"YAxis":{},
		"YTick":{major:4,minor:5,horizontal:true},
		"XLegend":{txt:"Level",x:0.7,y:1.004,size:0.08},
		"YLegend":{txt:"Victories (total)",y:-0.05,x:-0.2,size:0.08},
		"XAxisLegend":{major:wins.length/5,min:0,max:wins.length,down:-1/10,right:+1/2*1/wins.length},
		"YAxisLegend":{major:4,min:0,max:ScaleMax(max),down:-3/10,horizontal:true,right:-1/24},
		"Bar":{values:wins,spacing:0.2,max:ScaleMax(max),horizontal:true}
	},".won-area");
};

DisplayWon();

DefinedShout("data-game-stats");