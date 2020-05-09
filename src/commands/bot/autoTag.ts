import { TelegrafContext } from "telegraf/typings/context"
import userModel from "../../models/User";

const tagOn = [
    "/startgame",
    "@all",
    ".tag"
]

export default async (ctx: TelegrafContext, next: any) => {
    let text = ctx?.update?.message?.text;
    let test = tagOn.find(el => text?.includes(el)) !== undefined
    if (test) {

        let group_id = ctx.message.chat.id;
        let users = await userModel.find({ group: String(group_id) });

        if (users.length > 0) {
            ctx.reply(users.map(u => u.username).join(" "));
        }
    } else {
        next();
    }
}
