const {MongoClient} = require('mongodb');



const client =  new MongoClient('mongodb+srv://megauser:Boriska090998@cluster0.nhcbd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const checkUserReg = async (userId) => {
    try {
        await client.connect();
        const database = client.db("tg_bot");
        const users = database.collection("users");

        const query = { tgId: userId };
        const options = {

            sort: { tgId: -1 },

            projection: { tgId: 1},
        };
      return !await users.findOne(query, options);
    }finally {
        await client.close();
    }
}

const getUserDataById = async (userId) => {
    try {
        await client.connect();
        const database = client.db("tg_bot");
        const users = database.collection("users");
        const query = { tgId: userId };
        return users.findOne(query);
    }finally {

    }
}

const createUser = async (userId, locale, name, age,) => {
    try {
        await client.connect();
        const database = client.db("tg_bot");
        const users = database.collection("users");
        const doc = {
            tgId: userId,
            user_locale: locale,
            first_name: name,
            user_age: age,
        }
        const result = await users.insertOne(doc);
    }finally {
        await client.close();
    }
}


module.exports = {
    checkUserReg,
    getUserDataById,
    createUser,

}