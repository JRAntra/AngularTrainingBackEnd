const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    publisherName: String,
    publishedTime: { type: Date, default: Date.now },
    content: {
        type: new mongoose.Schema({
            image: String,
            video: String,
            text: String,
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
            type: String,
        },
    ],
});

const News = mongoose.model("News", newsSchema);

const validateNews = (news) => {
    const schema = Joi.object({
        publisherName: Joi.string(),
        publishedTime: Joi.date().optional(),
        content: Joi.object({
            image: Joi.string(),
            video: Joi.string(),
            text: Joi.string(),
        }),
        comment: Joi.array().items(
            Joi.object({
                publisherName: Joi.string(),
                publishedTime: Joi.date(),
                content: Joi.object({
                    image: Joi.string(),
                    video: Joi.string(),
                    text: Joi.string(),
                }),
            })
        ),
        likedIdList: Joi.array().items(Joi.string()),
    });
    return schema.validate(news);
};

exports.validate = validateNews;
exports.News = News;
