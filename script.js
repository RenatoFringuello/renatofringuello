//theme
function setTheme(){
  //set toggle theme
  if($("input").is(':checked')){
    $("#linkTheme").attr("href", "light-theme.css");
  }
  else{
    $("#linkTheme").attr("href", "dark-theme.css");
  }
}

//doc READY
$(document).ready(function() {
  //slick carousel
  var slideContainer = $('.slide-container');
  slideContainer.slick({
    arrows: false,
    initialSlide:0,
    centerMode: true,
    centerPadding: '40px',
    slidesToShow: 4,
    swipeToSlide:true,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1000,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2
        }
      },
      {
        breakpoint: 900,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });

  //smooth-scroll
  var scroll = new SmoothScroll('a[href*="#"]');
  window.location.href = "#home";

  $("input").on("click",setTheme);

  //on scoll
  $(".progressBar").css("width", window.pageYOffset + "%");
  $(window).scroll(function(){
    var pageMaxY = $(document).height() - $(window).height();
    $(".progressBar").css("width", (window.pageYOffset / pageMaxY * 100) + "%");
  });

  //portrait
  var isOpen = "";
  function openNav(){
    if(isOpen == ""){
      //navBtn animation
      $("#b").slideUp('fast',function(){
        $(".navBtn .line").css(
          {
            "position":"absolute",
            "transform":"translate(0%,-50%)",
            "top":"50%",
          }
        );
        $("#a").css("transform","rotate(-45deg)");
        $("#c").css("transform","rotate(45deg)");  
      });

      $("header").css(
        {
          "display" : "none",
          "height" : "100%",
        }
      );
      $("header").slideDown("slow", function(){
        $(".navLinks, .socialSec").css("display","flex");
      });
      isOpen = "open";
    }
    else{
      //navBtn animation
      $("#a,#c").css("transform","rotate(0deg)");
      setTimeout(function(){
        $("#b").slideDown('fast',function(){
          $(".navBtn .line").css(
            {
              "position":"static",
              "transform":"translate(0%,0%)",
              "top":"0%",
            }
          );
        });
      },500);
      $("header").slideUp("fast",function(){
        $(this).css(
          {
            "height":"auto",
            "display":"flex"
          }
        );
        $(".navLinks, .socialSec").css("display","none");
      });
      isOpen = "";
    }
  }
  //click links on portrait
  $(".link").on("click",function(){
    if(window.innerWidth < window.innerHeight){
      isOpen = "open";
      openNav();
    }
  });
  
  //handle the "landscape when is open" bug
  $(window).resize(function(){
    if(window.innerWidth > window.innerHeight){
      $(".navLinks, .socialSec").css("display","flex");
      isOpen = "";//reset
    }
    else{
      $(".navLinks, .socialSec").css("display","none");
    }
    $("header").css("height","auto");
  });
  $(".navBtn").on("click", function(){
    openNav();
  });
});

//window LOAD
$(window).on("load", function(){
  setTheme();
  setTimeout(function(){
    $(".loader-wrapper").fadeOut('slow');
  },1000);
});