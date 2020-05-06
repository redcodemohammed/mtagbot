import userModel from "../models/User";

/**
 * This function will add list of users to the bot.
 * @param username the username of the user to add.
 * @param group the group id.
 * @returns boolean true if the user was removed or false;
 */
async function addUser(username: string, group: string) {
    let user = {
        username: username,
        group: group
    };

    let exists = await userModel.exists(user);
    if (exists) {
        return;
    }
    await userModel.create(user);
}

/**
 * This function will remove list of users from the bot.
 * @param username the username of the user to remove.
 * @param group the group id.
 * @returns boolean true if the user was removed or false;
 */
async function removeUser(username: string, group: string) {
    let user = {
        username: username,
        group: group
    };

    let exists = await userModel.exists(user);
    if (exists) {
        await userModel.deleteOne(user);
    }
}


export {
    addUser, removeUser
}
