(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = (root.simplate = factory());
  } else {
    root.simplate = factory();
  }
}(this, function() {

  'use strict';

  var cache = []; /* Stores templates */

  /************
   * setTemplate ( string, string );
  ************/
  function setTemplate(name, data) {
    if (!hasTemplate(name)) {
      cache[name] = data; return data;
    } else {
      return false;
    }
  }

  /************
   * getTemplate ( string [, array/object ] );
  ************/
  function getTemplate(name, data) {
    var tmpl = (name.indexOf('#') === 0) ?
                getDomElement(name) :
                (cache[name] || false);

    return (data && parseTemplate(tmpl, data)) || tmpl;
  }

  function getDomElement(name) {
    name = name.replace('#', '') + '';
    if (document && name) {
      return document.getElementById(name).innerText;
    }

    return false;
  }

  /************
  * hasTemplate ( string );
  ************/
  function hasTemplate(name) {
    return !!(cache[name]);
  }

  /************
   * parseTemplate ( string [, array/object ] );
  ************/
  function parseTemplate(template, data) {
    var str = '';

    if (data.constructor === Array) {
      data.forEach(function(field) {
        str += replaceValues(template, field);
      });
    } else {
      str = replaceValues(template, data);
    }

    return str;
  }

  /************
   * replaceValues ( string , object );
  ************/
  function replaceValues(template, data) {
    if (template) {
      return template.replace(/{{([a-z_]+[a-z0-9_]*)}}/gi, function(ag, val) {
        return data[val] ? data[val] : '{{' + val + '}}';
      });
    } else {
      return '';
    }
  }

  return {
    get:getTemplate,
    set:setTemplate,
    has:hasTemplate,
  };

}));
