;(() => {

  'use strict';

  let templateCache = [];

 /**
 *  Private function.
 *  replaces all instances of data in string.
 * @param {string} template - The string to search through.
 * @param {string} data - The data to put in the string
 */
  let replaceValues = (template, data) => {
    if (template) {
      return template.replace(/{{([a-z_]+[a-z0-9_]*)}}/gi, function(val) {
        return data[val] ? data[val] : '{{' + val + '}}';
      });
    } else {
      return '';
    }
  };

 /**
 * Private function
 * Replaces data values in a given  template strinng
 * @param {string} template - The string to search through.
 * @param {array} data - The information to put in the string.
 */
  let parseTemplate = (template,data) => {
    let str = '';
    if (data.constructor === Array) {
      data.forEach(function(field) {
        str += replaceValues(template, field);
      });
    } else {
      str = replaceValues(template, data);
    }

    return str;
  };

 /**
 * Private function
 * gets the text from an element in the DOM by Id
 * @param {string} name - The id of the DOM element.
 */
  let getDomElement = (name) => {
    name = name.replace('#', '') + '';
    return (document && name) ? document.getElementById(name).innerText : false;
  };

  /**
 * Public  Method
 * checks to see if the template exists or not
 * @param {string} name - The id/name of the template.
 */
  let hasTemplate = (name) => !!(templateCache[name]);

  /**
 * Public  Method
 * Creates a template from a given string
 * @param {string} name - The id/name of the template.
 * @param {string} data - The template string.
 */
let setTemplate = (name, data) => (!hasTemplate) ? templateCache[name] = data : false;


/**
 * Public  Method
 * Retrieve and parse a template
 * @param {string} name - The id/name of the template.
 * @param {array} data - The information to put in the string.
 */
  let getTemplate = (name,data) => {
    let tmpl = ( name.indexOf('#')=== 0 ) ?
      getDomElement(name) : (templateCache[name] || false);
    return (data && parseTemplate(tmpl, data)) || tmpl;
  };

window.simplate = {
    get:getTemplate,
    set:setTemplate,
    has:hasTemplate,
  };

})();
