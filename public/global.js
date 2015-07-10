
// toggles the class name for any number of elements
//
// class_name - String representing the class name to toggle back and forth
// also accepts an optional number of elements, comma-separated that the first line puts into an Array called args
//
// returns nothing
function toggle_class_name(class_name) {
  var args = Array.prototype.slice.call(arguments, 1);
  for (i = 0;  i < args.length; i++){
    args[i].classList.toggle(class_name);
  }
}

// returns first Element with the passed classname
//
// returns an Element DOM object
function get_first_of_this_class(class_name){
  return document.getElementsByClassName(class_name)[0];
}

// removes selected and show from current selection
// adds selected and show to the clicked selected
//
// returns nothing
function display_this_one_and_hide_current() {
  var currently_selected = get_first_of_this_class("selected");
  toggle_class_name("selected", currently_selected);
  toggle_class_name("show", get_first_of_this_class(currently_selected.id));
  toggle_class_name("show", get_first_of_this_class(this.id));
  toggle_class_name("selected", this);
}

// the id of the container element is the id
//
// returns an Integer of the id
function get_current_id() {
  return get_first_of_this_class("container").id
}


//

function next_record(){
  var next_record = new XMLHttpRequest(); 
  console.log(("/product/next/" + get_current_id()));
  next_record.open("get",("/product/next/" + get_current_id()));
  next_record.addEventListener("load", function(){
    console.log(this.response);
  });
  next_record.send();
}

function previous_record() {
  
}


window.onload = function(){
  var all = document.getElementsByClassName("tab");
  for (i = 0; i < all.length; i ++){
    all[i].addEventListener("click", display_this_one_and_hide_current);
  }
  document.getElementById("next").addEventListener("click", next_record)
  
}