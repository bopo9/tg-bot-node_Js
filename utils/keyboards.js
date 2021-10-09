const {Markup, Extra} = require("telegraf");

const languageSelect = Markup.keyboard([['🇷🇺 - Начать', '🇺🇦 - Почати', '🇺🇸 - Start']]);

const mainMenusBtns = Markup.keyboard([['1','2','3','4','5']]);

// const menuForUserCheckQuestionnaire = Markup.keyboard([['Все верно', 'Нет, хочу оформить по новой']]);

const menuForUserCheckQuestionnaire = Markup.keyboard(
    [
        Markup.callbackButton('Все верно', 'Все верно'),
        Markup.callbackButton('Нет, хочу оформить по новой', 'Нет, хочу оформить по новой'),
    ]
);

module.exports = {
    languageSelect,
    menuForUserCheckQuestionnaire
}