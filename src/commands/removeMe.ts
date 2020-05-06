import { TelegrafContext } from "telegraf/typings/context"
import { removeUser } from "../helpers/users";


export default async (ctx: TelegrafContext) => {
    try {
        let groupId = ctx.message.chat.id;
        let username = ctx.message.from.username;
        await removeUser(username, String(groupId));
        ctx.reply("Guess what! you were removed.");
    } catch (err) {
        console.log(err);
    }
};
