$(document).ready(function(){

  //Carousel
  $('.logo-slider').slick({
    speed: 4000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          speed: 4000,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 8000,
        }
      }

    ]

  });



  function animateOrbitGrow() {
      const circle = $('.round_circle');
      setTimeout(() => {
        circle.addClass('animate-orbit');
      }, 50);

      setTimeout(() => {
        circle.removeClass('animate-orbit');
      }, 1000);

      setTimeout(animateOrbitGrow, 60000);
  }

  animateOrbitGrow();




});
//document ready





function isPartiallyInView(elem) {
  var docViewTop    = $(window).scrollTop(),
      docViewBottom = docViewTop + $(window).height(),
      elemTop       = $(elem).offset().top,
      elemBottom    = elemTop + $(elem).height();

  return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
}

$(window).on('scroll', function () {
  $('.slider-section').each(function () {
    $(this).toggleClass('in-view', isPartiallyInView(this));
  });
});



// this one is complete
$(window).on('scroll', function () {
  var $sliderContent = $('.slider-content');
  var $slideImgText = $('.slide-img-text');

  var contentTop    = $sliderContent.offset().top;
  var windowHeight  = $(window).height();
  var scrollTop     = $(window).scrollTop();

  var distanceFromTop = contentTop - scrollTop;
  var progress = 1 - (distanceFromTop / windowHeight);

  progress = Math.max(0, Math.min(progress, 1));

  var translateY = (1 - progress) * -30;

  $slideImgText.css('transform', 'translateY(' + translateY + 'vh)');


  var brightness = 100 - (30 * progress);
  $('.sm-1 img').css('filter', 'brightness(' + brightness + '%)');
  $('.text-1').css('opacity', progress);

  
});






//working here
$(window).on('scroll', function () {

  var $sliderSection = $('.slider-section');
  if (!$sliderSection.hasClass('in-view')) return;

  var scrollTop     = $(window).scrollTop();
  var sectionTop    = $sliderSection.offset().top;
  var sectionHeight = $sliderSection.height();
  var windowHeight  = $(window).height();
  var progress      = (scrollTop - sectionTop) / (sectionHeight - windowHeight);
  var totalSteps    = 5;
  var stepSize      = 1 / (totalSteps - 1);
  var currentStep   = Math.round(progress / stepSize) + 1;

  // Clamp to valid step range
  if (currentStep < 1) currentStep = 1;
  if (currentStep > totalSteps) currentStep = totalSteps;

  if (sectionTop <= $(window).scrollTop()) {

    var stepStartScroll = sectionTop + (currentStep - 1) * (sectionHeight / totalSteps);
    var stepEndScroll = sectionTop + currentStep * (sectionHeight / totalSteps);
    var stepProgress = 0;
    var textOpacity;
    if (scrollTop >= stepStartScroll && scrollTop <= stepEndScroll) {
        stepProgress = (scrollTop - stepStartScroll) / (stepEndScroll - stepStartScroll);
        stepProgress = Math.max(0, Math.min(stepProgress, 1));
    } else if (scrollTop < stepStartScroll) {
        stepProgress = 0;
    } else {
        stepProgress = 1;
    }

 
    if (currentStep === 1 && stepProgress < 0.5) { 
        textOpacity = 1;
    } else if (stepProgress < 0.5) { 
        textOpacity = stepProgress * 2; 
    } else { 
        textOpacity = Math.max(0, 1 - (stepProgress - 0.5) * 2); 
    }

      // Update Dots
      $('.dot').css('opacity', '.3');
      $('.dot-' + currentStep).css('opacity', '1');

      // Update Images
      $('.slider-img').css('opacity', '0');
      $('.sm-' + currentStep).css('opacity', '1');

      // Update Backgrounds
      $('.slider-bg').css('opacity', '0');
      $('.bg-' + currentStep).css('opacity', '1');

      // Update Text
      $('.slider-text').css('opacity', '0');
      $('.text-' + currentStep).css('opacity', textOpacity);
  }
});

