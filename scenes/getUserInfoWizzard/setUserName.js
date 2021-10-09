const {
    Telegraf,
    session,
    Context,
    Stage,
    Markup,
    Extra,
    Scenes,
    Composer} = require('telegraf');

const I18n = require('telegraf-i18n');
const path = require("path");
const { enter, leave } = Stage;
const {languageSelect} = require('../../utils/keyboards');

const i18n = new I18n({
    directory: path.resolve(__dirname, '../../locales'),
    sessionName: 'session',
    useSession: true,
});

const setUserName = new Composer();

setUserName.use(i18n.middleware());

setUserName.on('text', (ctx) => {
   ctx.session.name = ctx.message.text;
   ctx.reply('Укажи свой возраст !');
   return ctx.wizard.next();
});

setUserName.on('sticker', (ctx) => {
    ctx.reply('Укажи имя!!');
});

setUserName.on('photo', (ctx) => {
    ctx.reply('Укажи имя!!');
});

setUserName.on('video', (ctx) => {
    ctx.reply('Укажи имя!!');
});


// setLanguage.on('text',  (ctx) => {
//     ctx.reply('Лучше выбери язык!');
// })



module.exports = {
    setUserName
}