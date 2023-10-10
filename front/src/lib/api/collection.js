import { PUBLIC_HOST } from "$env/static/public";

export const getCollection = async (task_uid, order) => {
    try {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const url = `${PUBLIC_HOST}/api/get-collections?user_uid=${task_uid}&order=${order}`;

        const response = await fetch(url, requestOptions);
        const result = await response.json();

        return result
    } catch (error) {
        console.error(error)
        return {
            status: false,
        };
    }
}

export const likeTask = async (task_uid, value) => {
    try {
        var headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("task_uid", task_uid);
        urlencoded.append("value", value);

        var requestOptions = {
            method: 'POST',
            headers,
            body: urlencoded,
            redirect: 'follow'
        };

        const url = `${PUBLIC_HOST}/api/like`;

        const response = await fetch(url, requestOptions)
        const result = await response.json();
    } catch (error) {
        console.error(error)
        return {
            status: false
        }
    }
}