var expander = $('#expander');
var expanderArrow = $('#expander-arrow');
var info = $('#info');
var description = $('#description');
var expanded = false;

expander.on( 'click', function() {
  expand();
})

function expand() {
  if( expanded ) {
    info.css('height', '100px' );
    expander.css('bottom', '90px');
    description.css('display', 'none');
    expanderArrow.removeClass('ion-chevron-down');
    expanderArrow.addClass('ion-chevron-up');
  } else {
    info.css('height', '200px' );
    expander.css('bottom', '190px');
    description.css('display', 'block');
    expanderArrow.removeClass('ion-chevron-up');
    expanderArrow.addClass('ion-chevron-down');
  }
  expanded = !expanded;
}