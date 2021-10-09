const {
    Telegraf,
    session,
    Context,
    Stage,
    Markup,
    Extra,
    Composer} = require('telegraf');

const Scene  = require('telegraf/scenes/base');

const I18n = require('telegraf-i18n');
const path = require("path");
const { enter, leave } = Stage;

const {menuForUserCheckQuestionnaire} = require('../utils/keyboards');

const {getUserDataById} = require('../dataBase/db');

const i18n = new I18n({
    directory: path.resolve(__dirname, '../locales'),
    sessionName: 'session',
    useSession: true,
});

const getUserQuestionnaire = async (ctx) => {
    try {
        const user = await getUserDataById(ctx.from.id);
        await ctx.reply('Твоя анкета выглядит вот так:', Extra.markup(menuForUserCheckQuestionnaire.oneTime().resize()));
        ctx.replyWithHTML(`Имя: ${user.first_name} \nВозраст: ${user.user_age} \nЯзык: ${user.user_locale}`);
    }catch (err){
        console.log(err)
    }
}

const getUserDataForCheck = new Scene('getUserDataForCheck');

getUserDataForCheck.use(i18n.middleware());

getUserDataForCheck.enter((ctx) => {
    getUserQuestionnaire(ctx);
});


getUserDataForCheck.hears('Все верно', async (ctx) => {
    await ctx.reply('Ну тогда иди обниму ❤');
    return ctx.scene.leave();
});

getUserDataForCheck.hears('Нет, хочу оформить по новой', async (ctx) => {
    await ctx.reply('Опять все по новой, да как же вы достали кожанные ублюдки 🙄🙄');
    return ctx.scene.leave();
});

module.exports = {
    getUserDataForCheck
}