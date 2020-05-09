import { TelegrafContext } from "telegraf/typings/context"

export default async (ctx: TelegrafContext) => {
    const commands = [
        "This is the commands list:",
        "For admins:",
        "/adduser - in reply to message or followed by list of usernames, the bot will add them to the tag list of this chat.",
        "/removeuser - in reply to message or  followed by list of usernames, the bot will remove them from the tag list of this chat.",
        "/clear - will clear the tag list of a group.",
        "",
        "For anyone:",
        "/tag - will tag everyone in the tag list, you can also send @all.",
        "/addme - will add you to the tag list",
        "/removeme - will remove you from tag list"
    ];
    ctx.reply(commands.join("\n"));
}
