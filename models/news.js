const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
// const mongoosePaginate = require('mongoose-paginate');

const newsSchema = new mongoose.Schema({
    publisherName: String,
    publishedTime: { type: Date, default: Date.now },
    content: {
        type: new mongoose.Schema({
            image: String,
            video: String,
            text: String ,
        }),
    },
    comment: [
        {
            type: new mongoose.Schema({
                publisherName: String,
                publishedTime: { type: Date, default: Date.now },
                content: {
                    type: new mongoose.Schema({
                        image: String,
                        video: String,
                        text: String,
                    }),
                },
            }),
        },
    ],
    likedIdList: [
        {
            type: new mongoose.Schema({
                userId: String,
            })
        },
    ],
});
// newsSchema.plugin(mongoosePaginate); // <---- paginate

const News = mongoose.model("News", newsSchema);

const validateNews = (news) => {
    const schema = Joi.object({
        publisherName: Joi.string().required(),
        publishedTime: Joi.date().optional(),
        content: Joi.object({
            image: Joi.string().optional(),
            video: Joi.string().optional(),
            text: Joi.string().optional(),
        }),
        comment: Joi.array().items(
            Joi.object({
                publisherName: Joi.string().required(),
                publishedTime: Joi.date().optional(),
                content: Joi.object({
                    image: Joi.string().optional(),
                    video: Joi.string().optional(),
                    text: Joi.string().optional(),
                }),
            })
        ),
        likedIdList: Joi.array().items({userId: Joi.string()}).optional(),
    });
    return schema.validate(news);
};

exports.validate = validateNews;
exports.News = News;
