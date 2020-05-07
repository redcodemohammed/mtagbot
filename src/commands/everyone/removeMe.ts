import { TelegrafContext } from "telegraf/typings/context"
import { removeUser } from "../../helpers/users";
import userModel from "../../models/User";


export default async (ctx: TelegrafContext) => {
    try {
        let groupId = ctx.message.chat.id;
        let username = ctx.message.from.username;
        // check if the user is there:
        let exists = await userModel.findOne({ username: `@${username}`, group: String(groupId) });
        if (exists) {
            await removeUser(`@${username}`, String(groupId));
            ctx.reply("Guess what! you were removed.");
        } else {
            ctx.reply("You are not even in the list.");
        }
    } catch (err) {
        console.log(err);
    }
};
