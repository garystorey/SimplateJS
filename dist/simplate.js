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
    if ( ! hasTemplate( name ) ) { cache[ name ] = data; return true; } else { return false; }
  }

  /************
   * getTemplate ( string [, array/object ] );
  ************/
  function getTemplate( name , data ){
    var tmpl =  (name.indexOf('#') === 0 ) ?
                document.getElementById( name.replace('#','') ).innerText :
                ( cache[name] || false );

    return ( data && parseTemplate( tmpl, data ) ) || tmpl;
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
        return data[ val ] ? data[ val ]  : '';
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
    if ( ! hasTemplate( name ) ) { cache[ name ] = data; return true; } else { return false; }
  }

  /************
   * getTemplate ( string [, array/object ] );
  ************/
  function getTemplate( name , data ){
    var tmpl =  (name.indexOf('#') === 0 ) ?
                document.getElementById( name.replace('#','') ).innerText :
                ( cache[name] || false );

    return ( data && parseTemplate( tmpl, data ) ) || tmpl;
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
        return data[ val ] ? data[ val ]  : '';
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
