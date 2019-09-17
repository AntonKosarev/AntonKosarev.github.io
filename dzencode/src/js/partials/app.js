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



  var comment_slider = [
    '#comment_slider_1',
    '#comment_slider_2',
    '#comment_slider_3'
  ];
  for (var j = 0; j < comment_slider.length; j++) {
    for (var i = 0; i < 3; i++) {
      $(".comment_item").clone().appendTo(comment_slider[j]).removeClass('comment_item');
    }
    /*$(comment_slider[j]).bxSlider({
      pager: true,
      mode: 'vertical',
      nextText: '<span>nextText</span>',
      prevText: '<span>nextText</span>',
    });*/

  }
  $("#comment_slider_1").bxSlider({
    mode: 'vertical',
    pager: true,
    nextText: null,
    prevText: null,
    wrapperClass: 'bx-wrapper_inner',
    slideMargin: 100,
    myViewportHeight: 247,

  });
  $("#comment_slider_2").bxSlider({
    mode: 'vertical',
    pager: true,
    nextText: null,
    prevText: null,
    wrapperClass: 'bx-wrapper_inner',
    slideMargin: 100,
    myViewportHeight: 247,


  });
  $("#comment_slider_3").bxSlider({
    mode: 'vertical',
    pager: true,
    nextText: null,
    prevText: null,
    wrapperClass: 'bx-wrapper_inner',
    slideMargin: 100,
    myViewportHeight: 247,

  });
});
