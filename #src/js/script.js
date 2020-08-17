@@include('vendors.js')

$(document).ready(function () {
	$('.catalog__cards').slick({
		autoplay: false,
		infinite: false,
		arrows: true,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: true,
					infinite: true
				}
			},
		]
	});
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
	$(function () {
		let slidesNumber = $('.item-photoes').length;
		let slidesClonedNumber = $('.item-photoes.slick-cloned').length;
		let dotsWidth = 100 / (slidesNumber - slidesClonedNumber);
		$('.item-photoes .slick-dots li').width(dotsWidth + '%');
	})
	var $status = $('.pagingInfo');
	var $slickElement = $('.item-photoes');
	$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		var i = (currentSlide ? currentSlide : 0) + 1;
		$status.text('Фото ' + i + ' из ' + slick.slideCount);
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

	// rashguard aim animation
	$('.rashguard__photoes').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$('.rashguard__aim').css({ transform: "translate(-50%, -50%) scale(0.7)" });
	});
	$('.rashguard__photoes').on('afterChange', function (event, slick, currentSlide, nextSlide) {
		$('.rashguard__aim').css({ transform: "translate(-50%, -50%) scale(1)" });
	});

	// rashguard dots width
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

	jcf.replaceAll();
});