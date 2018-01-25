// initialize drawing boolean and coordinates
let canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

// defaulted color (x) and stroke width (y)
let x = 'black',
    y = 2;

// initialize canvas and mouse events
function init() {
  canvas = document.getElementById('canvas_area');
  ctx = canvas.getContext('2d');
  w = canvas.width;
  h = canvas.height;

  canvas.addEventListener('mousemove', function(e) {
    findxy('move', e)
  }, false);
  canvas.addEventListener('mousedown', function(e) {
    findxy('down', e)
  }, false);
  canvas.addEventListener('mouseup', function(e) {
    findxy('up', e)
  }, false);
  canvas.addEventListener('mouseout', function(e) {
    findxy('out', e)
  }, false);
}

// change brush color on palette click events
function color(obj) {
  x = obj.id
  if (x == 'white') {
    y = 14;
  } else {
    y = 2;
  }
}

// handles canvas draw functionality and brush parameters
function draw() {
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.strokeStyle = x;
  ctx.lineWidth = y;
  ctx.stroke();
  ctx.closePath();
}

// clears the current canvas, prompts user with a message before firing
function erase() {
  let m = confirm('Clear current canvas?');
  if (m) {
    ctx.clearRect(0, 0, w, h);
    document.getElementById('save_target').style.display = 'none';
  }
}

/*  temporary save feature, returns a data URI containing a representation
    of the image in PNG format and renders it on the page next to canvas.  */
function save() {
  document.getElementById('save_target').style.border = '2px solid';
  let dataURL = canvas.toDataURL();
  document.getElementById('save_target').src = dataURL;
  document.getElementById('save_target').style.display = 'inline';
}

/*  the big kahuna burger function uses draw helper method
    to handle coordinate tracking and selected color rendering.  */
function findxy(res, e) {
  if (res == 'down') {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;

    flag = true;
    dot_flag = true;
    if (dot_flag) {
      ctx.beginPath();
      ctx.fillStyle = x;
      ctx.fillRect(currX, currY, 2, 2);
      ctx.closePath();
      dot_flag = false;
    }
  }

  if (res == 'up' || res == 'out') {
    flag = false;
  }

  if (res == 'move') {
    if (flag) {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - canvas.offsetLeft;
      currY = e.clientY - canvas.offsetTop;
      draw();
    }
  }
}
