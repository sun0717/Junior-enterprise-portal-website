const TokenKey = 'user'

export function getToken() {
    return localStorage.getItem(TokenKey);
}

export function removeToken() {
    return localStorage.removeItem(TokenKey);
}