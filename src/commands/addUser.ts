import { TelegrafContext } from "telegraf/typings/context"
import { addUser } from "../helpers/users";

export default async (ctx: TelegrafContext) => {
    let groupId = ctx.message.chat.id
    let admins = await (await ctx.telegram.getChatAdministrators(groupId)).map(a => a.user.id);
    let senderId = ctx.message.from.id;
    if (admins.includes(senderId)) {

        let usernames = ctx.message.text.split(" ")
        usernames.shift();
        if (usernames.length > 0) {
            if (!usernames.every(username => username.startsWith("@"))) {
                let invalidUsernames = usernames.filter(username => !username.startsWith("@"));
                return ctx.reply(`These usernames are invalid [ ${invalidUsernames.join(", ")} ], I will ignore them.`);
            }
            let users = usernames.map(user => ({
                username: user,
                group: groupId,
            }));

            //add them to db.
            for await (const user of users) {
                await addUser(user.username, String(user.group));
            }

            ctx.reply(`[ ${usernames.join(", ")} ], was added, I will tag them next time`);
        } else {
            let reply_to_message = ctx.update.message.reply_to_message;
            let username = reply_to_message?.from.username;
            if (!username) {
                return ctx.reply("You have to reply to a message.");
            } else {

                //add to db.
                await addUser(username, String(groupId));
                ctx.reply(`${username}, was added I will tag that user next time`);
            }
        }

    } else {
        ctx.reply("You have to be admin to use this command");
    }

}
