import { TelegrafContext } from "telegraf/typings/context"
import userModel from "../models/User";

export default async (ctx: TelegrafContext) => {
    let groupId = ctx.message.chat.id
    let users = await userModel.find({ group: String(groupId) });

    if (users.length > 0) {
        return ctx.reply(`${users.map(u => `@${u.username}`).join(" ")}`);
    }
    ctx.reply("No users yet, try /help to know how to add them");
};
