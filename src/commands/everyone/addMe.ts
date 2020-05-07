import { TelegrafContext } from "telegraf/typings/context"
import { addUser } from "../../helpers/users";
import userModel from "../../models/User";


export default async (ctx: TelegrafContext) => {
    try {
        let groupId = ctx.message.chat.id;
        let username = ctx.message.from.username;
        // check if the user is there:
        let exists = await userModel.findOne({ username: `@${username}`, group: String(groupId) });
        if (!exists) {
            await addUser(`@${username}`, String(groupId));
            ctx.reply("Guess what! you were added.");
        } else {
            ctx.reply("You are already in the list.");
        }
    } catch (err) {
        console.log(err);
    }
};
