import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    conversationId:{
        type: String
    },
    senderId:{
        type: String
    },
    receiverId:{
        type: String
    },
    text:{
        type: String
    },
    type:{
        type: String
    }
},
{
    timestamps: true
})

const message = mongoose.model('message',messageSchema)

export default message