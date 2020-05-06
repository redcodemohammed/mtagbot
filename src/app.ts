import { Server } from "http";
import Telegraf from "telegraf";
import { connect } from "mongoose";
import addUser from "./commands/addUser";
import tag from "./commands/tag";
import removeUser from "./commands/removeUser";
import help from "./commands/help";
import removeMe from "./commands/removeMe";

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

bot.command("adduser", addUser);
bot.command("tag", tag);
bot.command("removeuser", removeUser);
bot.command("help", help);
bot.command("removeme", removeMe);
bot.launch();

server.listen(PORT);
