(function() {
  "use strict";
  
  var link = null;
  addEventListener("mouseover", function(e) {
    if (e.target.tagName == "A")
      link = e.target;
  });
  addEventListener("mouseout", function(e) {
    if (link == e.target)
      link = null;
  });
  
  var m = (function() {
    var rad = 20 * Math.PI / 180;
    
    var a = Math.cos(rad);
    var b = (1 - a) / 3;
    var c = Math.sqrt(1 / 3) * Math.sin(rad);
    
    return [a + b, b - c, b + c];
  })();
  
  function clamp(c) {
    return Math.round(Math.min(Math.max(c, 0), 360));
  }
  
  setInterval(function() {
    if (!link) return;
    
    var rgb = getComputedStyle(link).color.split("(")[1].slice(0, -1).split(",");
    
    var r = +rgb[0], g = +rgb[1], b = +rgb[2];

    link.style.color = "rgba(" +
      clamp(r * m[0] + g * m[1] + b * m[2]) + ", " +
      clamp(r * m[2] + g * m[0] + b * m[1]) + ", " +
      clamp(r * m[1] + g * m[2] + b * m[0]) + ", " +
      (rgb.length > 3 ? +rgb[3] : 1) + ")";
  }, 50);
})();
