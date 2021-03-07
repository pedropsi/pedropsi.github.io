///////////////////////////////////////////////////////////////////////////////
//Point: [x,y]					(pair of coordinates)
//Segment: [[x1,y1],[x2,y2]	 	(pair of points)
//Path: [p1,....pn] 			(a set of points - a segment is a path of length 2)
//Way: [p1,....pn] 			    (a non-branching path)


//Segments: [s1,....sn]			(any set of segments, usually not contiguous)
//Track: 	[s1,....sn] 		(any set of segments, usually contiguous)
//Trunk:	track				(any of contiguous segments, potentially branched)
//Twig:		trunk				(a trunk, without bifurcations - converts easily to a path)

//Forest: [t1,....tn] 			(any set of tracks, may or not touch each other)
//Orchard: forest	 			(a set of tracks, none of which touch each other)
//Twigs: [t1,....tn]			(a set of twigs)

//Endpoint: point 				(a point that is connected to exactly one other point, in a track)


///////////////////////////////////////////////////////////////////////////////
//Point

PointNeighbourPoints=function(point,coordinates){
	if(!coordinates)
		var coordinates=Values(DirectionsCoordinates);
	return coordinates.map(v=>VectorPlus(point,v));
/*
Gives the points a certain vector away
PointNeighbourPoints([2,2],[[-1,0],[1,0]])
[[1,2],[3,2]]
*/
}

PointDistantPoints=function(point,letters){
	var coordinates=letters.map(sequence=>Last(LetterCoordinates(sequence)));
	return PointNeighbourPoints(point,coordinates);
/*
Gives the points a certain letter sequence away
PointDistantPoints([2,2],["L","RUD"])
[[1,2],[3,2]]
*/
}


PointsOrdered=function(point1,point2){
	return Equal([point1,point2],Sort([point1,point2]))
}

///////////////////////////////////////////////////////////////////////////////
//Paths

UnPosfixSelfPath=function(path){
	if(!path)
		return [];
	var i=path.length-1;
	var head;
	var tail;
	while(i>0){
		head=Take(path,i);
		tail=UnTake(path,i);
		if(ArrayPosfixed(head,tail)){
			return UnPosfixSelfPath(head);
		}
		i--;
	}
	return path;
/*
repeating elements
UnPosfixSelfPath([0,1,1,1,1,1])
[0,1]

repeating sequences
UnPosfixSelfPath([0,1,1,1,1,2,1,2])
[0,1,1,1,1,2]

recursive repeating sequences
UnPosfixSelfPath([0,1,1,1,1,2,1,2,2,2])
[0,1,1,1,1,2]
*/
}

PathTrack=function(path){
	var path=Clone(path||[]);
	
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
/*
even accepts loops
PathTrack([[0,0],[0,1],[1,1],[1,0],[0,0]])
[[[0,0],[0,1]],[[0,1],[1,1]],[[1,1],[1,0]],[[1,0],[0,0]]]
*/
}

TrackPath=function(track){
	if(!track.length)
		return [];
	var stas=track.map(First);
	return stas.concat([Last(Last(track))]);
}

PatchedPath=function(path){
	return TrackUnDistinctPoints(PathTrack(path));
}

//Path + segment

SegmentPathContained=function(segment,path){
	return SegmentPoints(segment).every(Iner(path));
}

SegmentPathsContained=function(segment,paths){
	return paths.some(path=>SegmentPathContained(segment,path));
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
	return SegmentTouched(segment1,segment2)&&SegmentEquidirected(segment1,segment2);
}

FuseFollowedSegment=function(segment1,segment2){
	var s=[...Complement(segment1,segment2),...Complement(segment2,segment1)];
	if(!s.length)
		return segment1;
	else
		return s;
}

