$(document).ready(function(){

    var $social_tooltip = $('.social_tooltip');

    $('.product_also_grid').flickity({
        watchCSS: true,
        arrowShape: {
            x0: 10,
            x1: 60, y1: 50,
            x2: 65, y2: 45,
            x3: 20
        },
        pageDots: false
    });

    $('.social_btn, .close').on('click', function(){
        $social_tooltip.toggleClass('open');
    })
});
