$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });
  $('.canvas-switch').click(function () {
    $('.offcanvas').offcanvas('toggle')
  });
});

