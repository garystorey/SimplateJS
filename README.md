# SimplateJS
SimplateJS is a logicless templating system for JavaScript.  It weighs in at under 1KB and can be used when the big guys are way to much overhead or you just need something... well, simple. There are no external dependencies.

##Changelog
* ``0.4.0`` :
    * Unrecognized values are now left in templates instead of removed
    * "get" by Id now verifys that the 'document' object exists before trying to select
* ``0.3.0`` :
    * Added support for "get" by ID
    * Added automated QUnit test
    * Added new **has** method
* ``0.2.0`` : 
    * Added support for AMD/CommonJS
    * Added QUnit tests
* ``0.1.0`` :  Initial commit

##Examples
Link to SimplateJS in your HTML:

```javascript
<script src="/path/to/simplate.min.js"></script>
```

SimplateJS has three methods: **get** , **set** and **has**.

Create a new template using the **set** method:

```javascript
simplate.set( 'table.tr', '<tr><td>{{firstname}}</td><td>{{lastname}}</td></tr>' );
```
Check to see if a template exists using the **has** method:

```javascript
simplate.has( 'table.tr');
// true
```

There are four ways to use the **get** method.

Manipulate the template manually:

```javascript
var results = simplate.get('table.tr');
console.log( results );
//<tr><td>{{firstname}}</td><td>{{lastname}}</td></tr>
```
Parse a single data object:

```javascript
var results = simplate.get( 'table.tr', {'firstname' : 'John', 'lastname' : 'Doe' } );
console.log( results );
// <tr><td>John</td><td>Doe</td></tr>
```
Parse multiple data objects by passing an array of objects:

```javascript
// Sample data from API
var data = [
 {'firstname' : 'John', 'lastname' : 'Doe' },
 {'firstname' : 'Jane', 'lastname' : 'Doe' },
 {'firstname' : 'Jim', 'lastname' : 'Doe' }
];
var results = simplate.get( 'table.tr', data );
console.log( results );
// <tr><td>John</td><td>Doe</td></tr>
// <tr><td>Jane</td><td>Doe</td></tr>
// <tr><td>Jim</td><td>Doe</td></tr>
```

Read the template from an HTML ID.
```html
<script type="text/template" id="tableRow">
  <tr><td>{{firstname}}</td><td>{{lastname}}</td></tr>
</script>
```
```javascript
var results = simplate.get( '#tableRow', {'firstname' : 'John', 'lastname' : 'Doe' } );
console.log( results );
// <tr><td>John</td><td>Doe</td></tr>
```
**NOTE:** As of v`0.4.0` unrecognized values are left in the template.This allows the templating functionality to be used recursively like so:

```javascript
// Assume data object from previous example
simplate.set('table','<table><thead>{{thead}}</thead><tbody>{{tbody}}</tbody></table>');
simplate.set('table.thead','<tr><th>First Name</th><th>Last Name</th></tr>');
var results = simplate.get('table.tr', data); // previous example <tr><td>John</td><td>Doe</td></tr> etc
var thead = simplate.get('table.thead');
results = simplate.get('table', { 'tbody' : results, 'thead': thead } );
console.log( results );
// <table>
// <thead><tr><th>First Name</th><th>Last Name</th></tr></thead>
// <tbody>
// <tr><td>John</td><td>Doe</td></tr>
// ...
// <tbody>
// <table>


##TODO's
 * ~~Add tests~~ Added QUnit tests
 * ~~Add CommonJS , AMD support~~  Added support via UMD
 * Publish on NPM/Bower
 * Update documentation for use in Node/CommonJS

##More Info
[http://garystorey.com/2015/02/24/super-simple-javascript-templating/](http://garystorey.com/2015/02/24/super-simple-javascript-templating/)

##License
Released under MIT license
