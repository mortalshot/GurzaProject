@@include('vendors.js')

$(document).ready(function () {
	$('.catalog__cards').slick({
		autoplay: false,
		infinite: true,
		arrows: true,
		centerMode: true,
		variableWidth: true,
		initialSlide: 1,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: true,
				}
			},
		]
	});
	// Ширина точек слайдера каталога
	$(function () {
		let slidesNumber = $('.catalog__card').length;
		let slidesClonedNumber = $('.catalog__card.slick-cloned').length;
		let dotsWidth = 100 / (slidesNumber - slidesClonedNumber);
		$('.catalog__cards .slick-dots li').width(dotsWidth + '%');
	})

	$('.item-photoes').slick({
		autoplay: false,
		infinite: false,
		arrows: true,
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: false,
	});
	// Ширина точек слайдера в модальном окне
	$(function () {
		let slidesNumber = $('.item-photoes').length;
		let slidesClonedNumber = $('.item-photoes.slick-cloned').length;
		let dotsWidth = 100 / (slidesNumber - slidesClonedNumber);
		$('.item-photoes .slick-dots li').width(dotsWidth + '%');
	})

	// Добавление счетчика фотографий в модальном окне товара 1
	$(function () {
		let $status = $('#product-1 .pagingInfo');
		let $slickElement = $('#product-1 .item-photoes');
		$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
			var i = (currentSlide ? currentSlide : 0) + 1;
			$status.text('Фото ' + i + ' из ' + slick.slideCount);
		});
	});
	// Добавление счетчика фотографий в модальном окне товара 2
	$(function () {
		let $status = $('#product-2 .pagingInfo');
		let $slickElement = $('#product-2 .item-photoes');
		$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
			var i = (currentSlide ? currentSlide : 0) + 1;
			$status.text('Фото ' + i + ' из ' + slick.slideCount);
		});
	});
	// Добавление счетчика фотографий в модальном окне товара 3
	$(function () {
		let $status = $('#product-3 .pagingInfo');
		let $slickElement = $('#product-3 .item-photoes');
		$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
			var i = (currentSlide ? currentSlide : 0) + 1;
			$status.text('Фото ' + i + ' из ' + slick.slideCount);
		});
	});


	$('.features-markup').slick({
		autoplay: false,
		infinite: false,
		arrows: false,
		dots: true,
		variableWidth: true,
		mobileFirst: true,
		responsive: [
			{
				breakpoint: 991,
				settings: "unslick"
			},
		]
	});

	$('.rashguard__photoes').slick({
		autoplay: false,
		infinite: true,
		arrows: true,
		dots: true,
		centerMode: true,
		variableWidth: false,
		slidesToShow: 3,
		initialSlide: 1,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					initialSlide: 0,
					infinite: false,
					arrows: false,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 3,
					infinite: false,
					arrows: false,
					centerMode: true,
					initialSlide: 0,
				}
			},
			{
				breakpoint: 450,
				settings: {
					slidesToShow: 3,
					infinite: false,
					arrows: false,
					centerMode: true,
					initialSlide: 0,
					variableWidth: true,
				}
			},
		]
	});

	$('.rashguard__features').slick({
		autoplay: false,
		infinite: false,
		arrows: false,
		dots: false,
		variableWidth: true,
		mobileFirst: true,
		slidesToShow: 2,
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2,
					centerMode: false,
					variableWidth: false,
				}
			},
			{
				breakpoint: 992,
				settings: "unslick"
			},
		]
	});

	// Анимация прицела rashguard при переключении слайдов
	$('.rashguard__photoes').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$('.rashguard__aim').css({ transform: "translate(-50%, -50%) scale(0.7)" });
	});
	$('.rashguard__photoes').on('afterChange', function (event, slick, currentSlide, nextSlide) {
		$('.rashguard__aim').css({ transform: "translate(-50%, -50%) scale(1)" });
	});

	// Ширина точек rashguard слайдера
	$(function () {
		let slidesNumber = $('.rashguard__item').length;
		let slidesClonedNumber = $('.rashguard__item.slick-cloned').length;
		let dotsWidth = 100 / (slidesNumber - slidesClonedNumber);
		$('.rashguard__photoes .slick-dots li').width(dotsWidth + '%');
	});

	$('.review__cards').slick({
		autoplay: false,
		infinite: false,
		arrows: true,
		dots: false,
		centerMode: false,
		variableWidth: false,
		slidesToShow: 2,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					centerMode: false,
					dots: true,
					slidesToShow: 1,
				}
			},
			{
				breakpoint: 450,
				settings: {
					arrows: false,
					centerMode: false,
					dots: true,
					slidesToShow: 1,
					adaptiveHeight: true,
				}
			},
		]
	});

	// Замена стандартного файлового инпута
	jcf.replaceAll();
	$(".mask-phone").mask("+7(999) 999-9999");

	// Определение, откуда упала заявка на почту
	$('.popup-link[href="#request"]').click(function (event) {
		let recipient = $(this).data('whatever');
		let modal = $('#request');
		modal.find('#whatever').val(recipient);
	});

	//E - mail Ajax Send
	$("form").submit(function () {
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: th.serialize()
		}).done(function () {
			setTimeout(function () {
				th.trigger("reset");
			}, 800);
			$('a[href="#thanks"]')[0].click();
		});
		return false;
	});

	// Ограничение формата отправляемых файлов
	$('#myfile').change(function () {
		var ext = this.value.match(/\.([^\.]+)$/)[1];
		switch (ext) {
			case 'doc':
			case 'docx':
			case 'xls':
			case 'xlsx':
			case 'pdf':
			case 'zip':
			case 'rar':
			case '7z':
			case 'jpg':
			case 'jpeg':
			case 'png':
			case 'webp':
				break;
			default:
				alert('Разрешенный формат файла: doc, docx, xls, xlsx, pdf, zip, rar, 7z, jpg, jpeg, png, webp');
				this.value = '';
		}
		var $fileUpload = $("input[type='file']");
		if (parseInt($fileUpload.get(0).files.length) > 8) {
			alert("Можно отправить не больше 8 файлов, вы можете добавить архив");
			this.value = '';
		}
	});
	//Отправка данных на сервер с помощью phpmailer
	$('#form').trigger('reset');
	$(function () {
		'use strict';
		$('#form').on('submit', function (e) {
			e.preventDefault();
			$.ajax({
				url: 'send.php',
				type: 'POST',
				contentType: false,
				processData: false,
				data: new FormData(this),
				success: function (msg) {
					console.log(msg);
					if (msg == 'ok') {
						$('a[href="#thanks"]')[0].click();
						$('#form').trigger('reset'); // очистка формы
					} else {
						alert('Что-то пошло не так');
					}
				}
			});
		});
	});

	// Удаление таблички у виджета инстаграмма
	setTimeout(() => {
		$('a[href$="=free-widget"]').css("display", "none");
	}, 1000);
});