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

const setLanguage = new Composer();

setLanguage.use(i18n.middleware());

setLanguage.hears('🇷🇺 - Начать', (ctx) => {
    ctx.i18n.locale('ru');
    ctx.session.locale = 'ru';
    ctx.reply('🇷🇺' + ctx.i18n.t('lang') + '\n Как тебя зовут ?');
    return ctx.wizard.next();
});


setLanguage.hears('🇺🇸 - Start', (ctx) => {
    ctx.i18n.locale('en');
    ctx.session.locale = 'en'
    ctx.reply('🇺🇸 ' + ctx.i18n.t('lang') + '\n Как тебя зовут ?');
    return ctx.wizard.next();
});

setLanguage.hears('🇺🇦 - Почати',  (ctx) => {
    ctx.i18n.locale('ua');
    ctx.session.locale = 'ua'
    ctx.reply('🇺🇦 ' + ctx.i18n.t('lang') + '\n Как тебя зовут ?');
    return ctx.wizard.next();
});

setLanguage.on('text',  async (ctx) => {
    await ctx.reply('Лучше выбери язык!');
})



module.exports = {
    setLanguage,
    languageSelect
}