import { TelegrafContext } from "telegraf/typings/context"
import userModel from "../../models/User";


export default async (ctx: TelegrafContext) => {
    try {
        if (ctx.message.chat.id === +process.env.ownerId) {

            let users = await userModel.find();
            let groups = [... new Set(users.map(u => u.group))];
            let result = [];
            for (let g of groups) {
                try {
                    let data = await ctx.telegram.getChat(String(g));
                    result.push(`Title: ${data.title}\nId: ${data.id}\n---------`);
                } catch{
                    //
                }
            }
            ctx.reply(result.join("\n"));
        } else {
            ctx.reply("You are not the owner, or you sent the command in a public chat.");
        }
    } catch (err) {
        console.log(err);
    }
};
