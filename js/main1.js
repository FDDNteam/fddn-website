var N = 10;
var Width = 1000;
var Height = 500;

var random = function(x, y) { return Math.random() * (y-x) + x; };

(function() {
    var canvas = document.getElementById('canvas');
    canvas.width = Width;
    canvas.height = Height;
    canvas.style.background = '#ffffff';
    var ctx = canvas.getContext('2d');
    var particles = new Array(N).fill(0).map(() => newParticle());

    particles.forEach (function(p, i) {
        
    });

    function newParticle(p) {
        p = p || {}
        p.x = random(0, Width);
        p.y = random(0, Height);
        p.v = [random(-1, 1), random(-1, 1)];

        return p;
    }
})();
