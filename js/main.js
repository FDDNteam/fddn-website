var num = 2000;
var range = 100;
var ax = [];
var ay = [];

function myRand(a, b) {
    return Math.abs (Math.sin (a * 314.3 + b * 12837.91 + 1313.171))
}

function getLen(a, b) {
    return Math.sqrt (a*a + b*b)
}

var t = 0, count = 0
function setup() {
  createCanvas(1000, 1000, WEBGL);
  background(255);
  ax[0] = 0
  ay[0] = 0
}

function dfs(layer, x, y) {
    ++count
    console.log (layer, x, y)
    if (layer >= 8) return
    var k = (8 - layer) / 2
    console.log (noise(x, y))
    for (var i = 0; i < k; ++i) {
        var randX = (noise(count, i + t) - 0.5) * range * (layer/2 + 1)
        var randY = (noise(i + t, count) - 0.5) * range * (layer/2 + 1)
        var randLen = getLen(randX, randY)
        var len = getLen(x, y)

        if (len) {
            randX = x * randLen / len * 0.4 + randX * 0.6
            randY = y * randLen / len * 0.4 + randY * 0.6
        }

        var newX = x + randX
        var newY = y + randY
        strokeWeight(4 - layer / 2);
        stroke (50, 60, 80, 0.8 - layer / 10)
        line (x, y, newX, newY)
        dfs (layer+1, newX, newY)
    }
}

function draw() {
    background(255);
    t = Date.now () / 400000
    count = 0
    dfs(0, 0, 0)

/*
  // Shift all elements 1 place to the left
  for ( var i = 1; i < num; i++ ) {
    ax[i - 1] = ax[i];
    ay[i - 1] = ay[i];
  }

  // Put a new value at the end of the array
  ax[num - 1] += random(-range, range);
  ay[num - 1] += random(-range, range);

  // Constrain all points to the screen
  ax[num - 1] = constrain(ax[num - 1], 0, width);
  ay[num - 1] = constrain(ay[num - 1], 0, height);

//  rotateY (Date.now())

  // Draw a line connecting the points
  for ( var j = 1; j < num; j++ ) {
      for (var i = Math.max (j-10, 1); i < j; ++i) {
          stroke (255)
          line (ax[i], ay[i], ax[j], ay[j])
      }
  }
  */

}
