let simplate = (() => {

  'use strict';

  let templateCache = [];

  /************
   * replaceValues ( string , object );
  ************/
  let replaceValues = (template, data) => {
    if (template) {
      return template.replace(/{{([a-z_]+[a-z0-9_]*)}}/gi, function(ag, val) {
        return data[val] ? data[val] : '{{' + val + '}}';
      });
    } else {
      return '';
    }
  };

  /************
   * parseTemplate ( string [, array/object ] );
  ************/
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

  /************
  * getDomElement ( string );
  ************/
  let getDomElement = (name) => {
    name = name.replace('#', '') + '';
    return (document && name) ? document.getElementById(name).innerText : false;
  };

  /************
  * hasTemplate ( string );
  ************/
  let hasTemplate = (name) => !!(templateCache[name]);

  /************
   * setTemplate ( string, string );
  ************/
  let setTemplate = (name, data) => (!hasTemplate) ? templateCache[name] = data : false;


  /************
   * getTemplate ( string [, array/object ] );
  ************/
  let getTemplate = (name,data) => {
    let tmpl = ( name.indexOf('#')=== 0 ) ?
      getDomElement(name) : (templateCache[name] || false);
    return (data && parseTemplate(tmpl, data)) || tmpl;
  };

  return {
    get:getTemplate,
    set:setTemplate,
    has:hasTemplate,
  };

})();
