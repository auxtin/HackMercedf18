const mongoDB = require('mongodb').MongoClient;
const url = 'mongodb+srv://' + (process.env.db_username || 'username') + ':' + (process.env.db_password || 'password') + '@hackmerced-1za3e.mongodb.net';
const connection = mongoDB.connect(url, {useNewUrlParser: true}).catch((e) => {
    console.log(e.message, "MONGODB");
});
const users = async () => {
    const completed_connection = await connection;
    return await completed_connection.db('main');
};
const resources = async () => {
    const completed_connection = await connection;
    return await completed_connection.db('resources');
};
module.exports.users = users;
module.exports.resources = resources;
