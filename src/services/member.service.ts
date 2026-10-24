import { authApiCall } from './apiWrapper';

export function createMemberForThisGame(weightGoal: number) {
    const url = 'members';
    return authApiCall('POST', url, weightGoal);
}
