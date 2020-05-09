import { TelegrafContext } from "telegraf/typings/context"

export default async (ctx: TelegrafContext, next: any) => {
    if (ctx.chat.type === "private") {
        next();
    } else {
        ctx.reply("This command is for private only.");
    }
}
