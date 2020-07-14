let expander = $('.expander');
let expanderArrow = $('.expander-arrow');
let info = $('#info');
let description = $('.description');
let expanded = false;

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

let expList = document.getElementsByClassName("expander");
let expAdd = 0;
for (let i = 0; i < expList.length; i++) {
  expAdd++;
  expList[i].id = "expansor" + expAdd;
}


let classes = document.getElementsByClassName("description");
let idnum = 0;
for (let i = 0; i < classes.length; i++) {
  idnum++;
  classes[i].id = "descricao" + idnum;

}


// let arrows = document.getElementsByClassName("expander-arrow");
// let idnum = 0;
// for (let i = 0; i < arrows.length; i++) {
//   idMore++;
//   arrows[i].id = "expander-arrow" + idMore;
// }

