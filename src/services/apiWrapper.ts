export async function authApiCall(method: string, url: string, payload?: any) {
    const accessToken = localStorage.getItem('accessToken');
    const headers = { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${accessToken}`
    };
    const body = JSON.stringify(payload);
    return fetch(`http://localhost:3000/api/v1/${url}`, {method, headers, body});

}

export async function signInUpApiCall( url: string, payload?: any) {
    const headers = { 'Content-Type': 'application/json' };
    const method = 'POST';
    const body = JSON.stringify(payload); //'{email, password}' for sign-in, '{email, password, name}' for sign-up
    return fetch(`http://localhost:3000/api/v1/auth/${url}`, {method, headers, body}); //url is either 'sign-in' or 'sign-up'
}
