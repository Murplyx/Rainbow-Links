/*
  rainbowlinks.js by Michele
  
  This is a JavaScript library for rainbow links.
  
  When you hover any link (<a>) on the page it
  shifts the hue of the link's color, but it keeps
  the saturation and lightness. This way you can
  initialize the link with any color!
  
  The library is written so that it is as
  optimized as possible and uses as few operations
  as possible.
*/

(function() {
  "use strict";
  
  var link = null;
  addEventListener("mouseover", function(e) { // Find the current hovered link
    if (e.target.tagName == "A")
      link = e.target;
  });
  addEventListener("mouseout", function(e) { // If the current link is exited, do link = null
    if (link == e.target)
      link = null;
  });
  
  var m = (function() { // Generate hue rotation matrix, see http://stackoverflow.com/a/8510751/2378102
    var rad = 20 * Math.PI / 180; // 20 is the speed, degrees per frame, change this as you want
    
    var a = Math.cos(rad);
    var b = (1 - a) / 3;
    var c = Math.sqrt(1 / 3) * Math.sin(rad);
    
    return [a + b, b - c, b + c];
  })();
  
  function clamp(c) { // Clamp to 0 - 255 and round
    return Math.round(Math.min(Math.max(c, 0), 255));
  }
  
  setInterval(function() {
    if (!link) return;
    
    var rgb = getComputedStyle(link).color.split("(")[1].slice(0, -1).split(","); // Cut out the RGB components
    
    var r = +rgb[0], g = +rgb[1], b = +rgb[2];
    
    // Multiply with hue rotation matrix
    link.style.color = "rgba(" + [
      clamp(r * m[0] + g * m[1] + b * m[2]),
      clamp(r * m[2] + g * m[0] + b * m[1]),
      clamp(r * m[1] + g * m[2] + b * m[0]),
      (rgb.length > 3 ? +rgb[3] : 1)
    ].join(", ") + ")";
  }, 50); // Update with 50ms = 20fps
})();
