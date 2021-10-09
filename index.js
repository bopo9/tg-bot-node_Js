const Telegraf = require('telegraf')
const Composer = require('telegraf/composer')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
const RedisSession = require('telegraf-session-redis');
const {newUserScene} = require("./scenes/getUserInfoWizzard/index")
const {mainMenu} = require("./scenes/mainMenuScene");
const {getUserDataForCheck} = require("./scenes/getUserDataForCheck");
const {Extra} = require("telegraf");
const {MongoClient} = require('mongodb');
const {languageSelect} = require('./utils/keyboards');

const bot = new Telegraf('1707078555:AAH6z7unPmnWZ6C41bsBIhWbzG83Vsrth64');

const {checkUserReg,createUser} = require('./dataBase/db')

const session = new RedisSession({
    store: {
        host: '127.0.0.1',
        port: 6379
    },
    ttl: 10
});

bot.use(session);

const users = [
    {
        id: 360289720,
        name: 'Boris',
        username: 'borisdev'
    }
];

const stage = new Stage([newUserScene, mainMenu, getUserDataForCheck], { default: mainMenu});

bot.use(stage.middleware());


bot.command('/start',  async (ctx) => {
    if (await checkUserReg(ctx.from.id).catch(console.log)){
        return ctx.scene.enter('newUserScene');
    }
    return ctx.reply('Привет, с возвращением, боец!');
});

bot.command('/session', (ctx) => {
    ctx.scene.enter('getUserDataForCheck');
});

bot.launch();