import { Schema, model, Document } from "mongoose";

export const groupSchema = new Schema({
    groupId: {
        type: String,
        unique: true
    },

    name: String,

    ignore: {
        type: [],
        default: []
    }
});

export interface group extends Document {
    groupId: string,
    name: string,
    ignore: [{
        username: string,
        at: Date
    }]
}

export const groupModel = model<group>("group", groupSchema);

export default groupModel;
