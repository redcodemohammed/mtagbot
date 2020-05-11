import { TelegrafContext } from "telegraf/typings/context"
import groupModel from "../../models/Group";


export default async (ctx: TelegrafContext, next: any) => {
    if (["group", "supergroup"].includes(ctx.chat.type)) {
        // see if it's the bot :
        let id = ctx?.update.message.new_chat_members[0].id;
        let botsId = ctx.botInfo.id

        if (id !== botsId) return next();
        //check if this chat is in the db:
        let groupId = ctx.chat.id.toString();
        let name = ctx.chat.title;

        let group = await groupModel.exists({ groupId });
        if (group) next();
        else {
            await groupModel.create({
                groupId,
                name
            });
        }
    } else {
        next();
    }
}
