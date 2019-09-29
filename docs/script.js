//mouse scroll over a input tag increases/decreasethes its value by 1% of its max value
$("input").bind("mousewheel", function(event, delta) {
  if (event.originalEvent.wheelDelta >= 0) {
      this.value = parseInt(this.value) - ((this.max) / 100);
      $(this).trigger("input");
  } else {
          this.value = parseInt(this.value) + ((this.max) / 100);
          $(this).trigger("input");
  }
  return false;
});

$( document ).ready(function() {
  var hi = window.location.hash - "hue:"
  console.log( window.location.hash);
});


// Store value in other inputs with same class, and a css root variable.
// Stoggles focus class
$(".hue").hover(function(){
  $("*").find(".hue").toggleClass('focus');
});

$(".lightness").on("input", function() {
  minfunction(".lightness", "lightness", this.value, "%");
});

$(".saturation").on("input", function() {
  minfunction(".saturation", "saturation", this.value, "%");
});

$(".hue").on("input", function() {
  minfunction(".hue", "hue", this.value);
});
$(".red").on("input", function() {
  minfunction(".red", "red", this.value);
});
$(".green").on("input", function() {
  minfunction(".green", "green", this.value);
});
$(".blue").on("input", function() {
  minfunction(".blue", "blue", this.value);
});

var minfunction = function(selector, property, value, suffix ) {
  _this = $(selector); 
  if(typeof suffix === 'undefined' ){
    suffix = ''
  }
  // if'en under gjør det slik at vi kun får elementet med [type=number]
  if(_this.is("[type=number]")){
    _this.val(Math.round(value));
  }
  $("body").get(0).style.setProperty("--" + property, value + suffix);
  window.location.hash = property + value + suffix;
}