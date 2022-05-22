function initLoad(){$(".load").removeClass("hide"),$("body").css({overflow:"hidden"})}
function stopLoad(){
    $(".load").addClass("hide");
    $("body").css({overflow:"initial"});
    setTimeout(function() {
        $('.load').remove()
    }, 300)
}

$('#homeSlider').owlCarousel({
    loop: true,
    lazyLoad: true,
    margin: 0,
    dots: false,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 800,
    autoplayHoverPause: true,
    items: 1
});

$('#partners').owlCarousel({
    loop: true,
    lazyLoad: true,
    margin: 30,
    dots: false,
    nav: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 800,
    autoplayHoverPause: true,
    items: 3,
    responsive:{
        0:{
            margin: 15,
            items:1,
            nav: false,
            dots: true,
        },
        577:{
            margin: 15,
            items:2,
        },
        768:{
            margin: 15,
            items:2,
        },
        992:{
            margin: 15,
            items:3,
        },
        1281:{
            margin: 30
        }
    }
});