import { TelegrafContext } from "telegraf/typings/context"
import userModel from "../../models/User";
import groupModel from "../../models/Group";


export default async (ctx: TelegrafContext) => {
    try {
        if (ctx.message.chat.id === +process.env.ownerId) {

            let groups = (await groupModel.find()).map(group => {
                return `Title: ${group.name}\nId: ${group.groupId}\n---------`;
            })

            ctx.reply(groups.length > 0 ? groups.join("\n") : "No groups were found");
        } else {
            ctx.reply("You are not the owner.");
        }
    } catch (err) {
        console.log(err);
    }
};
