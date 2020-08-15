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

	$('.item-photoes').slick({
		autoplay: false,
		infinite: false,
		arrows: true,
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: false,
	});




});