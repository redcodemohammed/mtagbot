import { Server } from "http";
import Telegraf from "telegraf";
import { connect } from "mongoose";
import addUser from "./commands/admin/addUser";
import tag from "./commands/everyone/tag";
import removeUser from "./commands/admin/removeUser";
import help from "./commands/everyone/help";
import removeMe from "./commands/everyone/removeMe";
import addMe from "./commands/everyone/addMe";
import handelNewGames from "./commands/bot/handelNewGames";
import getGroups from "./commands/owner/getGroups";

const token = process.env.token;
const db = process.env.db;
const PORT = process.env.PORT;

connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) {
        console.log(`Mongodb err ${err}`);
        process.exit();
    }
    console.log("connected to db");
});

const bot = new Telegraf(token);
const server = new Server((req, res) => res.end("Bot is working"));

bot.use(handelNewGames);
bot.command("adduser", addUser);
bot.command("tag", tag);
bot.command("removeuser", removeUser);
bot.command("help", help);
bot.command("removeme", removeMe);
bot.command("addme", addMe);
bot.command("groups", getGroups);
bot.launch();

server.listen(PORT);
