import type { Engine, Command } from '@boardgamers/powergrid';
import Vue from 'vue';
import { EventEmitter } from 'events';

import Game from './components/Game.vue';

function launch (selector: string) {
  const params: {state: null | Engine; player?: number; emitter: EventEmitter} = { state: null, emitter: new EventEmitter() };

  const app = new Vue({
    render: (h) => h(Game, { props: params }, [])
  }).$mount(selector);

  const item: EventEmitter = new EventEmitter();
  let replaying = false;

  params.emitter.on('move', (move: Command) => item.emit('move', move));
  params.emitter.on('fetchState', () => item.emit('fetchState'));
  params.emitter.on('uplink:addLog', (data: string[]) => item.emit('addLog', data));
  params.emitter.on('uplink:replaceLog', (data: string[]) => item.emit('replaceLog', data));
  params.emitter.on('replay:info', (info: {start: number; current: number; end: number}) => item.emit('replay:info', info));

  item.addListener('state', data => {
    console.log('updating state to', data);
    params.state = data;
    app.$forceUpdate();
  });
  item.addListener('state:updated', () => item.emit('fetchLog', { start: params.state?.log.length }));
  item.addListener('player', data => {
    params.player = data.index;
    app.$forceUpdate();
  });
  item.addListener('replay:start', () => {
    params.emitter.emit('replayStart');
    replaying = true;
  });
  item.addListener('replay:to', (info) => {
    params.emitter.emit('replayTo', info);
  });
  item.addListener('replay:end', () => {
    params.emitter.emit('replayEnd');
    replaying = false;
    item.emit('fetchState');
  });
  item.addListener('gamelog', logData => {
    if (replaying) {
      return;
    }
    console.log('receiving log data', logData);
    params.emitter.emit('addLog', { start: logData.start, log: logData.data.log, availableMoves: logData.data.availableMoves });
  });

  return item;
}

export default launch;
