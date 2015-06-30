# Asynchronously load the svg logo
$('.logo').load '../assets/lnsd-big-logo.svg'

# Show post date using moment
$('.timestamp').each ->
  if !window.moment
    return
  capitalizeFirstLetter = (string) ->
    string.charAt(0).toUpperCase() + string.slice(1)

  date = this.getAttribute('datetime')
  this.setAttribute 'title', this.textContent
  this.textContent = capitalizeFirstLetter(window.moment(date).fromNow())

# Open a link popup
$('a.popup').on 'click', (e) ->
  window.open $(this).attr('href'), $(this).attr('target'), 'location=no,resizable=1,scrollbars=no,height=450,width=580'