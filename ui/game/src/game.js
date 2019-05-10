import * as status from './status';

export function playable(data) {
  return data.game.status.id < status.ids.aborted;
}

export function isPlayerPlaying(data) {
  return playable(data) && !data.player.spectator;
}

export function isPlayerTurn(data) {
  return isPlayerPlaying(data) && data.game.player === data.player.side;
}
