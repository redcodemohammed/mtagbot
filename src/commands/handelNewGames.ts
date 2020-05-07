import { TelegrafContext } from "telegraf/typings/context"
import userModel from "../models/User";

export default async (ctx: TelegrafContext, next: any) => {
    if (ctx.update.message.text.includes("/startgame")) {

        let group_id = ctx.message.chat.id;
        let users = await userModel.find({ group: String(group_id) });

        if (users.length > 0) {
            ctx.reply(users.map(u => u.username).join(" "));
        }
    } else {
        next();
    }
}
