import { Schema, model, Document } from "mongoose";

export interface User extends Document {
    username: string,
    group: String
};

export const UserSchema = new Schema({
    username: String,
    group: String
});

export const userModel = model<User>("user", UserSchema);

export default userModel
