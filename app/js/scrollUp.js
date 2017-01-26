$(document).ready(function() {

    var buttonUp = $('#buttonUp');

    $('html,body').scroll(function() {
        if ($(this).scrollTop() > 700) {
            buttonUp.addClass('is-visible')
        } else {
            buttonUp.removeClass('is-visible')
        }
    });

    buttonUp.click(function() {
        $('html,body').animate({
            scrollTop: 0
        }, 750);
        return false
    })

});
