let expanderArrow = $('.expander-arrow');
let info = $('#info');
let description = $('.description');
let expanded = false; 

function expand() {
  if( expanded ) {
    info.css('height', '100px' );
    
    description.css('display', 'none');
    expanderArrow.removeClass('ion-chevron-up');
    expanderArrow.addClass('ion-chevron-down');
  } else {
    info.css('height', '200px' );
    
    description.css('display', 'block');
    expanderArrow.removeClass('ion-chevron-down');
    expanderArrow.addClass('ion-chevron-up');
  }
  expanded = !expanded;
}

let expList = document.getElementsByClassName("expander");
let expAdd = 0;

for (let i = 0; i < expList.length; i++) { 
  expAdd++;
  expList[i].id = "expansor" + expAdd;
  let expander = $('.expander');
  expander.on( 'click', function() {
    if (expanded){
      expander.css('bottom', '90px');
    } else {
    expander.css('bottom', '190px');
    }
    expand();
  })
}


let classes = document.getElementsByClassName("description");
let idnum = 0;
for (let i = 0; i < classes.length; i++) {
  idnum++;
  classes[i].id = "descript" + idnum;

}


let arrows = document.getElementsByClassName("expander-arrow");
let idMore= 0;
for (let i = 0; i < arrows.length; i++) {
  idMore++;
  arrows[i].id = "expander-arrow" + idMore;
}
