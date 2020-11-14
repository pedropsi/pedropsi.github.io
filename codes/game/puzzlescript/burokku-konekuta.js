////////////////////////////////////////////////////////////////////////////////
// Customisation
var ObtainLevelTitle="Previous";

////////////////////////////////////////////////////////////////////////////////
// Source
var sourceCode=`
(- Copyright Pedro PSI 2019                             -)
(- Version nº 10/07/2019                            .1  -)
(- RULES / LEGEND section under a CC-BY-NC license      -)
(--------------------------------------------------------)

title Burokku Konekuta
author Pedro PSI
homepage pedropsi.github.io

background_color #37C7C7 (blue)
text_color #A1F5F5 (light blue)

realtime_interval 0.16
key_repeat_interval 0.16

run_rules_on_level_start

(verbose_logging)
(debug)

((Palette)
(---------------------------------------------------)
#A1F5F5 (light blue)
#37C7C7 (blue)
#109898 (dark blue)

#FF9703 (player orange) 
#FF8403 (pdayer orange)
)

========
OBJECTS
========

Background 
#A1F5F5 (light blue)

Wall 
#37C7C7 (blue)

Player &
transparent (white
.....
..1..
..1..
..1..
.....)

Player1
#FF9703 (player orange) #FF8403 (pdayer orange)
.000.
00000
10001
.111.
.1.1.


Crate 0
#FF9703 (player orange) #FF8403 (pdayer orange)
.....
.000.
.1.1.
.111.
.....


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

FromLL
black gray
.....
100..
.....
.....
.....

FromLU
black gray
...1.
.00..
.....
.....
.....

FromLR
black gray
.....
.00..
.....
....1
.....

FromLD
black gray
.....
.00..
.....
.....
.1...

FromUL
black gray
.....
...0.
1..0.
.....
.....

FromUU
black gray
..1..
...0.
...0.
.....
.....

FromUR
black gray
.....
...0.
...01
.....
.....

FromUD
black gray
.....
...0.
...0.
.....
..1..

FromRL
black gray
.....
.....
.....
1.00.
.....

FromRU
black gray
.1...
.....
.....
..00.
.....

FromRR
black gray
.....
....1
.....
..00.
.....

FromRD
black gray
.....
.....
.....
..00.
...1.

FromDL
black gray
.....
.....
.....
.0...
10...

FromDU
black gray
1....
.....
.....
.0...
.0...

FromDR
black gray
....1
.....
.....
.0...
.0...

FromDD
black gray
.....
.....
.....
.0...
10...



MovedL1
#109898 (dark blue)
.....
.....
...0.
.....
.....

MovedL2
#109898 (dark blue)
.....
.....
.00..
.....
.....

MovedL3
#109898 (dark blue)
.....
.....
.0...
.....
.....


MovedU1
#109898 (dark blue)
.....
.....
.....
..0..
.....

MovedU2
#109898 (dark blue)
.....
..0..
..0..
.....
.....

MovedU3
#109898 (dark blue)
.....
..0..
.....
.....
.....

MovedR1
#109898 (dark blue)
.....
.....
.0...
.....
.....

MovedR2
#109898 (dark blue)
.....
.....
.00..
.....
.....

MovedR3
#109898 (dark blue)
.....
.....
...0.
.....
.....

MovedD1
#109898 (dark blue)
.....
..0..
.....
.....
.....

MovedD2
#109898 (dark blue)
.....
..0..
..0..
.....
.....

MovedD3
#109898 (dark blue)
.....
.....
..0..
.....
.....

DisplacedHide
#A1F5F5 (light blue)
.....
.000.
.000.
.000.
.....




Once
transparent


Movity
transparent
Dashy
transparent


TickPlayer "
transparent (yellow
.....
....1
....1
....1
.....)
TickTime '
transparent (blue
.....
....1
....1
....1
.....
)

Animate »
transparent (blue
.....
..1..
..1..
..1..
.....
)


Wait
transparent


WallDecoD1
#109898 (dark blue)
00000
.....
.....
.....
.....

WallDecoD2
#109898 (dark blue)
.....
.000.
.....
.....
.....

WallDecoD3
#109898 (dark blue)
.....
.....
..0..
.....
.....


WallDecoU1
#109898 (dark blue)
.....
.....
.....
.....
00000

WallDecoU2
#109898 (dark blue)
.....
.....
.....
.000.
.....

WallDecoU3
#109898 (dark blue)
.....
.....
..0..
.....
.....

WallDecoR1
#109898 (dark blue)
0....
0....
0....
0....
0....

WallDecoR2
#109898 (dark blue)
.....
.0...
.0...
.0...
.....

WallDecoR3
#109898 (dark blue)
.....
.....
..0..
.....
.....

WallDecoL1
#109898 (dark blue)
....0
....0
....0
....0
....0

WallDecoL2
#109898 (dark blue)
.....
...0.
...0.
...0.
.....

WallDecoL3
#109898 (dark blue)
.....
.....
..0..
.....
.....


BorderL
#109898 (dark blue)
0....
0....
0....
0....
0....

BorderU
#109898 (dark blue)
00000
.....
.....
.....
.....

BorderR
#109898 (dark blue)
....0
....0
....0
....0
....0

BorderD 
#109898 (dark blue)
.....
.....
.....
.....
00000


BoLXU
#109898 (dark blue) 
0....
.....
.....
.....
.....

BoDXL
#109898 (dark blue)
.....
.....
.....
.....
0....

BoUXR
#109898 (dark blue)
....0
.....
.....
.....
.....

BoRXD
#109898 (dark blue)
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


DashL
#37C7C7 (blue)
.....
.....
.000.
.....
.....

DashU
#37C7C7 (blue)
.....
..0..
..0..
..0..
.....
DashR
#37C7C7 (blue)
.....
.....
.000.
.....
.....
DashD
#37C7C7 (blue)
.....
..0..
..0..
..0..
.....

DashWait1
transparent
DashWait2
transparent
DashWait3
transparent
DashWait4
transparent
DashWait5
transparent
DashWait6
transparent
DashWait7
transparent
DashWait8
transparent

DashingL
transparent
DashingU
transparent
DashingR
transparent
DashingD
transparent



LinkL
#FF9703 (player orange) #FF8403 (pdayer orange)
.....
0....
00...
1....
.....
LinkU
#FF9703 (player orange) #FF8403 (pdayer orange)
.111.
.111.
.1...
.....
.....
LinkR
#FF9703 (player orange) #FF8403 (pdayer orange)
.....
....0
...00
....1
.....
LinkD
#FF9703 (player orange) #FF8403 (pdayer orange)
.....
.....
.....
.....
.111.

Linker
transparent


Untouched
transparent 
Touched
transparent

Connected
transparent
Winning
#109898 (dark blue)
.....
.0.0.
..0..
.0.0.
.....


=======
LEGEND
=======

. = Background 
# = Wall  

Agent = Player
_ = Once

P = Agent and Player1 and TickTime 

O = Crate
Block = Crate

Players = Player1

PlayerBody1 = Player1

PlayerBody = PlayerBody1 

UnPushable = Wall
Pushable = PlayerBody or Block

Symbol = Pushable
Pusher = Pushable 


Item = Pushable or UnPushable


Shadable = Pushable
UnShadable = Wall

(Phase)
(---------------------------------------------------)
M = Movity
D = Dashy
MD = Movity or Dashy
MDS = Movity or Dashy


Phase = Movity or Dashy


(Physics)
(---------------------------------------------------)
Fixed = FixedL or FixedR or FixedU or FixedD 

FromL = FromLL or FromLU or FromLR or FromLD
FromU = FromUL or FromUU or FromUR or FromUD
FromR = FromRL or FromRU or FromRR or FromRD
FromD = FromDL or FromDU or FromDR or FromDD

From = FromL or FromR or FromU or FromD

From_L = FromLL or FromUL or FromRL or FromDL
From_U = FromLU or FromUU or FromRU or FromDU
From_R = FromLR or FromUR or FromRR or FromDR
From_D = FromLD or FromUD or FromRD or FromDD


(Link)
(---------------------------------------------------)
Link = LinkL or LinkR or LinkU or LinkD 

oL = LinkL and O
oU = LinkU and O
oR = LinkR and O
oD = LinkD and O

ö = O and Linker

ꝋ = O and LinkR and LinkL
ø = O and LinkU and LinkD

ò = oL 
ô = oU 
õ = oR 
ǒ = oD 

Linkable = O


(Animation)
(---------------------------------------------------)


MovedL = MovedL1 or MovedL2 or MovedL3
MovedU = MovedU1 or MovedU2 or MovedU3
MovedR = MovedR1 or MovedR2 or MovedR3
MovedD = MovedD1 or MovedD2 or MovedD3
Moved = MovedL or MovedU or MovedR or MovedD

Moved1 = MovedL1 or MovedU1 or MovedR1 or MovedD1
Moved2 = MovedL2 or MovedU2 or MovedR2 or MovedD2
Moved3 = MovedL3 or MovedU3 or MovedR3 or MovedD3

Displaced = Moved


WallDecoL = WallDecoL1 or WallDecoL2 or WallDecoL3
WallDecoU = WallDecoU1 or WallDecoU2 or WallDecoU3
WallDecoR = WallDecoR1 or WallDecoR2 or WallDecoR3
WallDecoD = WallDecoD1 or WallDecoD2 or WallDecoD3

WallDeco = WallDecoL or WallDecoU or WallDecoR or WallDecoD

Touchable = Players or Block


(Dashs)
(---------------------------------------------------)


Dash = DashL or DashU or DashR or DashD
Dashing = DashingL or DashingU or DashingR or DashingD

Dashable = Item

DashWait= DashWait1 or DashWait2 or DashWait3 or DashWait4 or DashWait5 or DashWait6 or DashWait7 or DashWait8

á = DashL and Dashwait7
é = DashU and Dashwait7
í = DashR and Dashwait7
ó = DashD and Dashwait7

DashingXL = DashingU or DashingR or DashingD
DashingXU = DashingR or DashingD or DashingL
DashingXR = DashingD or DashingL or DashingU
DashingXD = DashingL or DashingU or DashingR

(Border)
(---------------------------------------------------)
Border = BorderL or BorderR or BorderU or BorderD 

BoX = BoLXU or BoDXL or BoUXR or BoRXD
BoXL = BoLXU or BoDXL
BoXU = BoLXU or BoUXR
BoXR = BoUXR or BoRXD
BoXD = BoDXL or BoRXD


PropertyIsotropic =  Fixed or Connected
Property = PropertyIsotropic or From


=======
SOUNDS
=======

================
COLLISIONLAYERS
================

Background

Dash
DashingL
DashingU
DashingR
DashingD


DashWait


Moved
DisplacedHide


Item

Agent
Wait
Once

LinkL
LinkU
LinkR
LinkD
Linker

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

WallDecoL
WallDecoU
WallDecoR
WallDecoD

FixedL
FixedU
FixedR
FixedD

FromLL
FromLU
FromLR
FromLD
FromUL
FromUU
FromUR
FromUD
FromRL
FromRU
FromRR
FromRD
FromDL
FromDU
FromDR
FromDD

Connected

Phase
TickTime, TickPlayer
Animate

Untouched,Touched

Winning

======
RULES     
======     


(Links)
(---------------------------------------------------)
(---------------------------------------------------)
[Link no Linkable]->[]

(place all links at start)
left  [Linker|Linkable]->[Linker LinkL|Linkable LinkR]
up    [Linker|Linkable]->[Linker LinkU|Linkable LinkD]
right [Linker|Linkable]->[Linker LinkR|Linkable LinkL]
down  [Linker|Linkable]->[Linker LinkD|Linkable LinkU]
[Linker]->[]

(sticky links)
left  [Linkable LinkL|Linkable no LinkR]->[Linkable LinkL|Linkable LinkR]
up    [Linkable LinkU|Linkable no LinkD]->[Linkable LinkU|Linkable LinkD]
right [Linkable LinkR|Linkable no LinkL]->[Linkable LinkR|Linkable LinkL]
down  [Linkable LinkD|Linkable no LinkU]->[Linkable LinkD|Linkable LinkU]


(Connection)
(---------------------------------------------------)
(---------------------------------------------------)
[Connected]->[]
random [Crate]->[Crate Connected]



(Animation and Decoration)
(---------------------------------------------------)
(---------------------------------------------------)

(Wall borders)
(---------------------------------------------------)

(basic)
late left  [Wall no BorderL|no Wall]-> [Wall BorderL|]
late up    [Wall no BorderU|no Wall]-> [Wall BorderU|]
late right [Wall no BorderR|no Wall]-> [Wall BorderR|]
late down  [Wall no BorderD|no Wall]-> [Wall BorderD|]

(corners)
late left  [Wall no BorderLkD|Wall BorderD]->[Wall BorderLkD|Wall BorderD]
late up    [Wall no BorderUkL|Wall BorderL]->[Wall BorderUkL|Wall BorderL]
late right [Wall no BorderRkU|Wall BorderU]->[Wall BorderRkU|Wall BorderU]
late down  [Wall no BorderDkR|Wall BorderR]->[Wall BorderDkR|Wall BorderR]

late left  [Wall no BorderLkU|Wall BorderU]->[Wall BorderLkU|Wall BorderU]
late up    [Wall no BorderUkR|Wall BorderR]->[Wall BorderUkR|Wall BorderR]
late right [Wall no BorderRkD|Wall BorderD]->[Wall BorderRkD|Wall BorderD]
late down  [Wall no BorderDkL|Wall BorderL]->[Wall BorderDkL|Wall BorderL]

late [Wall BorderLkU BorderUkL no BoLxU]->[Wall BorderLkU BorderUkL BoLxU]
late [Wall BorderUkR BorderRkU no BoUxR]->[Wall BorderUkR BorderRkU BoUxR]
late [Wall BorderRkD BorderDkR no BoRxD]->[Wall BorderRkD BorderDkR BoRxD]
late [Wall BorderDkL BorderLkD no BoDxL]->[Wall BorderDkL BorderLkD BoDxL]


(Ticking animation control in view)
(---------------------------------------------------)

[stationary &]["]->[stationary &][']
[moving     &]["]->[moving     &][']

[moving     &][']->[moving     &]["]
[action     &][']->[action     &]["]


[_]->[]
[' no _]->[' » _] 
[' no _ »]->[' _]
[_]->[]

(hide displaced marks under longer blocks)
[DisplacedHide]->[]
late [Displaced Item]->[Displaced DisplacedHide Item]



(Dash-moved)
(---------------------------------------------------)
[»][Dash DashWait8]->[»][Dash]
[»][Dash DashWait7]->[»][Dash DashWait8]
[»][Dash DashWait6]->[»][Dash DashWait7]
[»][Dash DashWait5]->[»][Dash DashWait6]
[»][Dash DashWait4]->[»][Dash DashWait5]
[»][Dash DashWait3]->[»][Dash DashWait4]
[»][Dash DashWait2]->[»][Dash DashWait3]
[»][Dash DashWait1]->[»][Dash DashWait2]
[»][Dash Moved3]->[»][Dash DashWait1]


(Moved Animation)
(---------------------------------------------------)
[»][Moved .]->[»][Moved]
[»][MovedL1 no .]->[»][MovedL2 .]
[»][MovedL2 no .]->[»][MovedL3 .]
[»][MovedL3 no .]->[»][.]

[»][MovedU1 no .]->[»][MovedU2 .]
[»][MovedU2 no .]->[»][MovedU3 .]
[»][MovedU3 no .]->[»][.]

[»][MovedR1 no .]->[»][MovedR2 .]
[»][MovedR2 no .]->[»][MovedR3 .]
[»][MovedR3 no .]->[»][.]

[»][MovedD1 no .]->[»][MovedD2 .]
[»][MovedD2 no .]->[»][MovedD3 .]
[»][MovedD3 no .]->[»][.]



(Dash Animation)
(---------------------------------------------------)

left [DashL DashWait8|Dash ][»]->[DashL DashWait8|Dash DashWait5 no Moved][»]
up   [DashU DashWait8|Dash ][»]->[DashU DashWait8|Dash DashWait5 no Moved][»]
right[DashR DashWait8|Dash ][»]->[DashR DashWait8|Dash DashWait5 no Moved][»]
down [DashD DashWait8|Dash ][»]->[DashD DashWait8|Dash DashWait5 no Moved][»]

left [DashL no Moved no DashWait][»]->[DashL MovedL1][»]
up   [DashU no Moved no DashWait][»]->[DashU MovedU1][»]
right[DashR no Moved no DashWait][»]->[DashR MovedR1][»]
down [DashD no Moved no DashWait][»]->[DashD MovedD1][»]


(Reset backgrounds)
(---------------------------------------------------)
[no .]->[.]



(Wall Push Animation)
(---------------------------------------------------)
[»][WallDecoL .]->[»][WallDecoL]
[»][WallDecoL1 no .]->[»][WallDecoL2 .]
[»][WallDecoL2 no .]->[»][WallDecoL3 .]
[»][WallDecoL3 no .]->[»][ .]

[»][WallDecoU .]->[»][WallDecoU]
[»][WallDecoU1 no .]->[»][WallDecoU2 .]
[»][WallDecoU2 no .]->[»][WallDecoU3 .]
[»][WallDecoU3 no .]->[»][ .]

[»][WallDecoR .]->[»][WallDecoR]
[»][WallDecoR1 no .]->[»][WallDecoR2 .]
[»][WallDecoR2 no .]->[»][WallDecoR3 .]
[»][WallDecoR3 no .]->[»][ .]

[»][WallDecoD .]->[»][WallDecoD]
[»][WallDecoD1 no .]->[»][WallDecoD2 .]
[»][WallDecoD2 no .]->[»][WallDecoD3 .]
[»][WallDecoD3 no .]->[»][ .]

(Reset backgrounds)
(---------------------------------------------------)
[no .]->[.]



(Phase Switch)
(---------------------------------------------------)
(---------------------------------------------------)

[Phase]->[]

(Detect Dashing Phase)
(---------------------------------------------------)
[Dashable Dash][& no D]->[Dashable Dash][& D]



(Detect Gravity Phase)
(---------------------------------------------------)

(Other phases)
[& no MD ]->[& M]


(Transmit intent, but not on goal) 
[moving &][stationary Players][M]->[moving &][moving Players][M]
[moving &][M]->[&][M]

(Transmit Dashable intent)
[Dashing]->[](Clear previous dashes)
left  [Dashable DashL no DashingL]->[Dashable DashL DashingL]
up    [Dashable DashU no DashingU]->[Dashable DashU DashingU]
right [Dashable DashR no DashingR]->[Dashable DashR DashingR]
down  [Dashable DashD no DashingD]->[Dashable DashD DashingD]

left  [Dashing LinkL|LinkR]->[Dashing LinkL|Dashing LinkR]
up    [Dashing LinkU|LinkD]->[Dashing LinkU|Dashing LinkD]
right [Dashing LinkR|LinkL]->[Dashing LinkR|Dashing LinkL]
down  [Dashing LinkD|LinkU]->[Dashing LinkD|Dashing LinkU]

right [DashingL DashingXL]->[no Dashing no Dash]
up    [DashingU DashingXU]->[no Dashing no Dash]
left  [DashingR DashingXR]->[no Dashing no Dash]
down  [DashingD DashingXD]->[no Dashing no Dash]

left  [stationary Dashable DashL DashingL]->[left  Dashable DashL DashingL]
up    [stationary Dashable DashU DashingU]->[up    Dashable DashU DashingU]
right [stationary Dashable DashR DashingR]->[right Dashable DashR DashingR]
down  [stationary Dashable DashD DashingD]->[down  Dashable DashD DashingD]





startloop


(Block integrity)
(---------------------------------------------------)
left  [PropertyIsotropic LinkL|LinkR]->[PropertyIsotropic LinkL|PropertyIsotropic LinkR]
up    [PropertyIsotropic LinkU|LinkD]->[PropertyIsotropic LinkU|PropertyIsotropic LinkD]
right [PropertyIsotropic LinkR|LinkL]->[PropertyIsotropic LinkR|PropertyIsotropic LinkL]
down  [PropertyIsotropic LinkD|LinkU]->[PropertyIsotropic LinkD|PropertyIsotropic LinkU]

left  [From_L LinkL |LinkR From no _]->[From_L LinkL |FromRL LinkR _]
left  [From_U LinkL |LinkR From no _]->[From_U LinkL |FromRU LinkR _]
left  [From_R LinkL |LinkR From no _]->[From_R LinkL |FromRR LinkR _]
left  [From_D LinkL |LinkR From no _]->[From_D LinkL |FromRD LinkR _]
up    [From_L LinkU |LinkD From no _]->[From_L LinkU |FromDL LinkD _]
up    [From_U LinkU |LinkD From no _]->[From_U LinkU |FromDU LinkD _]
up    [From_R LinkU |LinkD From no _]->[From_R LinkU |FromDR LinkD _]
up    [From_D LinkU |LinkD From no _]->[From_D LinkU |FromDD LinkD _]
right [From_L LinkR |LinkL From no _]->[From_L LinkR |FromLL LinkL _]
right [From_U LinkR |LinkL From no _]->[From_U LinkR |FromLU LinkL _]
right [From_R LinkR |LinkL From no _]->[From_R LinkR |FromLR LinkL _]
right [From_D LinkR |LinkL From no _]->[From_D LinkR |FromLD LinkL _]
down  [From_L LinkD |LinkU From no _]->[From_L LinkD |FromUL LinkU _]
down  [From_U LinkD |LinkU From no _]->[From_U LinkD |FromUU LinkU _]
down  [From_R LinkD |LinkU From no _]->[From_R LinkD |FromUR LinkU _]
down  [From_D LinkD |LinkU From no _]->[From_D LinkD |FromUD LinkU _]

[Crate Connected|Crate no Connected]->[Crate Connected|Crate Connected]

(Block move)
(---------------------------------------------------)
left [moving Linkable LinkL|Linkable LinkR]-> [moving Linkable LinkL|moving Linkable LinkR]
up   [moving Linkable LinkU|Linkable LinkD]-> [moving Linkable LinkU|moving Linkable LinkD]
right[moving Linkable LinkR|Linkable LinkL]-> [moving Linkable LinkR|moving Linkable LinkL]
down [moving Linkable LinkD|Linkable LinkU]-> [moving Linkable LinkD|moving Linkable LinkU]


(Push and Collide)
(---------------------------------------------------)
(Push)
left  [left  Pusher|stationary Pushable no FixedL]->[left  Pusher|left  Pushable FromLL]
up    [up    Pusher|stationary Pushable no FixedU]->[up    Pusher|up    Pushable FromUU]
right [right Pusher|stationary Pushable no FixedR]->[right Pusher|right Pushable FromRR]
down  [down  Pusher|stationary Pushable no FixedD]->[down  Pusher|down  Pushable FromDD]

(Collide)
left  [left  Pusher|UnPushable]->[stationary Pusher FixedL|UnPushable FromLL]
up    [up    Pusher|UnPushable]->[stationary Pusher FixedU|UnPushable FromUU]
right [right Pusher|UnPushable]->[stationary Pusher FixedR|UnPushable FromRR]
down  [down  Pusher|UnPushable]->[stationary Pusher FixedD|UnPushable FromDD]




(Prevent unacomplished moves: Part 1)
(---------------------------------------------------)
left  [left  Item no FixedL no LinkL|no LinkR stationary Item]->[left  Item FixedL| stationary Item]
up    [up    Item no FixedU no LinkU|no LinkD stationary Item]->[up    Item FixedU| stationary Item]
right [right Item no FixedR no LinkR|no LinkL stationary Item]->[right Item FixedR| stationary Item]
down  [down  Item no FixedD no LinkD|no LinkU stationary Item]->[down  Item FixedD| stationary Item]

left  [left  Item | FixedL]->[left  Item FixedL| FixedL]
up    [up    Item | FixedU]->[up    Item FixedU| FixedU]
right [right Item | FixedR]->[right Item FixedR| FixedR]
down  [down  Item | FixedD]->[down  Item FixedD| FixedD]



(Prevent unacomplished moves: Part 2)
(---------------------------------------------------)
left  [left  Item FixedL]->[stationary Item FixedL ]
up    [up    Item FixedU]->[stationary Item FixedU ]
right [right Item FixedR]->[stationary Item FixedR ]
down  [down  Item FixedD]->[stationary Item FixedD ]


(Prevent unacomplished moves: Part 3)
(---------------------------------------------------)
left  [Pusher FixedL no LinkL|no LinkR FromLL]->[Pusher FixedL | FixedL FromLL]
up    [Pusher FixedU no LinkU|no LinkD FromUU]->[Pusher FixedU | FixedU FromUU]
right [Pusher FixedR no LinkR|no LinkL FromRR]->[Pusher FixedR | FixedR FromRR]
down  [Pusher FixedD no LinkD|no LinkU FromDD]->[Pusher FixedD | FixedD FromDD]

[left  Pusher FixedL From_L]->[stationary Pusher FixedL From_L]
[up    Pusher FixedU From_U]->[stationary Pusher FixedU From_U]
[right Pusher FixedR From_R]->[stationary Pusher FixedR From_R]
[down  Pusher FixedD From_D]->[stationary Pusher FixedD From_D]


(Wall Touch)
(---------------------------------------------------)
left  [Touchable FixedL no Wall|Wall no WallDeco][MDS]->[Touchable FixedL|Wall WallDecoL1][MDS]
up    [Touchable FixedU no Wall|Wall no WallDeco][MDS]->[Touchable FixedU|Wall WallDecoU1][MDS]
right [Touchable FixedR no Wall|Wall no WallDeco][MDS]->[Touchable FixedR|Wall WallDecoR1][MDS]
down  [Touchable FixedD no Wall|Wall no WallDeco][MDS]->[Touchable FixedD|Wall WallDecoD1][MDS]


endloop


[_]->[]
[Fixed]->[]
[From]->[]



(Remove Dashables on execution)
(---------------------------------------------------)
left  [left  Dashable DashL DashingL]->[left  Dashable no Dashwait]
up    [up    Dashable DashU DashingU]->[up    Dashable no Dashwait]
right [right Dashable DashR DashingR]->[right Dashable no Dashwait]
down  [down  Dashable DashD DashingD]->[down  Dashable no Dashwait]
[Dashing Dash]->[no Dash]


(Move)
(---------------------------------------------------)
[left  Item  no Moved]->[left  Item MovedL1]
[up    Item  no Moved]->[up    Item MovedU1]
[right Item  no Moved]->[right Item MovedR1]
[down  Item  no Moved]->[down  Item MovedD1]


(Move Links)
(---------------------------------------------------)
(---------------------------------------------------)
[moving Linkable Link]->[moving Linkable moving Link]
[Link no Linkable]->[]



(Winning)
(---------------------------------------------------)
(---------------------------------------------------)

late [&]->[& Winning]
late [Crate no Connected][Winning]->[Crate no Connected][]
late [Winning][Crate no Winning]->[Winning][Crate Winning]
late [Winning no Crate]->[]
late [Winning Crate]->[Winning no Crate no Link]

==============
WINCONDITIONS
==============
some Winning

=======     
LEVELS
=======
message Konnichiwa!
message Kore wa burokku konekuta desu.
message Gaijin: "connect all blocks!"

message ...... Reberu 1 / 7 * .......
message "Tango"
(walk, push, connect)
#########
#########
###...###
###O#..##
##..P..##
##..#O###
###...###
#########
#########

message ...... Reberu 2 / 7 * .......
message "Karutetto"
(more than two blocks, push several blocks)
#########
####...##
##...#..#
##.#O##.#
#..oPo..#
#.##O#.##
#..#...##
##...####
#########

message ...... Reberu 3 / 7 ** ......
message "Taikakusen"
(larger blocks)
#########
####..###
##o....##
##.ooö..#
#..oPo..#
#..öoo.##
##....o##
###..####
#########

message ...... Reberu 4 / 7 *** .....
message "Bunkai"
(fully concave blocks)
#########
####O####
####.####
##.....##
#.......#
#.öoǒoö.#
#.oõoòo.#
#.ôòoõô.#
#.......#
##.....##
####.####
####P####
#########

message ...... Reberu 5 / 7 **** ....
message "Rupu"
(inside blocks)
###############
#.............#
#.oööö...öööo.#
#....ö.P.ö....#
#.o.oo.#.oo.o.#
#.ööoö.#.öoöö.#
###############

message ...... Reberu 6 / 7 ** ......
message "Yoku miru"
(vertical connections)
##########
#####..###
#####o.P##
####ǒ....#
###ǒ.....#
##ǒ....ô##
#.....ô###
#....ô####
##..o#####
###..#####
##########

message ...... Reberu 7 / 7 ***** ....
message "Porima"
(all connections)
#########
###ǒ.####
##.....##
##.ô.õ.ò#
#...P...#
#õ.ò.ǒ.##
##.....##
####.ô###
#########

(
message ...... Reberu 9 / 7 *** ....
message "Yusen-do"
(dash after joining)
#######
###O###
#.ó...#
#..ò..#
#.ǒPô.#
#..õ..#
#...é.#
###O###
#######

)

message ...... Omedeto gozaimasu! ......
message ......  Burokku Konekuta  .......                                  ......  Pedro PSI (2019)  .......

message Ongaku (CC-BY-3.0): Ju-nya                                            ...  Breeze ...................... ...  Traffic Lights ..............
`