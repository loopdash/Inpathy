$(document).ready(function(){

  //Carousel
  $('.logo-slider').slick({
    speed: 5000,
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
          speed: 5000,
        }
      },
      {
        breakpoint: 991,
        settings: {
          speed: 4000,
        }
      },
      {
        breakpoint: 767,
        settings: {
          speed: 5000,
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
$(window).on('scroll resize ', function () {
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

  console.log(progress);

  if ($(window).width() <= 767) {

    //this is not changing on scroll
    if( progress == 1 ) {
      $('.sm-1 img.light').css('opacity', (1 - progress));
    } else {
      $('.sm-1 img.light').css('opacity', 1);
    }
    $('.sm-1 img.light-dark').css('opacity', progress);
  }

  
});




$('.dot-1').css('opacity', 1);




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
  
    $('.slider-text').css('opacity', '0');

    //for step 1
    if (currentStep === 1 && stepProgress < 0.8) { 
      textOpacity = 1;
      $('.text-' + currentStep).css('opacity', textOpacity);
    } 

    else if (currentStep === 1 && stepProgress > 0.8 && stepProgress <= 1) {
      textOpacity = Math.min(0.8, Math.max(0.3, 1 - stepProgress));
      $('.text-' + currentStep).css('opacity', textOpacity);
    } 


    //except first step
    else if (currentStep != 1 && stepProgress < 0.1) {
      textOpacity = Math.min(0.8, Math.max(0.3, 1 - stepProgress));
      if(currentStep === totalSteps) {
        $('.text-' + currentStep).css('opacity', textOpacity);
      } else {
        $('.text-' + (currentStep - 1)).css('opacity', textOpacity);
      }
      $('.text-' + currentStep).css('opacity', 0);
    } 


    //only last step
    else if ( (currentStep === totalSteps ) && stepProgress > .1 && stepProgress <= 1) { 

      if(stepProgress > .1 && stepProgress <= 0.2) {
        $('.text-' + currentStep).css('opacity', .3); 
      } else if(stepProgress > .2 && stepProgress <= 0.25) {
        $('.text-' + currentStep).css('opacity', .4); 
      } else if(stepProgress > .25 && stepProgress <= 0.3) {
        $('.text-' + currentStep).css('opacity', .5); 
      } else if(stepProgress > .3 && stepProgress <= 0.35) {
        $('.text-' + currentStep).css('opacity', .6); 
      } else if(stepProgress > .35 && stepProgress <= 0.45) {
        $('.text-' + currentStep).css('opacity', .8); 
      } else {
        $('.text-' + currentStep).css('opacity', 1); 
      }
           
    } 


    //except first and last text
    else if ( (currentStep != 1) &&  (currentStep != totalSteps ) && stepProgress > .1 && stepProgress <= 0.3) { 
      $('.text-' + currentStep).css('opacity', 0);      
    } 

    else if ( (currentStep != 1) &&  (currentStep != totalSteps )  && stepProgress > 0.3 && stepProgress <= 0.35) { 
      // textOpacity = Math.min(0.6, Math.max(0.3, 1 - (stepProgress)* 5  )); 
      $('.text-' + currentStep).css('opacity', 0.3 );
    } 
    else if ( (currentStep != 1) &&  (currentStep != totalSteps )  && stepProgress > 0.35 &&  stepProgress <= 0.4 ) { 
      $('.text-' + currentStep).css('opacity', 0.4 );
    } 

    else if ( (currentStep != 1) &&  (currentStep != totalSteps ) && stepProgress > 0.4 &&  stepProgress <= 0.45 ) { 
      $('.text-' + currentStep).css('opacity', 0.6);
    } 
    else if ( (currentStep != 1) &&  (currentStep != totalSteps ) && stepProgress > 0.45 &&  stepProgress <= 0.5 ) { 
      $('.text-' + currentStep).css('opacity', 0.8);
    } 

    else if ( (currentStep != 1) &&  (currentStep != totalSteps ) && stepProgress > 0.5 && stepProgress <= 0.8 ) { 
      $('.text-' + currentStep).css('opacity', 1);
    } 

    else if( (currentStep != 1) &&  (currentStep != totalSteps )  && stepProgress > 0.8) { 
      textOpacity = Math.min(0.8, Math.max(0.3, 1 - stepProgress)); 
      $('.text-' + currentStep).css('opacity', textOpacity);
    }

    
   




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
          

          if(currentStep < 2) {
            currentDot.css('opacity', 1);
          } else {
            currentDot.css('opacity', 0.3 + stepProgress * 3.5);
          }
          
  
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




