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

  //form validation
  var validName = false;
  var validPhone = false;
  var validClass = false;

  $(".form_try-it form").submit(function(event) {
    event.preventDefault();

    var name = $('input[name = "name"]');
    var phone = $('input[name = "phone"]');
    var value_class = $('input[name = "class"]');
    var err_css =  'box-shadow: 0px 0px 3px 2px #FF0000;';
    var suc_css =  'box-shadow: none';

    if (name.val() == "" || name.val() == 'Enter your name') {
      name.parent().attr('style', err_css);
      validName = false;
    } else {
      name.parent().attr('style', suc_css);
      validName = true;
    }

    if (phone.val() == "" || phone.val() == "Enter your phone") {
      phone.parent().attr('style', err_css);
      validPhone = false;
    } else {
      phone.parent().attr('style', suc_css);
      validPhone = true;
    }

    if (value_class.val() == "" || value_class.val() == "Chose your class") {
      value_class.parent().attr('style', err_css);
      validClass = false;
    } else {
      value_class.parent().attr('style', suc_css);
      validClass = true;
    }

    if (validName == true && validPhone == true) {
      if (validClass == true) {
        $(".form_try-it").unbind('submit').submit();
      }
    }

  });


});
