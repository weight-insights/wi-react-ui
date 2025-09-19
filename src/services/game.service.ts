import { authApiCall } from './apiWrapper';

export function getAllUsersGames() {
  const url = 'games';
  return authApiCall('GET', url);
}