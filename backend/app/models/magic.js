const {getCardNamesFromTask, dict} = require("./common");
const {ai} = require("../ai");

/**
* This module facilitates the interpretation of tarot cards using AI. It contains several functions that support different
* types of tarot card reading layouts and interprets the meaning of the cards drawn in those layouts. The AI model used
* for interpretation is GPT-4. The tarot reading tasks are processed based on their type and status, and the results are
* stored back in the task object.
*
* - `magic_runner(task)`: The main function that dispatches the task to appropriate handler based on task's type and status.
* - `magic_one(task, prompt)`: Handles single card tarot readings, invokes the AI model and saves the result in task object.
* - `magic_multi(task, prompt)`: A generic handler for multiple cards readings, supports different layouts.
* - `magic_celtic(task)`: Handles Celtic Cross spread tarot readings, invokes magic_multi with appropriate prompt.
* - `magic_three(task)`: Handles Three Cards spread tarot readings, invokes magic_multi with appropriate prompt.
* - `magic_question(task)`: Handles Question spread tarot readings, invokes magic_multi with appropriate prompt.
* - `magic_five(task)`: Handles Five Cards spread tarot readings, invokes magic_multi with appropriate prompt.
*/

async function magic_runner(task) {
    if (task.status !== dict.TASK_STATUS_RUNNING) {
        return false;
    }

    if (task.type === dict.TASK_TYPE_DAY || task.type === dict.TASK_TYPE_YES_NO) {
        let prompt = 'What does it mean if, when fortune telling for the Day in the Tarot, a card appears "%card%"';
        if (task.type === dict.TASK_TYPE_YES_NO) {
            prompt = 'You are a tarot reader, and you are telling fortunes for a client.\n' +
                'What does it mean if, when doing a Yes/No fortune telling, the card “%card%” appears in the Tarot? Please answer in the format “Your answer to the question: (Yes or No) and then write a short interpretation of the card';
        }

        return await magic_one(task, prompt);
    }

    if (task.type === dict.TASK_TYPE_CELTIC) {
        return await magic_celtic(task);
    }

    if (task.type === dict.TASK_TYPE_THREE) {
        return await magic_three(task);
    }

    if (task.type === dict.TASK_TYPE_QUESTION) {
        return await magic_question(task);

    }

    if (task.type === dict.TASK_TYPE_FIVE) {
        return await magic_five(task);
    }

    return false;
}

async function magic_one(task, prompt) {
    let cards = getCardNamesFromTask(task);
    if (cards.length > 0) {
        prompt = prompt.replace('%card%', cards[0]);
    }

    const ai_res = await ai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4-0314',
    });

    if (ai_res.choices.length > 0) {
        let answer = ai_res.choices[0]['message']['content'];
        console.log(prompt, answer);

        task.processed_cards = JSON.stringify([{card:cards[0], meaning:answer}]);
        task.prompt_request = prompt;
        task.prompt_response = answer;
        task.status = dict.TASK_STATUS_SUCCESS;
        await task.save();
    }

    return true;
}

async function magic_multi(task, prompt) {
    prompt = prompt.replace('%subtype%', task.subtype);

    let cards = getCardNamesFromTask(task);
    if (cards.length > 0) {
        for (let i in cards) {
            let card_name = cards[i];
            prompt = prompt.replace('%card'+i.toString()+'%', card_name);
        }
    }

    const ai_res = await ai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4-0314',
    });

    if (ai_res.choices.length > 0) {
        let answer = ai_res.choices[0]['message']['content'];
        console.log('prompt: ', prompt, 'answer: ', answer);

        try {
            let processed_cards = [];
            let data = JSON.parse(answer);
            await data.results.forEach(item => {
                processed_cards.push(item);
            });

            task.processed_cards = JSON.stringify(processed_cards);
            task.prompt_request = prompt;
            task.prompt_response = answer;
            task.status = dict.TASK_STATUS_SUCCESS;
            task.description = data.description || null;
            await task.save();
        } catch (e) {
            console.error(e);
        }
    }
}

async function magic_celtic(task) {
    let prompt = 'You are a tarot reader, and you are telling fortunes for a client. What does the layout mean by topic %subtype% Celtic cross if:\n' +
        '1. Present Situation: "%card0%"\n' +
        '2. Challenge: "%card1%"\n' +
        '3. Foundation/Distant Past: "%card2%"\n' +
        '4. Recent Past: "%card3%"\n' +
        '6. Best Outcome: "%card4%"\n' +
        '6. Near Future: "%card5%"\n' +
        '7. You as You Are: "%card6%"\n' +
        '8. Influence/Environmental factors: "%card7%"\n' +
        '9. Hopes and Fears: "%card8%"\n' +
        '10. Outcome/Final Result: "%card9%"\n\n' +
        'In response, give a json list like {results:[{card:"card name", meaning:"what does this card mean to me based on the situation in front of the card"}], description:"description"}\n'+
        'Please also make a short summary of the results and put the result in the "description" of this object\n The card, meaning, description fields must be filled in; you cannot add other keys to the array';


    await magic_multi(task, prompt);
    return true;
}

async function magic_three(task) {
    let prompt = 'You are a tarot reader, and you are telling fortunes for a client, Tarot spread for 3 cards, if you get:'+
        'Past: card: "%card0%"\n'+
        'Present: card: "%card1%"\n'+
        'Future: card: "%card2%"\n'+
        'In response, give a json list like {results:[{card:"card name", meaning:"what does this card mean to me based on the situation in front of the card"}], description:"description"}\n'+
        'Please also make a short summary of the results and put the result in the "description" of this object\n The card, meaning, description fields must be filled in; you cannot add other keys to the array';

    await magic_multi(task, prompt);
    return true;
}

async function magic_question(task) {
    let prompt = 'You are a tarot reader, and you are telling fortunes for a client, here is a fortune-telling layout like a question on the topic %subtype%, ' +
        'if: Past - card: "%card0%"\n' +
        'Present - card: "%card1%"\n' +
        'Future - card: "%card2%"\n' +
        'In response, give a json list like {results:[{card:"card name", meaning:"what does this card mean to me based on the situation in front of the card"}], description:"description"}\n'+
        'Please also make a short summary of the results and put the result in the "description" of this object\n The card, meaning, description fields must be filled in; you cannot add other keys to the array';

    await magic_multi(task, prompt);
    return true;
}

async function magic_five(task) {
    let prompt = 'You are a tarot reader, and you are telling a fortune to a client, here is the Tarot layout for 5 cards, if:\n' +
        'Current situation - card "%card0%\n' +
        'Past influence - card "%card1%"\n' +
        'Future influences - card "%card2%"\n' +
        'External factors - card "%card3%"\n' +
        'Advice or answer - card "%card4%"\n' +
        'In response, give a json list like {results:[{card:"card name", meaning:"what does this card mean to me based on the situation in front of the card"}], description:"description"}\n'+
        'Please also make a short summary of the results and put the result in the "description" of this object\n The card, meaning, description fields must be filled in; you cannot add other keys to the array';

    await magic_multi(task, prompt);
    return true;
}

module.exports = {
    magic_runner,
    magic_one,
    magic_celtic,
    magic_three,
    magic_question,
    magic_five
}