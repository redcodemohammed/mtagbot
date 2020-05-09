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
import addGroup from "./commands/bot/addGroup";
import isGroup from "./middlewares/isGroup";
import isPrivate from "./middlewares/isPrivate";
import removeGroup from "./commands/bot/removeGroup";

const token = process.env.token;
const db = process.env.db;
const PORT = process.env.PORT;

connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
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
bot.use(isGroup, autoTag);
bot.on("new_chat_members", isGroup, addGroup);
bot.on("left_chat_member", isGroup, removeGroup);

//admin:
bot.command("adduser", isGroup, addUser);
bot.command("removeuser", isGroup, removeUser);
bot.command("clear", isGroup, clear);

//everyone:
bot.command("tag", isGroup, tag);
bot.command("addme", isGroup, addMe);
bot.command("removeme", isGroup, removeMe);
bot.command("help", help);

//owner:
bot.command("groups", isPrivate, getGroups);
bot.command("spam", isGroup, spam);

bot.launch();

server.listen(PORT);
