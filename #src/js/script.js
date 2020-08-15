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

	$('.catalog__cards .slick-dots li button').click(function () {
		$('.slick-track')
	})
});