// Hero motion: scattered dots gather into an upward-trending scatter plot,
// then a coral trend line draws across. Replays whenever the hero leaves the
// screen completely and comes back (scrolling back up, or returning from a project page).
(function () {
  function init() {
    var canvas = document.getElementById("hero-canvas");
    if (!canvas || canvas.dataset.ready) return;
    canvas.dataset.ready = "1";
    var ctx = canvas.getContext("2d");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var CORAL = "232, 69, 44";
    var INK = "26, 29, 36";
    var W = 0, H = 0, dpr, dots = [], start = null, running = false, visible = false;

    function rand(a, b) { return a + Math.random() * (b - a); }
    function gauss() { var u = 1 - Math.random(), v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

    // Trend line; on narrow screens it sits lower and flatter, away from the copy
    function lineY(x) {
      var base = W < 700 ? H * 0.99 : H * 0.86;
      var rise = W < 700 ? Math.min(H * 0.3, W * 0.55) : H * 0.7;
      return base - (x / W) * rise;
    }

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      var r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Build dots; keep existing ones on resize so the animation doesn't jump
    function build(reshuffle) {
      var n = W < 700 ? 70 : 150;
      if (dots.length !== n) {
        dots = [];
        for (var i = 0; i < n; i++) dots.push({ r: rand(1.6, 3.2), coral: Math.random() < 0.1, ph: rand(0, 6.28), delay: rand(0, 0.35), u: Math.random(), e: gauss() });
        reshuffle = true;
      }
      for (var j = 0; j < dots.length; j++) {
        var d = dots[j];
        if (reshuffle) { d.sx = rand(0, W); d.sy = rand(0, H); }
        d.tx = W * 0.04 + d.u * W * 0.92;
        d.ty = lineY(d.tx) + d.e * H * 0.07;
      }
    }

    function draw(ts) {
      if (start === null) start = ts;
      var t = (ts - start) / 1000;
      ctx.clearRect(0, 0, W, H);

      // 1) dots: drift (0–0.8s), gather (0.8–2.6s), then gentle float
      var amp = reduce ? 0 : 2.2;
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        var k = ease(Math.min(Math.max((t - 0.8 - d.delay) / 1.8, 0), 1));
        var x = d.sx + (d.tx - d.sx) * k + Math.sin(t * 0.8 + d.ph) * amp;
        var y = d.sy + (d.ty - d.sy) * k + Math.cos(t * 0.7 + d.ph) * amp;
        ctx.beginPath();
        ctx.arc(x, y, d.coral ? d.r + 0.6 : d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.coral ? "rgba(" + CORAL + ",0.85)" : "rgba(" + INK + ",0.16)";
        ctx.fill();
      }

      // 2) trend line draws left → right (2.6–4.0s)
      var p = Math.min(Math.max((t - 2.6) / 1.4, 0), 1);
      if (p > 0) {
        var x0 = W * 0.04, xe = x0 + W * 0.92 * ease(p);
        ctx.beginPath(); ctx.moveTo(x0, lineY(x0)); ctx.lineTo(xe, lineY(xe));
        ctx.strokeStyle = "rgba(" + CORAL + ",0.7)"; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(xe, lineY(xe), 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + CORAL + ",1)"; ctx.fill();
      }

      // 3) soften the area behind the text so copy stays readable
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.translate(W / 2, H * 0.55); ctx.scale(1, 0.55);
      var rad = Math.min(W * 0.36, 520);
      var grd = ctx.createRadialGradient(0, 0, rad * 0.25, 0, 0, rad);
      grd.addColorStop(0, "rgba(0,0,0,0.88)"); grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(0, 0, rad, 0, Math.PI * 2); ctx.fill();
      ctx.restore();

      // keep animating while visible (reduced-motion: stop once the intro finishes)
      if (visible && (!reduce || t < 4.5)) requestAnimationFrame(draw);
      else running = false;
    }

    function play() {
      size(); build(true); start = null;
      if (!running) { running = true; requestAnimationFrame(draw); }
    }
    function resume() { if (!running) { running = true; requestAnimationFrame(draw); } }

    var everLeft = true; // first appearance counts as "coming back"
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            visible = true;
            if (everLeft) { everLeft = false; play(); } else resume();
          } else if (e.intersectionRatio === 0) {
            visible = false; everLeft = true; // fully off screen → replay next time
          }
        });
      }, { threshold: [0, 0.3] }).observe(canvas);
    } else { visible = true; play(); }

    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () { size(); build(false); if (visible) resume(); }, 150);
    });
  }

  window.initHeroMotion = init;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
