$(document).ready(function () {

	var anchorTrigger = $('[data-roll]');

	anchorTrigger.on('click', function (event) {
		event.preventDefault();
		var
			$this = $(this),
			target = $this.data('roll'),
			anchor = $('[id="' + target + '"]');
		anchor.velocity("scroll", {
			easing: 'easeInOut',
			duration: 1500
		})
	});
});
