# jQuery for page scrolling feature - requires jQuery Easing plugin

$('a[href^="#"]').on 'click', (event) ->
	target = $($(this).attr('href'))
	if target.length
		event.preventDefault()
		$('html, body').animate { scrollTop: target.offset().top }, 1000

# Asynchronously load the svg logo

$('#main-logo').load 'assets/lnsd-big-logo.svg'