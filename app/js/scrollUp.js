$(document).ready(function () {

    var buttonUp = $('.button-up');

    $('body').append(
        '<div class="button-up" style="z-index:1000;display: none;opacity: 0.5;width: 10%;height:100%; position: fixed; left: 0px; top: 0px; cursor: pointer; text-align: center; font-size:16px; line-height: 175vh; color: #45688E;"><i class="fa fa-arrow-circle-up fa-4x"></i>&nbsp;</div>'
    );
    $(window).scroll(function () {
        if ($(this).scrollTop() > 700) {
            buttonUp.fadeIn();
        } else {
            buttonUp.fadeOut();
        }
    });
    buttonUp.click(function () {
        $('body,html').velocity({
            offset: "750px",
        }, 750);
        return false;
    });
    buttonUp.hover(function () {
        $(this).velocity({
            'opacity': '0.9'
        }).css({
            'background-color': '#E1E7ED',
            'color': '#45688E',
        });
    }, function () {
        $(this).velocity({
            'opacity': '0.4'
        }).css({
            'background': 'none',
            'color': '#45688E',
        });
    });

})
