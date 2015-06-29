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

