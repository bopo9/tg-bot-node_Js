const {
    Telegraf,
    session,
    Context,
    Stage,
    Markup,
    Extra,
    Scenes,
    Composer} = require('telegraf');

const {createUser} = require('../../dataBase/db');

const I18n = require('telegraf-i18n');
const path = require("path");
const { enter, leave } = Stage;
const {languageSelect} = require('../../utils/keyboards');

const i18n = new I18n({
    directory: path.resolve(__dirname, '../../locales'),
    sessionName: 'session',
    useSession: true,
});

const setUserAge = new Composer();

setUserAge.use(i18n.middleware());

setUserAge.on('text', async (ctx) => {
    ctx.session.age = ctx.message.text;
    await ctx.reply('done');
    await createUser(ctx.from.id, ctx.session.locale, ctx.session.name, ctx.session.age).catch(console.log);
    return ctx.scene.enter('getUserDataForCheck');
});


module.exports = {
    setUserAge
}