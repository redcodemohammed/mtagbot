import { TelegrafContext } from "telegraf/typings/context"

export default async (ctx: TelegrafContext) => {
    const commands = [
        "This is the commands list:",
        "For admins:",
        "/adduser - in reply to message or followed by list of usernames, the bot will add them to the tag list of this chat.",
        "/removeuser - in reply to message or  followed by list of usernames, the bot will remove them from the tag list of this chat.",
        "",
        "For anyone:",
        "/tag - will tag everyone in the tag list"
    ];
    ctx.reply(commands.join("\n"));
}
