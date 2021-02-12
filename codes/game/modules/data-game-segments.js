///////////////////////////////////////////////////////////////////////////////
//Point: [x,y]				(pair of coordinates)
//Segment: [[x1,y1],[x2,y2] (pair of points)
//Path: [p1,....pn] 		(a set of points - a segment is a path of length 2)

//Segments: [s1,....sn]		 (any set of segments, usually not contiguous)
//Track: [s1,....sn] 		(any set of segments, usually contiguous)
//Branch: track				(a contiguous track, without bifurcations - converts easily to a path)

//Forest: [t1,....tn] 		(any set of tracks, may or not touch each other)
//Orchard: forest	 		(a set of tracks, none of which touch each other)


//Endpoint: point 		(a point that is connected to exactly one other point, in a track)


///////////////////////////////////////////////////////////////////////////////
//Point

PointContiguousPoints=function(point){
	return Values(DirectionsCoordinates).map(v=>VectorPlus(point,v));
}


PointsOrdered=function(point1,point2){
	return Equal([point1,point2],Sort([point1,point2]))
}

///////////////////////////////////////////////////////////////////////////////
//Paths

PathTrack=function(path){
	var path=Clone(path);
	
	var track=[];
	if(path.length<2)
		return [];
	
	var segments=Rest(path).map((xy,i)=>[path[i],xy]);
	var i=0;
	var seg;
	while(i<segments.length){
		seg=SegmentDiscretiseTrack(Clone(segments[i]));
		track.push(seg);
		i++
	}
	return Join(...track);
}

TrackPath=function(track){
	var stas=track.map(First);
	return stas.concat([Last(Last(track))]);
}

PatchedPath=function(path){
	return TrackPoints(PathTrack(path));
}



///////////////////////////////////////////////////////////////////////////////
//Segment


SegmentDiscretised=function(segment){
	return In(Values(DirectionsCoordinates),SegmentDirection(segment));
}

SegmentDirection=function(segment){
	return VectorMinus(segment[1],segment[0]);
}

SegmentUnitDirection=function(segment){
	return UnitVector(SegmentDirection(segment));
}

SegmentEquidirected=function(segment1,segment2){
	return Equal(SegmentUnitDirection(segment1),SegmentUnitDirection(segment2));
}

SegmentAligned=function(segment1,segment2){
	return SegmentEquidirected(segment1,segment2)||SegmentEquidirected(Times(-1,segment1),segment2);
}

SegmentFollowed=function(segment1,segment2){
	return SegmentEquidirected(segment1,segment2)&&SegmentTouched(segment1,segment2);
}

FuseFollowedSegment=function(segment1,segment2){
	var s=[...Complement(segment1,segment2),...Complement(segment2,segment1)];
	if(!s.length)
		return segment1;
	else
		return s;
}

CanonicalSegment=function(segment){
	if(!In([[0,1],[1,0]],SegmentUnitDirection(segment)))
		return Reverse(segment);
	else
		return segment;
}

SegmentTouched=function(segment1,segment2){
	return SegmentPoints(segment1).some(point=>PointSegmentContained(point,segment2));
}


TranslateSegment=function(segment,x,y){
	return segment.map(point=>VectorPlus(point,[x,y]));
}
TransformSegment=function(segment,Transformer){
	return Clone(segment).map(point=>Transformer(point));
}

//segment + point

SegmentPoints=function(segment){
	return segment;
}

PointSegmentContained=function(point,segment){
	return In(segment,point);
}


///////////////////////////////////////////////////////////////////////////////
//Track

SortTrack=function(track){
	function Switcher(segmin,segment){
		return segmin[0]>segment[0]||(segmin[0]===segment[0]&&segmin[1]>segment[1])}
	return CycleSort(track.map(t=>Sort(t)),Switcher)
}

TrackLooped=function(track){
	if(!track.length)
		return false;
	var singles=TrackDegreePoints(track,1).length;
	var threes=TrackDegreePoints(track,3).length;
	var fours=TrackDegreePoints(track,4).length;
	
	return singles===0||(threes*3+fours*4-singles*1)/(threes+fours)>=2;
}

TrackBranched=function(track){
	return TrackBranchpoints(track).length>0;
}

