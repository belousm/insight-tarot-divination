import { PUBLIC_HOST } from "$env/static/public";

export const getTask = async (task_uid) => {
    try {
        var headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'GET',
            headers,
            redirect: 'follow'
        };

        const url = `${PUBLIC_HOST}/api/result?task_uid=${task_uid}`;

        console.log(url)

        const response = await fetch(url, requestOptions);
        const result = await response.json();

        console.log(result)

        return result
    } catch (error) {
        console.error(error)
        return {
            status: false,
        };
    }
}

export const getCardOfDay = async (user_uid) => {
    try {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const url = `${PUBLIC_HOST}/api/get-day?user_uid=${user_uid}`;

        const response = await fetch(url, requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.error(error)
        return {
            status: false,
        }
    }
}

export const selectTask = async (task_uid, ids) => {
    try {
        var headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("task_uid", task_uid);
        urlencoded.append("card_ids", JSON.stringify(ids));

        var requestOptions = {
            method: 'POST',
            headers,
            body: urlencoded,
            redirect: 'follow'
        };

        const url = `${PUBLIC_HOST}/api/select`

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