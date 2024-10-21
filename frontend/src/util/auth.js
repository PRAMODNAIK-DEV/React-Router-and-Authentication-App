import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedExpiratioinDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpiratioinDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();      // If this is negative means the token expired or not expired.

    return duration;
}

export const getAuthToken = ()=>{
    const token = localStorage.getItem('token');

    const tokenDuration = getTokenDuration();

    if(!token){
        return null;
    }
    
    if(tokenDuration < 0){
        return 'EXPIRED';
    }
    return token;
}

export const tokenLoader = ()=>{
    return getAuthToken();
}

// This is added because, even though we have a protection that without the token can't submit the data to backend, but the user still can access that route, to avid that adding one extra level of proextion
export function checkAuthLoader() {
    const token = getAuthToken();

    if(!token){
        return redirect('/auth');
    }

    return null;
}