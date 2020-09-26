////////////////////////////////////////////////////////////////////////////////
// Customisation
var ObtainLevelTitle="Previous";

////////////////////////////////////////////////////////////////////////////////
// Source
var sourceCode=`
(- Copyright Pedro PSI 2018-2020 - All rights reserved  -)
(- Version nº 26/09/2020 "Mini"                     .3  -)
(--------------------------------------------------------)

title Gravirinth [Mini]
author Pedro PSI
homepage pedropsi.github.io

background_color #190434 (darkest purple)
text_color #FF9703 (player orange) 

realtime_interval 0.1
key_repeat_interval 0.1

zoomscreen 30x17
run_rules_on_level_start


(verbose_logging
debug)

((Palette)
(---------------------------------------------------)
#190434 (darkest purple)
#54268D (dark purple)
#7346AD (purple)
#9F76D3 (bright purple)

#F17E9F (bright pink)
#E6507B (pink)
#BB2751 (dark pink)

#FFAB85 (bright red)
#FF8D59 (red)
#D05E2B (dark red)

#FFD885 (bright yellow)
#FFCA59 (yellow)
#D09B2B (dark yellow)

#D05E2B (dark orange)
#FF9703 (player orange) 
#FF8403 (pdayer orange)
)

========
OBJECTS
========

Background 
#190434 (darkest purple)

Wall 
#7346AD (purple) #54268D (dark purple) 
11111
11111
00000
11111
11111

WallOver1
#7346AD (purple)
.....
.....
.....
.....
....0

WallOver2
#7346AD (purple)
....0
.....
.....
.....
.....

WallOver3
#7346AD (purple)
0....
.....
.....
.....
.....

WallOver4
#7346AD (purple)
.....
.....
.....
.....
0....

WallOver5
#7346AD (purple)
....0
.....
.....
.....
....0

WallOver6
#7346AD (purple) 
0...0
.....
.....
.....
.....

WallOver7
#7346AD (purple)
0....
.....
.....
.....
0....

WallOver8
#7346AD (purple)
.....
.....
.....
.....
0...0

WallOver9
#7346AD (purple)
....0
.....
.....
.....
0...0

WallOver10
#7346AD (purple)
0...0
.....
.....
.....
....0

WallOver11
#7346AD (purple)
0...0
.....
.....
.....
0....

WallOver12
#7346AD (purple)
....0
.....
.....
.....
0...0

WallOver13
#7346AD (purple)
0...0
.....
.....
.....
0...0

borderL
#9F76D3 (bright purple)
0....
0....
0....
0....
0....

borderU
#9F76D3 (bright purple)
00000
.....
.....
.....
.....

borderR
#9F76D3 (bright purple)
....0
....0
....0
....0
....0

borderD 
#9F76D3 (bright purple)
.....
.....
.....
.....
00000


BoLXU
#9F76D3 (bright purple)
0....
.....
.....
.....
.....

BoDXL
#9F76D3 (bright purple)
.....
.....
.....
.....
0....

BoUXR
#9F76D3 (bright purple)
....0
.....
.....
.....
.....

BoRXD
#9F76D3 (bright purple)
.....
.....
.....
.....
....0


BorderDkL
transparent
BorderDkR
transparent
BorderUkL
transparent
BorderUkR
transparent

BorderRkD
transparent
BorderRkU
transparent
BorderLkD
transparent
BorderLkU
transparent


FixBorder
transparent (lightblue
.....
.....
..1..
.....
.....)

UnFixBorder
transparent


Player (this becomes the camera)
transparent (white
.....
..1..
..1..
..1..
.....)

PlayerL 
#F17E9F (bright pink) #E6507B (pink)
..10.
11000
.1000
11000
..10.

PlayerU 
#FFD885 (bright yellow) #FFCA59 (yellow)
.1.1.
.111.
10001
00000
.000.

PlayerR 
#FFAB85 (bright red) #FF8D59 (red)
.01..
00011
0001.
00011
.01..

PlayerD 
#FF9703 (player orange) #FF8403 (pdayer orange)
.000.
00000
10001
.111.
.1.1.


PlayerLegsL
#F17E9F (bright pink) #E6507B (pink)
.....
01111
.....
01111
.....

PlayerLegsU
#FFD885 (bright yellow) #FFCA59 (yellow)
.0.0.
.1.1.
.1.1.
.1.1.
.1.1.

PlayerLegsR
#FFAB85 (bright red)#FF8D59 (red)
.....
11110
.....
11110
.....

PlayerLegsD
#FF9703 (pdayer orange) #FF8403 (player orange)
.1.1.
.1.1.
.1.1.
.1.1.
.0.0.

NextLegsL
transparent
NextLegsU
transparent
NextLegsR
transparent
NextLegsD
transparent


CrateSimpleL 
#F17E9F (bright pink) #E6507B (pink)
1000.
1100.
1100.
1100.
1110.
CrateSimpleU 
#FFCA59 (yellow) #FFD885 (bright yellow)
00000
00001
01111
11111
.....
CrateSimpleR
#FFAB85 (bright red)#FF8D59 (red)
.0111
.0011
.0011
.0011
.0001
CrateSimpleD
#FF8403 (player orange) #FF9703 (pdayer orange)
.....
11111
11110
10000
00000
 

PodL
transparent
PodU
transparent
PodR
transparent
PodD
transparent


FromL
black
.....
00...
.....
.....
.....

FromU
black
...0.
...0.
.....
.....
.....

FromR
black
.....
.....
.....
...00
.....

FromD
black
.....
.....
.....
.0...
.0...

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


Block
#7346AD (purple)
.....
.000.
.0.0.
.000.
.....


WallDecoD1
#9F76D3 (bright purple)
.000.
.....
.....
.....
.....

WallDecoD2
#9F76D3 (bright purple)
.....
.000.
.....
.....
.....

WallDecoD3
#9F76D3 (bright purple)
.....
.....
00000
.....
.....

WallDecoD4
#9F76D3 (bright purple)
.....
.....
.000.
.....
.....

WallDecoD5
#9F76D3 (bright purple)
.....
.....
..0..
.....
.....


WallDecoU1
#9F76D3 (bright purple)
.....
.....
.....
.....
.000.

WallDecoU2
#9F76D3 (bright purple)
.....
.....
.....
.000.
.....

WallDecoU3
#9F76D3 (bright purple)
.....
.....
00000
.....
.....

WallDecoU4
#9F76D3 (bright purple)
.....
.....
.000.
.....
.....

WallDecoU5
#9F76D3 (bright purple)
.....
.....
..0..
.....
.....


WallDecoR1
#9F76D3 (bright purple)
.....
0....
0....
0....
.....

WallDecoR2
#9F76D3 (bright purple)
.....
.0...
.0...
.0...
.....

WallDecoR3
#9F76D3 (bright purple)
..0..
..0..
..0..
..0..
..0..

WallDecoR4
#9F76D3 (bright purple)
.....
..0..
..0..
..0..
.....

WallDecoR5
#9F76D3 (bright purple)
.....
.....
..0..
.....
.....

WallDecoL5
#9F76D3 (bright purple)
.....
.....
..0..
.....
.....

WallDecoL4
#9F76D3 (bright purple)
.....
..0..
..0..
..0..
.....

WallDecoL3
#9F76D3 (bright purple)
..0..
..0..
..0..
..0..
..0..

WallDecoL2
#9F76D3 (bright purple)
.....
...0.
...0.
...0.
.....

WallDecoL1
#9F76D3 (bright purple)
.....
....0
....0
....0
.....

WallDecoL5Next
transparent
WallDecoU5Next
transparent
WallDecoR5Next
transparent
WallDecoD5Next
transparent

ToL
transparent
ToU
transparent
ToR
transparent
ToD
transparent


RotateDecoL5
#F17E9F (bright pink)
.....
.....
.....
.....
.....

RotateDecoL4
#F17E9F (bright pink)
.....
.....
.....
.....
.....

RotateDecoL3
#F17E9F (bright pink)
.....
..0..
.0...
..0..
.....

RotateDecoL2
#F17E9F (bright pink)
.....
..00.
.00..
..00.
.....

RotateDecoL1
#F17E9F (bright pink)
.....
...0.
..0..
...0.
.....

RotateDecoU1
#FFCA59 (yellow)
.....
.....
..0..
.0.0.
.....

RotateDecoU2
#FFCA59 (yellow)
.....
..0..
.000.
.0.0.
.....

RotateDecoU3
#FFCA59 (yellow)
.....
..0..
.0.0.
.....
.....

RotateDecoU4
#FFCA59 (yellow)
.....
.....
.....
.....
.....

RotateDecoU5
#FFCA59 (yellow)
.....
.....
.....
.....
.....


RotateDecoR1
#FFAB85 (bright red)
.....
.0...
..0..
.0...
.....

RotateDecoR2
#FFAB85 (bright red)
.....
.00..
..00.
.00..
.....

RotateDecoR3
#FFAB85 (bright red)
.....
..0..
...0.
..0..
.....

RotateDecoR4
#FFAB85 (bright red)
.....
.....
.....
.....
.....

RotateDecoR5
#FFAB85 (bright red)
.....
.....
.....
.....
.....


RotateDecoD1
#FF8403 (player orange)
.....
.0.0.
..0..
.....
.....

RotateDecoD2
#FF8403 (player orange)
.....
.0.0.
.000.
..0..
.....

RotateDecoD3
#FF8403 (player orange)
.....
.....
.0.0.
..0..
.....

RotateDecoD4
#FF8403 (player orange)
.....
.....
.....
.....
.....

RotateDecoD5
#FF8403 (player orange)
.....
.....
.....
.....
.....

CarriedL3
#F17E9F (bright pink)
.....
.0...
.0...
.0...
.....

CarriedL2
#F17E9F (bright pink)
.....
.00..
.00..
.00..
.....

CarriedL1
#F17E9F (bright pink)
.....
...0.
...0.
...0.
.....

CarriedU1
#FFCA59 (yellow)
.....
.....
.....
.000.
.....

CarriedU2
#FFCA59 (yellow)
.....
.000.
.000.
.....
.....

CarriedU3
#FFCA59 (yellow)
.....
.000.
.....
.....
.....

CarriedR1
#FFAB85 (bright red)
.....
.0...
.0...
.0...
.....

CarriedR2
#FFAB85 (bright red)
.....
..00.
..00.
..00.
.....

CarriedR3
#FFAB85 (bright red)
.....
...0.
...0.
...0.
.....

CarriedD1
#FF8403 (player orange)
.....
.000.
.....
.....
.....

CarriedD2
#FF8403 (player orange)
.....
.000.
.000.
.....
.....

CarriedD3
#FF8403 (player orange)
.....
.....
.000.
.....
.....

CarryL
transparent
CarryU
transparent
CarryR
transparent
CarryD
transparent


MovedL3
#F17E9F (bright pink)
.....
.....
.0...
.....
.....

MovedL2
#F17E9F (bright pink)
.....
.....
.00..
.....
.....

MovedL1
#F17E9F (bright pink)
.....
.....
...0.
.....
.....

MovedU1
#FFCA59 (yellow)
.....
.....
.....
..0..
.....

MovedU2
#FFCA59 (yellow)
.....
..0..
..0..
.....
.....

MovedU3
#FFCA59 (yellow)
.....
..0..
.....
.....
.....

MovedR1
#FFAB85 (bright red)
.....
.....
.0...
.....
.....

MovedR2
#FFAB85 (bright red)
.....
.....
.00..
.....
.....

MovedR3
#FFAB85 (bright red)
.....
.....
...0.
.....
.....

MovedD1
#FF8403 (player orange)
.....
..0..
.....
.....
.....

MovedD2
#FF8403 (player orange)
.....
..0..
..0..
.....
.....

MovedD3
#FF8403 (player orange)
.....
.....
..0..
.....
.....


ThrowingLU
#190434 (darkest purple) #E6507B (pink)
..0.1
.....
.....
.....
.....

ThrowingLD
#190434 (darkest purple) #E6507B (pink)
.....
.....
.....
.....
..0.1

ThrowingUL
#190434 (darkest purple) #FFCA59 (yellow)
.....
.....
0....
.....
1....

ThrowingUR
#190434 (darkest purple) #FFCA59 (yellow)
.....
.....
....0
.....
....1

ThrowingRD
#190434 (darkest purple) #FF8D59 (red)
.....
.....
.....
.....
1.0..
ThrowingRU
#190434 (darkest purple) #FF8D59 (red)
1.0..
.....
.....
.....
.....

ThrowingDL
#190434 (darkest purple) #FF8403 (player orange)
1....
.....
0....
.....
.....
ThrowingDR
#190434 (darkest purple) #FF8403 (player orange)
....1
.....
....0
.....
.....


Orb1 
#F17E9F (bright pink) #E6507B (pink) 
.....
.000.
.100.
.111.
.....

Orb2
#FFAB85 (bright red)#FF8D59 (red)
.....
.001.
.001.
.011.
.....

Orb3
#FFCA59 (yellow) #FFD885 (bright yellow)
.....
.111.
.001.
.000.
.....

Orb4
#FF8403 (player orange) #FF9703 (pdayer orange)
.....
.110.
.100.
.100.
.....

GotOrb1 
#F17E9F (bright pink) #E6507B (pink) 
.....
.000.
.100.
.111.
.....

GotOrb2
#FFAB85 (bright red)#FF8D59 (red)
.....
.001.
.001.
.011.
.....

GotOrb3
#FFCA59 (yellow) #FFD885 (bright yellow)
.....
.111.
.001.
.000.
.....

GotOrb4
#FF8403 (player orange) #FF9703 (pdayer orange)
.....
.110.
.100.
.100.
.....

AllOrbs
transparent

LightL
#BB2751 (dark pink)

LightR
#D05E2B (dark red)

LightU
#D09B2B (dark yellow)

LightD
#D05E2B (dark orange)

LightOverL
#BB2751 (dark pink)
.....
.....
00000
.....
.....

LightOverU
#D09B2B (dark yellow)
..0..
..0..
.000.
..0..
..0..

LightOverR
#D05E2B (dark red) 
.....
.....
00000
.....
.....

LightOverD
#D05E2B (dark orange)
..0..
..0..
.000.
..0..
..0..

LightGateL5
#F17E9F (bright pink)
.....
.0...
.0...
.0...
.....

LightGateL4
#F17E9F (bright pink)
.....
.00..
.0...
.00..
.....

LightGateL3
#F17E9F (bright pink)
.....
.000.
.0...
.000.
.....

LightGateL2
#F17E9F (bright pink)
.....
..00.
.....
..00.
.....

LightGateL1
#F17E9F (bright pink)
.....
...0.
.....
...0.
.....

LightGateU5
#FFCA59 (yellow)
.....
.000.
.....
.....
.....

LightGateU4
#FFCA59 (yellow)
.....
.000.
.0.0.
.....
.....

LightGateU3
#FFCA59 (yellow)
.....
.000.
.0.0.
.0.0.
.....

LightGateU2
#FFCA59 (yellow)
.....
.....
.0.0.
.0.0.
.....

LightGateU1
#FFCA59 (yellow)
.....
.....
.....
.0.0.
.....


LightGateR1
#FFAB85 (bright red)
.....
.0...
.....
.0...
.....

LightGateR2
#FFAB85 (bright red)
.....
.00..
.....
.00..
.....

LightGateR3
#FFAB85 (bright red)
.....
.000.
...0.
.000.
.....

LightGateR4
#FFAB85 (bright red)
.....
..00.
...0.
..00.
.....

LightGateR5
#FFAB85 (bright red)
.....
...0.
...0.
...0.
.....

LightGateD1
#FF8403 (player orange)
.....
.0.0.
.....
.....
.....

LightGateD2
#FF8403 (player orange)
.....
.0.0.
.0.0.
.....
.....

LightGateD3
#FF8403 (player orange)
.....
.0.0.
.0.0.
.000.
.....

LightGateD4
#FF8403 (player orange)
.....
.....
.0.0.
.000.
.....

LightGateD5
#FF8403 (player orange)
.....
.....
.....
.000.
.....


Gravity
transparent
GravityStart
transparent
Movity
transparent

BlockErase
transparent( red
.....
.....
..1..
.....
.....)

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
Once
transparent

Animate »
transparent (blue
.....
..1..
..1..
..1..
.....
)

Loop1
transparent
Loop2
transparent

InView $
transparent (red
.....
.....
..1..
.....
.....)
InViewAlways
transparent

StartGame
transparent

FOV0
transparent
FOV1
transparent
FOV2
transparent
FOV3
transparent
FOV4
transparent
FOV5
transparent
FOV6
transparent
FOV7
transparent
FOV8
transparent
FOV9
transparent

Darkness1
#7346AD (purple) #54268D (dark purple) red
11111
11111
00000
11111
11110

Darkness2
#7346AD (purple) #54268D (dark purple) red
11110
11111
00000
11111
11111

Darkness3
#7346AD (purple) #54268D (dark purple) red
01111
11111
00000
11111
11111

Darkness4
#7346AD (purple) #54268D (dark purple) red
11111
11111
00000
11111
01111

Darkness5
#7346AD (purple) #54268D (dark purple)  red
11110
11111
00000
11111
11110

Darkness6
#7346AD (purple) #54268D (dark purple)   red
01110
11111
00000
11111
11111

Darkness7
#7346AD (purple) #54268D (dark purple)  red
01111
11111
00000
11111
01111

Darkness8
#7346AD (purple) #54268D (dark purple)  red
11111
11111
00000
11111
01110

Darkness9
#7346AD (purple) #54268D (dark purple)  red
11110
11111
00000
11111
01110

Darkness10
#7346AD (purple) #54268D (dark purple)  red
01110
11111
00000
11111
11110

Darkness11
#7346AD (purple) #54268D (dark purple)  red
01110
11111
00000
11111
01111

Darkness12
#7346AD (purple) #54268D (dark purple)  red
11110
11111
00000
11111
01110

Darkness13
#7346AD (purple) #54268D (dark purple)  red
01110
11111
00000
11111
01110

Seen
transparent (yellow
.....
.....
..1..
.....
.....)

FOVHinder
transparent (green
.....
.1.1.
.....
.1.1.
.....)

Save
#9F76D3 (bright purple)
.....
.....
..0..
.....
.....

Saved
transparent
NoSave
#190434 (darkest purple)
.....
.....
..0..
.....
.....

Flash0
#7346AD (purple) 

Flash1 
#E6507B (pink) 

Flash2
#FF8D59 (red)

Flash3
#FFD885 (bright yellow)

Flash4
#FF9703 (pdayer orange)

(dialog)

Intercom1
transparent

Intercom2
transparent

Intercom3
transparent

Intercom4
transparent

Intercom5
transparent

IntercomL1
#9F76D3 (bright purple) #190434 (darkest purple)
0....
.1...
.....
.....
.....

IntercomL2
#9F76D3 (bright purple) #190434 (darkest purple)
.0...
0.1..
.1...
.....
.....

IntercomL3
#9F76D3 (bright purple) #190434 (darkest purple)
..0..
..01.
00.1.
.11..
.....

IntercomU1
#9F76D3 (bright purple) #190434 (darkest purple)
....0
...1.
.....
.....
.....

IntercomU2
#9F76D3 (bright purple) #190434 (darkest purple)
...0.
..1.0
...1.
.....
.....

IntercomU3
#9F76D3 (bright purple) #190434 (darkest purple)
..0..
.10..
.1.00
..11.
.....

IntercomR1
#9F76D3 (bright purple) #190434 (darkest purple)
.....
.....
.....
...1.
....0

IntercomR2
#9F76D3 (bright purple) #190434 (darkest purple)
.....
.....
...1.
..1.0
...0.

IntercomR3
#9F76D3 (bright purple) #190434 (darkest purple)
.....
..11.
.1.00
.10..
..0..

IntercomD1
#9F76D3 (bright purple) #190434 (darkest purple)
.....
.....
.....
.1...
0....

IntercomD2
#9F76D3 (bright purple) #190434 (darkest purple)
.....
.....
.1...
0.1..
.0...

IntercomD3
#9F76D3 (bright purple) #190434 (darkest purple)
.....
.11..
00.1.
..01.
..0..

Story0
transparent 
Story1
transparent
Story2
transparent 
Story3
TRANSPARENT
Story4
TRANSPARENT
Story5
transparent 
Story6
transparent
Story7
TRANSPARENT
Story8
TRANSPARENT
Story9
TRANSPARENT


ConsoleTop =
#190434 (darkest purple)


ToNextLine ¶
transparent

FirstLine
transparent

ClearConsole
transparent(#BB2751 (dark pink))


StorySelector1
transparent (#BB2751 (dark pink) 
.....
.....
.....
0...0
00.00)

StorySelector2
transparent (#BB2751 (dark pink) 
00.00
0...0
.....
.....
.....)


WinSignal
transparent

ConsL
transparent (lightred
....1
....1
.....
....1
....1)


ConsR
transparent (lightblue
1.1..
1.1..
1.1..
1.1..
1.1..)


Quench
transparent (red
1....
.1...
..1..
...1.
....1)

Quenched
transparent

BlockOver
#7346AD (purple)
.....
.000.
.0.0.
.000.
.....

NextBlock
white #7346AD (purple)
0.0.0
.....
0...0
.....
0.0.0


Agent
transparent (green
.....
.....
.111.
.....
.....)





PostWin ¥
transparent

WallToRemove1
#190434 (darkest purple) #7346AD (purple)
11..1
....1
.....
1....
1..11

WallToRemove2
#190434 (darkest purple) #7346AD (purple)
11..1
....1
00000
1....
1..11

WallToRemove3
#190434 (darkest purple) #7346AD (purple)
1...1
00000
00000
00000
1...1

=======
LEGEND
=======


\ = FOVHinder
/ = Background
‡ = Background and FOVHinder


S = Save
_ = Once

꙳ = Orb1 and Block
* = Orb1 
⋆ = Orb1 
§ = Background

. = Background 
: = Block 

¤ = Wall and StartGame (and Seen)
# = Wall and StartGame 
× = Wall and StartGame and WallToRemove1
£ = Wall and StartGame 




& = Agent
P = PlayerD and Player and Agent and Gravity and TickTime 


a = CrateSimpleL 
e = CrateSimpleU 
i = CrateSimpleR 
o = CrateSimpleD 

á = PodL and Loop2
é = PodU and Loop2
í = PodR and Loop2
ó = PodD and Loop2

Loop = Loop1 or Loop2

à = LightGateL1 
è = LightGateU1 
ì = LightGateR1 
ò = LightGateD1 

G = Gravity
M = Movity

CrateL = CrateSimpleL 
CrateU = CrateSimpleU 
CrateR = CrateSimpleR 
CrateD = CrateSimpleD 


CrateSimple = CrateSimpleL or CrateSimpleU or CrateSimpleR or CrateSimpleD
Crate = CrateSimple

CrateXL = CrateU or CrateR or CrateD
CrateXU = CrateR or CrateD or CrateL
CrateXR = CrateD or CrateL or CrateU
CrateXD = CrateL or CrateU or CrateR


Players = PlayerL or PlayerU or PlayerR or PlayerD
PlayerXL = PlayerU or PlayerR or PlayerD
PlayerXU = PlayerR or PlayerD or PlayerL
PlayerXR = PlayerD or PlayerL or PlayerU
PlayerXD = PlayerL or PlayerU or PlayerR

Legs = PlayerLegsL or PlayerLegsU or PlayerLegsR or PlayerLegsD
LegsXL = PlayerLegsU or PlayerLegsR or PlayerLegsD
LegsXU = PlayerLegsR or PlayerLegsD or PlayerLegsL
LegsXR = PlayerLegsD or PlayerLegsL or PlayerLegsU
LegsXD = PlayerLegsL or PlayerLegsU or PlayerLegsR

NextLegs = NextLegsL or NextLegsU or NextLegsR or NextLegsD


FallableL = PlayerL or PlayerLegsL or CrateL
FallableU = PlayerU or PlayerLegsU or CrateU
FallableR = PlayerR or PlayerLegsR or CrateR
FallableD = PlayerD or PlayerLegsD or CrateD

Fallable = FallableL or FallableU or FallableR or FallableD
FallableXL = FallableU or FallableR or FallableD
FallableXU = FallableR or FallableD or FallableL
FallableXR = FallableD or FallableL or FallableU
FallableXD = FallableL or FallableU or FallableR


ToXL = ToU or ToR or ToD
ToXU = ToR or ToD or ToL
ToXR = ToD or ToL or ToU
ToXD = ToL or ToU or ToR
To = ToL or ToU or ToR or ToD

FromXL = FromU or FromR or FromD
FromXU = FromR or FromD or FromL
FromXR = FromD or FromL or FromU
FromXD = FromL or FromU or FromR
From = FromL or FromU or FromR or FromD


CarriableL = CrateL or PlayerLegsL or PlayerL
CarriableU = CrateU or PlayerLegsU or PlayerU
CarriableR = CrateR or PlayerLegsR or PlayerR
CarriableD = CrateD or PlayerLegsD or PlayerD

CarrierL = CrateXR or PlayerXR or LegsXR
CarrierU = CrateXD or PlayerXD or LegsXD
CarrierR = CrateXL or PlayerXL or LegsXL
CarrierD = CrateXU or PlayerXU or LegsXU

CarriedL = CarriedL1 or CarriedL2 or CarriedL3
CarriedU = CarriedU1 or CarriedU2 or CarriedU3
CarriedR = CarriedR1 or CarriedR2 or CarriedR3
CarriedD = CarriedD1 or CarriedD2 or CarriedD3

Carried = CarriedL or CarriedU or CarriedR or CarriedD

MovedL = MovedL1 or MovedL2 or MovedL3
MovedU = MovedU1 or MovedU2 or MovedU3
MovedR = MovedR1 or MovedR2 or MovedR3
MovedD = MovedD1 or MovedD2 or MovedD3

Moved = MovedL or MovedU or MovedR or MovedD


UnPushable = Wall or Block

Pushable = Players or Legs or Crate
Pusher = Pushable 

Carriable = Crate

Item = Pushable or UnPushable

Phase = Gravity or Movity or GravityStart
Fixed = FixedL or FixedR or FixedU or FixedD 

Orb = Orb1 or Orb2 or Orb3 or Orb4
Flash = Flash0 or Flash1 or Flash2 or Flash3 or Flash4

Intercom = Intercom1 or Intercom2 or Intercom3 or Intercom4 (or Intercom5)


(Decoration)
Light = LightL or LightU or LightR or LightD
LightOver = LightOverL or LightOverU or LightOverR or LightOverD

WallDecoL = WallDecoL1 or WallDecoL2 or WallDecoL3 or WallDecoL4 or WallDecoL5
WallDecoU = WallDecoU1 or WallDecoU2 or WallDecoU3 or WallDecoU4 or WallDecoU5
WallDecoR = WallDecoR1 or WallDecoR2 or WallDecoR3 or WallDecoR4 or WallDecoR5
WallDecoD = WallDecoD1 or WallDecoD2 or WallDecoD3 or WallDecoD4 or WallDecoD5

WallDeco = WallDecoL or WallDecoU or WallDecoR or WallDecoD
WallDecoNext = WallDecoL5Next or WallDecoU5Next or WallDecoR5Next or WallDecoD5Next

RotateDecoL = RotateDecoL1 or RotateDecoL2 or RotateDecoL3 or RotateDecoL4 or RotateDecoL5
RotateDecoU = RotateDecoU1 or RotateDecoU2 or RotateDecoU3 or RotateDecoU4 or RotateDecoU5
RotateDecoR = RotateDecoR1 or RotateDecoR2 or RotateDecoR3 or RotateDecoR4 or RotateDecoR5
RotateDecoD = RotateDecoD1 or RotateDecoD2 or RotateDecoD3 or RotateDecoD4 or RotateDecoD5

RotateDeco = RotateDecoL or RotateDecoU or RotateDecoR or RotateDecoD

border = borderL or borderR or borderU or borderD 

BoX = BoLXU or BoDXL or BoUXR or BoRXD
BoXL = BoLXU or BoDXL
BoXU = BoLXU or BoUXR
BoXR = BoUXR or BoRXD
BoXD = BoDXL or BoRXD

ThrowingL = ThrowingLU or ThrowingLD
ThrowingU = ThrowingUL or ThrowingUR
ThrowingR = ThrowingRD or ThrowingRU
ThrowingD = ThrowingDL or ThrowingDR

Throwing = ThrowingL or ThrowingU or ThrowingR or ThrowingD

ThrowingLURD = ThrowingLU or ThrowingUL or ThrowingRD or ThrowingDL
ThrowingDRUL = ThrowingLD or ThrowingUR or ThrowingRU or ThrowingDR

WallOver = WallOver1 or WallOver2 or WallOver3 or WallOver4 or WallOver5 or WallOver6 or WallOver7 or WallOver8 or WallOver9 or WallOver10 or WallOver11 or WallOver12 or WallOver13

LightGateL = LightGateL1 or LightGateL2 or LightGateL3 or LightGateL4 or LightGateL5
LightGateU = LightGateU1 or LightGateU2 or LightGateU3 or LightGateU4 or LightGateU5
LightGateR = LightGateR1 or LightGateR2 or LightGateR3 or LightGateR4 or LightGateR5
LightGateD = LightGateD1 or LightGateD2 or LightGateD3 or LightGateD4 or LightGateD5

LightGate = LightGateL or LightGateU or LightGateR or LightGateD


IntercomL = IntercomL1 or IntercomL2 or IntercomL3
IntercomU = IntercomU1 or IntercomU2 or IntercomU3
IntercomR = IntercomR1 or IntercomR2 or IntercomR3
IntercomD = IntercomD1 or IntercomD2 or IntercomD3

IntercomOver = IntercomL or IntercomU or IntercomR or IntercomD

@ = InView and Seen

(Story and dialogue)
(---------------------------------------------------)

StorySelector = StorySelector1 or StorySelector2


Story = Story0 or Story1 or Story2 or Story3 or Story4 or Story5 or Story6 or Story7 or Story8 or Story9

0 = Story0
1 = Story1
2 = Story2
3 = Story3
4 = Story4
5 = Story5
6 = Story6
7 = Story7
8 = Story8
9 = Story9

~ = FirstLine

(Consoles)
(---------------------------------------------------)


GotOrb = GotOrb1 or GotOrb2 or GotOrb3 or GotOrb4
Displayable =  GotOrb



Consoles = ConsoleTop



Darkness = Darkness1 or Darkness2 or Darkness3 or Darkness4 or Darkness5 or Darkness6 or Darkness7 or Darkness8 or Darkness9 or Darkness10 or Darkness11 or Darkness12 or Darkness13


FOV = FOV0 or FOV1 or FOV2 or FOV3 or FOV4 or FOV5 or FOV6 or FOV7 or FOV8 or FOV9

FOV01 = FOV0  or FOV1
FOV02 = FOV01 or FOV2
FOV03 = FOV02 or FOV3
FOV04 = FOV03 or FOV4
FOV05 = FOV04 or FOV5
FOV06 = FOV05 or FOV6
FOV07 = FOV06 or FOV7
FOV08 = FOV07 or FOV8
FOV09 = FOV08 or FOV9




Cons  = ConsL or  ConsR










WallToRemove = WallToRemove1 or WallToRemove2 or WallToRemove3

ConsClear = ConsL or ConsR  or ToNextLine or ConsoleTop or FirstLine


=======
SOUNDS
=======

sfx0 13614108
sfx1 25636708
sfx2 79636308
sfx3 76346108

sfx4 27763708 (typewriter)

sfx5 40605508 (light)

sfx6 50758708 (orb)
 
sfx7 22586308 (start play)
sfx8 20449708 (end play)

sfx9 4002908 (save)

undo 85375308
restart 35446108

================
COLLISIONLAYERS
================

Background
Light

Save, NoSave
Saved

Orb
LightGate

PodL
PodU
PodR
PodD
ToL
ToU
ToR
ToD
RotateDecoL
RotateDecoU
RotateDecoR
RotateDecoD

CarryL
CarryU
CarryR
CarryD

Carried
Moved

Player
NextLegs

Phase
BlockErase

BlockOver
NextBlock
Item

Once

FixedL
FixedU
FixedR
FixedD

FromL
FromU
FromR
FromD

WallToRemove
WallOver
ThrowingLURD
ThrowingDRUL

FOV
Seen
Darkness
FOVHinder

borderL
borderU
borderR
borderD

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

FixBorder
UnFixBorder

LightOver

WallDecoL
WallDecoU
WallDecoR
WallDecoD
WallDecoL5Next
WallDecoU5Next
WallDecoR5Next
WallDecoD5Next



Intercom
Intercom5
IntercomOver

Story

ToNextLine,FirstLine

StorySelector
ClearConsole


ConsoleTop
GotOrb


Cons

TickTime, TickPlayer
Animate
Loop
Inview
InViewAlways
StartGame

Flash
WinSignal

Agent


Quench
Quenched


PostWin
AllOrbs

======
RULES     
======     
(final win signal)
[action Player][PostWin]->win

[moving Player][&]->[Player][moving &]
[action Player][&]->[Player][action &]

(Font)
(---------------------------------------------------)
(---------------------------------------------------)



(Clear the message console)
(---------------------------------------------------)
[moving &][ClearConsole]->[moving &][ClearConsole _] (require movement or action)

[& Story][ClearConsole _]->[& Story][ClearConsole] (don't clear if a new story is coming)

(clear console)
[ClearConsole _]->[]
[_]->[]





(Animation and Decoration)
(---------------------------------------------------)
(---------------------------------------------------)

(Hieroglyphs)
(---------------------------------------------------)
late [Wall no WallOver]->[Wall random WallOver]


(Ticking animation control in view)
(---------------------------------------------------)

[" no &][&]->[][& "]
[' no &][&]->[][& ']

 [stationary &]["]->[stationary &][']
 [moving     &]["]->[moving     &][']

 [moving     &][']->[moving     &]["]
 [action     &][']->[action     &]["]

 [_]->[]
 [' no _]->[' » _] 
 [' no _ »]->[' _]
 [_]->[]

(Gravity Echo Decoration)
(---------------------------------------------------)

(Animate)

[»][@ WallDecoL .]->[»][@ WallDecoL]
[»][@ WallDecoL1 no .]->[»][@ WallDecoL2 .]
[»][@ WallDecoL2 no .]->[»][@ WallDecoL3 .]
[»][@ WallDecoL3 no .]->[»][@ WallDecoL4 .]
[»][@ WallDecoL4 no .]->[»][@ WallDecoL5 .]
[»][@ WallDecoL5 no .]->[»][@ WallDecoL5Next .]

[»][@ WallDecoU .]->[»][@ WallDecoU]
[»][@ WallDecoU1 no .]->[»][@ WallDecoU2 .]
[»][@ WallDecoU2 no .]->[»][@ WallDecoU3 .]
[»][@ WallDecoU3 no .]->[»][@ WallDecoU4 .]
[»][@ WallDecoU4 no .]->[»][@ WallDecoU5 .]
[»][@ WallDecoU5 no .]->[»][@ WallDecoU5Next .]

[»][@ WallDecoR .]->[»][@ WallDecoR]
[»][@ WallDecoR1 no .]->[»][@ WallDecoR2 .]
[»][@ WallDecoR2 no .]->[»][@ WallDecoR3 .]
[»][@ WallDecoR3 no .]->[»][@ WallDecoR4 .]
[»][@ WallDecoR4 no .]->[»][@ WallDecoR5 .]
[»][@ WallDecoR5 no .]->[»][@ WallDecoR5Next .]

[»][@ WallDecoD .]->[»][@ WallDecoD]
[»][@ WallDecoD1 no .]->[»][@ WallDecoD2 .]
[»][@ WallDecoD2 no .]->[»][@ WallDecoD3 .]
[»][@ WallDecoD3 no .]->[»][@ WallDecoD4 .]
[»][@ WallDecoD4 no .]->[»][@ WallDecoD5 .]
[»][@ WallDecoD5 no .]->[»][@ WallDecoD5Next .]


(Initialise)
left [   FallableL no Wall @|Wall no WallDecoL no WallDecoL5Next @][»]->[FallableL @|Wall WallDecoL1  @][»]
up   [   FallableU no Wall @|Wall no WallDecoU no WallDecoU5Next @][»]->[FallableU @|Wall WallDecoU1  @][»]
right[   FallableR no Wall @|Wall no WallDecoR no WallDecoR5Next @][»]->[FallableR @|Wall WallDecoR1  @][»]
down [   FallableD no Wall @|Wall no WallDecoD no WallDecoD5Next @][»]->[FallableD @|Wall WallDecoD1  @][»]
left [no FallableL no Wall|Wall    WallDecoL5Next @][»]->[ |Wall  @][»]
up   [no FallableU no Wall|Wall    WallDecoU5Next @][»]->[ |Wall  @][»]
right[no FallableR no Wall|Wall    WallDecoR5Next @][»]->[ |Wall  @][»]
down [no FallableD no Wall|Wall    WallDecoD5Next @][»]->[ |Wall  @][»]


(Rotator Beacon Decoration)
(---------------------------------------------------)
(Initialise)
[ToL no RotateDecoL @][»]->[ToL RotateDecoL5 @][»]
[ToU no RotateDecoU @][»]->[ToU RotateDecoU5 @][»]
[ToR no RotateDecoR @][»]->[ToR RotateDecoR5 @][»]
[ToD no RotateDecoD @][»]->[ToD RotateDecoD5 @][»]

(Finalise)
late [no ToL RotateDecoL @][»]->[ @][»]
late [no ToU RotateDecoU @][»]->[ @][»]
late [no ToR RotateDecoR @][»]->[ @][»]
late [no ToD RotateDecoD @][»]->[ @][»]

(Start to Animate)
[»][@ RotateDeco .]->[»][@ RotateDeco ]

[»][@ RotateDecoL1 no . Loop2]->[»][@ RotateDecoL2 . Loop1]
[»][@ RotateDecoL1 no . Loop1]->[»][@ RotateDecoL2 .]

[»][@ RotateDecoL1 no .|Pusher]->[»][@ RotateDecoL2 . Loop1|Pusher @]
[»][@ RotateDecoL2 no .]->[»][@ RotateDecoL3 .]
[»][@ RotateDecoL3 no .]->[»][@ RotateDecoL4 .]
[»][@ RotateDecoL4 no .]->[»][@ RotateDecoL5 .]
[»][@ RotateDecoL5 no .]->[»][@ RotateDecoL1 .]

[»][@ RotateDecoU1 no . Loop2]->[»][@ RotateDecoU2 . Loop1]
[»][@ RotateDecoU1 no . Loop1]->[»][@ RotateDecoU2 .]

[»][@ RotateDecoU1 no .|Pusher]->[»][@ RotateDecoU2 . Loop1|Pusher @]
[»][@ RotateDecoU2 no .]->[»][@ RotateDecoU3 .]
[»][@ RotateDecoU3 no .]->[»][@ RotateDecoU4 .]
[»][@ RotateDecoU4 no .]->[»][@ RotateDecoU5 .]
[»][@ RotateDecoU5 no .]->[»][@ RotateDecoU1 .]

[»][@ RotateDecoR1 no . Loop2]->[»][@ RotateDecoR2 . Loop1]
[»][@ RotateDecoR1 no . Loop2]->[»][@ RotateDecoR2 .]

[»][@ RotateDecoR1 no .|Pusher]->[»][@ RotateDecoR2 . Loop1|Pusher @]
[»][@ RotateDecoR2 no .]->[»][@ RotateDecoR3 .]
[»][@ RotateDecoR3 no .]->[»][@ RotateDecoR4 .]
[»][@ RotateDecoR4 no .]->[»][@ RotateDecoR5 .]
[»][@ RotateDecoR5 no .]->[»][@ RotateDecoR1 .]

[»][@ RotateDecoD1 no . Loop2]->[»][@ RotateDecoD2 . Loop1]
[»][@ RotateDecoD1 no . Loop1]->[»][@ RotateDecoD2 .]

[»][@ RotateDecoD1 no .|Pusher]->[»][@ RotateDecoD2 . Loop1|Pusher @]
[»][@ RotateDecoD2 no .]->[»][@ RotateDecoD3 .]
[»][@ RotateDecoD3 no .]->[»][@ RotateDecoD4 .]
[»][@ RotateDecoD4 no .]->[»][@ RotateDecoD5 .]
[»][@ RotateDecoD5 no .]->[»][@ RotateDecoD1 .]

(animate a second time, after use)
[»][@ RotateDeco Pusher no Loop2]->[»][@ RotateDeco Pusher Loop2]


(Carried Animation)
(---------------------------------------------------)

[»][@ Carried .]->[»][@ Carried]
[»][@ CarriedL1 no .]->[»][@ CarriedL2 .]
[»][@ CarriedL2 no .]->[»][@ CarriedL3 .]
[»][@ CarriedL3 no .]->[»][@ .]

[»][@ CarriedU1 no .]->[»][@ CarriedU2 .]
[»][@ CarriedU2 no .]->[»][@ CarriedU3 .]
[»][@ CarriedU3 no .]->[»][@ .]

[»][@ CarriedR1 no .]->[»][@ CarriedR2 .]
[»][@ CarriedR2 no .]->[»][@ CarriedR3 .]
[»][@ CarriedR3 no .]->[»][@ .]

[»][@ CarriedD1 no .]->[»][@ CarriedD2 .]
[»][@ CarriedD2 no .]->[»][@ CarriedD3 .]
[»][@ CarriedD3 no .]->[»][@ .]

(Moved Animation)
(---------------------------------------------------)
[»][@ Moved .]->[»][@ Moved]
[»][@ MovedL1 no .]->[»][@ MovedL2 .]
[»][@ MovedL2 no .]->[»][@ MovedL3 .]
[»][@ MovedL3 no .]->[»][@ .]

[»][@ MovedU1 no .]->[»][@ MovedU2 .]
[»][@ MovedU2 no .]->[»][@ MovedU3 .]
[»][@ MovedU3 no .]->[»][@ .]

[»][@ MovedR1 no .]->[»][@ MovedR2 .]
[»][@ MovedR2 no .]->[»][@ MovedR3 .]
[»][@ MovedR3 no .]->[»][@ .]

[»][@ MovedD1 no .]->[»][@ MovedD2 .]
[»][@ MovedD2 no .]->[»][@ MovedD3 .]
[»][@ MovedD3 no .]->[»][@ .]

(Orb Animation)
(---------------------------------------------------)
[»][@ Orb .]->[»][@ Orb]
[»][@ Orb1 no .]->[»][@ Orb2 .]
[»][@ Orb2 no .]->[»][@ Orb3 .]
[»][@ Orb3 no .]->[»][@ Orb4 .]
[»][@ Orb4 no .]->[»][@ Orb1 .]

[»][ GotOrb .]->[»][ GotOrb]
[»][ GotOrb1 no .]->[»][ GotOrb2 .]
[»][ GotOrb2 no .]->[»][ GotOrb3 .]
[»][ GotOrb3 no .]->[»][ GotOrb4 .]
[»][ GotOrb4 no .]->[»][ GotOrb1 .]

(Light gate decoration)
(---------------------------------------------------)

(Animate)
[»][@ LightGate .]->[»][@ LightGate]
[»][@ LightGateL1 no .]->[»][@ LightGateL2 .]
[»][@ LightGateL2 no .]->[»][@ LightGateL3 .]
[»][@ LightGateL3 no .]->[»][@ LightGateL4 .]
[»][@ LightGateL4 no .]->[»][@ LightGateL5 .]
[»][@ LightGateL5 no .]->[»][@ LightGateL1 .]

[»][@ LightGateU1 no .]->[»][@ LightGateU2 .]
[»][@ LightGateU2 no .]->[»][@ LightGateU3 .]
[»][@ LightGateU3 no .]->[»][@ LightGateU4 .]
[»][@ LightGateU4 no .]->[»][@ LightGateU5 .]
[»][@ LightGateU5 no .]->[»][@ LightGateU1 .]

[»][@ LightGateR1 no .]->[»][@ LightGateR2 .]
[»][@ LightGateR2 no .]->[»][@ LightGateR3 .]
[»][@ LightGateR3 no .]->[»][@ LightGateR4 .]
[»][@ LightGateR4 no .]->[»][@ LightGateR5 .]
[»][@ LightGateR5 no .]->[»][@ LightGateR1 .]

[»][@ LightGateD1 no .]->[»][@ LightGateD2 .]
[»][@ LightGateD2 no .]->[»][@ LightGateD3 .]
[»][@ LightGateD3 no .]->[»][@ LightGateD4 .]
[»][@ LightGateD4 no .]->[»][@ LightGateD5 .]
[»][@ LightGateD5 no .]->[»][@ LightGateD1 .]

(Activate gates and associated dialogue)
[LightGateR CrateR no LightR]->[LightGateR CrateR LightR]
[LightGateU CrateU no LightU]->[LightGateU CrateU LightU]
[LightGateD CrateD no LightD]->[LightGateD CrateD LightD] 
[LightGateL CrateL no LightL]->[LightGateL CrateL LightL]

[LightGateR CrateR LightR no Postwin][LightGateU CrateU LightU][LightGateD CrateD LightD] [LightGateL CrateL LightL]->[LightGateR CrateR LightR Postwin][LightGateU CrateU LightU][LightGateD CrateD LightD] [LightGateL CrateL LightL]


(propagate light)
 late left  [no LightL |LightL ]->[LightL |LightL]
 late up    [no LightU |LightU ]->[LightU |LightU]
 late right [no LightR |LightR ]->[LightR |LightR]
 late down  [no LightD |LightD ]->[LightD |LightD]

(over walls too)
 late [LightL Wall no LightOverL]->[LightL Wall LightOverL]
 late [LightU Wall no LightOverU]->[LightU Wall LightOverU]
 late [LightR Wall no LightOverR]->[LightR Wall LightOverR]
 late [LightD Wall no LightOverD]->[LightD Wall LightOverD]


(Incoming call)
(---------------------------------------------------)
(animate)
late  [»][@ Intercom .]->[»][@ Intercom]
late  [»][@ Intercom1 no .]->[»][@ Intercom2 .]
late  [»][@ Intercom2 no .]->[»][@ Intercom3 .]
late  [»][@ Intercom3 no .]->[»][@ Intercom4 .]
late  [»][@ Intercom4 no . no Intercom5]->[»][@ Intercom1 Intercom5 .]
late  [»][@ Intercom4 no .]->[»][@ .]

(Reset backgrounds)
(---------------------------------------------------)
[no .]->[.]

(Control and Phase Switching)
(---------------------------------------------------)
(---------------------------------------------------)

 [M]->[]
 [G]->[]

late [Players][& no Players]->[Players &][]

startloop

(Phase Switch & darkness under reveal)
(---------------------------------------------------)

left  [stationary FallableL @|no Item][& no G]->[FallableL @|@][& G]     
up    [stationary FallableU @|no Item][& no G]->[FallableU @|@][& G]     
right [stationary FallableR @|no Item][& no G]->[FallableR @|@][& G]     
down  [stationary FallableD @|no Item][& no G]->[FallableD @|@][& G]

 [& no G no M]->[& M]



(Player Movement Intent Transmission)
(---------------------------------------------------)
(prevent moving too quickly when rotating)
[stationary Players > &][M][Quench @]->[Players stationary &][M][Quench @]
[Quench]->[]

(transmission)
[stationary Players > &][M]->[> Players &][M]


(Gravity - multidirectional)
(---------------------------------------------------)
[stationary FallableL @ no _][G]->[left  FallableL @ _][G]     
[stationary FallableU @ no _][G]->[up    FallableU @ _][G]     
[stationary FallableR @ no _][G]->[right FallableR @ _][G]     
[stationary FallableD @ no _][G]->[down  FallableD @ _][G]

(outside of view gravity acts once upon starting level)
[stationary FallableL  no _][GravityStart]->[left  FallableL _][GravityStart]     
[stationary FallableU  no _][GravityStart]->[up    FallableU _][GravityStart]     
[stationary FallableR  no _][GravityStart]->[right FallableR _][GravityStart]     
[stationary FallableD  no _][GravityStart]->[down  FallableD _][GravityStart]

(Rise swap)
(---------------------------------------------------)
left [Carriable|< PlayerL |PlayerLegsL][M]->[stationary PlayerL |stationary PlayerLegsL|stationary Carriable][M] 
up   [Carriable|< PlayerU |PlayerLegsU][M]->[stationary PlayerU |stationary PlayerLegsU|stationary Carriable][M] 
right[Carriable|< PlayerR |PlayerLegsR][M]->[stationary PlayerR |stationary PlayerLegsR|stationary Carriable][M] 
down [Carriable|< PlayerD |PlayerLegsD][M]->[stationary PlayerD |stationary PlayerLegsD|stationary Carriable][M] 

(Pick)
(---------------------------------------------------)
left [> PlayerL|stationary Carriable no Quench][M]->[Carriable| PlayerL][M] 
up   [> PlayerU|stationary Carriable no Quench][M]->[Carriable| PlayerU][M] 
right[> PlayerR|stationary Carriable no Quench][M]->[Carriable| PlayerR][M] 
down [> PlayerD|stationary Carriable no Quench][M]->[Carriable| PlayerD][M] 

(Descend - against)
(---------------------------------------------------)
(register provenance falling)
left  [FallableL |no FromL LegsXL][M]->[FallableL|FromL LegsXL][M]
up    [FallableU |no FromU LegsXU][M]->[FallableU|FromU LegsXU][M]
right [FallableR |no FromR LegsXR][M]->[FallableR|FromR LegsXR][M]
down  [FallableD |no FromD LegsXD][M]->[FallableD|FromD LegsXD][M]

left [left  PlayerL|PlayerLegsL FromXL][M]->[stationary PlayerL|][M] 
up   [up    PlayerU|PlayerLegsU FromXU][M]->[stationary PlayerU|][M] 
right[right PlayerR|PlayerLegsR FromXR][M]->[stationary PlayerR|][M] 
down [down  PlayerD|PlayerLegsD FromXD][M]->[stationary PlayerD|][M] 


(Carry - marking)
(---------------------------------------------------)
left [stationary CarriableL @ no FixedU no Quench|up    CarrierL][M]->[CarryU CarriableL @|up    CarrierL][M]
up   [stationary CarriableU @ no FixedR no Quench|right CarrierU][M]->[CarryR CarriableU @|right CarrierU][M]
right[stationary CarriableR @ no FixedD no Quench|down  CarrierR][M]->[CarryD CarriableR @|down  CarrierR][M]
down [stationary CarriableD @ no FixedL no Quench|left  CarrierD][M]->[CarryL CarriableD @|left  CarrierD][M]

left [stationary CarriableL @ no FixedD no Quench|down  CarrierL][M]->[CarryD CarriableL @|down  CarrierL][M] 
up   [stationary CarriableU @ no FixedL no Quench|left  CarrierU][M]->[CarryL CarriableU @|left  CarrierU][M] 
right[stationary CarriableR @ no FixedU no Quench|up    CarrierR][M]->[CarryU CarriableR @|up    CarrierR][M] 
down [stationary CarriableD @ no FixedR no Quench|right CarrierD][M]->[CarryR CarriableD @|right CarrierD][M]

(Carry - execution)
(---------------------------------------------------)
[CarryU CarriableL @][M]->[up    CarriableL @][M] 
[CarryR CarriableU @][M]->[right CarriableU @][M] 
[CarryD CarriableR @][M]->[down  CarriableR @][M] 
[CarryL CarriableD @][M]->[left  CarriableD @][M]

[CarryD CarriableL @][M]->[down  CarriableL @][M]  
[CarryL CarriableU @][M]->[left  CarriableU @][M]  
[CarryU CarriableR @][M]->[up    CarriableR @][M]  
[CarryR CarriableD @][M]->[right CarriableD @][M] 

(Descend - clear)
(---------------------------------------------------)
left [left  PlayerL|PlayerLegsL no FromXL][M]->[left  PlayerL|][M]     
up   [up    PlayerU|PlayerLegsU no FromXU][M]->[up    PlayerU|][M]     
right[right PlayerR|PlayerLegsR no FromXR][M]->[right PlayerR|][M]     
down [down  PlayerD|PlayerLegsD no FromXD][M]->[down  PlayerD|][M] 

(Dont over Ascend)
(---------------------------------------------------)
left [< PlayerL |PlayerLegsL][M]->[stationary PlayerL|PlayerLegsL][M] 
up   [< PlayerU |PlayerLegsU][M]->[stationary PlayerU|PlayerLegsU][M] 
right[< PlayerR |PlayerLegsR][M]->[stationary PlayerR|PlayerLegsR][M] 
down [< PlayerD |PlayerLegsD][M]->[stationary PlayerD|PlayerLegsD][M] 


(Push and Collide)
(---------------------------------------------------)
(Push)
left  [left  Pusher @ | stationary Pushable no FixedL no Quench][M]->[left  Pusher @| left  Pushable][M]
up    [up    Pusher @ | stationary Pushable no FixedU no Quench][M]->[up    Pusher @| up    Pushable][M]
right [right Pusher @ | stationary Pushable no FixedR no Quench][M]->[right Pusher @| right Pushable][M]
down  [down  Pusher @ | stationary Pushable no FixedD no Quench][M]->[down  Pusher @| down  Pushable][M]

(register provenance)
left  [left  Item |no FromL]->[left  Item| FromL]
up    [up    Item |no FromU]->[up    Item| FromU]
right [right Item |no FromR]->[right Item| FromR]
down  [down  Item |no FromD]->[down  Item| FromD]

(Collide)
left  [left  Pusher @| UnPushable][M]->[stationary Pusher @ FixedL| UnPushable][M]
up    [up    Pusher @| UnPushable][M]->[stationary Pusher @ FixedU| UnPushable][M]
right [right Pusher @| UnPushable][M]->[stationary Pusher @ FixedR| UnPushable][M]
down  [down  Pusher @| UnPushable][M]->[stationary Pusher @ FixedD| UnPushable][M]

(Pre-collide by provenance)
[FromL FromXL Item no NextBlock]->[FromL FromXL Item NextBlock ]
[FromU FromXU Item no NextBlock]->[FromU FromXU Item NextBlock ]
[FromR FromXR Item no NextBlock]->[FromR FromXR Item NextBlock ]
[FromD FromXD Item no NextBlock]->[FromD FromXD Item NextBlock ]

left  [left  Pusher @| Nextblock]->[Pusher @ FixedL| Nextblock]
up    [up    Pusher @| Nextblock]->[Pusher @ FixedU| Nextblock]
right [right Pusher @| Nextblock]->[Pusher @ FixedR| Nextblock]
down  [down  Pusher @| Nextblock]->[Pusher @ FixedD| Nextblock]


(Prevent unacomplished moves: Part 1)
(---------------------------------------------------)
left  [left  Item @ no FixedL| stationary Item]->[left  Item @ FixedL| stationary Item]
up    [up    Item @ no FixedU| stationary Item]->[up    Item @ FixedU| stationary Item]
right [right Item @ no FixedR| stationary Item]->[right Item @ FixedR| stationary Item]
down  [down  Item @ no FixedD| stationary Item]->[down  Item @ FixedD| stationary Item]

left  [left  Item @ | FixedL]->[left  Item @ FixedL| FixedL]
up    [up    Item @ | FixedU]->[up    Item @ FixedU| FixedU]
right [right Item @ | FixedR]->[right Item @ FixedR| FixedR]
down  [down  Item @ | FixedD]->[down  Item @ FixedD| FixedD]


(Prevent unacomplished moves: Part 2)
(---------------------------------------------------)
left  [left  Item @ FixedL]->[stationary Item @ FixedL ]
up    [up    Item @ FixedU]->[stationary Item @ FixedU ]
right [right Item @ FixedR]->[stationary Item @ FixedR ]
down  [down  Item @ FixedD]->[stationary Item @ FixedD ]


endloop

[_]->[]



(Carried Animations)
(---------------------------------------------------)
(---------------------------------------------------)
late [Throwing no &]->[]

(principal)
right [stationary PlayerL|...|down  CarriableL]->[stationary PlayerL ThrowingLU|...|down  CarriableL CarriedD1]
down  [stationary PlayerU|...|left  CarriableU]->[stationary PlayerU ThrowingUR|...|left  CarriableU CarriedL1]
left  [stationary PlayerR|...|up    CarriableR]->[stationary PlayerR ThrowingRD|...|up    CarriableR CarriedU1]
up    [stationary PlayerD|...|right CarriableD]->[stationary PlayerD ThrowingDL|...|right CarriableD CarriedR1]

right [stationary PlayerL|...|up    CarriableL]->[stationary PlayerL ThrowingLD|...|up    CarriableL CarriedU1]
down  [stationary PlayerU|...|right CarriableU]->[stationary PlayerU ThrowingUL|...|right CarriableU CarriedR1]
left  [stationary PlayerR|...|down  CarriableR]->[stationary PlayerR ThrowingRU|...|down  CarriableR CarriedD1]
up    [stationary PlayerD|...|left  CarriableD]->[stationary PlayerD ThrowingDR|...|left  CarriableD CarriedL1]

(lateral)
right [stationary PlayerD|...|up    CarriableL]->[stationary PlayerD ThrowingDR|...|up    CarriableL CarriedU1]
down  [stationary PlayerL|...|right CarriableU]->[stationary PlayerL ThrowingLD|...|right CarriableU CarriedR1]
left  [stationary PlayerU|...|down  CarriableR]->[stationary PlayerU ThrowingUL|...|down  CarriableR CarriedD1]
up    [stationary PlayerR|...|left  CarriableD]->[stationary PlayerR ThrowingRU|...|left  CarriableD CarriedL1]

left  [stationary PlayerD|...|up    CarriableR]->[stationary PlayerD ThrowingDL|...|up    CarriableR CarriedU1]
up    [stationary PlayerL|...|right CarriableD]->[stationary PlayerL ThrowingLU|...|right CarriableD CarriedR1]
right [stationary PlayerU|...|down  CarriableL]->[stationary PlayerU ThrowingUR|...|down  CarriableL CarriedD1]
down  [stationary PlayerR|...|left  CarriableU]->[stationary PlayerR ThrowingRD|...|left  CarriableU CarriedL1]

right [stationary PlayerD|...|down  CarriableL]->[stationary PlayerD ThrowingDL|...|down  CarriableL CarriedD1]
down  [stationary PlayerL|...|left  CarriableU]->[stationary PlayerL ThrowingLU|...|left  CarriableU CarriedL1]
left  [stationary PlayerU|...|up    CarriableR]->[stationary PlayerU ThrowingUR|...|up    CarriableR CarriedU1]
up    [stationary PlayerR|...|right CarriableD]->[stationary PlayerR ThrowingRD|...|right CarriableD CarriedR1]

left  [stationary PlayerD|...|down  CarriableR]->[stationary PlayerD ThrowingDR|...|down  CarriableR CarriedD1]
up    [stationary PlayerL|...|left  CarriableD]->[stationary PlayerL ThrowingLD|...|left  CarriableD CarriedL1]
right [stationary PlayerU|...|up    CarriableL]->[stationary PlayerU ThrowingUL|...|up    CarriableL CarriedU1]
down  [stationary PlayerR|...|right CarriableU]->[stationary PlayerR ThrowingRU|...|right CarriableU CarriedR1]


(Propagate carried)
(---------------------------------------------------)
up    [left  CarrierL no CarriedL |left  CarriableL CarriedL]->[left  CarrierL |left  CarriableL no Carried  CarriedU1]
right [up    CarrierU no CarriedU |up    CarriableU CarriedU]->[up    CarrierU |up    CarriableU no Carried  CarriedR1]
down  [right CarrierR no CarriedR |right CarriableR CarriedR]->[right CarrierR |right CarriableR no Carried  CarriedD1]
left  [down  CarrierD no CarriedD |down  CarriableD CarriedD]->[down  CarrierD |down  CarriableD no Carried  CarriedL1]

down  [left  CarrierL no CarriedL |left  CarriableL CarriedL]->[left  CarrierL |left  CarriableL no Carried  CarriedD1]
left  [up    CarrierU no CarriedU |up    CarriableU CarriedU]->[up    CarrierU |up    CarriableU no Carried  CarriedL1]
up    [right CarrierR no CarriedR |right CarriableR CarriedR]->[right CarrierR |right CarriableR no Carried  CarriedU1]
right [down  CarrierD no CarriedD |down  CarriableD CarriedD]->[down  CarrierD |down  CarriableD no Carried  CarriedR1]

(Move)
[left  Item no Carried no Moved]->[left  Item MovedL1]
[up    Item no Carried no Moved]->[up    Item MovedU1]
[right Item no Carried no Moved]->[right Item MovedR1]
[down  Item no Carried no Moved]->[down  Item MovedD1]


(Block conflicting moves)
(---------------------------------------------------)
(---------------------------------------------------)
(prevent unnecessary  extra turn)
left  [FallableL @|no FromL]->[FallableL @|FromL]
up    [FallableU @|no FromU]->[FallableU @|FromU]
right [FallableR @|no FromR]->[FallableR @|FromR]
down  [FallableD @|no FromD]->[FallableD @|FromD]

(Generate Blocks at conflict areas)
(---------------------------------------------------)
late [NextBlock]->[]

[FromL FromXL no Item ]->[Block]
[FromU FromXU no Item ]->[Block]
[FromR FromXR no Item ]->[Block]
[FromD FromXD no Item ]->[Block]

[FromL FromXL Blockerase]->[]
[FromU FromXU Blockerase]->[]
[FromR FromXR Blockerase]->[]
[FromD FromXD Blockerase]->[]

late [Block]->[Block BlockOver]
late [BlockOver no Block][G]->[][G]

late    [Block BlockErase @]->[@]
late    [Block @]           ->   [Block BlockErase @]

late [Block|]->[Block InViewAlways|InViewAlways]





(Animation: wall bumps)
(---------------------------------------------------)
left [ Item FixedL no Wall @|Wall no WallDecoL no WallDecoL5Next]->[Item @|Wall WallDecoL1 _]
up   [ Item FixedU no Wall @|Wall no WallDecoU no WallDecoU5Next]->[Item @|Wall WallDecoU1 _]
right[ Item FixedR no Wall @|Wall no WallDecoR no WallDecoR5Next]->[Item @|Wall WallDecoR1 _]
down [ Item FixedD no Wall @|Wall no WallDecoD no WallDecoD5Next]->[Item @|Wall WallDecoD1 _]

[Fixed]->[]
[From]->[]




(Long legs)
(---------------------------------------------------)
(---------------------------------------------------)

(Remove orphan legs)
(---------------------------------------------------)
late left [no PlayerL|PlayerLegsL]->[|]     
late up   [no PlayerU|PlayerLegsU]->[|]     
late right[no PlayerR|PlayerLegsR]->[|]     
late down [no PlayerD|PlayerLegsD]->[|] 

(Rise Player)
(---------------------------------------------------)
[right PlayerL][M]->[right PlayerL NextLegsL][M]     
[down  PlayerU][M]->[down  PlayerU NextLegsU][M]     
[left  PlayerR][M]->[left  PlayerR NextLegsR][M]     
[up    PlayerD][M]->[up    PlayerD NextLegsD][M] 

late left [PlayerL |NextLegsL no Item][M]->[PlayerL|PlayerLegsL][M] 
late up   [PlayerU |NextLegsU no Item][M]->[PlayerU|PlayerLegsU][M] 
late right[PlayerR |NextLegsR no Item][M]->[PlayerR|PlayerLegsR][M] 
late down [PlayerD |NextLegsD no Item][M]->[PlayerD|PlayerLegsD][M] 

late left [no PlayerL |no PlayerL NextLegsL][M]->[|][M] 
late up   [no PlayerU |no PlayerU NextLegsU][M]->[|][M] 
late right[no PlayerR |no PlayerR NextLegsR][M]->[|][M] 
late down [no PlayerD |no PlayerD NextLegsD][M]->[|][M] 




(Specific Gravity)
(---------------------------------------------------)
(---------------------------------------------------)

(prevent conflicts)
[ToL ToXL]->[]
[ToU ToXU]->[]
[ToR ToXR]->[]
[ToD ToXD]->[]


(Rotate)
(---------------------------------------------------)
[CrateSimple ToL]->[CrateSimpleL ToL]
[CrateSimple ToU]->[CrateSimpleU ToU]
[CrateSimple ToR]->[CrateSimpleR ToR]
[CrateSimple ToD]->[CrateSimpleD ToD]

[Players no PlayerL ToL]->[PlayerL ToL ] sfx0
[Players no PlayerU ToU]->[PlayerU ToU ] sfx1
[Players no PlayerR ToR]->[PlayerR ToR ] sfx2
[Players no PlayerD ToD]->[PlayerD ToD ] sfx3

(prevent moving too quickly when rotating)
late [Item To no Quenched @]->[Item To Quench Quenched @]
late [Quenched no Item]->[]

(Initialise)
left [no ToL PodL]->[ToL PodL]
up   [no ToU PodU]->[ToU PodU]
right[no ToR PodR]->[ToR PodR]
down [no ToD PodD]->[ToD PodD]



(Capture movement direction)
(---------------------------------------------------)
[left  Players][M]->[left  Players ][M]
[up    Players][M]->[up    Players ][M]
[right Players][M]->[right Players ][M]
[down  Players][M]->[down  Players ][M]


(Checkpoint)
(---------------------------------------------------)
[Flash Saved]->[Flash _ no Save no Orb]
[_][Flash]->[_][]
[_]->[]
[& Save][$]->[& Save Saved][Flash0 $]
[$ Flash|no Flash no $ ]->[$ Flash| flash] (extend flash one unit outside $)


(Orb collecting)
(---------------------------------------------------)
[& Orb1 no NoSave][$]->[& Orb1 Saved GotOrb1][$ Flash1]
[& Orb2 no NoSave][$]->[& Orb2 Saved GotOrb2][$ Flash2]
[& Orb3 no NoSave][$]->[& Orb3 Saved GotOrb3][$ Flash3]
[& Orb4 no NoSave][$]->[& Orb4 Saved GotOrb4][$ Flash4]

[& Orb1]->[& GotOrb1 AllOrbs] sfx6
[& Orb2]->[& GotOrb2 AllOrbs] sfx6
[& Orb3]->[& GotOrb3 AllOrbs] sfx6
[& Orb4]->[& GotOrb4 AllOrbs] sfx6

(Are all orbs collected?)
[AllOrbs][Orb]->[][Orb]

(find first empty spot)
[_]->[]
right[= ConsL |=][GotOrb no =]->[= ConsL _|=][GotOrb]
right [_ = GotOrb|=][GotOrb no =]->[GotOrb =|_ =][GotOrb]
[GotOrb no =][= _]->[][= _ GotOrb]
[_]->[]






(Limit camera to within frames)
(---------------------------------------------------)
late [& no Player][Player no &]->[& Player][]


(Field of View & Console)
(---------------------------------------------------)
(---------------------------------------------------)


(Clear consoles & Attracts - fixed width)
(---------------------------------------------------)
late [ConsClear]->[]
late [$]->[]
(Place previous Centre)
(---------------------------------------------------)

(Draw Vertical)
(---------------------------------------------------)
(fixed height - centered)
late up [||||||||&| no $ |||||||]->[ $ _|$ ~ _|$ _|$ _|$ _|$ _|$ _|$ _|& $ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _ |$ _ =]

(fixed height - bottom of level area)
late up [|||||||&| no $ ||||||||]->[ $ _|$ ~ _|$ _|$ _|$ _|$ _|$ _|& $ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _ |$ _ =]
late up [||||||&| no $ |||||||||]->[ $ _|$ ~ _|$ _|$ _|$ _|$ _|& $ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _ |$ _ =]
late up [|||||&| no $ ||||||||||]->[ $ _|$ ~ _|$ _|$ _|$ _|& $ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _ |$ _ =]
late up [||||&| no $ |||||||||||]->[ $ _|$ ~ _|$ _|$ _|& $ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _ |$ _ =]
late up [|||&| no $ ||||||||||||]->[ $ _|$ ~ _|$ _|& $ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _ |$ _ =]
late up [||&| no $ |||||||||||||]->[ $ _|$ ~ _|& $ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _ |$ _ =]

(fixed height - top of level area)
late up [|||||||||&| no $ ||||||]->[ $ _|$ ~ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|& $ _|$ _|$ _|$ _|$ _|$ _|$ _ |$ _ =]
late up [||||||||||&| no $ |||||]->[ $ _|$ ~ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|& $ _|$ _|$ _|$ _|$ _|$ _ |$ _ =]
late up [|||||||||||&| no $ ||||]->[ $ _|$ ~ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|& $ _|$ _|$ _|$ _|$ _ |$ _ =]
late up [||||||||||||&| no $ |||]->[ $ _|$ ~ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|& $ _|$ _|$ _|$ _ |$ _ =]
late up [|||||||||||||&| no $ ||]->[ $ _|$ ~ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|& $ _|$ _|$ _ |$ _ =]
late up [||||||||||||||&| no $ |]->[ $ _|$ ~ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|$ _|& $ _|$ _ |$ _ =]
 

(Draw Horizontal)
(---------------------------------------------------)
(fixed width - centered)
late right [|||||||||||||||$ _|no $|||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]

(fixed width - left of level area)
late right [||||||||||||||$ _|no $||||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [|||||||||||||$ _|no $|||||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [||||||||||||$ _|no $||||||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [|||||||||||$ _|no $|||||||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [||||||||||$ _|no $||||||||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [|||||||||$ _|no $|||||||||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [||||||||$ _|no $||||||||||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [|||||||$ _|no $|||||||||||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [||||||$ _|no $||||||||||||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [|||||$ _|no $|||||||||||||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [||||$ _|no $||||||||||||||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [|||$ _|no $|||||||||||||||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [||$ _|no $||||||||||||||||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [|$ _|no $|||||||||||||||||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [$ _|no $||||||||||||||||||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
(fixed width - right of level area)
late right [|||||||||||||||$ _|no $|||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [||||||||||||||||$ _|no $||||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [|||||||||||||||||$ _|no $|||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [||||||||||||||||||$ _|no $||||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [|||||||||||||||||||$ _|no $|||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [||||||||||||||||||||$ _|no $||||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [|||||||||||||||||||||$ _|no $|||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [||||||||||||||||||||||$ _|no $||||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [|||||||||||||||||||||||$ _|no $|||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [||||||||||||||||||||||||$ _|no $||||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [|||||||||||||||||||||||||$ _|no $|||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [||||||||||||||||||||||||||$ _|no $||]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [|||||||||||||||||||||||||||$ _|no $|]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]
late right [||||||||||||||||||||||||||||$ _|no $]->[ConsL $|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$ ConsR]

late [_]->[]


(Spread Consoles)
(---------------------------------------------------)

late left[ConsR|...|=]->[ConsR = ¶|...|]

late horizontal [$ =|$ no =|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$|$]->[= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $|= $]


(Exception for unstable blocks)
(---------------------------------------------------)
late [InViewAlways]->[InViewAlways $]



(Align displayables within console)
(---------------------------------------------------)
(---------------------------------------------------)

late left [Displayable |= no Displayable]->[|= Displayable]
late up   [Displayable |= no Displayable]->[|= Displayable]
late right[Displayable |= no Displayable]->[|= Displayable]
late down [Displayable |= no Displayable]->[|= Displayable]



(Dialogue)
(---------------------------------------------------)
(---------------------------------------------------)

(Place intercom upon reading a story and follow player)
(---------------------------------------------------)
(place)
late [& Story no Intercom no StorySelector]->[& Story Intercom1]

(follow)
late [_]->[]
late [&]->[& _]

late random down  [ _ |][Intercom][PlayerL]->[|_][Intercom][PlayerL]
late random right [ _ |][Intercom][PlayerL]->[|_][Intercom][PlayerL]

late random left  [ _ |][Intercom][PlayerU]->[|_][Intercom][PlayerU]
late random down  [ _ |][Intercom][PlayerU]->[|_][Intercom][PlayerU]

late random up    [ _ |][Intercom][PlayerR]->[|_][Intercom][PlayerR]
late random left  [ _ |][Intercom][PlayerR]->[|_][Intercom][PlayerR]

late random right [ _ |][Intercom][PlayerD]->[|_][Intercom][PlayerD]
late random up    [ _ |][Intercom][PlayerD]->[|_][Intercom][PlayerD]


late [Intercom no _][_]->[][Intercom _]
late [_]->[]


late [IntercomOver]->[]
late [Intercom1 no IntercomL][PlayerL]->[Intercom1 IntercomL1][PlayerL]
late [Intercom2 no IntercomL][PlayerL]->[Intercom2 IntercomL2][PlayerL]
late [Intercom3 no IntercomL][PlayerL]->[Intercom3 IntercomL3][PlayerL]

late [Intercom1 no IntercomU][PlayerU]->[Intercom1 IntercomU1][PlayerU]
late [Intercom2 no IntercomU][PlayerU]->[Intercom2 IntercomU2][PlayerU]
late [Intercom3 no IntercomU][PlayerU]->[Intercom3 IntercomU3][PlayerU]

late [Intercom1 no IntercomR][PlayerR]->[Intercom1 IntercomR1][PlayerR]
late [Intercom2 no IntercomR][PlayerR]->[Intercom2 IntercomR2][PlayerR]
late [Intercom3 no IntercomR][PlayerR]->[Intercom3 IntercomR3][PlayerR]

late [Intercom1 no IntercomD][PlayerD]->[Intercom1 IntercomD1][PlayerD]
late [Intercom2 no IntercomD][PlayerD]->[Intercom2 IntercomD2][PlayerD]
late [Intercom3 no IntercomD][PlayerD]->[Intercom3 IntercomD3][PlayerD]



(Message selector)
(---------------------------------------------------)
(activate dialog)
late [& Story]->[& Story StorySelector1]

late right [Story | Story StorySelector1]-> [Story StorySelector1| Story ]
late right [Story StorySelector1| Story ]-> [Story StorySelector1| Story StorySelector2]



(Darkness)
(---------------------------------------------------)
(---------------------------------------------------)
(intiate FOV)
late [$ no Seen no Darkness]->[$ random Darkness]

late [&]->[& FOV0 Seen no Darkness]


[Wall no FOVHinder]->[Wall FOVHinder]

(propagate FOV)
late [$ FOV0|no FOV01 no Wall]->[$ FOV0|FOV1 Seen no Darkness]
late [$ FOV1|no FOV02 no FovHinder]->[$ FOV1|FOV2 Seen no Darkness]
late [$ FOV2|no FOV03 no FovHinder]->[$ FOV2|FOV3 Seen no Darkness]
late [$ FOV3|no FOV04 no FovHinder]->[$ FOV3|FOV4 Seen no Darkness]
late [$ FOV4|no FOV05 no FovHinder]->[$ FOV4|FOV5 Seen no Darkness]
late [$ FOV5|no FOV06 no FovHinder]->[$ FOV5|FOV6 Seen no Darkness]
late [$ FOV6|no FOV07 no FovHinder]->[$ FOV6|FOV7 Seen no Darkness]
late [$ FOV7|no FOV08 no FovHinder]->[$ FOV7|FOV8 Seen no Darkness]
late [$ FOV8|no FOV09 no FovHinder]->[$ FOV8|FOV9 Seen no Darkness]

(open new area suddenly)
late [$ Seen FOVHinder no Wall]->[$ Seen]

(exception: open block neighbourhood suddenly)
late [FOV | : no FOV ]->[FOV |: FOV Seen no Darkness]
late [no FOV no FovHinder| : FOV]->[FOV Seen no Darkness |: FOV]


(show wall borders)
late [$ Wall Darkness no FixBorder|FOV]->[$ Wall Seen FixBorder|FOV]
late [$ Wall FixBorder|Wall no UnFixBorder]->[$ Wall FixBorder|Wall Seen UnFixBorder no Darkness]


(light wins against darkness)
late [$ Light]->[$ Light Seen no Darkness]


(Wall borders)
(---------------------------------------------------)

(basic)
late left  [Wall no BorderL|no Wall ]-> [Wall BorderL|]
late up    [Wall no BorderU|no Wall ]-> [Wall BorderU|]
late right [Wall no BorderR|no Wall ]-> [Wall BorderR|]
late down  [Wall no BorderD|no Wall ]-> [Wall BorderD|]

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
 
(Win)
(---------------------------------------------------)
(---------------------------------------------------)
(move on with story, e.g. in starting animation)
[WinSignal]-> win
 
(win also when all orbs are collected and message)
[AllOrbs][WinSignal]->[][WinSignal]
[AllOrbs]->[WinSignal]
  
(Perturb game map)
[WallToRemove3|Wall no StartGame][PostWin]->[WallToRemove3|Wall StartGame][PostWin]

(Removable walls)
[»][PostWin][@ WallToRemove .] ->[»][PostWin][@ WallToRemove]
[»][PostWin][@ WallToRemove3 no .]->[»][PostWin][@ no Wall no border no boX no WallOver no LightOver .]
[»][PostWin][@ WallToRemove2 no .]->[»][PostWin][@ WallToRemove3 .]
[»][PostWin][@ WallToRemove1 no .]->[»][PostWin][@ WallToRemove2 .]


==============
WINCONDITIONS
==============

=======     
LEVELS
=======

message "Why return to the Gravirinth?"
message "This time it will be different..."

message Antechamber 1
message "Baby steps"
##############################
##############################
##############################
#######....###################
#######..P.###################
#######.######################
####.......###################
####..###..###################
###*..#..................#####
####..o...................*.##
####..###.###...##..×.......##
#########.###o..###.××..##..##
###################o×.OOO...##
###################o..########
##############################
##############################
##############################
##############################

message Antechamber 2
message "Odd gravitic signatures"
##############################
##############################
##############################
##############################
##############################
##########......##############
#########....ó...#############
########..........############
########..........############
#######*.....§....*###########
########..........############
########..........############
########.P..é...o.############
##########......##############
##############################
##############################
##############################
##############################
##############################

message Antechamber 3
message "Side-throw"
##############################
##############################
##############################
##############################
#############...##############
#############...##############
#############¤.¤##############
############...*##############
###########..í.¤##############
##########..§.....############
#########í.....¤..############
#########¤........############
#########..P..é.##############
#########o####################
##############################
##############################
##############################
##############################

message Antechamber 4
message "Unstable gravity fields"
##############################
##############################
##############################
##############################
##############################
##############################
##############################
##########P....###############
###########¤.§Oóá#############
###########¤:a¤¤.#############
############e¤¤¤.#############
############.*¤¤é#############
############.....#############
##############################
##############################
##############################
##############################
##############################
##############################


message Chamber 5
message "Spring bridge"
##############################
##############################
##############################
##############################
##############################
##############################
##############################
###########.........##########
###########....§..#.##########
###########.iio...#*##########
###############...#.##########
################P...##########
##############################
##############################
##############################
##############################
##############################
##############################
##############################

message Chamber 6
message "Contrarieties"
##############################
##############################
##############################
##############################
##############################
##############################
##############################
##############################
##############################
###########Pó.§.*#############
############....##############
############ooá.##############
############ooá.##############
##############################
##############################
##############################
##############################
##############################
##############################

message Chamber 7
message "Petals"
##############################
##############################
##############################
##############################
##############################
############...*##############
###########.....##############
##########......##############
#########*..§...##############
##########..oa..##############
##########..ie..##############
##########P.....##############
##############################
##############################
##############################
##############################
##############################
##############################
##############################

message Chamber 8
message "Apex"
##############################
##############################
##############################
##############################
##############################
###############*##############
##############...#############
#############.....############
############.§.....###########
###########io.......##########
##########..io.P.....#########
##############################
##############################
##############################
##############################
##############################
##############################

message Chamber 9
message "Levitate"
##############################
##############################
#############eeó##############
#############...##############
#############...##############
#############...*#############
############*...##############
#############...##############
############....##############
############.ó..##############
############...###############
###########P.§.###############
############...###############
############...###############
############éoo###############
##############################
##############################
##############################
##############################

message Chamber 10
message "Sieve"
##############################
##############################
##############################
##############################
##############################
##############################
############..*..#############
############.....#############
############..§...############
############a¤a¤a#############
############.....#############
############a#a#a#############
############.....P############
##############################
##############################
##############################
##############################
##############################
##############################

message Chamber 11
message "Infinity"
##############################
##############################
##############################
##############################
##############################
##############################
#########...........##########
#########...oó...ó..##########
########í.í¤¤¤í¤¤¤..á#########
#######Pá..¤¤¤§¤¤¤..í*########
########í..¤¤¤á¤¤¤á.á#########
#########..é...ée...##########
#########...........##########
##############################
##############################
##############################
##############################
##############################
##############################


message Chamber 12
message "You shall not pass"
##############################
##############################
##############################
##############################
##############################
#############P..*#############
##############..##############
##############..##############
##############..##############
##############.§##############
##############..##############
##############oa##############
##############ee##############
##############..##############
##############..##############
##############..##############
##############..##############
##############‡‡##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##############
##############..##.....#######
##############..#...*...######
##############...‡.###...#####
##############################
##############################

message Chamber 13
message "In circles"
##############################
##############################
##############################
##############*###############
#########...........##########
#########....ó.ó....##########
#########.í#í#.#á#á.##########
########*..é..P..ó..##########
#########.í#.¤¤¤.#..##########
#########..ó.¤£¤.é..##########
#########..#.¤¤¤.#á.##########
#########..é..e..ó..*#########
#########.í#í#.#á#á.##########
#########....é.é....##########
#########...........##########
##############*###############
##############################
##############################
##############################

message Chamber 14
message "Hourglass"
##############################
##############################
#############.o.##############
#############.e.##############
#############.e.##############
#############¤§¤##############
############.....#############
############...óá#############
############...á.#############
###########*.é...#############
###########*/ó///#############
############...á.#############
############...éá#############
############P....#############
#############¤§¤##############
#############.o.##############
#############.o.##############
#############.e.##############
##############################
##############################

message Chamber 15
message "Orthogonal"
##############################
##############################
##############################
##############################
##############################
##############################
##############################
############꙳aa.##############
############e...##############
############e.ó###############
############49£..P############
#############...##############
##############á###############
##############################
##############################
##############################
##############################
##############################
##############################

message Chamber 16
message "Vortex"
##############################
##############################
##############################
##############################
#########×..e.....ó###########
#########í..ó.......##########
#########......ó....##########
#########.........á.##########
#########..í........##########
#########.....⋆.....##########
#########........á..##########
#########.í.........##########
#########....é......##########
#########.......é..á##########
##########é.....P..###########
##############################
##############################
##############################
##############################

message Chamber 17
message "Alternate ways"
##############################
##############################
##############################
##############################
##############################
###############.##############
############ó.....############
############í......###########
############é...⋆..###########
############é......P##########
#############a.....###########
#############.o....###########
###############ííéá###########
##############################
##############################
##############################
##############################
##############################
##############################

message Chamber 18
message "Zigzags"
##############################
##############################
##############################
##############################
##############################
##############*###############
#######P.............#########
########.....ó.....ó.#########
########..áí....áí...#########
########......§93....#########
########íé..á.íé..á.í#########
########.íé....íé....#########
########.............#########
########o....o....o..#########
##############################
##############################
##############################
##############################
##############################

message Chamber 19
message "Caroussel"
##############################
##############################
##############################
##############################
##############################
##############################
##############################
############.....o.###########
############i#ííí#.###########
############.é...ó.###########
############.é.⋆.ó.###########
############.é...ó.###########
############.#ááá#a###########
############.e.P...###########
##############################
##############################
##############################
##############################
##############################


message Chamber 20
message "Deep dive"
##############################
##############################
##############################
########......e......#########
########.............#########
########ó.ó.......ó.ó#########
########í.á.......í.á#########
########.ó....P....ó.#########
########...ó..§..ó...#########
########í.....é.....á#########
########.éí...o...áé.#########
########.á....¤....í.#########
#######í//////ó//////á########
#######*.....é£é.....*########
#########¤...á*í...###########
##########é.......é###########
##############################
##############################
##############################


message Chamber 21
message "Precisely"
##############################
##############################
##############################
######...#####################
######.*............##########
######...............#########
######......P¤aaa....#########
######......oo.......#########
#########..¤¤£¤¤¤¤...#########
#########............#########
#########............#########
#########............#########
#########............#########
##############################
##############################
##############################
##############################
##############################
##############################

message Chamber 22
message "Double twist"
##############################
##############################
##############################
##############################
##############################
##############################
##############################
##########*...ó.##############
############¤í¤á##############
###########.ó.o.ó.############
###########í¤£:¤¤á############
###########.é.e.é.############
#############í¤á¤#############
#############.é48‡P###########
##############################
##############################
##############################
##############################
##############################



message Chamber 23
message "Brakes"
##############################
##############################
##############################
##############################
##############################
##############################
##############################
##############################
##########áé.ioa....##########
##########.¤¤¤¤¤....##########
##########.é.iea....##########
##########.¤¤¤¤£....##########
##########.é.iea....##########
##########P¤¤¤¤¤....*#########
##############################
##############################
##############################
##############################
##############################

message Chamber 24
message "Clockwork"
##############################
##############################
##############################
##############################
##############íoó#############
##############.¤.#############
#########...¤¤.....ó##########
#########*..í..£¤.¤a##########
############i¤.¤¤..á...#######
############é.....¤¤..P#######
###############.¤.############
###############éeá############
##############################
##############################
##############################
##############################
##############################
##############################
##############################



message Chamber 25
message "Unplugged"
##############################
##############################
##############################
##############################
##############################
########.*.###################
########¤.¤###################
########io....ó..óá###########
########¤:¤¤£¤¤¤¤..###########
########.e..ioa.¤.é###########
########¤¤...¤..¤.P###########
########....iea...¤###########
##############################
##############################
##############################
##############################
##############################
##############################
##############################


message Chamber 26
message "Opposites"
##############################
##############################
##############################
################Pí############
###############..#############
###############o##############
##############.eo#############
############....e.############
############*#...#############
###############§##############
##############.ia#############
#############...ia############
##############...#############
###############.##############
##############################
##############################
##############################
##############################
##############################


message Chamber 27
message "Platforms, doors and elevators"
##############################
##############################
######...#####.../......######
#####..*..###..¤¤#¤¤*...######
#####.¤¤¤.....¤¤¤*¤¤¤#o§######
######¤¤¤¤.§.¤¤¤¤.¤¤¤¤¤.######
######¤¤¤¤...¤¤¤¤...¤¤¤.######
########¤.....¤¤¤.../...######
#######P....../.....##.i######
#########.....###.§.###e######
##########ioa####...##########
################io..oa########
#################e..o#########
#################e¤¤o#########
#################eaaa#########
####################.#########
####################.#########
####################.#########
##############################
##############################


message Chamber 28
message "Gravirinth Core"
#####################################
#####################################
#####################################
#####################################
#####################################
#####################################
#####################################
#####################################
#####################################
###########/...........P./###########
###########í/.....§...ó#/.###########
###########..##.......###.###########
###########..###....o###..###########
###########...#×××.×××#í..###########
###########..19×*#ò#*×a..á###########
###########....×#####×....###########
###########.§...ì###à...§.###########
###########...i×#####×....###########
###########....×*#è#*×....###########
###########..í#×××.×××#...###########
###########..###e....###..###########
###########.###.......###.###########
###########./#é...§....#/.###########
###########/............./###########
#####################################
#####################################
#####################################
#####################################
#####################################
#####################################
#####################################
#####################################
#####################################

message -_-_-_- Congratulations! -_-_-_-
message For unlocking the mysteries of...
message -_-_-_-_-_  Gravirinth  _-_-_-_-_-                                  -_-_ by Pedro PSI (2018-2020) _-_-
message - Music (CC-BY) by: Stellardrone -                            ---  Eternity  ------------------- ---  Comet Halley  --------------- ---  Billions and billions  ------ ---  Twilight  ------------------- ---  Between the Rings  ----------
`