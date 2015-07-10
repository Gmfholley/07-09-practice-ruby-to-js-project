
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


// creates AJAX request to get the next record
// adds event listener
// sends request
//
// returns nothing
function next_record(){
  var next_record = new XMLHttpRequest(); 
  next_record.open("get",("/product/next/" + get_current_id()));
  next_record.addEventListener("load",change_HTML_for_object_response);
  next_record.send();
}

// creates AJAX request to get the next record
// adds event listener
// sends request
//
// returns nothing
function previous_record() {
  var previous_record = new XMLHttpRequest(); 
  previous_record.open("get",("/product/previous/" + get_current_id()));
  previous_record.addEventListener("load",change_HTML_for_object_response);
  previous_record.send();
}

// logs the response
// makes an object object of the response, corresponding to the classes that need to be updated
// updates those html elements with the value
//
// returns nothing
function change_HTML_for_object_response(){
  console.log(this.response);
  var n = JSON.parse(this.response);
  get_first_of_this_class("container-id").innerHTML=("Product #:" + n["id"]);
  do_something_to_all_this_object_parameters(n, change_HTML_to_match_parameter);
  document.getElementById(get_current_id()).id = n["id"];
}

// changes the HTML of the Element of this class to this object's parameter of same name
//
// obj - Object
// class_name - String of the object's parameter and matching class_name to change to save
//
// returns nothing
function change_HTML_to_match_parameter(obj, class_name){
  get_first_of_this_class(class_name).innerHTML=obj[class_name];
}

// do something to this object's parameters
//
// obj - javascript Object
// something - function
//
// returns nothing
function do_something_to_all_this_object_parameters(obj, something) {
  for (var property in obj) {
      if (obj.hasOwnProperty(property) && property!="id") {
        something(obj, property);
      }
  }
}

window.onload = function(){
  var all = document.getElementsByClassName("tab");
  for (i = 0; i < all.length; i ++){
    all[i].addEventListener("click", display_this_one_and_hide_current);
  }
  document.getElementById("next").addEventListener("click", next_record)
  document.getElementById("previous").addEventListener("click", previous_record)
}