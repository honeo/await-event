/*
	メモ
		ブラウザのDOMイベント解除メソッドはremoveEventListener
		EventEmitterとChrome拡張機能はremoveListener
*/

/*
	本体
		引数
			1: eventtarget or eventemitter
			2: string
				監視するイベント名
			3~: any
				そのままイベント登録関数に渡されるoptions
*/
function AwaitEvent(target, type, ...args){

	// 使用する関数名の割り出し
	const [add, remove] = (function(){
		if( isFunc(target.addEventListener, target.removeEventListener) ){
			return ['addEventListener', 'removeEventListener'];
		}else if( isFunc(target.addListener, target.removeListener) ){
			return ['addListener', 'removeListener'];
		}else{
			throw new TypeError('invalid argument: 1');
		}
	}());

	if( typeof type!=='string' ){
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

function isFunc(...args){
	return args.every( (arg)=>{
		return typeof arg==='function';
	});
}

export default AwaitEvent;
