(function ( root, factory ) {
  'use strict';
    /* eslint-disable no-undef */
  if ( typeof define === 'function' && define.amd ) {
    define( factory );
  } else if( typeof module === 'object' && module.exports ) {
    module.exports = ( root.simplate = factory() );
  } else {
    root.simplate = factory();
  }
  /* eslint-enable no-undef */

}( this, function() {

  'use strict';

  var cache = [];

  /************
   * setTemplate ( string, string );
  ************/
  function setTemplate( name, data ) {
    if ( ! hasTemplate( name ) ) { cache[ name ] = data; return data; } else { return false; }
  }

  /************
   * getTemplate ( string [, array/object ] );
  ************/
  function getTemplate( name , data ){
    var tmpl =  (name.indexOf('#') === 0 ) ?
                getDomElement( name ) :
                ( cache[name] || '' );

    return ( data && parseTemplate( tmpl, data ) ) || tmpl;
  }

  function getDomElement( name ) {
    name = name.replace('#','') + '';
    /* eslint-disable no-undef */
    if ( document && name ) {
      return document.getElementById( name ).innerText;
    /* eslint-enable no-undef */
    }
    return '';
  }

  /************
  * hasTemplate ( string );
  ************/
  function hasTemplate( name ) {
    return !!( cache[ name ] );
  }

  /************
   * parseTemplate ( string [, array/object ] );
  ************/
  function parseTemplate( template, data ) {
    var i = 0, len, str='';
    if ( data.constructor === Array ) {
      len = data.length;
      for(; i < len; i++){
        str += replaceValues( template, data[i] );
      }
    } else {
      str = replaceValues( template, data );
    }
    return str;
  }

  /************
   * replaceValues ( string , object );
  ************/
  function replaceValues( template, data ) {
    if ( template ){
      return template.replace(/{{([a-z_]+[a-z0-9_]*)}}/gi, function( tag, val ) {
        return  (data[ val ] || data[val] === 0) ? data[ val ]  : '{{'+val+'}}';
      });
    } else {
      return '';
    }
  }

  return {
    get : getTemplate,
    set : setTemplate,
    has : hasTemplate
  };

}));
