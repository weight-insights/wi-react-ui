import { authApiCall } from './apiWrapper';
import type { GameDto } from '../types/GamesDto';


export function getAllUsersGames() {
  const url = 'games';
  return authApiCall('GET', url);
}
export type CreateGamePayload = Pick<
  GameDto,
  | 'name'
  | 'startDate'
  | 'gameLength'
  | 'gameTimeZone'
  | 'gamePeriod'
  | 'minWeightLoss'
  | 'weightUnit'
  | 'fee'
  | 'currency'
  | 'vacationLength'
>;

export function createGame(
  game: CreateGamePayload
): Promise<Response> {
  return authApiCall('POST', 'games', game);
}
