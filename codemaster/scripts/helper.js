/* canvas helper draw methods */
const TOP_LEFT = 0;
const CENTER = 1;

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
    ctx.strokeStyle = s;
    ctx.stroke();
  }
}
