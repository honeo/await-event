# await-event
[honeo/await-event](https://github.com/honeo/await-event)  
[@honeo/await-event](https://www.npmjs.com/package/@honeo/await-event)

## なにこれ
promiseを返し、イベントを一度だけ掴んでresolve(event)する。  
Chrome拡張機能とその互換APIでも動けばいいなと思っている。

## 使い方
```sh
$ npm i -S await-event
```

### Browser (EventTarget)
```js
import AwaitEvent from 'await-event';

(async function(){
	const event = await AwaitEvent(document.body, 'click', false);
	console.log(event.type); // "click"
}());

document.body.click();
```

### Node.js (EventEmitter)
```js
import AwaitEvent from 'await-event';
import {EventEmitter} from 'events';

const eventemitter = new EventEmitter();

(async function(){
	const event = await AwaitEvent(eventemitter, 'hoge');
	console.log(event.fuga); // "piyo"
}());

eventemitter.emit('hoge', {fuga: 'piyo'});
```
