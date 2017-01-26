(function () {
    $('[data-roll]').on('click', function (e) {
        e.preventDefault();
        var
            $this = $(this),
            target = $this.data('roll'),
            anchor = $('[id="' + target + '"]');
        $('html, body').animate({
            scrollTop: anchor.offset().top
        }, 750);
    });
})();