TranslateTrack=function(track,x,y){
	return track.map(segment=>TranslateSegment(segment,x,y));
}


TrackBranches=function(contiguousTrack){
	if(!contiguousTrack.length)
		return [];
	var segments=Clone(contiguousTrack);
	var endsegments=TrackEndsegments(segments);
	var segment=EndsegmentsFirst(endsegments,segments);

	var track=[];
	var branches=[];
	
	while(segments.length){
		track.push(segment);
		segments=Remove(segments,segment);
		if(!segments.length){
			branches.push(track);
			break;
		}

		var next=SegmentContiguousTrackSegments(segment,segments);

		if(!next.length){
			branches.push(track);
			track=[];
			endsegments=TrackEndsegments(segments);
			segment=EndsegmentsFirst(endsegments,segments);
		}
		else{
			segment=First(next);
		}

	}
	return branches;
}

OrientedBranch=function(branch){
	var orientedtrack=Clone(branch);
	if(!orientedtrack.length)
		return orientedtrack;
	if(orientedtrack.length<2){
		return OrderedTrack(orientedtrack);
	}
	var i=0;
	var l=orientedtrack.length;
	while(i<l-1){
		if(PointSegmentContained(First(orientedtrack[i]),orientedtrack[i+1]))
			orientedtrack[i]=Reverse(orientedtrack[i]);
		i++
	}
		
	if(PointSegmentContained(Last(orientedtrack[l-1]),orientedtrack[l-2]))
		orientedtrack[l-1]=Reverse(orientedtrack[l-1]);
	
	// if(TrackLooped(orientedtrack))
	// 	orientedtrack=OrientedLoopTrack(orientedtrack);

	return OrderedTrack(orientedtrack);
}

ReverseTrack=function(track){
	return Reverse(track.map(Reverse))
}

LinearBranch=function(segments,endpoint){ //TODO
	var segments=Clone(segments);
	var nextpoints=PointContiguousPoints(endpoint,);
	var branches=[];
	while(endpoints.length){
		//remove previously visited endpoints;
		endpoint=First(endpoints);
		branches.push(LinearBranch(segments,enpoint))
		endpoints=Complement(endpoints,Apply(Union,TrackPoints(branches)||[]));
		segments=Complement(segments,Apply(Union,branches)||[]);
	}

}

SegmentsBranches=function(segments){
	var segments=Clone(segments);
	var endpoints=TrackEndpoints(segments);
	var branches=[];
	while(endpoints.length){
		//remove previously visited endpoints;
		endpoint=First(endpoints);
		branches.push(LinearBranch(segments,enpoint))
		endpoints=Complement(endpoints,Apply(Union,TrackPoints(branches)||[]));
		segments=Complement(segments,Apply(Union,branches)||[]);
	}
}

OrderedTrack=function(orientedtrack){
	if(!PointsOrdered(First(First(orientedtrack)),Last(Last(orientedtrack)))){
		return ReverseTrack(orientedtrack);
	}
	else return orientedtrack;
}

CanonicalTrack=function(track){
	var track=Clone(track).map(CanonicalSegment);
	track=Sort(Unique(track));
	track=track.filter(SegmentDiscretised);
	return track;
}

UnDiscretiseTrack=function(track){
	var track=track;
	var l=track.length;
	var i=0;
	while(i<l-1){
		j=i+1;
		while(j<l){
			if(SegmentFollowed(track[i],track[j])){
				track[i]=FuseFollowedSegment(track[i],track[j]);
				track=Delete(track,j);
				i=0;
				j=i+1;
				l=l-1;
			}
			else{
				j++
			}
		}
		i++
	}
	return track;
}

// CanonicalContiguousTrack=function(track,Posit){
// 	var endsegments=TrackEndsegments(track);
// 	var endpoints=TrackEndpoints(track);

// 	if(!endpoints.length)	//a loop
// 		endpoints=track.map(First);

// 	startpoint=First(Sorter(Posit)(endpoints));

// 	if(endsegments.length<1)
// 		endsegments=track;

// 	endsegments=endsegments.filter(s=>In(s,startpoint));
	
