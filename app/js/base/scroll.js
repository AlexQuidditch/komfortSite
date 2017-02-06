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

$(document).ready(function() {
    $('[data-roll]').on('click', function(e) {
        e.preventDefault();
        var
            $this = $(this),
            target = $this.data('roll'),
            anchor = $('[id="' + target + '"]');
        $('html, body').animate({
            scrollTop: anchor.offset().top
        }, 750);
    })
});

$(document).ready(function() {

    var formCall = $('#call'),
        formModal = $('#modal'),
        formOverlay = $('#overlay'),
        formSend = $('#send'),

        //		SweetAlert Notifications
        confirm = {
            title: 'Секундочку!',
            text: 'Отправляем данные...',
            type: 'info',
            showConfirmButton: false,
            allowOutsideClick: false
        },
        success = {
            title: 'Отлично!',
            text: 'Мы скоро с Вами свяжемся!',
            type: 'success',
            showCloseButton: true
        },
        error = {
            title: 'Упс...',
            text: 'Что-то пошло не так! Проверьте правильность данных!',
            type: 'error',
            showCloseButton: true
        };

    //	functions callers

    formCall.on('click', _modal_opened);

    formOverlay.on('click', _modal_close);

    formSend.on('click', _modal_send);

    // modal open/close	functions

    $(document).keyup(function(e) {
        if (e.which == '27') {
            formOverlay.removeClass('overlay--visible'),
                formModal.removeClass('modal__window--visible')
        }
    });

    function _modal_close(e) {
        e.preventDefault();
        formOverlay.removeClass('overlay--visible'),
            formModal.removeClass('modal__window--visible')
    };

    function _modal_opened(e) {
        e.preventDefault();
        formOverlay.addClass('overlay--visible'),
            formModal.addClass('modal__window--visible')
    };

    //	form send function

    function _modal_send() {
        formName = $('#formName'),
            formPhone = $('#formPhone'),
            formText = $('#formText'),
            swal(confirm),
            $.ajax({
                type: 'POST',
                url: '../sender.php',
                data: {
                    'formName': formName.val(),
                    'formPhone': formPhone.val(),
                    'formText': formText.val()
                },
                cache: false,
                success: function(response) {
                    if (response == 1) {
                        swal(success),
                            formName.val(''),
                            formPhone.val(''),
                            formText.val(''),
                            formOverlay.removeClass('overlay--visible'),
                            formModal.removeClass('modal__window--visible')
                    } else {
                        swal(error)
                    }
                }
            });
        return false;
    };

});

jQuery(document).ready(function($) {
    //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
    var MqL = 1170;
    //move nav element position according to window width
    moveNavigation();
    $(window).on('resize', function() {
        (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300): window.requestAnimationFrame(moveNavigation);
    });

    //mobile - open lateral menu clicking on the menu icon
    $('.cd-nav-trigger').on('click', function(event) {
        event.preventDefault();
        if ($('.cd-main-content').hasClass('nav-is-visible')) {
            closeNav();
            $('.cd-overlay').removeClass('is-visible');
        } else {
            $(this).addClass('nav-is-visible');
            $('.cd-primary-nav').addClass('nav-is-visible');
            $('.cd-main-header').addClass('nav-is-visible');
            $('.cd-main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                $('body').addClass('overflow-hidden');
            });
            toggleSearch('close');
            $('.cd-overlay').addClass('is-visible');
        }
    });

    //open search form
    $('.cd-search-trigger').on('click', function(event) {
        event.preventDefault();
        toggleSearch();
        closeNav();
    });

    //close lateral menu on mobile
    $('.cd-overlay').on('swiperight', function() {
        if ($('.cd-primary-nav').hasClass('nav-is-visible')) {
            closeNav();
            $('.cd-overlay').removeClass('is-visible');
        }
    });
    $('.nav-on-left .cd-overlay').on('swipeleft', function() {
        if ($('.cd-primary-nav').hasClass('nav-is-visible')) {
            closeNav();
            $('.cd-overlay').removeClass('is-visible');
        }
    });
    $('.cd-overlay').on('click', function() {
        closeNav();
        toggleSearch('close')
        $('.cd-overlay').removeClass('is-visible');
    });


    //prevent default clicking on direct children of .cd-primary-nav
    $('.cd-primary-nav').children('.has-children').children('a').on('click', function(event) {
        event.preventDefault();
    });
    //open submenu
    $('.has-children').children('a').on('click', function(event) {
        if (!checkWindowWidth()) event.preventDefault();
        var selected = $(this);
        if (selected.next('ul').hasClass('is-hidden')) {
            //desktop version only
            selected.addClass('selected').next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('moves-out');
            selected.parent('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
            $('.cd-overlay').addClass('is-visible');
        } else {
            selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
            $('.cd-overlay').removeClass('is-visible');
        }
        toggleSearch('close');
    });

    //submenu items - go back link
    $('.go-back').on('click', function() {
        $(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
    });

    function closeNav() {
        $('.cd-nav-trigger').removeClass('nav-is-visible');
        $('.cd-main-header').removeClass('nav-is-visible');
        $('.cd-primary-nav').removeClass('nav-is-visible');
        $('.has-children ul').addClass('is-hidden');
        $('.has-children a').removeClass('selected');
        $('.moves-out').removeClass('moves-out');
        $('.cd-main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
            $('body').removeClass('overflow-hidden');
        });
    }

    function toggleSearch(type) {
        if (type == "close") {
            //close serach
            $('.cd-search').removeClass('is-visible');
            $('.cd-search-trigger').removeClass('search-is-visible');
            $('.cd-overlay').removeClass('search-is-visible');
        } else {
            //toggle search visibility
            $('.cd-search').toggleClass('is-visible');
            $('.cd-search-trigger').toggleClass('search-is-visible');
            $('.cd-overlay').toggleClass('search-is-visible');
            if ($(window).width() > MqL && $('.cd-search').hasClass('is-visible')) $('.cd-search').find('input[type="search"]').focus();
            ($('.cd-search').hasClass('is-visible')) ? $('.cd-overlay').addClass('is-visible'): $('.cd-overlay').removeClass('is-visible');
        }
    }

    function checkWindowWidth() {
        //check window width (scrollbar included)
        var e = window,
            a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if (e[a + 'Width'] >= MqL) {
            return true;
        } else {
            return false;
        }
    }

    function moveNavigation() {
        var navigation = $('.cd-nav');
        var desktop = checkWindowWidth();
        if (desktop) {
            navigation.detach();
            navigation.insertBefore('.cd-header-buttons');
        } else {
            navigation.detach();
            navigation.insertAfter('.cd-main-content');
        }
    }
});

Waves.init();
Waves.attach('[ripple-dark]', ['waves-dark']);
Waves.attach('[ripple-light]', ['waves-light']);

var buttonUp = document.getElementById('buttonUp');

window.onscroll = function() {
    var scrollValue = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollValue >= '700') {
        buttonUp.classList.add('is-visible')
    } else {
        buttonUp.classList.remove('is-visible')
    }
};

var zooming = new Zooming({
    enableGrab: false,
    preloadImage: true,
    transitionDuration: 0.5,
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0, 1)',
    bgColor: 'white',
    bgOpacity: 0,
    scaleBase: 0.15,
    scaleExtra: 0.15,
    scrollThreshold: 40,
});

zooming.listen('.product__image-container .product__image');
