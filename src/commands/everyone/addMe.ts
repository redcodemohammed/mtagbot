import { TelegrafContext } from "telegraf/typings/context"
import { addUser } from "../../helpers/users";


export default async (ctx: TelegrafContext) => {
    try {
        let groupId = ctx.message.chat.id;
        let username = ctx.message.from.username;
        await addUser(`@${username}`, String(groupId));
        ctx.reply("Guess what! you were added.");
    } catch (err) {
        console.log(err);
    }
};
