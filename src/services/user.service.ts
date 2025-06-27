export function signIn(email: string, password: string): Promise<any>{
    const url = 'http://localhost:3000/api/v1/auth/sign-in';
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ email, password });
    return fetch(url, { method, headers, body });
}

export function signUp(email: string, password: string, name: string): Promise<any>{
    const url = 'http://localhost:3000/api/v1/auth/sign-up';
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ email, password, name });
    return fetch(url, {method, headers, body});
}

