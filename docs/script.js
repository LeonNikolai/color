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

// Store value in other inputs with same class, and a css root variable.
// Stoggles focus class
$(".hue").hover(function(){
  $("*").find(".hue").toggleClass('focus');
});

$(".hue").on("input", function() {
  $(".hue").val(this.value);
  $(".hue[type=number]").val(Math.round(this.value));
  $("body").get(0).style.setProperty("--hue", this.value);
  // Store value in url
  var hi = $("body").css("--hue");
  window.location.hash = "hue:" + hi;
});

$(".lightness").on("input", function() {
  $(".lightness").val(this.value);
  $(".lightness[type=number]").val(Math.round(this.value));
  $("body").get(0).style.setProperty("--lightness", this.value + "%");
});

$(".saturation").on("input", function() {
  $(".saturation").val(this.value);
  $(".saturation[type=number]").val(Math.round(this.value));
  $("body").get(0).style.setProperty("--saturation", this.value + "%");
});

$(".green").on("input", function() {
  $(".green").val(this.value);
  $(".green[type=number]").val(Math.round(this.value));
  $("body").get(0).style.setProperty("--green", this.value);
});

$(".red").on("input", function() {
  $(".red").val(this.value);
  $(".red[type=number]").val(Math.round(this.value));
  $("body").get(0).style.setProperty("--red", this.value);
});

$(".blue").on("input", function() {
  $(".blue").val(this.value);
  $(".blue[type=number]").val(Math.round(this.value));
  $("body").get(0).style.setProperty("--blue", this.value);
});




$(fn.minfunction = function (myclass, nrextention) {
  $("." + myclass).get(0).style.setProperty("--" + myclass + nrextention, this.value);
  $("." + myclass + "[type=number]").val(Math.round(this.value));
  $("." + myclass).val(this.value);
});

$(".hue").on("input", this, minfunction("hue", ""));
$(".red").on("input", this, minfunction("red", "%"));