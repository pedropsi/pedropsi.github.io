////////////////////////////////////////////////////////////////////////////////
// Customisation
var ObtainLevelTitle="Previous";

////////////////////////////////////////////////////////////////////////////////
// Source
var sourceCode=`(- Copyright Pedro PSI 2020                             -)
(- Version nº 14/11/2020                            .15 -)
(- RULES / LEGEND section under a CC-BY-NC license      -)
(--------------------------------------------------------)

title Starkoban
author Pedro PSI
homepage pedropsi.github.io

background_color #555555 (gray)
text_color #FF9703 (player orange)

realtime_interval 0.16
key_repeat_interval 0.16

run_rules_on_level_start


========
OBJECTS
========

Background 
#F7F7F7 (white) #FFFFFF (light white)
11110
11100
11000
10000
00000

Wall 
#555555 (gray) #5A5A5A
11110
11100
11000
10000
00000

OverWall 
#555555 (gray)


Glass 
#666666 (bright gray) #6F6F6F (brighter gray)
111..
11...
1...0
...00
..000


Player 
#FF9703 (player orange) #FF8403 (pdayer orange)
.000.
00000
10001
.111.
.1.1.   

Star
transparent

StarCrate
#FF9703 (player orange) #FF8403 (pdayer orange)
.....
.000.
.1.1.
.111.
.....

StarBump1
transparent

StarBump2
#555555 (gray) #666666 (bright gray)
.....
.111.
.1.0.
.100.
.....

StarBump3
#666666 (bright gray) #6F6F6F (brighter gray)
.....
.111.
.1.0.
.100.
.....


Star1
transparent #AB9B51
00000
01110
01010
01110
00000

Star2
transparent #83A04B 
00000
01110
01010
01110
00000

Star3
transparent #AB8451
00000
01110
01010
01110
00000

Star4
transparent #AB5351 
00000
01110
01010
01110
00000


RegionSub
transparent

Region1
#F1E7B7 #F6ECBC #DED795 #D8D088
11110
11100
11000
10000
00000
Region2
#CFE1AB #D5E6AF #B8CF8B #B0C97F
11110
11100
11000
10000
00000
Region3
#F1D8B7 #F6DDBC #DEBE95 #D8B688
11110
11100
11000
10000
00000
Region4
#F1B8B7 #F6BDBC #DE9695 #D88A88
11110
11100
11000
10000
00000

Highlight
transparent


Highlight1
#F1E7B7 #F6ECBC
11110
11100
11000
10000
00000

Highlight2
#CFE1AB #D5E6AF
11110
11100
11000
10000
00000

Highlight3
#F1D8B7 #F6DDBC
11110
11100
11000
10000
00000

Highlight4
#F1B8B7 #F6BDBC
11110
11100
11000
10000
00000

LinkL
transparent
LinkU
transparent 
LinkR
transparent
LinkD
transparent

LineV
transparent transparent #555555 (gray)
.....
..1..
.....
..1..
.....

LineH
transparent transparent #555555 (gray)
.....
.....
.1.1.
.....
.....

LineV1
transparent #CDC080 #FFFEF4
..1..
..1..
.....
..1..
..1..
LineH1
transparent #CDC080 #FFFEF4
.....
.....
11.11
.....
.....

LineV2
transparent #A7BF77 #F6F9EE
..1..
..1..
.....
..1..
..1..

LineH2
transparent #A7BF77 #F6F9EE
.....
.....
11.11
.....
.....

LineV3
transparent #CDAC80 #FFFAF4
..1..
..1..
.....
..1..
..1..
LineH3
transparent #CDAC80 #FFFAF4
.....
.....
11.11
.....
.....

LineV4
transparent #CD8280 #FFF4F4
..1..
..1..
.....
..1..
..1..
LineH4
transparent #CD8280 #FFF4F4
.....
.....
11.11
.....
.....


LineD
transparent transparent #555555 (gray)
.....
.....
.....
...11
...1.

LineO
transparent transparent #555555 (gray)
.....
.....
.....
11...
.1...

LineD1
transparent #CDC080
.....
.....
.....
...11
...1.

LineO1
transparent #CDC080
.....
.....
.....
11...
.1...

LineD2
transparent #A7BF77
.....
.....
.....
...11
...1.

LineO2
transparent #A7BF77
.....
.....
.....
11...
.1...

LineD3
transparent #CDAC80
.....
.....
.....
...11
...1.

LineO3
transparent #CDAC80
.....
.....
.....
11...
.1...

LineD4
transparent #CD8280
.....
.....
.....
...11
...1.

LineO4
transparent #CD8280
.....
.....
.....
11...
.1...

LineB
transparent transparent #555555 (gray)
.1...
11...
.....
.....
.....

LineC
transparent transparent #555555 (gray)
...1.
...11
.....
.....
.....

LineB1
transparent #CDC080
.1...
11...
.....
.....
.....
LineC1
transparent #CDC080
...1.
...11
.....
.....
.....

LineB2
transparent #A7BF77
.1...
11...
.....
.....
.....

LineC2
transparent #A7BF77
...1.
...11
.....
.....
.....

LineB3
transparent #CDAC80
.1...
11...
.....
.....
.....

LineC3
transparent #CDAC80
...1.
...11
.....
.....
.....

LineB4
transparent #CD8280
.1...
11...
.....
.....
.....

LineC4
transparent #CD8280
...1.
...11
.....
.....
.....



WallDecoD1
#666666 (bright gray)
00000
.....
.....
.....
.....

WallDecoD2
#666666 (bright gray)
.....
.000.
.....
.....
.....

WallDecoD3
#666666 (bright gray)
.....
.....
..0..
.....
.....


WallDecoU1
#666666 (bright gray)
.....
.....
.....
.....
00000

WallDecoU2
#666666 (bright gray)
.....
.....
.....
.000.
.....

WallDecoU3
#666666 (bright gray)
.....
.....
..0..
.....
.....

WallDecoR1
#666666 (bright gray)(bright gray)
0....
0....
0....
0....
0....

WallDecoR2
#666666 (bright gray)
.....
.0...
.0...
.0...
.....

WallDecoR3
#666666 (bright gray)
.....
.....
..0..
.....
.....

WallDecoL1
#666666 (bright gray)
....0
....0
....0
....0
....0

WallDecoL2
#666666 (bright gray)
.....
...0.
...0.
...0.
.....

WallDecoL3
#666666 (bright gray)
.....
.....
..0..
.....
.....

BorderL
#666666 (bright gray) #6F6F6F (brighter gray) 
1....
1....
1....
1....
0....

BorderU
#666666 (bright gray) #6F6F6F (brighter gray) 
11110
.....
.....
.....
.....

BorderR
#666666 (bright gray)
....0
....0
....0
....0
....0

BorderD 
#666666 (bright gray)
.....
.....
.....
.....
00000


BoLXU
#666666 (bright gray) #6F6F6F (brighter gray)
1....
.....
.....
.....
.....

BoDXL
#666666 (bright gray)
.....
.....
.....
.....
0....

BoUXR
#666666 (bright gray)
....0
.....
.....
.....
.....

BoRXD
#666666 (bright gray)
.....
.....
.....
.....
....0

BorderLkD
transparent
BorderUkL
transparent
BorderRkU
transparent
BorderDkR
transparent

BorderLkU
transparent
BorderUkR
transparent
BorderRkD
transparent
BorderDkL
transparent


FixedL
white
.....
.....
00...
.....
.....

FixedU
white
..0..
..0..
.....
.....
.....
FixedR
white
.....
.....
...00
.....
.....
FixedD
white
.....
.....
.....
..0..
..0..

Mu1
transparent
Mr1
transparent
Md1
transparent
Ml1
transparent
Mu2
transparent
Mr2
transparent
Md2
transparent
Ml2
transparent
Mu3
transparent
Mr3
transparent
Md3
transparent
Ml3
transparent
Mu4
transparent
Mr4
transparent
Md4
transparent
Ml4
transparent

S0
transparent
S1
transparent
S2
transparent
S3
transparent
S4
transparent
S5
transparent
S6
transparent
S7
transparent
S8
transparent
S9
transparent

MovedL1
#FF9703 (player orange)
.....
.....
...0.
.....
.....

MovedL2
#FF9703 (player orange)
.....
.....
.00..
.....
.....

MovedL3
#FF9703 (player orange)
.....
.....
.0...
.....
.....


MovedU1
#FF9703 (player orange)
.....
.....
.....
..0..
.....

MovedU2
#FF9703 (player orange)
.....
..0..
..0..
.....
.....

MovedU3
#FF9703 (player orange)
.....
..0..
.....
.....
.....

MovedR1
#FF9703 (player orange)
.....
.....
.0...
.....
.....

MovedR2
#FF9703 (player orange)
.....
.....
.00..
.....
.....

MovedR3
#FF9703 (player orange)
.....
.....
...0.
.....
.....

MovedD1
#FF9703 (player orange)
.....
..0..
.....
.....
.....

MovedD2
#FF9703 (player orange)
.....
..0..
..0..
.....
.....

MovedD3
#FF9703 (player orange)
.....
.....
..0..
.....
.....

Once
transparent
Twice
transparent

ZenMode
transparent

OutlineL
#F7F7F7 (white) #FFFFFF (light white)
1....
1....
1....
1....
0....

OutlineU
#F7F7F7 (white) #FFFFFF (light white)
11110
.....
.....
.....
.....

OutlineR
#F7F7F7 (white) #FFFFFF (light white)
....0
....0
....0
....0
....0

OutlineD 
#F7F7F7 (white) #FFFFFF (light white)
.....
.....
.....
.....
00000


OutlineLXU
#F7F7F7 (white) #FFFFFF (light white)
1....
.....
.....
.....
.....

OutlineDXL
#F7F7F7 (white) #FFFFFF (light white)
.....
.....
.....
.....
0....

OutlineUXR
#F7F7F7 (white) #FFFFFF (light white)
....0
.....
.....
.....
.....

OutlineRXD
#F7F7F7 (white) #FFFFFF (light white)
.....
.....
.....
.....
....0

OutlineLkD
transparent
OutlineUkL
transparent
OutlineRkU
transparent
OutlineDkR
transparent

OutlineLkU
transparent
OutlineUkR
transparent
OutlineRkD
transparent
OutlineDkL
transparent




=======
LEGEND
=======

. = Background
# = Wall
P = Player
O = Star


À = Player and Region1 and RegionSub
È = Player and Region2 and RegionSub
Ì = Player and Region3 and RegionSub
Ò = Player and Region4 and RegionSub

Á = Star and Region1 and RegionSub
É = Star and Region2 and RegionSub
Í = Star and Region3 and RegionSub
Ú = Star and Region4 and RegionSub

A = Glass and Region1 and RegionSub
E = Glass and Region2 and RegionSub
I = Glass and Region3 and RegionSub
U = Glass and Region4 and RegionSub


1 = Region1 and RegionSub
2 = Region2 and RegionSub
3 = Region3 and RegionSub
4 = Region4 and RegionSub

Regions = Region1 or Region2 or Region3 or Region4

Links = LinkL or LinkU or LinkR or LinkD

Line = LineV or LineH

Star123 = Star1 or Star2 or Star3
Star234 = Star2 or Star3 or Star4
Star341 = Star3 or Star4 or Star1
Star412 = Star4 or Star1 or Star2

LinesV = LineV1 or LineV2 or LineV3 or LineV4
LinesH = LineH1 or LineH2 or LineH3 or LineH4

LinesD = LineD1 or LineD2 or LineD3 or LineD4
LinesO = LineO1 or LineO2 or LineO3 or LineO4
LinesB = LineB1 or LineB2 or LineB3 or LineB4
LinesC = LineC1 or LineC2 or LineC3 or LineC4


Line1 = LineH1 or LineV1 or LineD1 or LineO1 or LineB1 or LineC1
Line2 = LineH2 or LineV2 or LineD2 or LineO2 or LineB2 or LineC2
Line3 = LineH3 or LineV3 or LineD3 or LineO3 or LineB3 or LineC3
Line4 = LineH4 or LineV4 or LineD4 or LineO4 or LineB4 or LineC4

Lines = LinesV or LinesH or LinesD or LinesO or LinesB or LinesC

DiagonalHighlights= Ml1 or Ml2 or Ml3 or Ml4 or Mu1 or Mu2 or Mu3 or Mu4 or Mr1 or Mr2 or Mr3 or Mr4 or Md1 or Md2 or Md3 or Md4 

Highlights = Highlight1 or Highlight2 or Highlight3 or Highlight4

Stars = Star1 or Star2 or Star3 or Star4 or StarCrate

UnPushable = Wall or Glass
Pushable = Star or Player
Pusher = Pushable
Item = Pushable or UnPushable

Fixed = FixedL or FixedR or FixedU or FixedD 


WallDecoL = WallDecoL1 or WallDecoL2 or WallDecoL3
WallDecoU = WallDecoU1 or WallDecoU2 or WallDecoU3
WallDecoR = WallDecoR1 or WallDecoR2 or WallDecoR3
WallDecoD = WallDecoD1 or WallDecoD2 or WallDecoD3

StarBump = StarBump1 or StarBump2 or StarBump3
WallDeco = WallDecoL or WallDecoU or WallDecoR or WallDecoD

Touchable = Pushable
Toucher = Wall or Glass

Decorable = UnPushable

Borders= BorderL or BorderU or BorderR or BorderD or BoLXU or BoUXR or BoDXL or BoRXD

Outlines= OutlineL or OutlineU or OutlineR or OutlineD or OutlineLXU or OutlineUXR or OutlineDXL or OutlineRXD


Signature = S0 or S1 or S2 or S3 or S4 or S5 or S6 or S7 or S8 or S9
Signature_ = S0 and S1 and S2 and S3 and S4 and S5 and S6 and S7 and S8 and S9


MovedL = MovedL1 or MovedL2 or MovedL3
MovedU = MovedU1 or MovedU2 or MovedU3
MovedR = MovedR1 or MovedR2 or MovedR3
MovedD = MovedD1 or MovedD2 or MovedD3
Moved = MovedL or MovedU or MovedR or MovedD

Moved1 = MovedL1 or MovedU1 or MovedR1 or MovedD1
Moved2 = MovedL2 or MovedU2 or MovedR2 or MovedD2
Moved3 = MovedL3 or MovedU3 or MovedR3 or MovedD3

Deco = Moved or WallDeco or StarBump

Zenable = Lines or Highlights

=======
SOUNDS
=======

================
COLLISIONLAYERS
================

Background
RegionSub
Regions
Highlight 
Highlights

OutlineL
OutlineU
OutlineR
OutlineD

OutlineLXU 
OutlineUXR 
OutlineDXL 
OutlineRXD

OutlineLkD
OutlineUkL
OutlineRkU
OutlineDkR

OutlineLkU
OutlineUkR
OutlineRkD
OutlineDkL

Moved
Once
Twice

LinkL
LinkU
LinkR
LinkD

LineV
LineH
LineD
LineO
LineB
LineC
LinesV
LinesH
LineD1
LineO1
LineB1
LineC1
LineD2
LineO2
LineB2
LineC2
LineD3
LineO3
LineB3
LineC3
LineD4
LineO4
LineB4
LineC4

Wall, Glass

BorderL
BorderU
BorderR
BorderD

BoLXU 
BoUXR 
BoDXL 
BoRXD

BorderLkD
BorderUkL
BorderRkU
BorderDkR

BorderLkU
BorderUkR
BorderRkD
BorderDkL


Player, Star

Stars

WallDecoL
WallDecoU
WallDecoR
WallDecoD

StarBump

OverWall

FixedL
FixedU
FixedR
FixedD

Mu1
Mr1
Md1
Ml1
Mu2
Mr2
Md2
Ml2
Mu3
Mr3
Md3
Ml3
Mu4
Mr4
Md4
Ml4

S0
S1
S2
S3
S4
S5
S6
S7
S8
S9

ZenMode

======
RULES     
======    

late [Signature]->[]
late [Player]->[Player Signature_]
late [Player Signature][Star Regions no Signature]->[Player][Star Regions Signature]
late [Player Signature]->[Player]

late [Region1 Signature|Region1]->[Region1 Signature|Region1 Signature]
late [Region2 Signature|Region2]->[Region2 Signature|Region2 Signature]
late [Region3 Signature|Region3]->[Region3 Signature|Region3 Signature]
late [Region4 Signature|Region4]->[Region4 Signature|Region4 Signature]

late [Highlights]->[]
late [Region1 Signature no Highlights]-> [Region1 Signature Highlight1]
late [Region2 Signature no Highlights]-> [Region2 Signature Highlight2]
late [Region3 Signature no Highlights]-> [Region3 Signature Highlight3]
late [Region4 Signature no Highlights]-> [Region4 Signature Highlight4]



late [Line]->[]
late [Lines]->[]

(make lines single signature
startloop
late random [Star Signature no Once no Twice]->[Star Signature Once Twice]
late vertical [Signature Once|no Wall]-> [Signature Once|Signature Once]
late horizontal [Signature Twice|no Wall]-> [Signature Twice|Signature Twice]
endloop
late [Once]->[]
late [Twice]->[])


late vertical   [Star Region1 no LineV1]->[Star Region1 LineV1]
late vertical   [Star Region2 no LineV2]->[Star Region2 LineV2]
late vertical   [Star Region3 no LineV3]->[Star Region3 LineV3]
late vertical   [Star Region4 no LineV4]->[Star Region4 LineV4]
late horizontal [Star Region1 no LineH1]->[Star Region1 LineH1]
late horizontal [Star Region2 no LineH2]->[Star Region2 LineH2]
late horizontal [Star Region3 no LineH3]->[Star Region3 LineH3]
late horizontal [Star Region4 no LineH4]->[Star Region4 LineH4]

late vertical   [LineV1| no LineV1 no Wall]->[LineV1 |LineV1]
late vertical   [LineV2| no LineV2 no Wall]->[LineV2 |LineV2]
late vertical   [LineV3| no LineV3 no Wall]->[LineV3 |LineV3]
late vertical   [LineV4| no LineV4 no Wall]->[LineV4 |LineV4]
late horizontal [LineH1| no LineH1 no Wall]->[LineH1 |LineH1]
late horizontal [LineH2| no LineH2 no Wall]->[LineH2 |LineH2]
late horizontal [LineH3| no LineH3 no Wall]->[LineH3 |LineH3]
late horizontal [LineH4| no LineH4 no Wall]->[LineH4 |LineH4]

late [LinesV no Regions]->[]
late [LinesH no Regions]->[]

late [LinesV no LineV]->[LinesV LineV]
late [LinesH no LineH]->[LinesH LineH]

late [LinesV Star]->[Star]
late [LinesH Star]->[Star]



late left  [Star Region1 | no LineD1]->[Star Region1 | Mu1 LineD1]
late up    [Star Region1 | no LineO1]->[Star Region1 | Mr1 LineO1]
late right [Star Region1 | no LineB1]->[Star Region1 | Md1 LineB1]
late down  [Star Region1 | no LineC1]->[Star Region1 | Ml1 LineC1]
late left  [Star Region2 | no LineD2]->[Star Region2 | Mu2 LineD2]
late up    [Star Region2 | no LineO2]->[Star Region2 | Mr2 LineO2]
late right [Star Region2 | no LineB2]->[Star Region2 | Md2 LineB2]
late down  [Star Region2 | no LineC2]->[Star Region2 | Ml2 LineC2]
late left  [Star Region3 | no LineD3]->[Star Region3 | Mu3 LineD3]
late up    [Star Region3 | no LineO3]->[Star Region3 | Mr3 LineO3]
late right [Star Region3 | no LineB3]->[Star Region3 | Md3 LineB3]
late down  [Star Region3 | no LineC3]->[Star Region3 | Ml3 LineC3]
late left  [Star Region4 | no LineD4]->[Star Region4 | Mu4 LineD4]
late up    [Star Region4 | no LineO4]->[Star Region4 | Mr4 LineO4]
late right [Star Region4 | no LineB4]->[Star Region4 | Md4 LineB4]
late down  [Star Region4 | no LineC4]->[Star Region4 | Ml4 LineC4]

late up    [Mu1 LineD1|Regions]->[|LineD1 Regions]
late right [Mr1 LineO1|Regions]->[|LineO1 Regions]
late down  [Md1 LineB1|Regions]->[|LineB1 Regions]
late left  [Ml1 LineC1|Regions]->[|LineC1 Regions]
late up    [Mu2 LineD2|Regions]->[|LineD2 Regions]
late right [Mr2 LineO2|Regions]->[|LineO2 Regions]
late down  [Md2 LineB2|Regions]->[|LineB2 Regions]
late left  [Ml2 LineC2|Regions]->[|LineC2 Regions]
late up    [Mu3 LineD3|Regions]->[|LineD3 Regions]
late right [Mr3 LineO3|Regions]->[|LineO3 Regions]
late down  [Md3 LineB3|Regions]->[|LineB3 Regions]
late left  [Ml3 LineC3|Regions]->[|LineC3 Regions]
late up    [Mu4 LineD4|Regions]->[|LineD4 Regions]
late right [Mr4 LineO4|Regions]->[|LineO4 Regions]
late down  [Md4 LineB4|Regions]->[|LineB4 Regions]
late left  [Ml4 LineC4|Regions]->[|LineC4 Regions]

late up    [Mu1 LineD1]->[]
late right [Mr1 LineO1]->[]
late down  [Md1 LineB1]->[]
late left  [Ml1 LineC1]->[]
late up    [Mu2 LineD2]->[]
late right [Mr2 LineO2]->[]
late down  [Md2 LineB2]->[]
late left  [Ml2 LineC2]->[]
late up    [Mu3 LineD3]->[]
late right [Mr3 LineO3]->[]
late down  [Md3 LineB3]->[]
late left  [Ml3 LineC3]->[]
late up    [Mu4 LineD4]->[]
late right [Mr4 LineO4]->[]
late down  [Md4 LineB4]->[]
late left  [Ml4 LineC4]->[]


(Push and Collide)
(---------------------------------------------------)
(Push)
  left  [left  Pusher|stationary Pushable no FixedL]->[left  Pusher|left  Pushable]
+ up    [up    Pusher|stationary Pushable no FixedU]->[up    Pusher|up    Pushable]
+ right [right Pusher|stationary Pushable no FixedR]->[right Pusher|right Pushable]
+ down  [down  Pusher|stationary Pushable no FixedD]->[down  Pusher|down  Pushable]

(Specific)
left  [left  Star no Region1|Line1]->[Star FixedL|Line1]
left  [left  Star no Region2|Line2]->[Star FixedL|Line2]
left  [left  Star no Region3|Line3]->[Star FixedL|Line3]
left  [left  Star no Region4|Line4]->[Star FixedL|Line4]

up    [up    Star no Region1|Line1]->[Star FixedU|Line1]
up    [up    Star no Region2|Line2]->[Star FixedU|Line2]
up    [up    Star no Region3|Line3]->[Star FixedU|Line3]
up    [up    Star no Region4|Line4]->[Star FixedU|Line4]

right [right Star no Region1|Line1]->[Star FixedR|Line1]
right [right Star no Region2|Line2]->[Star FixedR|Line2]
right [right Star no Region3|Line3]->[Star FixedR|Line3]
right [right Star no Region4|Line4]->[Star FixedR|Line4]

down  [down  Star no Region1|Line1]->[Star FixedD|Line1]
down  [down  Star no Region2|Line2]->[Star FixedD|Line2]
down  [down  Star no Region3|Line3]->[Star FixedD|Line3]
down  [down  Star no Region4|Line4]->[Star FixedD|Line4]

left  [left  Star no S0|S0]->[Star FixedL|S0]
left  [left  Star no S1|S1]->[Star FixedL|S1]
left  [left  Star no S2|S2]->[Star FixedL|S2]
left  [left  Star no S3|S3]->[Star FixedL|S3]
left  [left  Star no S4|S4]->[Star FixedL|S4]

up    [up    Star no S0|S0]->[Star FixedU|S0]
up    [up    Star no S1|S1]->[Star FixedU|S1]
up    [up    Star no S2|S2]->[Star FixedU|S2]
up    [up    Star no S3|S3]->[Star FixedU|S3]
up    [up    Star no S4|S4]->[Star FixedU|S4]

right [right Star no S0|S0]->[Star FixedR|S0]
right [right Star no S1|S1]->[Star FixedR|S1]
right [right Star no S2|S2]->[Star FixedR|S2]
right [right Star no S3|S3]->[Star FixedR|S3]
right [right Star no S4|S4]->[Star FixedR|S4]

down  [down  Star no S0|S0]->[Star FixedD|S0]
down  [down  Star no S1|S1]->[Star FixedD|S1]
down  [down  Star no S2|S2]->[Star FixedD|S2]
down  [down  Star no S3|S3]->[Star FixedD|S3]
down  [down  Star no S4|S4]->[Star FixedD|S4]




(Collide)
  left  [left  Pusher|UnPushable]->[stationary Pusher FixedL|UnPushable]
+ up    [up    Pusher|UnPushable]->[stationary Pusher FixedU|UnPushable]
+ right [right Pusher|UnPushable]->[stationary Pusher FixedR|UnPushable]
+ down  [down  Pusher|UnPushable]->[stationary Pusher FixedD|UnPushable]



(Prevent unacomplished moves: Part 1)
(---------------------------------------------------)
  left  [left  Item | FixedL]->[left  Item FixedL| FixedL]
+ up    [up    Item | FixedU]->[up    Item FixedU| FixedU]
+ right [right Item | FixedR]->[right Item FixedR| FixedR]
+ down  [down  Item | FixedD]->[down  Item FixedD| FixedD]

(Prevent unacomplished moves: Part 2)
(---------------------------------------------------)
  left  [left  Item FixedL]->[stationary Item FixedL ]
+ up    [up    Item FixedU]->[stationary Item FixedU ]
+ right [right Item FixedR]->[stationary Item FixedR ]
+ down  [down  Item FixedD]->[stationary Item FixedD ]





(paint stones)
late [Stars]->[]
late [Star no Regions]->[Star StarCrate]

late [Star Region1]->[Star Star1 Region1]
late [Star Region2]->[Star Star2 Region2]
late [Star Region3]->[Star Star3 Region3]
late [Star Region4]->[Star Star4 Region4]


(Region Outlines)
(---------------------------------------------------)

late left  [Region1 no OutlineL|no Region1]-> [Region1 OutlineL|]
late up    [Region1 no OutlineU|no Region1]-> [Region1 OutlineU|]
late right [Region1 no OutlineR|no Region1]-> [Region1 OutlineR|]
late down  [Region1 no OutlineD|no Region1]-> [Region1 OutlineD|]

late left  [Region2 no OutlineL|no Region2]-> [Region2 OutlineL|]
late up    [Region2 no OutlineU|no Region2]-> [Region2 OutlineU|]
late right [Region2 no OutlineR|no Region2]-> [Region2 OutlineR|]
late down  [Region2 no OutlineD|no Region2]-> [Region2 OutlineD|]

late left  [Region3 no OutlineL|no Region3]-> [Region3 OutlineL|]
late up    [Region3 no OutlineU|no Region3]-> [Region3 OutlineU|]
late right [Region3 no OutlineR|no Region3]-> [Region3 OutlineR|]
late down  [Region3 no OutlineD|no Region3]-> [Region3 OutlineD|]

late left  [Region4 no OutlineL|no Region4]-> [Region4 OutlineL|]
late up    [Region4 no OutlineU|no Region4]-> [Region4 OutlineU|]
late right [Region4 no OutlineR|no Region4]-> [Region4 OutlineR|]
late down  [Region4 no OutlineD|no Region4]-> [Region4 OutlineD|]

(corners)
late left  [Regions no OutlineLkD|Regions OutlineD]->[Regions OutlineLkD|Regions OutlineD]
late up    [Regions no OutlineUkL|Regions OutlineL]->[Regions OutlineUkL|Regions OutlineL]
late right [Regions no OutlineRkU|Regions OutlineU]->[Regions OutlineRkU|Regions OutlineU]
late down  [Regions no OutlineDkR|Regions OutlineR]->[Regions OutlineDkR|Regions OutlineR]

late left  [Regions no OutlineLkU|Regions OutlineU]->[Regions OutlineLkU|Regions OutlineU]
late up    [Regions no OutlineUkR|Regions OutlineR]->[Regions OutlineUkR|Regions OutlineR]
late right [Regions no OutlineRkD|Regions OutlineD]->[Regions OutlineRkD|Regions OutlineD]
late down  [Regions no OutlineDkL|Regions OutlineL]->[Regions OutlineDkL|Regions OutlineL]

late [Regions OutlineLkU OutlineUkL no OutlineLxU]->[Regions OutlineLkU OutlineUkL OutlineLxU]
late [Regions OutlineUkR OutlineRkU no OutlineUxR]->[Regions OutlineUkR OutlineRkU OutlineUxR]
late [Regions OutlineRkD OutlineDkR no OutlineRxD]->[Regions OutlineRkD OutlineDkR OutlineRxD]
late [Regions OutlineDkL OutlineLkD no OutlineDxL]->[Regions OutlineDkL OutlineLkD OutlineDxL]

late [Highlights Outlines]->[Highlights]


(Wall borders)
(---------------------------------------------------)

(basic)
late left  [Decorable no BorderL|no Decorable]-> [Decorable BorderL|]
late up    [Decorable no BorderU|no Decorable]-> [Decorable BorderU|]
late right [Decorable no BorderR|no Decorable]-> [Decorable BorderR|]
late down  [Decorable no BorderD|no Decorable]-> [Decorable BorderD|]

(corners)
late left  [Decorable no BorderLkD|Decorable BorderD]->[Decorable BorderLkD|Decorable BorderD]
late up    [Decorable no BorderUkL|Decorable BorderL]->[Decorable BorderUkL|Decorable BorderL]
late right [Decorable no BorderRkU|Decorable BorderU]->[Decorable BorderRkU|Decorable BorderU]
late down  [Decorable no BorderDkR|Decorable BorderR]->[Decorable BorderDkR|Decorable BorderR]

late left  [Decorable no BorderLkU|Decorable BorderU]->[Decorable BorderLkU|Decorable BorderU]
late up    [Decorable no BorderUkR|Decorable BorderR]->[Decorable BorderUkR|Decorable BorderR]
late right [Decorable no BorderRkD|Decorable BorderD]->[Decorable BorderRkD|Decorable BorderD]
late down  [Decorable no BorderDkL|Decorable BorderL]->[Decorable BorderDkL|Decorable BorderL]

late [Decorable BorderLkU BorderUkL no BoLxU]->[Decorable BorderLkU BorderUkL BoLxU]
late [Decorable BorderUkR BorderRkU no BoUxR]->[Decorable BorderUkR BorderRkU BoUxR]
late [Decorable BorderRkD BorderDkR no BoRxD]->[Decorable BorderRkD BorderDkR BoRxD]
late [Decorable BorderDkL BorderLkD no BoDxL]->[Decorable BorderDkL BorderLkD BoDxL]

late [Wall no Borders]->[Wall OverWall]

(Wall Touch)
(---------------------------------------------------)
left  [Touchable FixedL |Toucher no WallDeco]->[Touchable FixedL|Toucher WallDecoL1]
up    [Touchable FixedU |Toucher no WallDeco]->[Touchable FixedU|Toucher WallDecoU1]
right [Touchable FixedR |Toucher no WallDeco]->[Touchable FixedR|Toucher WallDecoR1]
down  [Touchable FixedD |Toucher no WallDeco]->[Touchable FixedD|Toucher WallDecoD1]

(Bump Push Animation)
(---------------------------------------------------)

left  [Star FixedL no StarBump]->[Star FixedL StarBump1]
up    [Star FixedU no StarBump]->[Star FixedU StarBump1]
right [Star FixedR no StarBump]->[Star FixedR StarBump1]
down  [Star FixedD no StarBump]->[Star FixedD StarBump1]

[left  Player no FixedL]->[left  Player no FixedL MovedL1]
[up    Player no FixedU]->[up    Player no FixedU MovedU1]
[right Player no FixedR]->[right Player no FixedR MovedR1]
[down  Player no FixedD]->[down  Player no FixedD MovedD1]

[Fixed]->[]



(Wall Push Animation)
(---------------------------------------------------)
[WallDeco no Decorable] -> []

[WallDecoL .]->[WallDecoL]
[WallDecoL1 no .]->[WallDecoL2 .]
[WallDecoL2 no .]->[WallDecoL3 .]
[WallDecoL3 no .]->[ .]

[WallDecoU .]->[WallDecoU]
[WallDecoU1 no .]->[WallDecoU2 .]
[WallDecoU2 no .]->[WallDecoU3 .]
[WallDecoU3 no .]->[ .]

[WallDecoR .]->[WallDecoR]
[WallDecoR1 no .]->[WallDecoR2 .]
[WallDecoR2 no .]->[WallDecoR3 .]
[WallDecoR3 no .]->[ .]

[WallDecoD .]->[WallDecoD]
[WallDecoD1 no .]->[WallDecoD2 .]
[WallDecoD2 no .]->[WallDecoD3 .]
[WallDecoD3 no .]->[ .]

[StarBump .]->[StarBump]
[StarBump1 no .]->[StarBump2 .]
[StarBump2 no .]->[StarBump3 .]
[StarBump3 no .]->[ .]

(Moved Animation)
(---------------------------------------------------)
[Moved .]->[Moved]
[MovedL1 no .]->[MovedL2 .]
[MovedL2 no .]->[MovedL3 .]
[MovedL3 no .]->[.]

[MovedU1 no .]->[MovedU2 .]
[MovedU2 no .]->[MovedU3 .]
[MovedU3 no .]->[.]

[MovedR1 no .]->[MovedR2 .]
[MovedR2 no .]->[MovedR3 .]
[MovedR3 no .]->[.]

[MovedD1 no .]->[MovedD2 .]
[MovedD2 no .]->[MovedD3 .]
[MovedD3 no .]->[.]


(Zen Mode)
(---------------------------------------------------
[action Player][ZenMode]->[Player][]
[action Player no ZenMode]->[Player ZenMode]
late [ZenMode][Zenable]->[ZenMode][]
)




==============
WINCONDITIONS
==============

all RegionSub on Highlights

=======     
LEVELS
=======

message Welcome to Starkoban!
message Place one stone per area.

message ...... Level 1 / 14 * .......
message "For star'ters"

(goal and pushing)

#########
##..2####
##3..####
###.O...#
#..o#o..#
#...O.###
####..1##
####4.P##
#########

message You may push many stones together.
message ...... Level 2 / 14 * .......
message "Moth"

(multi pushing)
(enter and exit)

########
####3###
#.4o.###
#..oP.1#
##..oo##
###..2##
####..##
########

message Active stones are called "stars".
message Stars block entire lines.

message ...... Level 3 / 14 ** .......
message "Linear"

(larger regions)
(region blocking)

########
#####.1#
#3333..#
#.###..#
#...44##
##..o.##
##..####
#222####
#ooo####
#.P.####
########


message Stars cannot touch each other...
message ... even diagonally.

message ...... Level 4 / 14 ** .......
message "Touchy"

(adjacency)

#######
#..3.##
#.o3o.#
#44#22#
#.o1o.#
##.1.P#
#######


message Starlines extend across regions.
message ...... Level 5 / 14 *** .......
message "Waltz"

(line blocking across regions)

#########
####..###
##P4.o###
#.O4333##
#..4#2..#
##1112O.#
###o.2###
###..####
#########


message Starlines jump over gaps.
message ...... Level 6 / 14 *** .......
message "Intersect"

(disconnected lines)

########
##3..4##
#33..44#
#..##..#
#..##..#
#11..22#
##1..2##
##OOOO##
##.P..##
########


message Some stones need an extra push.
message ...... Level 7 / 14 *** .......
message "Imperfection"

(push special)

######
#3344#
#3344#
#11P2#
#1122#
##..##
#....#
#.Oo.#
#.Oo.#
#....#
######

message Walls block starlines.
message ...... Level 8 / 14 *** .......
message "Eyeglasses"

########
#....###
#1o43o2#
#1#43#2#
#1o43o2#
###..P.#
########

message Stars are territorial.
message No more than one per area.

message ...... Level 9 / 14 **** .......
message "Smallest star battle"

(territoriality)

########
#4111#.#
#4222o.#
#4444o.#
#3334#.#
##oo##.#
#.....P#
########



message Well done!
message You've learned the base rules.
message So here are some bonus levels!

message ...... Level 10 / 14 **** .......
message "Four Plus"

(more than four)

##########
####P..###
##2221o.##
#.24111o##
#.44412o.#
#.o43222.#
##o33324.#
##.o3444##
###...####
##########

message ...... Level 11 / 14 **** .......
message "Cycles"

#######
##4433#
##4o#3#
##3333#
##OPO##
#2222##
#2#o1##
#2211##
#######


message ...... Level 12 / 14 *** .......
message "Birds flocking"

(line obstruction)

############
#P....44o..#
#.22..4o33.#
#.2#11o.3..#
#...1o22...#
#.44o.2#11.#
#.4o33..1o.#
#.o.3.....##
############

message ...... Level 13 / 14 **** .......
message "Enclosure"

(closed regions)

###########
##..#######
#.....o..##
#22222o..##
#24442ooo##
#2333222.##
#2222142.##
##.P2142.##
###.2142..#
####2222..#
###########


message ...... Level 14 / 14 *** .......
message "Wheel of dharma"

############
#####..#####
##222oo411##
##23344441##
##333..441##
#.o3....2o.#
#.o3....2o.#
##411..222##
##4111P223##
##441oo333##
#####..#####
############


message ++++++++ Congratulations! ++++++++
message +++++++++++ Starkoban ++++++++++++                                     ++++ by Pedro PSI (2020) ++++
message +++++++ Music by PeriTune ++++++++                                       ++++++++++ Poema2 ++++++++++                                        ++++ Guitar  Gentle ++++

`