import { Server } from "http";
import Telegraf from "telegraf";
import { connect } from "mongoose";
import addUser from "./commands/admin/addUser";
import tag from "./commands/everyone/tag";
import removeUser from "./commands/admin/removeUser";
import help from "./commands/everyone/help";
import removeMe from "./commands/everyone/removeMe";
import addMe from "./commands/everyone/addMe";
import autoTag from "./commands/bot/autoTag";
import getGroups from "./commands/owner/getGroups";
import spam from "./commands/owner/spam";
import clear from "./commands/admin/clear";

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

//bot:
bot.use(autoTag);

//admin:
bot.command("adduser", addUser);
bot.command("removeuser", removeUser);
bot.command("clear", clear);

//everyone:
bot.command("tag", tag);
bot.command("addme", addMe);
bot.command("help", help);
bot.command("removeme", removeMe);

//owner:
bot.command("groups", getGroups);
bot.command("spam", spam);

bot.launch();

server.listen(PORT);
