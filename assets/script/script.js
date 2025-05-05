$(document).ready(function(){

  //Carousel
  $('.logo-slider').slick({
    speed: 7000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    pauseOnHover: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          speed: 7000,
        }
      },
      {
        breakpoint: 767,
        settings: {
          speed: 8000,
        }
      }

    ]

  });


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









//Slider Section
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

  if (currentStep < 1) currentStep = 1;
  if (currentStep > totalSteps) currentStep = totalSteps;

  if (sectionTop <= $(window).scrollTop()) {
    var stepStartScroll = sectionTop + (currentStep - 1) * (sectionHeight / totalSteps);
    var stepEndScroll = sectionTop + currentStep * (sectionHeight / totalSteps);
    var stepProgress = (scrollTop - stepStartScroll) / (stepEndScroll - stepStartScroll);
    stepProgress = Math.max(0, Math.min(stepProgress, 1));


    var textOpacity;
  
    if (currentStep === 1 && stepProgress < 0.3) { 
      textOpacity = 1;
    } else if (currentStep === 1 && stepProgress >= 0.3) {
      textOpacity = Math.max(0, 1 - (stepProgress - 0.3) * 2.5);
    }  else if (stepProgress < 0.5) { 
      textOpacity = stepProgress * 2; 
    } else { 
      textOpacity = Math.max(0, 1 - (stepProgress - 0.5) * 2); 
    }


    // Update Text
    $('.slider-text').css('opacity', '0');
    $('.text-' + currentStep).css('opacity', textOpacity);




    // Image and Background Opacity Logic (remains the same)
    $('.slider-img').css('opacity', 0);
    $('.slider-bg:not(.bg-1)').css('opacity', 0);
    $('.dot').css('opacity', 0.3);

    let currentImage = $('.sm-' + currentStep);
    let nextImage = $('.sm-' + (currentStep + 1));
    let currentBg = $('.bg-' + currentStep);
    let nextBg = $('.bg-' + (currentStep + 1));
    let currentDot = $('.dot-' + currentStep);
    let nextDot = $('.dot-' + (currentStep + 1));



    if (currentImage.length && currentBg.length && currentDot.length) {
      if (stepProgress <= 0.2) {

        if (currentStep === totalSteps) {
          // At final step — keep fully visible, no fade-out
          currentImage.css('opacity', 1);
          currentBg.css('opacity', 1);
          currentDot.css('opacity', 1);
        } else {
          currentImage.css('opacity', stepProgress * 5);
          currentBg.css('opacity', stepProgress * 5);
          currentDot.css('opacity', 0.3 + stepProgress * 3.5);
  
          if (currentStep > 1 && $('.sm-' + (currentStep - 1)).length && $('.bg-' + (currentStep - 1)).length  && $('.dot-' + (currentStep - 1)).length) {
            $('.sm-' + (currentStep - 1)).css('opacity', Math.max(0, 1 - stepProgress * 5));
            $('.bg-' + (currentStep - 1)).css('opacity', Math.max(0, 1 - stepProgress * 5));
            $('.dot-' + (currentStep - 1)).css('opacity', Math.max(0.3, 1 - stepProgress * 3.5));
          }
        }
        
      } 
      
      
      else if (stepProgress > 0.2 && stepProgress <= 0.8) {
        currentImage.css('opacity', 1);
        currentBg.css('opacity', 1);
        currentDot.css('opacity', 1);
      } 
      
      
      else if (stepProgress > 0.8) {


        if (currentStep === totalSteps) {
          // At final step — keep fully visible, no fade-out
          currentImage.css('opacity', 1);
          currentBg.css('opacity', 1);
          currentDot.css('opacity', 1);
        } else {

          currentImage.css('opacity', Math.max(0, 1 - (stepProgress - 0.8) * 5));
          currentBg.css('opacity', Math.max(0, 1 - (stepProgress - 0.8) * 5));
          currentDot.css('opacity', Math.max(0.3, 1 - (stepProgress - 0.8) * 3.5));

          if (nextImage.length && nextBg.length && nextDot.length) {
            nextImage.css('opacity', (stepProgress - 0.8) * 5);
            nextBg.css('opacity', (stepProgress - 0.8) * 5);
            nextDot.css('opacity', 0.3 + (stepProgress - 0.8) * 3.5);
          }

        }


      }
    }

   

  }
});




