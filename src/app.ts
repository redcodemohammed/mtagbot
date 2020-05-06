import Telegraf from "telegraf";
import { connect } from "mongoose";
import addUser from "./commands/addUser";
import tag from "./commands/tag";
import removeUser from "./commands/removeUser";
import help from "./commands/help";

const token = process.env.token;
const db = process.env.db;

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

bot.command("adduser", addUser);
bot.command("tag", tag);
bot.command("removeuser", removeUser);
bot.command("help", help);
bot.launch();
