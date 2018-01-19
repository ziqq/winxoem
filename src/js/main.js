$(document).ready(function () {

	//Button
	//=include buttons.js

	if($(window).width() > 1024){
		function paddingWrap(){
			$('.wrapper').css('padding-bottom', $('.footer').innerHeight());
		}paddingWrap();
		$(window).on('resize', paddingWrap);
	}
	

	//Modal Window
	//Modal FancyBox 3 https://fancyapps.com/fancybox/3/
	if($('[data-fancybox]').length > 0){
		$('[data-fancybox]').fancybox({
			touch: false,
			autoFocus: false,
			width:"100%",
			height:"auto",
			margin:0,
			padding:0,
			closeSpeed:0,
			helpers:{
				overlay:{
					locked: false
				}
			}
		});
	}

	//Masked Input
	if($('.js-phone-mask').length > 0){
		$('.js-phone-mask').mask("+7 (999) 999-9999");
	}

	//Input Fpcus & Blur
	if($('.js-input').length > 0){
		$('.js-input').find('input').on('focus', function(){
			$(this).parent('.js-input').addClass('is-focus');
		}).on('blur', function(){
			if($(this).val() == ''){
				$(this).parent('.js-input').removeClass('is-focus');
			}
		});
	}

	if ($('.js-input--radio').length > 0) {
		$('.js-input--radio').on('click', function(){
			var _this = $(this);
			var input = $(this).find('input:radio');
			if(input.is(':checked')){
				_this.addClass('is-checked');
			}else{
				$('.js-input--radio').removeClass('is-checked');
			}
		});
	}

	
	


});