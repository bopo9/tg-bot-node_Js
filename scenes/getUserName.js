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

const getUserName = new Scenes.BaseScene('getUserName');

getUserName.enter(async ctx => {
    await ctx.reply('Назови своё имя, странник.');
});

getUserName.on('text',  (ctx) => {
   ctx.scene.session.name = ctx.message.text;
    return ctx.scene.leave();
});

getUserName.use(i18n.middleware());
getUserName.use(session());



module.exports = {
    getUserName,
}