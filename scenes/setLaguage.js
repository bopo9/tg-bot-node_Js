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
const { enter, leave } = Scenes.Stage;

const i18n = new I18n({
    directory: path.resolve(__dirname, '../locales'),
    sessionName: 'session',
    useSession: true,
});

const languageSelect = Markup.keyboard([['🇷🇺 - Начать', '🇺🇦 - Почати', '🇺🇸 - Start']]);

const setLanguage = new Scenes.BaseScene('setLanguage');

setLanguage.enter(ctx => {
    return ctx.reply('Выбери язык:', languageSelect.oneTime().resize());
})

setLanguage.use(i18n.middleware());
setLanguage.use(session());


setLanguage.hears('🇷🇺 - Начать', (ctx) => {
    ctx.i18n.locale('ru');
    ctx.scene.session.local = 'ru';
    ctx.reply('🇷🇺' + ctx.i18n.t('lang'));
    return ctx.scene.leave();
});


setLanguage.hears('🇺🇸 - Start', (ctx) => {
    ctx.i18n.locale('en');
    ctx.scene.session.local = 'en'
    ctx.reply('🇺🇸 ' + ctx.i18n.t('lang'));
    return ctx.scene.leave();
});

setLanguage.hears('🇺🇦 - Почати',  (ctx) => {
    ctx.i18n.locale('ua');
    ctx.scene.session.local = 'ua'
    ctx.reply('🇺🇦 ' + ctx.i18n.t('lang'));
    return ctx.scene.leave();
});

setLanguage.on('text',  (ctx) => {
    ctx.reply('Лучше выбери язык!');
})



module.exports = {
    setLanguage,
}