// 	if(endsegments.length>1)
// 		endsegments=endsegments.filter(s=>(In([[1,0],[-1,0]],VectorMinus(s[0],s[1])))); //TODO minimise with POSIT on both vertexes instead, generalises better
	
// 	var	nextsegment=First(endsegments);
	
// 	if(Equal(Last(nextsegment),startpoint)){
// 		nextsegment=Reverse(First(endsegments));
// 	}
// 	var previoussegment=null;

// 	var canonicaltrack=[];
// 	var oldtrack=track;
// 	while(oldtrack.length>0&&nextsegment!==previoussegment){
// 		previoussegment=nextsegment;
// 		oldtrack=DeleteSegmentTrack(previoussegment,oldtrack);
// 		nextsegment=First(SegmentContiguousTrackSegments(previoussegment,oldtrack));
// 		if(!nextsegment||In(nextsegment,previoussegment[1]))
// 			canonicaltrack.push(previoussegment);
// 		else
// 			canonicaltrack.push(Reverse(previoussegment));
		
// 	}
// 	return canonicaltrack;
// }


//Track + points

PointTrackContained=function(point,track){
	return track.some(segment=>PointSegmentContained(point,segment));
}



TrackPoints=function(track){
	if(!track.length)
		return [];
	var points=Join(...track.map(SegmentPoints));
	return DistinctArray(points);
}

DeletePointTrack=function(point,track){
	return track.filter(seg=>!PointSegmentContained(point,seg));
}

PointContiguousTrackPoints=function(point,track){
	var points=Join(...PointContainedTrackSegments(point,track).map(SegmentPoints));
	return Complement(points,[point]);
}


TrackDegreePoints=function(track,n){
	return TrackPoints(track).filter(point=>PointContainedTrackSegments(point,track).length===n);
}

TrackOverDegreePoints=function(track,n){
	return TrackPoints(track).filter(point=>PointContainedTrackSegments(point,track).length>=n);
}

TrackBranchpoints=function(track){
	return TrackOverDegreePoints(track,3);
}

TrackEndpoints=function(track){
	return TrackDegreePoints(track,1);
}

TrackStartPoint=function(track){
	var endpoints=TrackEndpoints(track);
	return First(endpoints)||First(First(track));
}

//Track + segment

SegmentTrackContained=function(segment,track){
	return In(track,segment)||In(track,Reverse(segment));
}

DeleteSegmentTrack=function(segment,track){
	return track.filter(seg=>!In([segment,Reverse(segment)],seg));
}

SegmentContiguousTrackSegments=function(segment,track){
	var intrack=DeleteSegmentTrack(segment,track);
	return Join(...SegmentPoints(segment).map(point=>PointContainedTrackSegments(point,intrack)))
}

TrackEndsegments=function(track){
	return track.filter(segment=>SegmentContiguousTrackSegments(segment,track).length<=1);
}

EndsegmentsFirst=function(endsegments,segments){
	if(endsegments.length)
		return First(endsegments);
	else
		return First(segments);
}

SegmentDiscretiseTrack=function(segment){
	var previousPoint=segment[0];
	var nextPoint;
	var direction=SegmentDirection(segment);
	var i=0;
	var j=0;
	var disctrack=[];
	var dx=Sign(direction[0]);
	var dy=Sign(direction[1]);
	
	while(Abs(i)<Abs(direction[0])&&Abs(j)<Abs(direction[1])){
		nextPoint=VectorPlus(previousPoint,[dx,0]);
		disctrack.push([previousPoint,nextPoint]);
		previousPoint=Clone(nextPoint);
		i+=dx;
		nextPoint=VectorPlus(previousPoint,[0,dy]);
		disctrack.push([previousPoint,nextPoint]);
		previousPoint=Clone(nextPoint);
		j+=dy;
	}

	while(Abs(i)<Abs(direction[0])){
		nextPoint=VectorPlus(previousPoint,[dx,0]);
		disctrack.push([previousPoint,nextPoint]);
		previousPoint=Clone(nextPoint);
		i+=dx;
	}

	while(Abs(j)<Abs(direction[1])){
		nextPoint=VectorPlus(previousPoint,[0,dy]);
		disctrack.push([previousPoint,nextPoint]);
		previousPoint=Clone(nextPoint);
		j+=dy;
	}
	return disctrack;
}


