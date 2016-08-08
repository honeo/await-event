// Modules
import AwaitEvent from '../';
import {EventEmitter} from 'events';

console.log('await-event: cases.js');

// var
const eventemitter = new EventEmitter();

/*
	EventEmitterとEventTargetのそれぞれ
*/
async function Cases(){

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

export default Cases;
