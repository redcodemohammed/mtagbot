import { TelegrafContext } from "telegraf/typings/context"
import groupModel from "../../models/Group";


export default async (ctx: TelegrafContext, next: any) => {
    if (["group", "supergroup"].includes(ctx.chat.type)) {
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
