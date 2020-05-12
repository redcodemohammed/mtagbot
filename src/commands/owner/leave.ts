import { TelegrafContext } from "telegraf/typings/context"
import userModel from "../../models/User";
import groupModel from "../../models/Group";


export default async (ctx: TelegrafContext) => {
    try {
        if (ctx.message.chat.id === +process.env.ownerId) {
            let groupId = ctx?.message?.text?.split(" ")?.filter(g => g)[1];
            if (!groupId) return ctx.reply("Please select a group for me to leave.");

            if (!groupId.startsWith("-")) groupId = "-".concat(groupId);

            let group = await groupModel.findOne({ groupId });


            if (!group) ctx.reply("Sorry, that group is not in the DB.");
            else ctx.telegram.leaveChat(groupId);
        } else {
            ctx.reply("You are not the owner.");
        }
    } catch (err) {
        console.log(err);
    }
};
