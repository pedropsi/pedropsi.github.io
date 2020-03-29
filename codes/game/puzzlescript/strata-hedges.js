////////////////////////////////////////////////////////////////////////////////
// Customisation
var ObtainLevelTitle="Previous";

////////////////////////////////////////////////////////////////////////////////
// Source
var sourceCode=`(- Copyright Pedro PSI 2020                             -)
(- Version nº 14/03/2020                            .1  -)
(- RULES / LEGEND section under a CC-BY-NC license      -)
(--------------------------------------------------------)

title Strata hedges
author Pedro PSI
homepage pedropsi.github.io

background_color #006565 (darkest teal)
text_color #FFAE09 (bright gold)

(realtime_interval 0.1)
key_repeat_interval 0.1

run_rules_on_level_start

(verbose_logging)
(debug)

flickscreen 11x20

((Palette)
(---------------------------------------------------)

#43240B (darkest brown)
#944300 (dark brown)
#B15000 (brown)
#FF7809 (bright brown)

#3C0A18 (darkest red)
#850026 (dark red)
#EF084A (bright red)
#9F002D (red)
#EE7598 (light red)


#43300B (darkest gold)
#FFAE09 (bright gold)



#7A7E00 (darkest yellow)
#A8AC00 (dark yellow)
#D0D600 (yellow)

#C5B500 (lightest dry) 
#B5A500 (light dry) 
#A59500 (bright dry) 
#958500 (dry) 
#857500 (dark dry) 
#656500 (darkest dry)

#85B500 (lightest khaki) 
#75A500 (light khaki) 
#659500 (bright khaki) 
#83C800 (khaki)
#69A100 (dark khaki)
#4D7500 (darkest khaki)


#00B500 (lightest green) 
#00A500 (light green) 
#009500 (bright green) 
#008500 (green) 
#007500 (dark green) 
#006500 (darkest green)

#008585 (teal)
#007575 (dark teal)
#006565 (darkest teal)




#BFCDCC (metal teal)

#090228 (darkest blue)
#064775 (dark blue)
#2B24CF (bright blue)

#360921 (darkest purple)
#770041 (dark purple)

#8F004E (pink)
#E1087E (bright pink)  

black 
#1e1e1e (darkest gray)
)

========
OBJECTS
========

Background 
#006565 (darkest teal)  

Wall 
#006565 (darkest teal)  transparent

Tint0
#006500 (darkest green)

Tint1
#4D7500 (darkest khaki)

Tint2
#A8AC00 (dark yellow)

Player
transparent
..0..
.....
.....
.....
.....

Target
red
.....
.0.0.
..0..
.0.0.
.....

TargetTop
transparent

TargetBas
transparent


TargetTopBG0
#00B500 (lightest green) #00A500 (light green) #009500 (bright green) #006500 (darkest green)
00000
03030
00300
03030
00000

TargetTopBG1
#85B500 (lightest khaki) #75A500 (light khaki) #659500 (bright khaki) #4D7500 (darkest khaki)
00000
03030
00300
03030
00000

TargetTopBG2
#C5B500 (lightest dry) #B5A500 (light dry) #A59500 (bright dry) #656500 (darkest dry)
00000
03030
00300
03030
00000


Ground
#00AC00 (green)
.....
.0...
..0..
...0.
.....

GroundTop
transparent

GroundBas
transparent

GroundTopBG0
#008500 (green) #007500 (dark green) #006500 (darkest green)
00000
00010
01000
00000
00001

GroundTopBG1
#558500 (khaki) #457500 (dark khaki) #356500 (darkest khaki)
00000
00010
01000
00000
00001

GroundTopBG2
#958500 (dry) #857500 (dark dry) #656500 (darkest dry)
00000
00010
01000
00000
00001

GroundBasBG0
#008500 (green) #007500 (dark green) #006500 (darkest green)
10000
11100
21111
22221
22222

GroundBasBG1
#558500 (khaki) #457500 (dark khaki) #356500 (darkest khaki)
10000
11100
21111
22221
22222

GroundBasBG2
#958500 (dry) #857500 (dark dry) #656500 (darkest dry)
10000
11100
21111
22221
22222

Playe
#FF9703 (player orange)
.....
..0..
.000.
.0.0.
.....

PlayerTop
#FF9703 (player orange) #FF8403 (pdayer orange)
.....
.....
.....
.000.
00000

PlayerBas
#FF9703 (player orange) #FF8403 (pdayer orange)
10001
.111.
.1.1.
.....
.....

PlayerTopBG
transparent

PlayerBasBG
transparent

Crate 
#FF7809 (bright brown)
.....
..0..
.0.0.
..0..
.....

CrateTop
transparent

CrateBas
transparent

CrateTopBG0
#00B500 (lightest green) #00A500 (light green) #009500 (bright green)
00000
01100
01010
01110
00000

CrateBasBG0
#00B500 (lightest green) #00A500 (light green) #009500 (bright green) #008500 (green) #007500 (dark green) #006500 (darkest green)
11111
22111
22221
33222
44332

CrateTopBG1
#85B500 (lightest khaki) #75A500 (light khaki) #659500 (bright khaki)
00000
01100
01010
01110
00000

CrateBasBG1
#85B500 (lightest khaki) #75A500 (light khaki) #659500 (bright khaki) #558500 (khaki) #457500 (dark khaki) #356500 (darkest khaki)
11111
22111
22221
33222
44332

CrateTopBG2
#C5B500 (lightest dry) #B5A500 (light dry) #A59500 (bright dry)
00000
01100
01010
01110
00000

CrateBasBG2
#C5B500 (lightest dry) #B5A500 (light dry) #A59500 (bright dry) #958500 (dry) #857500 (dark dry) #656500 (darkest dry)
11111
22111
22221
33222
44332

Screen
#007575 (dark teal) #006565 (darkest teal)
00000
00010
01000
00000
00001

ScreenLinePointer
transparent yellow
.....
.000.
.00..
.0...
.....

ScreenLineStart
transparent yellow
0....
.0...
..0..
...0.
....0

ScreenLine
transparent yellow
.....
00000
.....
.....
.....

Propadown
transparent

Drawn
transparent

Forward
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
FixedF
white
.....
.....
.....
.0...
0....
FixedB
white
....0
...0.
.....
.....
.....

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


FromLF
black gray
.....
.00.1
...1.
.....
.....

FromLB
black gray
.....
.00..
.1...
1....
.....

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

FromUF
black gray
.....
...01
...0.
.....
.....

FromUB
black gray
.....
...0.
...0.
1....
.....

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

FromRF
black gray
.....
....1
...1.
..00.
.....

FromRB
black gray
.....
.....
.1...
1.00.
.....

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

FromDF
black gray
.....
....1
...1.
.0...
.0...

FromDB
black gray
.....
.....
.1...
10...
.0...

FromFL
black gray
.....
.....
....0
...0.
1....

FromFU
black gray
1....
.....
....0
...0.
.....

FromFR
black gray
....1
.....
....0
...0.
.....

FromFD
black gray
.....
.....
....0
...0.
1....

FromFF
black gray
.....
....1
...10
...0.
.....

FromFB
black gray
.....
.....
.1..0
1..0.
.....

FromBL
black gray
.....
.....
.0...
0....
1....

FromBU
black gray
1....
.....
.0...
0....
.....

FromBR
black gray
....1
.....
.0...
0....
.....

FromBD
black gray
.....
.....
.0...
0....
1....

FromBF
black gray
.....
....1
.0.1.
0....
.....

FromBB
black gray
.....
.....
01...
10...
.....


=======
LEGEND
=======

. = Background
: = Ground
$ = Target
# = Wall
P = Playe and Player
O = Crate
% = Screen and ScreenLineStart and Wall
@ = ScreenLine
¦ = Propadown


0=Tint0 and Wall
1=Tint1 and Wall
2=Tint2 and Wall


Unpushable = Wall or Ground
Pushable = Playe or Crate or Target

Symbol = Pushable
Pusher = Pushable 

Item = Pushable or UnPushable

(Physics)
(---------------------------------------------------)
Fixed = FixedL or FixedR or FixedU or FixedD or FixedF or FixedB

FromL = FromLL or FromLU or FromLR or FromLD or FromLF or FromLB
FromU = FromUL or FromUU or FromUR or FromUD or FromUF or FromUB
FromR = FromRL or FromRU or FromRR or FromRD or FromRF or FromRB
FromD = FromDL or FromDU or FromDR or FromDD or FromDF or FromDB
FromF = FromFL or FromFU or FromFR or FromFD or FromFF or FromFB
FromB = FromBL or FromBU or FromBR or FromBD or FromBF or FromBB

From = FromL or FromR or FromU or FromD or FromF or FromB

From_L = FromLL or FromUL or FromRL or FromDL or FromFL or FromBL
From_U = FromLU or FromUU or FromRU or FromDU or FromFU or FromBU
From_R = FromLR or FromUR or FromRR or FromDR or FromFR or FromBR
From_D = FromLD or FromUD or FromRD or FromDD or FromFD or FromBD
From_F = FromLF or FromUF or FromRF or FromDF or FromFF or FromBF
From_B = FromLB or FromUB or FromRB or FromDB or FromFB or FromBB



(Drawing)
(---------------------------------------------------)

Tint = Tint1 or Tint2 or Tint0

Top=PlayerTop or CrateTop or GroundTop or TargetTop
Bas=PlayerBas or CrateBas or GroundBas or TargetBas

GroundTopBG=GroundTopBG0 or GroundTopBG1 or GroundTopBG2
GroundBasBG=GroundBasBG0 or GroundBasBG1 or GroundBasBG2

 CrateTopBG= CrateTopBG0 or  CrateTopBG1 or  CrateTopBG2
 CrateBasBG= CrateBasBG0 or  CrateBasBG1 or  CrateBasBG2

TargetTopBG=TargetTopBG0 or TargetTopBG1 or TargetTopBG2

TopBG=CrateTopBG or GroundTopBG or PlayerTopBG or TargetTopBG
BasBG=CrateBasBG or GroundBasBG or PlayerBasBG

BG=TopBG or BasBG

Backgroundable = CrateTop or GroundTop or CrateBas or GroundBas or TargetTop or TargetBas

ScreenableTB = Top or Bas
Screenable = Top or Bas or TopBG or BasBG

=======
SOUNDS
=======

================
COLLISIONLAYERS
================

Background
Screen
Tint
Item

BasBG
TopBG
Bas
Top

Player

Drawn
Forward
ScreenLineStart
ScreenLinePointer
ScreenLine
Propadown


FixedL
FixedU
FixedR
FixedD
FixedF
FixedB

FromLL
FromLU
FromLR
FromLD
FromLF
FromLB

FromUL
FromUU
FromUR
FromUD
FromUF
FromUB

FromRL
FromRU
FromRR
FromRD
FromRF
FromRB

FromDL
FromDU
FromDR
FromDD
FromDF
FromDB

FromFL
FromFU
FromFR
FromFD
FromFF
FromFB

FromBL
FromBU
FromBR
FromBD
FromBF
FromBB

======
RULES     
======    

(Setup Screen)
(---------------------------------------------------)
down  [Screen|no Screen]->[Screen|Screen]




(Intent)
(---------------------------------------------------)
[moving Player][Playe]->[ Player][ moving Playe]


startloop

(Push and Collide)
(---------------------------------------------------)
(Push)
left  [left  Pusher|stationary Pushable no FixedL]->[left  Pusher|left  Pushable FromLL]
+ up    [up    Pusher|stationary Pushable no FixedU]->[up    Pusher|up    Pushable FromUU]
+ right [right Pusher|stationary Pushable no FixedR]->[right Pusher|right Pushable FromRR]
+ down  [down  Pusher|stationary Pushable no FixedD]->[down  Pusher|down  Pushable FromDD]
+ up [left  Pusher||||||||||||||||||||stationary Pushable no FixedL]->[left  Pusher||||||||||||||||||||left  Pushable FromBL]
+ up [up    Pusher||||||||||||||||||||stationary Pushable no FixedU]->[up    Pusher||||||||||||||||||||up    Pushable FromBU]
+ up [right Pusher||||||||||||||||||||stationary Pushable no FixedR]->[right Pusher||||||||||||||||||||right Pushable FromBR]
+ up [down  Pusher||||||||||||||||||||stationary Pushable no FixedD]->[down  Pusher||||||||||||||||||||down  Pushable FromBD]


(Collide)
left  [left  Pusher|UnPushable]->[stationary Pusher FixedL|UnPushable FromLL]
+ up    [up    Pusher|UnPushable]->[stationary Pusher FixedU|UnPushable FromUU]
+ right [right Pusher|UnPushable]->[stationary Pusher FixedR|UnPushable FromRR]
+ down  [down  Pusher|UnPushable]->[stationary Pusher FixedD|UnPushable FromDD]




(Prevent unacomplished moves: Part 1)
(---------------------------------------------------)(
left  [left  Item no FixedL no LinkL|no LinkR stationary Item]->[left  Item FixedL| stationary Item]
+ up    [up    Item no FixedU no LinkU|no LinkD stationary Item]->[up    Item FixedU| stationary Item]
+ right [right Item no FixedR no LinkR|no LinkL stationary Item]->[right Item FixedR| stationary Item]
+ down  [down  Item no FixedD no LinkD|no LinkU stationary Item]->[down  Item FixedD| stationary Item])

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


(Prevent unacomplished moves: Part 3)
(---------------------------------------------------)(
left  [Pusher FixedL no LinkL|no LinkR FromLL]->[Pusher FixedL | FixedL FromLL]
+ up    [Pusher FixedU no LinkU|no LinkD FromUU]->[Pusher FixedU | FixedU FromUU]
+ right [Pusher FixedR no LinkR|no LinkL FromRR]->[Pusher FixedR | FixedR FromRR]
+ down  [Pusher FixedD no LinkD|no LinkU FromDD]->[Pusher FixedD | FixedD FromDD])

[left  Pusher FixedL From_L]->[stationary Pusher FixedL From_L]
+[up    Pusher FixedU From_U]->[stationary Pusher FixedU From_U]
+[right Pusher FixedR From_R]->[stationary Pusher FixedR From_R]
+[down  Pusher FixedD From_D]->[stationary Pusher FixedD From_D]

endloop

[Fixed]->[]
[From]->[]

(Falling)
late up [no Item no Screen||||||||||||||||||||Pushable]->[Pushable||||||||||||||||||||]


(Win)
late down [Playe||||||||||||||||||||Target]->Win


(Display)
(---------------------------------------------------)

late [ScreenLine]->[]
late [ScreenLinePointer]->[]
late [ScreenLineStart]->[ScreenLineStart ScreenLinePointer ScreenLine]
late [Forward]->[]
late [Drawn]->[]

late [Screenable]->[]



startloop

late horizontal [Tint |no Tint no Screen]->[Tint|Tint]
late up         [Tint |no Tint no Screen]->[Tint|Tint]


(Control Drawing Line by Line)
late     [ScreenLine no Drawn]->[ScreenLine Drawn]
late up  [Drawn ScreenLine||||||||||||||||||||no ScreenLine]->[||||||||||||||||||||ScreenLine]

late     [Drawn ScreenLine][ScreenLinePointer no Forward]->[Drawn ScreenLine][ScreenLinePointer Forward]
late down[ScreenLinePointer Forward][ScreenLine]->[ScreenLinePointer Forward][] (go forward)
late down[ScreenLinePointer Forward|]->[|ScreenLinePointer ScreenLine] (go forward)
late [ScreenLinePointer Forward][ScreenLine]->[ScreenLinePointer Forward][] (exit)
late [ScreenLinePointer Forward]->[] (exit)


(Draw at layer)
late down [|Ground @]->[GroundTop ¦|Ground @ ¦ GroundBas]
late down [| Crate @]->[ CrateTop ¦| Crate @ ¦  CrateBas]
late down [|Playe  @]->[PlayerTop ¦|Playe  @ ¦ PlayerBas]
late down [|Target @]->[TargetTop ¦|Target @ ¦ TargetBas]

late [Ground @ no GroundBas]->[Ground @ ¦ GroundBas]
late [ Crate @ no  CrateBas]->[ Crate @ ¦  CrateBas]
late [Playe  @ no PlayerBas]->[Playe  @ ¦ PlayerBas]
late [Target @ no PlayerBas]->[Target @ ¦ TargetBas]

(Propagate down)
late down [Screenable ¦ Tint||||||||||||||||||||]->[|||||||||||||||||||Screenable ¦ Tint|]
late down [Screenable ¦     ||||||||||||||||||||]->[|||||||||||||||||||Screenable ¦     |]


late [Screen GroundBas Tint2]->[Screen GroundBasBG2 no Screenable]
late [Screen GroundBas Tint1]->[Screen GroundBasBG1 no Screenable]
late [Screen GroundBas      ]->[Screen GroundBasBG0 no Screenable]
late [Screen GroundTop Tint2]->[Screen GroundTopBG2 no Screenable]
late [Screen GroundTop Tint1]->[Screen GroundTopBG1 no Screenable]
late [Screen GroundTop      ]->[Screen GroundTopBG0 no Screenable]

late [Screen  CrateBas Tint2]->[Screen  CrateBasBG2 no Screenable]
late [Screen  CrateBas Tint1]->[Screen  CrateBasBG1 no Screenable]
late [Screen  CrateBas      ]->[Screen  CrateBasBG0 no Screenable]
late [Screen  CrateTop Tint2]->[Screen  CrateTopBG2 no Screenable]
late [Screen  CrateTop Tint1]->[Screen  CrateTopBG1 no Screenable]
late [Screen  CrateTop      ]->[Screen  CrateTopBG0 no Screenable]

late [Screen TargetTop Tint2]->[Screen  TargetTopBG2 no Screenable]
late [Screen TargetTop Tint1]->[Screen  TargetTopBG1 no Screenable]
late [Screen TargetTop      ]->[Screen  TargetTopBG0 no Screenable]
late [Screen TargetBas Tint2]->[Screen   CrateBasBG2 no Screenable]
late [Screen TargetBas Tint1]->[Screen   CrateBasBG1 no Screenable]
late [Screen TargetBas      ]->[Screen   CrateBasBG0 no Screenable]


late [Tint Screen]->[Screen]
late [Backgroundable]->[]
late [¦]->[]

endloop



(Recenter View on Player)
late [Player no PlayerBas][PlayerBas no Player]->[][Player PlayerBas]


==============
WINCONDITIONS
==============


=======     
LEVELS
=======
(ideas:
-hidden passage in intermediate lvl
)

message --- Please don't share yet ---

(reach the goal)
message Level 1
message "Hedges"


###########
###########
###########
###########
###########
###########
###########
###########
###########
###########
#:::::::::#
#::::.::::#
#::::.::::#
#::.....::#
#::.:::.::#
#::.:::.::#
#::.....::#
#::::.::::#
#::::P::::#
#:::::::::1
###########
###########
###########
###########
###########
###########
###########
###########
###########
###########
#:::::::::#
#::::$::::#
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::0
###########
#%%%%%%%%%#
###########
###########
###########
###########
###########
###########
###########
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
###########
###########

(pits)
message Level 2
message "Underneath"

###########
###########
###########
###########
###########
###########
###########
###########
###########
###########
#.::.....:#
#......:.:#
#.........#
#.::......#
#..::P.:..#
#:.....::.#
#.........#
#...::....#
#::....:..#
#::::....:1
###########
###########
###########
###########
###########
###########
###########
###########
###########
###########
#:::::::::#
#...:$::::#
#::..::.::#
#:::.....:#
#:::::::::#
#:::::::.:#
#::.....::#
#::::::::.#
#:::::::..#
#:::::::::0
###########
#%%%%%%%%%#
###########
###########
###########
###########
###########
###########
###########
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
###########
###########

message Level 3
message "Bridges"

###########
###########
###########
###########
###########
###########
###########
###########
###########
###########
#....:....#
#.oo....o:#
#.........#
#...::....#
#.P.....:.#
#..::.....#
#.....:...#
#:...:..:.#
#:::....O.#
#....:..:.1
###########
###########
###########
###########
###########
###########
###########
###########
###########
###########
#:::::::::#
#::::..:::#
#::::.::::#
#...::::::#
#::....:::#
#::::$....#
#::..:::::#
#.::::::::#
#:::::::::#
#:::::::::0
###########
#%%%%%%%%%#
###########
###########
###########
###########
###########
###########
###########
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
###########
###########

message Level 4
message "Layers"


###########
###########
###########
###########
###########
###########
###########
###########
###########
###########
#:::...:::#
#:::.o.:::#
#:::...:::#
#...:.:...#
#.o..P..o.#
#.........#
#.........#
#.........#
#.........#
#.........0
###########
###########
###########
###########
###########
###########
###########
###########
###########
###########
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::#
#:::.:.:::#
#.........#
#...:::...#
#...:$:...#
#...:::...1
###########
###########
###########
###########
###########
###########
###########
###########
###########
###########
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::#
#.........#
#:::::::::#
#:::::::::#
#:::::::::2
###########
#%%%%%%%%%#
###########
###########
###########
###########
###########
###########
###########
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
###########
###########

message Level 5
message "A moving target"


###########
###########
###########
###########
###########
###########
###########
###########
###########
###########
#:::...:::#
#:::.$.:::#
#:::...:::#
#.:::.:::.#
#.:.....:.#
#.:.....:.#
#.::.p.::.#
#.:.o.o.:.#
#.:..o..:.#
#:::...:::0
###########
###########
###########
###########
###########
###########
###########
###########
###########
###########
#:::::::::#
#:::::::::#
#:::::::::#
#::::.::::#
#:::::::::#
#::::.::::#
#:::::::::#
#::::.::::#
#:::::::::#
#:::::::::1
###########
###########
###########
###########
###########
###########
###########
###########
###########
###########
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::2
###########
#%%%%%%%%%#
###########
###########
###########
###########
###########
###########
###########
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
###########
###########

message Level 6
message "Mole"


###########
###########
###########
###########
###########
###########
###########
###########
###########
###########
#:::::::::#
#:.:::::.:#
#:.:...:.:#
#:::...:::#
#.........#
#:.......:#
#.........#
#.........#
#.........#
#.........0
###########
###########
###########
###########
###########
###########
###########
###########
###########
###########
#:::::::::#
#....o....#
#..::$::..#
#.:::.:::.#
#...:.:...#
#::.....::#
#.........#
#.O.....P.#
#.........#
#.........1
###########
###########
###########
###########
###########
###########
###########
###########
###########
###########
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::#
#::::.::::#
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::#
#:::::::::2
###########
#%%%%%%%%%#
###########
###########
###########
###########
###########
###########
###########
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
#.........#
###########
###########

(crate pile)

(target hidden under crate)

`;