$(document).ready(function ($) {
	var $lateral_menu_trigger = $('#cd-menu-trigger'),
		$content_wrapper = $('main'),
		$navigation = $('header'),
		$navMenu = $('#sidebar-nav'),
		$subchildrenTrigger = $('.nav__subchildren-trigger');

	//open-close lateral menu clicking on the menu icon
	$lateral_menu_trigger.on('click', function (event) {
		event.preventDefault();

		$lateral_menu_trigger.toggleClass('is-clicked');
		$navMenu.toggleClass('lateral-menu-is-open');

		//check if transitions are not supported - i.e. in IE9
		if ($('html').hasClass('no-csstransitions')) {
			$('body').toggleClass('overflow-hidden');
		}
	});

	//close lateral menu clicking outside the menu itself
	$content_wrapper.on('click', function (event) {
		if (!$(event.target).is('#nav-menu__trigger, #nav-menu__trigger span')) {
			$lateral_menu_trigger.removeClass('is-clicked');
			$navMenu.removeClass('lateral-menu-is-open');
			//check if transitions are not supported
			if ($('html').hasClass('no-csstransitions')) {
				$('body').removeClass('overflow-hidden');
			}

		}
	});

	//open (or close) submenu items in the lateral menu. Close all the other open submenu items.
	$subchildrenTrigger.on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('submenu-open').next('.nav__sub').slideToggle(200).end().parent('.nav__sub-trigger').children('a').removeClass('submenu-open').next('.nav__sub').slideUp(1000);
	});
});
