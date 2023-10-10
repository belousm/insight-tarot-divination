// use .env config file
require('dotenv').config();

// run db
const db = require('./db.js');
db.authenticate().catch(error => console.error(error));

// setup web server Express
const express = require("express");
const bodyParser = require('body-parser');

// run open-ai
const { ai } = require('./ai.js');

// setup models
const Cards = require('./models/cards.model.js');
const Tasks = require('./models/tasks.model.js');
const Users = require('./models/users.model.js');

(async () => {
    // sync models (update schemes) once
    console.log('Sync tables..');
    await Cards.sync();
    await Tasks.sync();
    await Users.sync();
})();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// include routes with business logic
require('./routes/user.route.js')(app);
require('./routes/task.route.js')(app);

app.get("/", function(request, response){
    response.send("ok");
});

// only local access for test
app.get("/test-ai", async function(request, response){
    let data = {};
    data['run'] = await ai.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3.5-turbo',
    });
    data['list'] = await ai.models.list();

    console.log(data);
    response.json(data);
});

// webhook for telegram requests
app.all("/tg", async function(request, response) {
    try {
        const chatId = request.body.message.chat.id;
        let telegramBotToken = process.env.TG_APIKEY;
        let mini_app_url = process.env.TG_MINI_APP_URL || 'https://t.me';

        fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: 'Remember, the cards offer guidance, but the future is not set in stone. Let\'s explore the mystical world of tarot together!\n' +
                    '\n' +
                    '🌟 Let\'s begin your tarot journey! 🌟',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'READ FORTUNE 🧿', web_app: { url: mini_app_url }}],
                    ],
                },
            }
            ),
        }).catch(error => {
            console.log(error);
        });

    } catch (e) {
        console.error(e);
    }

    response.json({status:true});
});


// run APP
app.listen(80, '0.0.0.0');