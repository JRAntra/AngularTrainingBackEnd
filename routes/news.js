const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const auth = require("../middleware/auth");

const { News, validate } = require("../models/news");

// router.get('/', auth, async (req, res) => {
router.get("/", async (req, res) => {
  const news = await News.find().sort({ id: 1 });
  res.send(news);
});

// router.get('/:id', async (req, res) => {
//     const news = await News.findOne({id: req.params.id});
//     res.send(news);
// });

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const news = new News(req.body);

  await news.save();
  res.send(news);
});

// router.post('/:id', async (req, res) => {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const newsitem = await News.findOne({id: req.params.id});
//     questions.questions.push(req.body);
//     (await questions).save();

//     res.send(questions);
// })

router.patch("/addComment/:id", async (req, res) => {
  const news = await News.find({ _id: req.params.id });
  if (!news.length) {
      return res.status(404).send(JSON.stringify("Story not found."));
  }

  const query = { _id: req.params.id };
  const update = {
    $push: {
      comment: {
        publisherName: req.body.publisherName,
        publishedTime: req.body.publishedTime,
        content: {
          image: req.body.content.image,
          video: req.body.content.video,
          text: req.body.content.text,
        },
      },
    },
  };
  const options = { upsert: false };
  News.updateOne(query, update, options)
    .then((result) => {
      const { matchedCount, modifiedCount } = result;
      if (matchedCount && modifiedCount) {
        console.log(`Successfully added a new comment.`);
      }
    })
    .catch((err) => console.error(`Failed to add comment: ${err}`));

  res.send(await News.find(query));
});

router.delete("/deletePost/:id", async (req, res) => {
  const news = await News.find({ _id: req.params.id });

  if (!news.length)
    return res.status(404).send(JSON.stringify("Post is not exist."));

  await News.deleteOne({ _id: req.params.id });
  res.send(JSON.stringify("Post has been deleted."));
});

// const validateQuestion = question => {
//     const schema = Joi.object({
//         id: Joi.number().required(),
//         title: Joi.string().max(200).required(),
//         selections: Joi.array().items(Joi.string().max(500)).required(),
//         correct: Joi.array().items(Joi.string().max(500)).required(),
//         confirmed: Joi.boolean()
//     });
//     return schema.validate(question);
// }

module.exports = router;
