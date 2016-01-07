# AsyncOrder for NodeJS

AsyncOrder is simple solution for making "callback hell" more readable and just for making simple callback chains

##Installation
Use [NPM](http://npmjs.org) to install this module:

	$ npm install async-order

##Dependencies

Well, none. It's pure JS solution

##Example

```javascript

		var http = require('http');
		var AsyncOrder = require('async-order');

		var p = new AsyncOrder(); //Creating new chain

		//Every step add link on given function in our chain.
		p.step(function(next) { //Given function recieves callback as argument, that needs to be executed to continue chain execution
		  http.get('http://google.com/', next); //Calling async function, used 'next' as our callback
		}).step(function(next, res) { //Next step recieves not only callback, but also arguments recieved by previous 'next' callback
		  console.log('Headers: ' + res.headers);
		  next('Sample text :b'); //Of course you may just call it by yourself and give it needed arguments
		}).step(function(next, msg) {
		  console.log('We got your message, friend: ' + msg);
		  throw new Error('You used too much characters in your message');
		}).catch(function(err) {
		  console.log('General, we a problem: ' + err.message);
		}).done();

```