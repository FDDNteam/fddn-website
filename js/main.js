var num = 2000
var range = 100
var ax = []
var ay = []
var t = 0, count = 0

function getLen(a, b) {
    return Math.sqrt (a*a + b*b)
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
        strokeWeight(3 - layer / 2.7);
        stroke (50, 60, 80, 0.8 - layer / 10)
        line (x, y, newX, newY)
        dfs (layer+1, newX, newY)
    }
}

var posX = new Array()
var posY = new Array()
var posZ = new Array()
var posW = new Array()
var N = 20, M = 4
var noiseScale = 100

function setup() {
    createCanvas(1000, 700, WEBGL);
    for (var i = 0; i < N; ++i) {
        posX.push (new Array())
        posY.push (new Array())
        posZ.push (new Array())
        posW.push (new Array())
        for (var j = 0; j < N; ++j) {
            posX[i].push (new Array())
            posY[i].push (new Array())
            posZ[i].push (new Array())
            posW[i].push (new Array())
            for (var k = 0; k < M; ++k) {
                posX[i][j].push (i)
                posY[i][j].push (j)
                posZ[i][j].push (k)
                if (abs(i-N/2) + abs(j-N/2) >= 15)
                    posW[i][j].push (false)
                else
                    posW[i][j].push (true)
            }
        }
    }
}

function draw() {
    background(255)
    t = Date.now() / 2000

    for (var i = 0; i < N; ++i) {
        for (var j = 0; j < N; ++j)
            for (var k = 0; k < M; ++k) {
                posX[i][j][k] = (i - N/2) / N * width * max(Math.abs(i-N/2), Math.abs(j-N/2))
                * (sin(t/5 + k)/2 + 0.7) * 0.1
                + (noise(i + 17.7, j + 11.1 * k, t * noise(i, j)) - 0.5) * noiseScale
                //+ (noise (i, j) - 0.5) * (Math.abs(i-N/2) + Math.abs(j-N/2)) / 4
                posY[i][j][k] = (j - N/2) / N * width * max(Math.abs(i-N/2), Math.abs(j-N/2))
                * (sin(t/5 + k)/2 + 0.7)* 0.1
                + (noise(j + 16.3, i + 33.1 * k, t * noise(j, i)) - 0.5) * noiseScale
                //+ (noise (j, i) - 0.5) * (Math.abs(i-N/2) + Math.abs(j-N/2)) / 4
        }
    }

//    rotateY (-PI/12)
//    rotateX (-PI/12)
    noFill()
    stroke(50, 60, 100, 0.5)

    for (var k = 0; k < M; ++k) {
        var sizeNow = sin(t/5 + k)/2 + 0.5
        var gray = color(255, 255, 255)
        gray.setAlpha (0.2)
        var blue = color(50, 60, 100)
        stroke(lerpColor(blue, gray, sizeNow))

        rotateZ(noise(k, t / 10) * 4)
        for (var i = -N+1; i < N; ++i) {
            strokeWeight(noise(i) + 0.4)
            beginShape()
            for (var j = Math.max(0, -i); (i+j) < N && j < N; ++j) {
                if (posW[j][i+j][k] == false) continue
                vertex (
                     posX[j][i+j][k] + sin(t/10 - k) * 200,
                     posY[j][i+j][k] + cos(t/10 - k) * 200,
                     0)
            }
            endShape()
        }
        for (var i = -N+1; i < N; ++i) {
            strokeWeight(noise(i) + 0.4)
            beginShape()
            for (var j = Math.max(0, -i); (i+j) < N && j < N; ++j) {
                if (posW[N-j-1][i+j][k] == false) continue
                vertex (
                    posX[N-j-1][i+j][k] + sin(t/10 - k) * 200,
                    posY[N-j-1][i+j][k] + cos(t/10 - k) * 200,
                    0)
            }
            endShape()
        }
        rotateZ(-noise(k, t / 10) * 4)
    }

}
