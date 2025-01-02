
export const globalLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    sessionStorage.clear();
    window.location.replace('/login');
};