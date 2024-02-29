jQuery(document).ready(function($) {
  window.onscroll = function() {myFunction()};

  var header = document.getElementById("header-sticky");
  var sticky = header.offsetTop;

  function myFunction() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }
  const swiper = new Swiper(".swiper", {
      loop: true,
      effect: 'fade',
      pagination: {
        el: ".swiper-pagination"
      },
      navigation: {
        nextEl: ".swiper-next",
        prevEl: ".swiper-prev"
      },
      scrollbar: {
        el: ".swiper-scrollbar"
      },
      autoplay: {
        delay: 15000, // 15 seconds
        disableOnInteraction: false, 
      }
    });

    $('.marquee-with-options').marquee({
      speed: 80,
      gap: 50,
      delayBeforeStart: 0,
      direction: 'left',
      duplicated: true,
     
    });
    $(".select-filter").select2({
      minimumResultsForSearch: 20 
    });
    
    

    $("#campaign-form").steps({
      headerTag: "h6",
      bodyTag: "fieldset",
      transitionEffect: "slideLeft",
      onStepChanging: function(event, currentIndex, newIndex) {
        
        $("select#Country").select2();
        // Validate the form on each step change
         // Check if the user is moving to the next step
        if (newIndex > currentIndex) {
          if($("fieldset#campaign-form-p-0").hasClass("current")) {
            if ($("input[name='AdSize']").filter(":checked").length > 0) {
              $('div#error_AdSize').removeClass("show");
              return $("#campaign-form").valid();
            }else{
              $('div#error_AdSize').addClass("show");
            }
          
          }else if($("fieldset#campaign-form-p-1").hasClass("current")){
            if ($("input[name='AdLocation']").filter(":checked").length > 0) {
              $('div#error_AdLocation').removeClass("show");
              return $("#campaign-form").valid();
            }else{
              $('div#error_AdLocation').addClass("show");
            }
          }else if($("fieldset#campaign-form-p-2").hasClass("current")){
            $('div#error_Category').removeClass("show");
            if ($("input[name='AdCategory']").filter(":checked").length > 0) {
              return $("#campaign-form").valid();
            }else{
              $('div#error_Category').addClass("show");
            }
          }else if($("fieldset#campaign-form-p-3").hasClass("current")){
            $('div#error_Duration').removeClass("show");
            if ($("#startDate").val() !== "" && $("#endDate").val() !== "")  {
              return $("#campaign-form").valid();
            }else{
              $('div#error_Duration').addClass("show");
            }
          }else if($("fieldset#campaign-form-p-4").hasClass("current")){
            if ($("#select2-Country-container").text()!== "")  {
              return $("#campaign-form").valid();
            }else{
              $('div#error_Duration').addClass("show");
            }
          }
        } else if (newIndex < currentIndex) {
          return $("#campaign-form").valid();
        }
      },
      onFinishing: function(event, currentIndex) {
        // Validate the form on the last step
        $("#campaign-form").validate().settings.ignore = ":disabled,:hidden";
        return $("#campaign-form").valid();
      },
      onFinished: function(event, currentIndex) {
        // Submit the form if all steps are valid
        $("#campaign-form").submit();
      },
      labels: {
        next: "Next", // Change the text of the "Next" button
        previous: "Previous", // Change the text of the "Previous" button
        finish: "Add to Cart & Checkout" // Change the text of the "Finish" button
      }
    });
  
    
  
    $('.select-all').click(function(event) {   
      if(this.checked) {
          // Iterate each checkbox
          $(this).parents(".maga-card").find('.form-check-input').each(function() {
              this.checked = true;                        
          });
      } else {
        $(this).parents(".maga-card").find('.form-check-input').each(function() {
              this.checked = false;                        
          });
      }
    });
  
  $('.actions ul a[href="#finish"]').addClass('btn-left cart-checkout');
  $('.actions ul a[href="#next"]').addClass('btn-left next-btn');
  $('.actions ul a[href="#previous"]').addClass('btn-previous');
  $('.number').text(function(i, text) {
    return text.replace('.', '');
  });
  flatpickr("#startDate", {
    dateFormat: "Y-m-d",
    minDate: "today"
  });
  flatpickr("#endDate", {
    dateFormat: "Y-m-d",
    minDate: "today"
  });
});
