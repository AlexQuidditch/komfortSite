var buttonUp = document.getElementById('buttonUp');

window.onscroll = function() {
    var scrollValue = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollValue >= '700') {
        buttonUp.classList.add('is-visible')
    } else {
        buttonUp.classList.remove('is-visible')
    }
};

$(document).ready(function() {
    var buttonUp = $('#buttonUp');
    buttonUp.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('html, body').animate({
            scrollTop: 0
        }, 750)
    })
});
