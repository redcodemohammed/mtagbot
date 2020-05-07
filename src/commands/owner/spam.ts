import { TelegrafContext } from "telegraf/typings/context"
import userModel from "../../models/User";


export default async (ctx: TelegrafContext) => {
    try {
        if (ctx.message.from.id === +process.env.ownerId) {
            let times = +ctx.message.text.split(" ")[1];
            if (!times) {
                ctx.reply("Please specify how many times to spam. /spam <n>")
            } else {

                let timer = 1;
                let interval = setInterval(async () => {
                    if (timer === times) clearInterval(interval);

                    let groupId = ctx.message.chat.id
                    let users = await userModel.find({ group: String(groupId) });

                    if (users.length > 0) {
                        ctx.reply(`${users.map(u => `${u.username}`).join(" ")}`);
                    } else {
                        clearInterval(interval);
                        ctx.reply("No users yet, try /help to know how to add them");
                    }
                    timer++;
                }, 1000);
            }
        } else {
            ctx.reply("You are not the owner.");
        }

    } catch (err) {
        console.log(err);
    }
};