CanonicalSegment=function(segment){
	if(!In(UnitDirectionCoordinates,SegmentUnitDirection(segment)))
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


TrackTwigs=function(contiguousTrack){
	if(!contiguousTrack.length)
		return [];
	var segments=Clone(contiguousTrack);
	var endsegments=TrackEndsegments(segments);
	var segment=EndsegmentsFirst(endsegments,segments);

	var track=[];
	var twigs=[];
	
	while(segments.length){
		track.push(segment);
		segments=Remove(segments,segment);
		if(!segments.length){
			twigs.push(track);
			break;
		}

		var next=SegmentContiguousTrackSegments(segment,segments);

		if(!next.length){
			twigs.push(track);
			track=[];
			endsegments=TrackEndsegments(segments);
			segment=EndsegmentsFirst(endsegments,segments);
		}
		else{
			segment=First(next);
		}

	}
	return twigs;
}

OrientedTwig=function(twig){
	var orientedtwig=Clone(twig);
	if(!orientedtwig.length)
		return orientedtwig;
	if(orientedtwig.length<2){
		return OrderedTrack(orientedtwig);
	}
	var i=0;
	var l=orientedtwig.length;
	while(i<l-1){
		if(PointSegmentContained(First(orientedtwig[i]),orientedtwig[i+1]))
			orientedtwig[i]=Reverse(orientedtwig[i]);
		i++
	}
		
	if(PointSegmentContained(Last(orientedtwig[l-1]),orientedtwig[l-2]))
		orientedtwig[l-1]=Reverse(orientedtwig[l-1]);
	
	// if(TrackLooped(orientedtwig))
	// 	orientedtwig=OrientedLoopTrack(orientedtwig);

	return OrderedTrack(orientedtwig);
}

ReverseTwig=function(twig){
	return Reverse(twig.map(Reverse))
}

GrowWay=function(way,segments,endpoint,forward,seenPoints){
	if(!endpoint||!segments.length)
		return way;
	var way=Clone(way);
	var seenPoints=Clone(seenPoints)||[];
	if(!forward){
		var Pend=Prepend;
		var Terminus=First;
	}
	else{
		var Pend=Append;
		var Terminus=Last;
	}
	while(endpoint){
		seenPoints=Union(seenPoints,way);
		endpoint=First(Complement(PointTrackContiguousUnBranchpoints(endpoint,segments),seenPoints));
		if(endpoint)
			way=Pend(way,endpoint);
	}
	endpoint=First(Complement(PointTrackContiguousPoints(Terminus(way),segments),way));
	if(endpoint)
		way=Pend(way,endpoint);
	return way;
}

SegmentsNodepointWay=function(segments,nodepoint,seenPoints){
	var segments=Clone(segments);
	var way=[nodepoint];

	way=GrowWay(way,segments,nodepoint,true,seenPoints);//Grow in first direction
	way=GrowWay(way,segments,nodepoint,false,seenPoints);//Grow in second direction

	if(TrackLooped(segments)) //join ends
		way=Append(way,First(way));

	return way;
}

SegmentsWays=function(segments){
	if(!segments)
		return [];
	var ways=[];
	var subways=SegmentsLongWays(segments);
	var ways=Join(ways,subways);
	var segments=segments.filter(s=>!SegmentPathsContained(s,ways));
	while(segments.length){
		subways=SegmentsLongWays(segments);
		ways=Join(ways,subways);
		segments=segments.filter(s=>!SegmentPathsContained(s,ways));
	}
	return SupersetsArray(ways);
}

SegmentsLongWays=function(segments){
	var ways=[];
	if(!segments.length)
		return ways;

	var segments=Clone(segments);
	var pickedpoints=Sort(TrackEndpoints(segments));

	if(!pickedpoints.length) //Single loop without nodes
		pickedpoints=[First(Sort(TrackPoints(segments)))];
	
	while(pickedpoints.length){
		ways=Append(ways,SegmentsNodepointWay(segments,First(pickedpoints),Apply(Union,ways)));
		pickedpoints=Rest(pickedpoints);
	}
	return ways;
}


OrderedTrack=function(orientedtwig){
	if(!PointsOrdered(First(First(orientedtwig)),Last(Last(orientedtwig)))){
		return ReverseTwig(orientedtwig);
	}
	else return orientedtwig;
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



//Track + points

PointTrackContained=function(point,track){
	return track.some(segment=>PointSegmentContained(point,segment));
}



TrackPoints=function(track){
	if(!track.length)
		return [];
	var points=Join(...track.map(SegmentPoints));
	return DistinctArray(points);
/*
discards duplicates, in order
TrackPoints([[[0,0],[0,1]],[[0,1],[1,1]],[[1,1],[1,0]],[[1,0],[0,0]]])
[[0,0],[0,1],[1,1],[1,0]]
*/
}

TrackUnDistinctPoints=function(track){//TODO improve this as it works only for linear well ordered tracks
	if(!track.length)
		return [];
	return Append(track.map(First),Last(Last(track)));
/*
keeps duplicate points
TrackUnDistinctPoints([[[0,0],[0,1]],[[0,1],[1,1]],[[1,1],[1,0]],[[1,0],[0,0]]])
[[0,0],[0,1],[1,1],[1,0],[0,0]]
*/
}

DeletePointTrack=function(point,track){
	return track.filter(seg=>!PointSegmentContained(point,seg));
}

PointTrackContiguousPoints=function(point,track){
	var points=Join(...PointContainedTrackSegments(point,track).map(SegmentPoints));
	return Complement(points,[point]);
}

PointTrackContiguousUnBranchpoints=function(point,segments){
	return PointTrackContiguousPoints(point,segments).filter(Point=>PointTrackUnBranchpointed(Point,segments));
}

PointTrackDegree=function(point,track){
	return PointContainedTrackSegments(point,track).length;
}

TrackDegreePoints=function(track,n){
	return TrackPoints(track).filter(point=>PointTrackDegree(point,track)===n);
}
TrackOverDegreePoints=function(track,n){
	return TrackPoints(track).filter(point=>PointTrackDegree(point,track)>n);
}
TrackUnderDegreePoints=function(track,n){
	return TrackPoints(track).filter(point=>PointTrackDegree(point,track)<n);
}

PointTrackInterpointed=function(point,track){
	return In(TrackInterpoints(track),point);
}

PointTrackUnBranchpointed=function(point,track){
	return In(TrackUnderDegreePoints(track,3),point);
}

TrackEndpoints=function(track){
	return TrackDegreePoints(track,1);
}
TrackInterpoints=function(track){
	return TrackDegreePoints(track,2);
}
TrackNodepoints=function(track){
	return Complement(TrackPoints(track),TrackInterpoints(track));
}
TrackBranchpoints=function(track){
	return TrackOverDegreePoints(track,2);
}



//Track + segment

SegmentTrackContained=function(segment,track){
	return In(track,segment)||In(track,Reverse(segment));
}

DeleteSegmentTrack=function(segment,track){
	return track.filter(UnIner([segment,Reverse(segment)]));
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

FromPointTrackSegments=function(point,track){
	return PointContainedTrackSegments(point,track).map(segment=>FromPointSegment(point,segment));
}

PointContiguousTrackPoints=function(point,track){
	return Apply(Union,PointContainedTrackSegments(point,track).map(SegmentPoints)).filter(UnEqualer(point));
/*
Gets all points contiguous to a certain point in a track (connected by a segment), resorted
PointContiguousTrackPoints([1,1],[[[0,1],[1,1]],[[1,0],[1,1]],[[1,1],[2,1]],[[2,1],[1,2]],[[1,2],[1,1]]])
[[0,1],[1,0],[1,2],[2,1]]
*/
}

PointTrackClosestFruitPoints=function(xy,track,fruitPoints){
	var point=xy;
	var seenPoints=[xy];
	var nextPoints=PointContiguousTrackPoints(point,track);
	var nodePoints=[];
	while(nextPoints.length){
		point=First(nextPoints);
		seenPoints.push(point);
		if(!In(fruitPoints,point)){
			nextPoints=Join(Rest(nextPoints),PointContiguousTrackPoints(point,track).filter(UnIner(Union(nextPoints,seenPoints))));
		}
		else{
			nodePoints.push(point);
			nextPoints=Rest(nextPoints);
		}
	}
	return nodePoints;
/*
Gets the next fruit points
PointTrackClosestFruitPoints([2,2],[[[1,2],[1,3]],[[1,2],[2,2]],[[1,3],[2,3]],[[2,1],[2,2]],[[2,1],[3,1]],[[2,2],[2,3]],[[2,2],[3,2]],[[3,1],[4,1]],[[3,2],[4,2]],[[4,1],[4,2]],[[4,2],[4,3]]],[[1,3],[2,2],[3,2],[4,2],[4,3]])
[[3,2],[1,3],[4,2]]
*/
}

FromPointSegment=function(point,segment){
	if(Equal(point,Last(segment)))
		return Reverse(segment);
	else
		return segment;
/*
Well oriented
FromPointSegment([0,0],[[0,0],[0,1]])
[[0,0],[0,1]]

Needs reversing
FromPointSegment([0,1],[[0,0],[0,1]])
[[0,1],[0,0]]

Not actually there, no nothing changes
FromPointSegment([0,2],[[0,0],[0,1]])
[[0,0],[0,1]]
*/
}

TrackPointWalk=function(track,xy,PointStopped,SegmentContinued){
	var SegmentContinued=SegmentContinued||True;
	var PointStopped=PointStopped||False;
	var point=xy;
	var nextSegments=FromPointTrackSegments(point,track).filter(SegmentContinued);

	var seenSegments=[];
	var seenPoints=[];
	var stopped=PointStopped(point);
	var segment;
	while(!stopped&&nextSegments.length){
		segment=First(nextSegments);
		seenSegments=Join(seenSegments,[segment,Reverse(segment)]);
		nextSegments=Rest(nextSegments);
		point=Last(segment);
		seenPoints.push(point);
		stopped=PointStopped(point);
		if(!stopped){
			nextSegments=Join(
				nextSegments,
				FromPointTrackSegments(point,track).filter(UnIner(seenSegments)).filter(SegmentContinued)
			);
		}
	}
	return {
		segments:seenSegments,
		points:seenPoints,
		stopped:stopped
	}
}

TrackPointVerified=function(track,xy,PointStopped,SegmentContinued){
	return TrackPointWalk(track,xy,PointStopped,SegmentContinued).stopped;
/*
Does reach point [2,2]
TrackPointVerified([[[0,0],[0,1]],[[0,1],[1,1]],[[1,1],[1,2]],[[1,1],[2,1]],[[2,1],[2,2]]],[0,0],Equaler([2,2]))
true

Does not reach points [3,3] or [4,4]
TrackPointVerified([[[0,0],[0,1]],[[0,1],[1,1]],[[1,1],[1,2]],[[1,1],[2,1]],[[2,1],[2,2]]],[0,0],Iner([[3,3],[4,4]]))
false

Stops at any segment containing [1,1], not reaching [2,2]
TrackPointVerified([[[0,0],[0,1]],[[0,1],[1,1]],[[1,1],[1,2]],[[1,1],[2,1]],[[2,1],[2,2]]],[0,0],Equaler([2,2]),segment=>!PointSegmentContained([1,1],segment))
false

Does not stop a [3,3], which is absent, thus reaching [2,2]
TrackPointVerified([[[0,0],[0,1]],[[0,1],[1,1]],[[1,1],[1,2]],[[1,1],[2,1]],[[2,1],[2,2]]],[0,0],Equaler([2,2]),segment=>!PointSegmentContained([3,3],segment))
true
*/
}

TrackPointSelfLooped=function(track,point,fruitPoints){
	var fruitPoints=fruitPoints||[];
	var startsegments=PointContainedTrackSegments(point,track);
	return startsegments.some(segment=>TrackPointVerified(
		Remove(track,segment),
		First(Remove(segment,point)),
		Equaler(point),
		segment=>segment.every(UnIner(fruitPoints))
	))
/*
uninterrupted
TrackPointSelfLooped([[[0,0],[0,1]],[[0,1],[1,1]],[[1,1],[1,0]],[[1,0],[0,0]]],[0,0],[[2,2]])
true

interrupted
TrackPointSelfLooped([[[0,0],[0,1]],[[0,1],[1,1]],[[1,1],[1,0]],[[1,0],[0,0]]],[0,0],[[1,1]])
false

still loops
TrackPointSelfLooped([[[0,0],[0,1]],[[0,0],[1,0]],[[0,1],[1,1]],[[1,0],[1,1]],[[1,1],[2,1]],[[2,0],[2,1]],[[2,0],[3,0]],[[2,1],[3,1]],[[3,0],[3,1]]],[1,1],[[2,1]])
true

auto exclusion bars loop detection
TrackPointSelfLooped([[[0,0],[0,1]],[[0,0],[1,0]],[[0,1],[1,1]],[[1,0],[1,1]],[[1,1],[2,1]],[[2,0],[2,1]],[[2,0],[3,0]],[[2,1],[3,1]],[[3,0],[3,1]]],[1,1],[[1,1]])
true
*/
}

TrackPointAlignedPoints=function(track,point){
	var startsegments=FromPointTrackSegments(point,track);
	var alignedPoints=startsegments.map(
		function(segment){
			var walk=TrackPointWalk(track,point,False,seg=>SegmentEquidirected(seg,segment));
			return Last(walk.points);
		});
	return alignedPoints.filter(Identity);
/*
get the last points in line, no turns
TrackPointAlignedPoints([[[0,0],[0,1]],[[0,1],[0,2]],[[0,2],[0,3]],[[0,0],[1,0]]],[0,0])
[[0,3],[1,0]]

get the last points in line, ignoring turns
TrackPointAlignedPoints([[[0,0],[0,1]],[[0,1],[0,2]],[[0,2],[1,2]],[[0,0],[1,0]]],[0,0])
[[0,2],[1,0]]

segment orientation should not matter, only the direction
TrackPointAlignedPoints([[[1,0],[1,1]],[[1,1],[1,2]],[[1,1],[2,1]],[[1,2],[1,3]],[[2,1],[3,1]]],[1,3])
[[1,0]]
*/
}

TrackPointsSightings=function(track,points){
	var sightings=points.map(point=>TrackPointAlignedPoints(track,point));
	return Apply(Group,sightings).filter(Iner(points));
/*
lists fruits that see each other
TrackPointsSightings([[[0,1],[1,1]],[[0,2],[1,2]],[[1,0],[1,1]],[[1,1],[1,2]],[[1,2],[1,3]]],[[0,1],[0,2],[1,0],[1,3]])
[[1,3],[1,0]]

multiple sightings appear as many times as needed
TrackPointsSightings([[[0,0],[0,1]],[[0,0],[1,0]]],[[0,0],[0,1],[1,0]])
[[0,1],[1,0],[0,0],[0,0]]
*/
}
///////////////////////////////////////////////////////////////////////////////
//Forest

//Forest + point

PointForestContained=function(point,forest){
	return forest.some(track=>PointTrackContained(point,track));
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



ForestTwigs=function(forest){
	var twigs=forest.map(TrackTwigs);
	return Join(...twigs);
}


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//Point Transformations


PointTranslator=function(X,Y){
	return function(xy){
		return [xy[0]+X,xy[1]+Y];
	}
}

PointRotator=function(w,h,wise){
	return function(xy){
		return RotateXY(xy[0],xy[1],0,0,w,h,wise);
	}
}

PointXMirrorer=function(X){
	return function(xy){
		var dx=X-xy[0];
		return [xy[0]+2*dx,xy[1]];
	}
}

PointYMirrorer=function(Y){
	return function(xy){
		var dy=Y-xy[1];
		return [xy[0],xy[1]+2*dy];
	}
}

PointXYMirrorer=function(X,Y){
	return function(xy){
		var dx=X-xy[0];
		var dy=Y-xy[1];
		return [xy[0]+2*dx,xy[1]+2*dy];
	}
}

PointFlipper=function(s){
	return 	function(xy){
		return [s*xy[1],s*xy[0]];
	}
}


//Track Transformations

TransformTrack=function(track,PointTransform){
	return Clone(track).map(segment=>TransformSegment(segment,PointTransform));
}

PathXs=function(points){return points.map(First)};
PathYs=function(points){return points.map(Last)};

TrackGeometricCentrePoint=function(track){
	var points=TrackPoints(track);
	return Round([Mean(PathXs(points)),Mean(PathYs(points))],3);
}



//Translations

UnTranslateTrack=function(track){
	var XY=TrackGeometricCentrePoint(track);
	return TransformTrack(track,PointTranslator(-XY[0],-XY[1]));
}

//Symmetry

TrackPointwiseSymmetrised=function(track,XY){
	var XY=XY||TrackGeometricCentrePoint(track);
	var X=XY[0];
	var Y=XY[1];

	var Dsegments=track.filter(segment=>PathYs(SegmentPoints(segment)).every(y=>y<=Y));
	var Usegments=track.filter(segment=>PathYs(SegmentPoints(segment)).every(y=>y>=Y));
	
	Usegments=TransformTrack(Usegments,PointXYMirrorer(X,Y));
	Usegments=Sort(Usegments.map(CanonicalSegment));
	Dsegments=Sort(Dsegments.map(CanonicalSegment));
		
	return Equal(Dsegments,Usegments);
/*
accepts pointwise symmetry
TrackPointwiseSymmetrised([[[1,3],[2,3]],[[2,2],[2,3]],[[2,2],[3,2]]])
true

rejects horizontal symmetry
TrackPointwiseSymmetrised([[[1,2],[1,3]],[[1,2],[2,2]],[[2,2],[2,3]]])
false

rejects vertical symmetry
TrackPointwiseSymmetrised([[[1,3],[2,3]],[[1,4],[2,4]],[[2,3],[2,4]]])
false
*/
}

SymmetriseVerticallyTrack=function(track,Y){
	return TransformTrack(track,PointYMirrorer(Y));
}

TrackVerticallySymmetrised=function(track,XY){
	var XY=XY||TrackGeometricCentrePoint(track);
	var Y=XY[1];
	var Dsegments=track.filter(segment=>PathYs(SegmentPoints(segment)).every(y=>y<=Y));
	var Usegments=track.filter(segment=>PathYs(SegmentPoints(segment)).every(y=>y>=Y));
	
	Usegments=SymmetriseVerticallyTrack(Usegments,Y);
	Usegments=Sort(Usegments.map(CanonicalSegment));
	Dsegments=Sort(Dsegments.map(CanonicalSegment));
	return Equal(Dsegments,Usegments);
/*
rejects pointwise symmetry
TrackVerticallySymmetrised([[[1,3],[2,3]],[[2,2],[2,3]],[[2,2],[3,2]]])
false

rejects horizontal symmetry
TrackVerticallySymmetrised([[[1,2],[1,3]],[[1,2],[2,2]],[[2,2],[2,3]]])
false

accepts vertical symmetry
TrackVerticallySymmetrised([[[1,3],[2,3]],[[1,4],[2,4]],[[2,3],[2,4]]])
true
*/
}

SymmetriseHorizontallyTrack=function(track,X){
	return TransformTrack(track,PointXMirrorer(X))
}


TrackHorizontallySymmetrised=function(track,XY){
	var XY=XY||TrackGeometricCentrePoint(track);
	var X=XY[0];
	var Lsegments=track.filter(segment=>PathXs(SegmentPoints(segment)).every(x=>x<=X));
	var Rsegments=track.filter(segment=>PathXs(SegmentPoints(segment)).every(x=>x>=X));
	
	Rsegments=SymmetriseHorizontallyTrack(Rsegments,X);
	Rsegments=Sort(Rsegments.map(CanonicalSegment));
	Lsegments=Sort(Lsegments.map(CanonicalSegment));
		
	return Equal(Lsegments,Rsegments);
/*
accepts horizontal symmetry
TrackHorizontallySymmetrised([[[1,2],[1,3]],[[1,2],[2,2]],[[2,2],[2,3]]])
true

rejects vertical symmetry
TrackHorizontallySymmetrised([[[1,3],[2,3]],[[1,4],[2,4]],[[2,3],[2,4]]])
false

rejects pointwiswe symmetry
TrackVerticallySymmetrised([[[1,3],[2,3]],[[2,2],[2,3]],[[2,2],[3,2]]])
false
*/
}


TrackDiagonallySymmetrised=function(track){
	var track=UnTranslateTrack(track);
	var fliptrack=TransformTrack(track,PointFlipper(1));
	return Equaliser(track=>Sort(track.map(CanonicalSegment)))(fliptrack,track);
/*
Accepts Y=-X axis of symmetry
TrackDiagonallySymmetrised([[[2,2],[2,3]],[[2,2],[3,2]],[[3,1],[3,2]],[[3,1],[4,1]]])
true

Rejects Y=X axis of symmetry
TrackDiagonallySymmetrised([[[2,1],[3,1]],[[3,1],[3,2]],[[3,2],[4,2]],[[4,2],[4,3]]])
false
*/
}

TrackSlantlySymmetrised=function(track){
	var track=UnTranslateTrack(track);
	var fliptrack=TransformTrack(track,PointFlipper(-1));
	return Equaliser(track=>Sort(track.map(CanonicalSegment)))(fliptrack,track);
/*
Rejects Y=-X axis of symmetry
TrackSlantlySymmetrised([[[2,2],[2,3]],[[2,2],[3,2]],[[3,1],[3,2]],[[3,1],[4,1]]])
false

Accepts Y=X axis of symmetry
TrackSlantlySymmetrised([[[2,1],[3,1]],[[3,1],[3,2]],[[3,2],[4,2]],[[4,2],[4,3]]])
true
*/
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

TripletLetters={
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
	// "N":[-1,1],
	// "E":[1,1],
	// "W":[1,-1],
	// "S":[-1,1]
}

UnitDirectionCoordinates=["D","R"].map(Getter(DirectionsCoordinates));

LetterTriplets=FlipKeysValues(TripletLetters);
CoordinatesDirections=FlipKeysValues(DirectionsCoordinates);

CoordinateLetter=function(direction){
	var direction=String(direction);
	if(!In(CoordinatesDirections,direction)){
		Warn("unrecognised direction",direction);
		return "";
	}else
		return Accesser(CoordinatesDirections)(direction);
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
	var directions=letters.split("").map(Accesser(LetterTriplets)).join("").split("");
		directions=directions.map(Accesser(DirectionsCoordinates));
	var coordinates=directions;
		coordinates=coordinates.map((c,i)=>Apply(VectorPlus,Take(directions,i+1)));
		coordinates.unshift([0,0]);
		coordinates=coordinates.map(c=>VectorPlus(c,startxy))
	return SortTrack(PathTrack(coordinates));
}

SerialOrchard=function(serial,H){
	var pathserials=serial.match(PathSerialPattern);
	var pathdiffs=pathserials.map(s=>[First(s.match(/\D+/ig)),Number(First(s.match(/\d+/ig)))]);
	var accumulated=AccumulateTokenCoords(pathdiffs,H+1);
	var tracks=accumulated.map(lp=>LetterContiguousPath(lp[0],lp[1]));
	return Join(...tracks);
}

OrchardSerial=function(orchard,H){
	if(!orchard||!orchard.length)
		return "";
	var ways=Apply(Union,orchard.map(SegmentsWays));

	var pairs=ways.map(way=>[Linearise(First(way),H),way]);
		pairs=SortBy(pairs,First);

	var differences=Prepend(pairs.map(First),0);
		differences=Rest(differences).map((d,i)=>d-differences[i]);
		

	return differences.map((d,i)=>DiffWaySerial(d,ways[i])).join("");
}


DiffWaySerial=function(n,way){
	return String(n)+WayDirectionSerial(way);
}

WaySegments=function(way){
	return Rest(way).map((point,i)=>[way[i],point]);
}

WayDirectionSerial=function(way){
	if(!way.length||way.length<2)
		return "";
	var directions=WaySegments(way).map(SegmentDirection);
	return DirectionsTripletSerial(directions);
}

DirectionsTripletSerial=function(directions){
	var letters=directions.map(CoordinateLetter);
		triplets=letters.join("").split(/(\D\D\D)/g);
		letters=triplets.map(Accesser(TripletLetters));
	return letters.join("");
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

var DirectionSort=Sorter(d=>Keys(LetterTriplets).findIndex(D=>D===d))


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//Shapes


PointTrackShape=function(point,track){
	var segments=PointContainedTrackSegments(point,track);
	if(!segments||!segments.length){
		return "";
	}
	var directions=segments.map(s=>TranslateSegment(s,-1*point[0],-1*point[1]));
		directions=directions.map(s=>First(Remove(s,[0,0])));
		directions=directions.map(CoordinateLetter);
	return DirectionSort(directions).join("");
}


PointConsecutiveShapePairs=function(point,track){//Todo slash points in half
	var consecutivepoints=PointTrackContiguousPoints(point,track);
	var shape=PointTrackShape(point,track);
	return consecutivepoints.map(point=>[shape,PointTrackShape(point,track)]);
}

TrackConsecutiveShapePairs=function(track){
	return DistinctArray(Join(...TrackPoints(track).map(point=>PointConsecutiveShapePairs(point,track))),Sort);
}





DefinedShout("data-game-segments")