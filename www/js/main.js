$(document).ready(function(){
	init();
});

function init() {
	var tm = TweenMax,
	$body = $('body'),
	$window = $(window),
	$footer = $('footer');

	footerPos();

	$('.disabled').on('click', function(event) { event.preventDefault(); });

	$window.on('resize', function() {
		footerPos();
	});

	function footerPos() {
		if ($window.height() > $body.height()) { $footer.addClass('fixed_footer'); }
		else { $footer.removeClass('fixed_footer'); }
	}

	$.fn.dialog = function() {
		var $this = $(this),
		$dialogWrapper = $('.dialog_wrapper'),
		$dialog = $('.dialog'),
		$dialogBg = $('.dialog_bg'),
		$dialogClose = $('.dialog_close'),
		wPosSet = $window.scrollTop(),
		wPosGet = $body.attr('data-scroll');
		$dialogWrapper.show();
		$dialogBg.show();
		$this.show();
		$body.addClass('dialog_opened');
		$body.css('top', - wPosSet+'px');
		$body.attr('data-scroll', wPosSet);
		if ($this.height() > $dialogWrapper.height()) {	$body.addClass('dialog_scrollable'); } else { $body.addClass('dialog_scrollable'); }
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) { $body.addClass('dialog_scrollable_mobile'); }
		$dialogClose.on('click', function() {
			$dialog.hide();
			$dialogBg.hide();
			$dialogWrapper.hide();
			$body.removeClass('dialog_opened', 'dialog_scrollable_mobile');
			$window.scrollTop(wPosGet);
		});
	};

	$.fn.toast = function() {
		var $this = $(this),
		tl = new TimelineMax();
		if (!$this.hasClass('active')) {
			tl.fromTo($this, 0.3, {display: 'none', y: '100%', autoAlpha: 0}, {display: 'block', y: '0%', autoAlpha: 1, ease: Back.easeOut}).
			to($this, 0.3, {display: 'none', y: '100%', autoAlpha: 0, ease: Back.easeIn, delay: 3, onComplete: function() { $this.removeClass('active'); }});
		}
		$this.addClass('active');
	};

	$('.validate_form').each(function() {
		var $this = $(this),
		$validate = $this.find('.validate'),
		$validateEmail =  $this.find('.validate_email'),
		$validateTel = $this.find('.validate_tel'),
		$validatePass = $this.find('.validate_pass'),
		$validatePassConfirm = $this.find('.validate_pass_confirm'),
		$validateCaptcha = $this.find('.validate_captcha'),
		$validateCaptchaImg = $this.find('.validate_captcha_img'),
		checkEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		checkTel =  /[0-9 -()+]+$/,
		randCaptcha = Math.floor(Math.random() * 9),
		arrayCaptcha = [ 08532, 20864, 38204, 42032, 49146, 59749, 60880, 67185, 68880 ];

		$validateCaptchaImg.attr('src', '../img/captcha/captcha_'+randCaptcha+'.png');

		$this.on('submit', function() {
			var error = '',
			passValue = $validatePass.val(),
			passConfirmValue = $validatePassConfirm.val();
			$validate.each(function() {
				var	value = $(this).val();
				checking(value.length === 0, $(this));
			});
			$validateEmail.each(function() {
				var	value = $(this).val();
				checking(checkEmail.test(value) === false, $(this));
			});
			$validateTel.each(function() {
				var	value = $(this).val();
				checking(value.length < 7 || (!checkTel.test(value)), $(this));
			});
			$validatePass.each(function() {
				checking(passValue === '' || passValue.length <= 6, $(this));
			});
			$validatePassConfirm.each(function() {
				checking(passValue != passConfirmValue || passValue === '', $(this));
			});
			$validateCaptcha.each(function() {
				var	value = $(this).val();
				checking(value != arrayCaptcha[randCaptcha], $(this));
			});
			function checking(check, $this) {
				if (check) { error++; $this.addClass('validate_error'); } else { $this.removeClass('validate_error'); }
			}
			if (error) {
				$('.error.toast').toast();
				return false;
			}
		});
	});



}
