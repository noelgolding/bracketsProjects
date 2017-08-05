/* canvas helper draw methods */
const TOP_LEFT = 0;
const CENTER = 1;


function sqr(a) {
  return a * a;
}

function findYgivenXHKA(x, h, k, a){
  let y = a * sqr(x - h) - k;
  return y;
}

function findAgivenXYHK(x, y, h, k){
  let a = (y + k) / sqr(x-h);
  return a;
}


function scaleCanvas(canvas) {
  var aspect_ratio = canvas.width/canvas.height;
  var win_width = window.innerWidth;
  var win_height = window.innerHeight;
  var win_ratio = win_width/win_height;

  if (win_ratio > aspect_ratio) {
     canvas.style.width = (canvas.width * win_height/canvas.height)+'px';
     canvas.style.height = win_height+'px';
  } else {
     canvas.style.width = win_width+'px';
     canvas.style.height = (canvas.height * win_width/canvas.width)+'px';
  }
}

function loadImage(onLoadHandler){
  var img = new Image();
  img.addEventListener("load", onLoadHandler);
  img.addEventListener("error", (e) => console.log(e));
  img.src = currentLevel.map.image;
  return img;
}

function drawRect(ctx, x, y, w, h, s, f, anchor=TOP_LEFT){
  if (anchor === CENTER) {
    x = x + w/2;
    y = y + h/2;
  }

  if (f) {
    ctx.fillStyle = f;
    ctx.fillRect(x, y, w, h);
  }
  if (s) {
    ctx.strokeStyle = s;
    ctx.strokeRect(x, y, w, h);
  }
}

function drawCircle(ctx, x, y, r, s, f) {
  // console.log("drawCircle", x, y, r, s, f);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2*Math.PI);
  if (f) {
    ctx.fillStyle = f;
    ctx.fill();
  }
  if (s) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = s;
    ctx.stroke();
  }
}
