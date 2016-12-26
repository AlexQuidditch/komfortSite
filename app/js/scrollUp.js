$(document).ready(function () {

    var buttonUp = $('#buttonUp');

    //	Button Up

    $('body').scroll(function () {
        if ($(this).scrollTop() > 700) {
            buttonUp.addClass('is-visible')
        } else {
            buttonUp.removeClass('is-visible')
        }
    });
    buttonUp.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 750);
        return false
    })
});