//track + segment + point

PointContainedTrackSegments=function(point,track){
	return track.filter(seg=>In(SegmentPoints(seg),point));
}





///////////////////////////////////////////////////////////////////////////////
//Forest

//Forest + point

PointForestContained=function(point,forest){
	return forest.some(track=>PointTrackContained(point,forest));
}

//Forest + segment + point

PointContainedForestSegments=function(point,forest){
	var pointsets=forest.map(track=>PointContainedTrackSegments(point,track));
	return Union(...pointsets);
}

//Forest + track

SegmentsOrchard=function(segments){
	if(!segments.length)
		return [];
	var segments=CanonicalTrack(segments);
	var track=[];
	var contiguoustracks=[];
	var segment=First(segments);
	while(segment&&segments.length){
		track.push(segment);
		
		segments=Remove(segments,segment);
		if(!segments.length){
			contiguoustracks.push(track);
			break;
		}

		var next=SegmentContiguousTrackSegments(segment,segments);

		if(!next.length){
			next=track.map(seg=>SegmentContiguousTrackSegments(seg,segments));
			next=Join(...next);
		}

		if(!next.length){
			contiguoustracks.push(track);
			track=[];
			segment=First(segments);
		}
		else{
			segment=First(next);
		}

	}
	return contiguoustracks.map(CanonicalTrack);
}



Branches=function(forest){
	var branches=forest.map(TrackBranches);
	return Join(...branches);
}


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//Geometric Transformations

PathXs=function(points){return points.map(First)};
PathYs=function(points){return points.map(Last)};

TrackGeometricCentrePoint=function(track){
	var points=TrackPoints(track);
	return Round([Mean(PathXs(points)),Mean(PathYs(points))],3);
}

//Translations

UnTranslateTrack=function(track){
	var XY=TrackGeometricCentrePoint(track);
	var X=XY[0];
	var Y=XY[1];
	return Clone(track).map(segment=>TranslateSegment(segment,-1*X,-1*Y));
}

//Symmetry

TrackPointwiseSymmetrised=function(track,XY){
	var X=XY[0];
	var Y=XY[1];
	var VHMirrorer=function(point){
		var dx=X-point[0];
		var dy=Y-point[1];
		return [point[0]+2*dx,point[1]+2*dy];
	}
	var Dsegments=track.filter(segment=>PathYs(SegmentPoints(segment)).every(y=>y<=Y));
	var Usegments=track.filter(segment=>PathYs(SegmentPoints(segment)).every(y=>y>=Y));
	
	Usegments=Usegments.map(segment=>TransformSegment(segment,VHMirrorer));
	Usegments=Sort(Usegments.map(CanonicalSegment));
	Dsegments=Sort(Dsegments.map(CanonicalSegment));
		
	return Equal(Dsegments,Usegments)
}

SymmetriseVerticallyTrack=function(track,Y){
	var VMirrorer=function(point){
		var dy=Y-point[1];
		return [point[0],point[1]+2*dy];
	}
	return track.map(segment=>TransformSegment(segment,VMirrorer));
}

TrackVerticallySymmetrised=function(track,XY){
	var Y=XY[1];
	var Dsegments=track.filter(segment=>PathYs(SegmentPoints(segment)).every(y=>y<=Y));
	var Usegments=track.filter(segment=>PathYs(SegmentPoints(segment)).every(y=>y>=Y));
	
	Usegments=SymmetriseVerticallyTrack(Usegments,Y);
	Usegments=Sort(Usegments.map(CanonicalSegment));
	Dsegments=Sort(Dsegments.map(CanonicalSegment));
	return Equal(Dsegments,Usegments)
}

SymmetriseHorizontallyTrack=function(track,X){
	var HMirrorer=function(point){
		var dx=X-point[0];
		return [point[0]+2*dx,point[1]];
	}
	return track.map(segment=>TransformSegment(segment,HMirrorer));
}


