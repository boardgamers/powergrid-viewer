import launch from './launch';
import { Command, Engine } from "@boardgamers/powergrid";
import { cloneDeep } from "lodash";

const stripSecret = (x, player) => player ? x : x;

function launchSelfContained (selector = "#app") {
  const emitter = launch(selector);

  const gameState = new Engine();

  gameState.init(2, "seed");

  for (let i = 0; i < gameState.players.length; i++) {
    gameState.players[i].name = `Player ${i + 1}`;
  }

  // for (const player of gameState.players.slice(1)) {
  //   player.isAI = true;
  // }

  emitter.on("move", async (move: Command) => {
    const index = gameState.log.length;
    gameState.move(gameState.currentPlayer, move);

    setTimeout(() =>
      emitter.emit("gamelog", cloneDeep({
        start: index,
        data: {
          log: gameState.log.slice(index),
          availableMoves: gameState.availableCommands
        }
      })), 200);
  });

  emitter.on('fetchSate', () => emitter.emit("state", cloneDeep(stripSecret(gameState, 0))));

  emitter.on('addLog', data => console.log('addLog', data));
  emitter.on('replaceLog', data => console.log('replaceLog', data));

  emitter.emit("player", { index: 0 });
  emitter.emit("state", cloneDeep(stripSecret(gameState, 0)));
}

export default launchSelfContained;
