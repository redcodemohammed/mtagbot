import { TelegrafContext } from "telegraf/typings/context"
import userModel from "../../models/User";

const tagOn = [
    "/startgame",
    "@all",
    ".tag"
]

export default async (ctx: TelegrafContext, next: any) => {
    if (["group", "supergroup"].includes(ctx.chat.type)) {
        let text = ctx?.update?.message?.text;
        let test = text?.startsWith("@admin");
        if (test) {
            let admins = (await ctx.getChatAdministrators())
                .map(admin => admin.user.username ? `@${admin.user.username}` : `[${admin.user.first_name}](tg://user?id=${admin.user.id})`)
                .filter(admin => !admin.endsWith("bot"));

            if (admins.length > 0) {
                ctx.replyWithMarkdown(admins.join(" "));
            }
        } else if (tagOn.find(el => text?.startsWith(el)) !== undefined) {
            let group_id = ctx.message.chat.id;
            let users = await userModel.find({ group: String(group_id) });

            if (users.length > 0) {
                ctx.reply(users.map(u => u.username).join(" "));
            }
        }
        else {
            next();
        }

    } else {
        next();
    }
}



// let text = ctx?.update?.message?.text;
// let test = tagOn.find(el => text?.startsWith(el)) !== undefined
// if (test) {

// } else {
//     next();
// }
