console.log('await-event: test');

// Modules
require('babel-polyfill');

// jsdom + set
const JSDOM = require('jsdom');
global.document = JSDOM.jsdom('hogehoge');
global.head = document.head;
global.window = document.defaultView;

// API Hook
require("babel-register")({
	plugins: ['syntax-async-functions', 'syntax-do-expressions'],
	presets: ['es2015', 'es2016', 'stage-0'],
	ignore: false
});

const Cases = require('./cases.js').default;

Cases().then( (arg)=>{
	console.log('success');
}).catch( (error)=>{
	console.log('failed');
	throw new Error(error);
});
