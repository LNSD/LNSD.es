$('.logo').load('../assets/lnsd-big-logo.svg');

$('.timestamp').each(function() {
  var capitalizeFirstLetter, date;
  if (!window.moment) {
    return;
  }
  capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  date = this.getAttribute('datetime');
  this.setAttribute('title', this.textContent);
  return this.textContent = capitalizeFirstLetter(window.moment(date).fromNow());
});

$('a.popup').on('click', function(e) {
  return window.open($(this).attr('href'), $(this).attr('target'), 'location=no,resizable=1,scrollbars=no,height=450,width=580');
});

$('.btn-success').on('click', function(e) {
  var link;
  link = "mailto:lorenzo.delgado@lnsd.es?";
  link += "subject=" + escape($('#inputsubject').val() + ' - From ' + $('#inputname').val() + ' (' + $('#inputemail').val() + ')');
  link += "&body=" + escape($('#inputmessage').val());
  window.open(link);
  return false;
});

$('.up').on('click', function(event) {
  var target;
  target = $('#header');
  if (target.length) {
    event.preventDefault();
    return $('html, body').animate({
      scrollTop: target.offset().top
    }, 1500);
  }
});
