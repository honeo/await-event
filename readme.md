# await-event
* [honeo/await-event](https://github.com/honeo/await-event)  
* [@honeo/await-event](https://www.npmjs.com/package/@honeo/await-event)

## なにこれ
Promiseインスタンスを返し、イベントを一度だけ掴んでresolve(event)する。  
ブラウザ拡張機能のAPIでも動く（といいなと思っている）。

## 使い方
```sh
$ npm i @honeo/await-event
```

### Browser (EventTarget)
```js
import AwaitEvent from '@honeo/await-event';

// or Dynamic import, CDN
const AwaitEvent = await import('https://cdn.rawgit.com/honeo/await-event/master/index.mjs').then( (mod)=>{
	return mod.default;
});



(async function(){
	const event = await AwaitEvent(document.body, 'click', false);
	console.log(event.type); // "click"
}());

document.body.click();
```

### Node.js (EventEmitter)
```js
import AwaitEvent from '@honeo/await-event';
import {EventEmitter} from 'events';

const eventemitter = new EventEmitter();

(async function(){
	const event = await AwaitEvent(eventemitter, 'hoge');
	console.log(event.fuga); // "piyo"
}());

eventemitter.emit('hoge', {fuga: 'piyo'});
```
