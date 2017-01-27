$(document).ready(function() {
    var discount_kentatsu = 0.75;
    $.ajax({
        url: '/scr/cross',
        type: 'post',
        data: {
            u: 'http://www.cbr.ru/scripts/XML_daily.asp?'
        },
        dataType: 'xml',
        success: function(data) {
            var usd = parseInt($(data).find('Valute[ID=R01235]').find('Value').text());
            $.each($('[data="price_0"]'), function() {
                var $this = $(this),
                    price_i = $this.text(),
                    price_o = Math.floor(price_i * usd);
                $this.text(price_o);
            });
            $.each($('[data="price_1"]'), function() {
                var $this = $(this),
                    price_i = $this.text(),
                    price_o = Math.floor(price_i * usd * discount_kentatsu);
                $this.text(price_o);
            })
        }
    })
});
