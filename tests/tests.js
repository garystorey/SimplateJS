
QUnit.test( "Testing SimplateJS: ", function( assert ) {

  var testString = '<div class="{{class}}"></div>';

  var testObject = { "class" : "test1" };
  var testObjectString = '<div class="test1"></div>';

  var testArray = [ { "class" : "test1" }, { "class" : "test2" }  ];
  var testArrayString = '<div class="test1"></div><div class="test2"></div>';


  /* Has SimplateJS been initialized? */
  assert.strictEqual( typeof simplate, 'object', " - Simplate is available." );

  /* Does the SET/GET functions exist? */
  assert.strictEqual( typeof simplate.set, 'function' , " - SET is available." );
  assert.strictEqual( typeof simplate.get, 'function' , " - GET is available." );
  assert.strictEqual( typeof simplate.has, 'function' , " - HAS is available." );

  /* Does the SET function work correctly? */
  assert.strictEqual( simplate.set( 'div', testString ), true , " - SET adds template." );

  /* Does the HAS function work correctly? */
  assert.strictEqual( simplate.has( 'div' ), true , " - HAS reads template." );

  /* Does the Get function work correctly? */
  assert.strictEqual( simplate.get( 'div' ), testString , " - GET (basic) returns template." );
  assert.strictEqual( simplate.get( 'div', testObject ), testObjectString , " - GET with data returns template correctly." );
  assert.strictEqual( simplate.get( 'div', testArray ), testArrayString , " - GET with data array returns template correctly." );

});
