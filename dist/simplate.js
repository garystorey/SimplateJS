(function ( root, factory ) {
  if ( typeof define === "function" && define.amd ) {
    define( factory );
  } else if( typeof module === "object" && module.exports ) {
    module.exports = ( root.simplate = factory() );
  } else {
    root.simplate = factory();
  }
}( this, function() {

  'use strict';

  var cache = [];  /* Stores templates */

  /************
   * setTemplate ( string, string );
  ************/
  function setTemplate( name, data ) {
    if ( !getTemplate( name ) ) { cache[ name ] = data; return true; } else { return false; }
  }

  /************
   * getTemplate ( string [, array ] );
  ************/
  function getTemplate( name, data ) {
    return ( data && parseTemplate( name, data )) || ( cache[ name ] || '' );
  }

  /************
   * parseTemplate ( string [, array ] );
  ************/
  function parseTemplate( name, data ) {
    var i = 0, len, str='';
    if ( data.constructor === Array ) {
      len = data.length;
      for(; i < len; i++){
        str += replaceValues( name, data[i] );
      }
    } else {
      str = replaceValues( name, data );
    }
    return str;
  }

  /************
   * replaceValues ( string , object );
  ************/
  function replaceValues( name, data ) {
    var template = getTemplate(name);
    if ( template ){
      return template.replace(/{{([a-z_]+[a-z0-9_]*)}}/gi, function( tag, val ) {
        return data[ val ] ? data[ val ]  : '';
      });
    } else {
      return '';
    }
  }

  return {
    get : getTemplate,
    set : setTemplate
  };

}));
