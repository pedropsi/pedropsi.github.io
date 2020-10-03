HyperText("HyperStarBattle",function(){return `

<canvas id="canvas" oncontextmenu="event.preventDefault()"></canvas>

<progress value="0" max="0" id="progress" hidden=""></progress>
<div class="emscripten" id="status"></div>

<center>
  <input type="file" id="fileElem" multiple="" accept="*" style="display:none">
  <input type="button" value="enable fullscreen" onclick="Module.requestFullscreen(false, false)">
  <input type="button" value="show/hide console" onclick="
  showconsole = !showconsole;
  var element = document.getElementById('output');
  if(showconsole) element.style = '';
  else element.style = 'display:none';">
</center>    	  

`})
