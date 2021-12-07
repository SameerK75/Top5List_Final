const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5CListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [Object], required: true },
        views: {type: Number, required: true},
        likes: {type: [String], required: true},
        dislikes: {type: [String], required: true},
        comments: {type: [Object], required: true},
        published: {type: Boolean, required: true},
        publishDate: {type: String, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5CList', Top5CListSchema)