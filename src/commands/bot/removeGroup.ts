import { TelegrafContext } from "telegraf/typings/context"
import groupModel from "../../models/Group";
import userModel from "../../models/User";


export default async (ctx: TelegrafContext, next: any) => {
    if (["group", "supergroup"].includes(ctx.chat.type)) {
        // see if it's the bot :
        let id = ctx?.update.message.left_chat_member.id;
        let botsId = ctx.botInfo.id

        if (id !== botsId) return next();
        //check if this chat is in the db:
        let groupId = ctx.chat.id.toString();

        let group = await groupModel.exists({ groupId });
        if (group) {
            await groupModel.deleteMany({ groupId });
            await userModel.deleteMany({ group: groupId });
        }
        else {
            next();
        }
    } else {
        next();
    }
}
