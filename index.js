// Modules
import {is, not} from '@honeo/type-check';

/*
	メモ
		ブラウザのDOMイベントはremoveEventListener
		EventEmitterとChrome拡張機能はremoveListener
*/
function AwaitEvent(target, type, ...args){

	// doだとコケたから取りあえず即時関数
	const [add, remove] = (function(){
		if( is.func(target.addEventListener, target.removeEventListener) ){
			return ['addEventListener', 'removeEventListener'];
		}else if( is.func(target.addListener, target.removeListener) ){
			return ['addListener', 'removeListener'];
		}else{
			throw new TypeError('invalid argument: 1');
		}
	}());

	if( not.str(type) ){
		throw new TypeError('invalid argument: 2');
	}

	return new Promise( (resolve, reject)=>{
		// resolveして解除、resolveを参照するためここに置く
		function listener(e){
			resolve(e);
			this[remove](type, listener);
		}
		target[add](type, listener, ...args);
	});
}

export default AwaitEvent;