TrackHorizontallySymmetrised=function(track,XY){
	var X=XY[0];
	var Lsegments=track.filter(segment=>PathXs(SegmentPoints(segment)).every(x=>x<=X));
	var Rsegments=track.filter(segment=>PathXs(SegmentPoints(segment)).every(x=>x>=X));
	
	Rsegments=SymmetriseHorizontallyTrack(Rsegments,X);
	Rsegments=Sort(Rsegments.map(CanonicalSegment));
	Lsegments=Sort(Lsegments.map(CanonicalSegment));
		
	return Equal(Lsegments,Rsegments)
}


TrackDiagonallySymmetrised=function(track){
	var track=UnTranslateTrack(track);

	var Flipper=function(point){
		return [point[1],point[0]];
	}

	fliptrack=Clone(track).map(segment=>TransformSegment(segment,Flipper));
		
	return Equaliser(track=>Sort(track.map(CanonicalSegment)))(fliptrack,track);
}

TrackSlantlySymmetrised=function(track){
	var track=UnTranslateTrack(track);

	var Flipper=function(point){
		return [-point[1],-point[0]];
	}

	fliptrack=Clone(track).map(segment=>TransformSegment(segment,Flipper));
		
	return Equaliser(track=>Sort(track.map(CanonicalSegment)))(fliptrack,track);
}


TrackSymmetrised=function(track){
	var XY=TrackGeometricCentrePoint(track);
	return TrackHorizontallySymmetrised(track,XY)||TrackVerticallySymmetrised(track,XY)||TrackPointwiseSymmetrised(track,XY)||TrackDiagonallySymmetrised(track)||TrackSlantlySymmetrised(track);
}




///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//Serials

AccumulateTokenCoords=function(tokendiffs,H){
	var differences=tokendiffs.map(Last);
	var accumulated=tokendiffs.map((td,i)=>[td[0],Apply(Plus,Take(differences,i+1))]);
	return accumulated.map(td=>[td[0],UnLinearise(td[1],H)]);
}

PathSerialPattern=/\d+\D+/ig;

DirectionsLetter={
	"LLL":"a",
	"LLU":"b",
	"LLD":"c",
	"LUL":"d",
	"LUU":"e",
	"LUR":"f",
	"LDL":"g",
	"LDR":"h",
	"LDD":"i",
	"ULL":"j",
	"ULU":"k",
	"ULD":"l",
	"UUL":"m",
	"UUU":"n",
	"UUR":"o",
	"URU":"p",
	"URR":"q",
	"URD":"r",
	"RUL":"s",
	"RUU":"t",
	"RUR":"u",
	"RRU":"v",
	"RRR":"w",
	"RRD":"x",
	"RDL":"y",
	"RDR":"z",
	"RDD":"A",
	"DLL":"B",
	"DLU":"C",
	"DLD":"E",
	"DRU":"F",
	"DRR":"G",
	"DRD":"H",
	"DDL":"I",
	"DDR":"J",
	"DDD":"K",

	"LL":"M",
	"LU":"N",
	"LD":"O",
	"UL":"P",
	"UU":"Q",
	"UR":"S",
	"RU":"T",
	"RR":"V",
	"RD":"W",
	"DL":"X",
	"DR":"Y",
	"DD":"Z",

	"L":"L",
	"U":"U",
	"R":"R",
	"D":"D"
}

DirectionsCoordinates={
	"L":[-1,0],
	"U":[0,-1],
	"R":[1,0],
	"D":[0,1]
}

LetterDirections=FlipKeysValues(DirectionsLetter);
CoordinatesDirections=FlipKeysValues(DirectionsCoordinates);

DirectionCode=function(direction){
	return Accesser(CoordinatesDirections)(String(direction));
}

SegmentPairNextDirection=function(segment1,segment2){
	var p10=First(segment1);
	var p11=Last(segment1);
	var p20=First(segment2);
	var p21=Last(segment2);
	if(Equal(p10,p20)||Equal(p11,p20))
		return VectorMinus(p21,p20);
	if(Equal(p10,p21)||Equal(p11,p21))
		return VectorMinus(p20,p21);
}

SegmentPairSelfNextDirection=function(segment1,segment2){
	return VectorTimes([-1,-1],SegmentPairNextDirection(segment2,segment1));
}







