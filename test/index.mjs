console.log('await-event: test');

// Modules
import JSDOM from 'jsdom';
import AwaitEvent from '../';
import events from 'events';

// jsdom + set
global.document = JSDOM.jsdom('hogehoge');
global.head = document.head;
global.window = document.defaultView;


// var
const {EventEmitter} = events;
const eventemitter = new EventEmitter();

/*
	EventEmitterとEventTargetのそれぞれ
*/
async function main(){

	setTimeout( ()=>{
		eventemitter.emit('hoge', {fuga: 'piyo'});
	}, 100);

    const e_ee = await AwaitEvent(eventemitter, 'hoge');

	if(e_ee.fuga!=='piyo'){
		throw new Error(e_ee.fuga);
	}

	setTimeout( function(){
		document.body.click();
	}, 100);

	const e_et = await AwaitEvent(document.body, 'click', false);

	if(e_et.type!=='click'){
		throw new Error(e_et.type);
	}

	return true;
}

main().then( (arg)=>{
	console.log('success');
}).catch( (error)=>{
	console.log('failed');
	throw new Error(error);
});
