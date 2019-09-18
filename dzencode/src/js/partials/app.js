//плавный переход по якорям
$(document).ready(function() {
  var menu = $('.menu a[href^="#"]');
  //слайдер
  $('.slider').bxSlider({
    pager: false,
    nextText: '<span></span>',
    prevText: '<span></span>',
  });
  $('.slider_trainers').bxSlider({
    pager: false,
    nextText: '<span></span>',
    prevText: '<span></span>',

  });
  //Плавный скролл по странице
  $('a[href*="#"]').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 500, 'linear');
  });

  //динамически добавляю блоки в слайдерe
  var slic_slider = {
    dots: true,
    infinite: true,
    speed: 500,
    cssEase: 'linear',
    arrows: false,
    customPaging: function(slider, i) {
        return $('<span></span>');
        return $('<button type="button" />').text(i + 1);
    },
    vertical: true,
    verticalSwiping: true,
  };
  $('.comment_slider').slick(slic_slider);

});
