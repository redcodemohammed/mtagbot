import { TelegrafContext } from "telegraf/typings/context"
import userModel from "../../models/User";

let owner_id = +process.env.ownerId || 0;

export default async (ctx: TelegrafContext) => {
    try {

        let groupId = ctx.message.chat.id
        let admins = await (await ctx.telegram.getChatAdministrators(groupId)).map(a => a.user.id);

        admins.push(owner_id);

        let senderId = ctx.message.from.id;

        if (admins.includes(senderId)) {
            let removed = await userModel.deleteMany({ group: String(groupId) });
            if (removed.deletedCount > 0) {
                ctx.reply("Everybody was removed!!");

            } else {
                ctx.reply("There is no one to remove :(")
            }
        } else {
            ctx.reply("You have to be admin to use this command");
        }
    } catch (err) {
        console.log(err);
    }

}
