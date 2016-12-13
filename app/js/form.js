$(document).ready(function () {

	var formCall = $('#call'),
		formModal = $('#modal'),
		formOverlay = $('#overlay'),
		formSend = $('#send'),
		formName = $('#formName'),
		formPhone = $('#formPhone'),
		formText = $('#formText'),

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

	$(document).keyup(function (e) {
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
				success: function (response) {
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
