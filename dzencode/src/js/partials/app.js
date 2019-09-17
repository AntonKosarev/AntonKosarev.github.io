//плавный переход по якорям
$(document).ready(function() {
var menu = $('.menu a[href^="#"]');
//слайдер
  $('.slider').bxSlider({
    pager: false,
    nextText: '<span></span>',
    prevText: '<span></span>',
  });
  $('.slider_items').bxSlider({
    pager: true,
    nextText: '<span></span>',
    prevText: '<span></span>',

  });
  //Плавный скролл по странице
  $('a[href*="#"]').on('click', function (e) {
    e.preventDefault();

    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 500, 'linear');
  });

});