LetterContiguousPath=function(letters,startxy){
	var directions=letters.split("").map(Accesser(LetterDirections)).join("").split("");
		directions=directions.map(Accesser(DirectionsCoordinates));
	var coordinates=directions;
		coordinates=coordinates.map((c,i)=>Apply(VectorPlus,Take(directions,i+1)));
		coordinates.unshift([0,0]);
		coordinates=coordinates.map(c=>VectorPlus(c,startxy))
	return SortTrack(PathTrack(coordinates));
}

SerialSegments=function(serial,H){
	var pathserials=serial.match(PathSerialPattern);
	var pathdiffs=pathserials.map(s=>[First(s.match(/\D+/ig)),Number(First(s.match(/\d+/ig)))]);
	var accumulated=AccumulateTokenCoords(pathdiffs,H+1);
	var tracks=accumulated.map(lp=>LetterContiguousPath(lp[0],lp[1]));
	return Join(...tracks);
}


SegmentsSerial=function(tracks,H){
	if(!tracks||!tracks.length)
		return "";
	var	branches=Branches(tracks);
	var	orientedbranches=branches.map(OrientedBranch);
	var	orientedtracks=Sorter(TrackLineariser(H))(orientedbranches);
	var overpath=orientedtracks.map(TrackLineariser(H));
	var differences=[0].concat(overpath);
		differences=Rest(differences).map((d,i)=>d-differences[i]);
	var pointtracks=orientedtracks.map((l,i)=>[differences[i],l]);
	var serials=pointtracks.map(PointTrackSerial);
		return serials.join("");
}


PointTrackSerial=function(pointtrack){
	return String(pointtrack[0])+TrackDirectionSerial(pointtrack[1]);
}

TrackDirectionSerial=function(track){
	if(!track.length)
		return "";
	var track=Clone(track);
	var directions;
	if(track.length<2){
		directions=[SegmentUnitDirection(First(track))]
	}else{
		directions=Rest(track).map(function(segment,i){
			var dir=SegmentPairNextDirection(track[i],segment);
			return dir;
		});
		directions.unshift(SegmentPairSelfNextDirection(track[0],track[1]));
	}
	
	//directions=directions.map(DirectionCode).join("").split(/(\D\D\D)/g).filter(Identity);
	directions=directions.map(DirectionCode).filter(Identity);
	directions=directions.map(Accesser(DirectionsLetter))
	return directions.join("");
}




Linearise=function(xy,H){
	return xy[0]*(H+1)+xy[1];
}

UnLinearise=function(n,H){
	return [Floor(n/H),n%H]
}

LineariseSegment=function(segment,H){
	return Linearise(First(segment),H);
}

SegmentLineariser=function(H){
	return function(segment){
		return LineariseSegment(segment,H);
	}
}

TrackLineariser=function(H){
	return function(track){
		return LineariseSegment(First(track),H);
	}
}

var DirectionSort=Sorter(d=>Keys(LetterDirections).findIndex(D=>D===d))


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//Shapes

var Shape1s=["L","U","R","D"];
var Shape2Straights=["LR","UD"];
var ShapeStraights=Join(Shape1s,Shape2Straights);
var Shape2Corners=["LU","UR","RD","LD"];
var Shape2s=Join(Shape2Straights,Shape2Corners);
var Shape3s=["LUR","URD","LRD","LUD"];
var Shape4s=["LURD"];
var ShapeBranches=Join(Shape3s,Shape4s);



PointTrackShape=function(point,track){
	var segments=PointContainedTrackSegments(point,track);
	if(!segments||!segments.length){
		return "";
	}
	var directions=segments.map(s=>TranslateSegment(s,-1*point[0],-1*point[1]));
		directions=directions.map(s=>First(Remove(s,[0,0])));
		directions=directions.map(DirectionCode);
	return DirectionSort(directions).join("");
}

PointConsecutiveShapePairs=function(point,track){//Todo slash points in half
	var consecutivepoints=PointContiguousTrackPoints(point,track);
	var shape=PointTrackShape(point,track);
	return consecutivepoints.map(point=>[shape,PointTrackShape(point,track)]);
}

TrackConsecutiveShapePairs=function(track){
	return DistinctArray(Join(...TrackPoints(track).map(point=>PointConsecutiveShapePairs(point,track))),Sort);
}





Shout("data-game-segments")