// import packages
import { Server } from "http";
import Telegraf from "telegraf";
import { connect } from "mongoose";

// bot
import autoTag from "./commands/bot/autoTag";
import addGroup from "./commands/bot/addGroup";
import removeGroup from "./commands/bot/removeGroup";

// admin
import addUser from "./commands/admin/addUser";
import removeUser from "./commands/admin/removeUser";
import clear from "./commands/admin/clear";

// everyone
import tag from "./commands/everyone/tag";
import help from "./commands/everyone/help";
import removeMe from "./commands/everyone/removeMe";
import addMe from "./commands/everyone/addMe";
import list from "./commands/everyone/list";

// owner
import getGroups from "./commands/owner/getGroups";
import spam from "./commands/owner/spam";

// middlewares
import isGroup from "./middlewares/isGroup";
import isPrivate from "./middlewares/isPrivate";

// bot settings
const token = process.env.token;
const db = process.env.db;
const PORT = process.env.PORT;

// connect to db
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

// init bot and a server
const bot = new Telegraf(token);
const server = new Server((req, res) => res.end("Bot is working"));

// //bot:
bot.use(autoTag);
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
bot.command("list", list);

//owner:
bot.command("groups", isPrivate, getGroups);
bot.command("spam", isGroup, spam);

// start
bot.launch();
server.listen(PORT);
