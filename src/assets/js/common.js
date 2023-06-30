import $ from 'jquery';

const common = {

  toggleClass: function(element, className) {
    const check = new RegExp("(\\s|^)" + className + "(\\s|$)");
    if (check.test(element.className)) {
      element.className = element.className.replace(check, " ").trim()
    } else {
      element.className += " " + className
    }
  },

}


export default common
