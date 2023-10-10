import { PUBLIC_HOST } from "$env/static/public";

export const divinationTypes = {
    "Card of the day": 0,
    "Yes/No": 1,
    "Celtic cross": 2,
    "3-Card Spread": 3,
    "question": 4,
    "5-Card Spread": 5,
}

export const typesDivination = [
    "Card of the day",
    "Yes/No",
    "Celtic cross",
    "3-Card Spread",
    "question",
    "5-Card Spread"
]

export const getCards = async (user_id, t, subt) => {
    try {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        let typeSend = divinationTypes[t] ?? 4;

        const url = `${PUBLIC_HOST}/api/get-cards?user_uid=${user_id}&type=${typeSend}&subtype=${typeSend == 4 ? t.replace("&", " ") : subt != undefined ? subt.replace("&", " ") : subt}`

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