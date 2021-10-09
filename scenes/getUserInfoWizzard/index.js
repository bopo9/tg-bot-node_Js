const {Extra} = require("telegraf");
const WizardScene = require('telegraf/scenes/wizard');
const {languageSelect} = require("../../utils/keyboards");
const {setLanguage} = require("./setLaguage");
const {setUserName} = require("./setUserName");
const {setUserAge} = require("./setUserAge");
const {createUser} = require("../../dataBase/db");


const newUserScene = new WizardScene(
    'newUserScene',
    (ctx) => {
        ctx.reply('Для начала выбери язык: ', Extra.markup(languageSelect.oneTime().resize()));
        return ctx.wizard.next();
    },
    setLanguage,
    setUserName,
    setUserAge,
);

module.exports = {
    newUserScene
}