import { PUBLIC_HOST } from "$env/static/public";

export const getUser = async (uid) => {
    try {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const url = `${PUBLIC_HOST}/api/user?user_uid=${uid}`

        const response = await fetch(url, requestOptions);
        const result = await response.json()

        return result;
    } catch (error) {
        console.error(error)
        return {
            status: false,
        };
    }
}

export const setUser = async (body) => {
    try {
        var headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();

        for (let item in body) {
            urlencoded.append(item, body[item])
        }

        var requestOptions = {
            method: 'POST',
            headers,
            body: urlencoded,
            redirect: 'follow'
        };

        const url = `${PUBLIC_HOST}/api/user`

        const response = await fetch(url, requestOptions)
        const result = await response.json();

        return result;
    } catch (error) {
        console.error(error)
        return {
            status: false,
        };
    }
}