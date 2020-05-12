# mtagbot
A Telegram bot to tag list of users.
Official deploy: [@matgbot](https://t.me/mtagbot)
----
## Installation

```bash
git clone git@github.com:redcodemohammed/mtagbot.git
cd matagbot
yarn
```
this will clone the repo and install all the dependencies.

Now create a nodemon.json file add add your token, mongodb url, port and Telegram id (get it from [@myidbot](https://t.me/myidbot))

it should look like this:
```json
{
    "env": {
        "token": "",
        "db": "",
        "ownerId":"",
        "PORT":""
    }
}
```

Next start the bot using the ```dev``` command:
```bash
yarn dev
```

## Commands
Command                 | Role       | Available at | Description
----------------------- | ---------- | ------------ | -----------------
`/groups`           | _Owner_    | _Private_ | Show list of groups the bot has joined.
`/leave`           | _Owner_    | _Private_ | Followed by group id, the bot will leave that group and delete it from the database.
`/spam`             | _Owner_    | _Groups_   | Tag everyone in tag list multiple times.
`/adduser`          | _Admin_    | _Groups_   | Add users to tag list.
`/removeuser`       | _Admin_    | _Groups_   | Remove users from tag list.
`/clear`            | _Admin_    | _Groups_   | Remove all users from tag list.
`/tag`              | _Everyone_ | _Groups_   | Tag everyone in the tag list. You can also send @all.
`/list`              | _Everyone_ | _Groups_   | List everyone in the tag list, without tagging them.
`/addme`            | _Everyone_ | _Groups_   | Add you to the tag list.
`/removeme`         | _Everyone_ | _Groups_   | Remove you from the tag list.

## How to use some commands

### /adduser
Use this command to add new users to the tag list, by replying to their message or by adding their usernames after the command.
#### example
```
/adduser @redcode9000 @mohammed92001
```

### /removeuser
Use this command to remove users from the tag list, by replying to their message or by adding their usernames after the command.
#### example
```
/removeuser @redcode9000 @mohammed92001
```

### /spam <n>
Use this command to tag users from the list n times.
#### example
```
/spam 4
```
### @admins
Use this command to tag all the admins in the chat.
