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

const i18n = new I18n({
    directory: path.resolve(__dirname, '../locales'),
    sessionName: 'session',
    useSession: true,
});

const mainMenu = new Scene('mainMenu');

mainMenu.use(i18n.middleware());

mainMenu.enter((ctx) => {
    ctx.reply('Hello from main menu')
})


module.exports = {
    mainMenu
}