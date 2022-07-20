import Posts from "../db/PostsModel.js";
import User from "../db/UserModel.js";
import fs from "fs";
const PostsController = {
  getPagination: (req, res, next) => {
    let username = req.query.user;
    let page = req.query.page;
    let limit = req.query.limit;
    let from = page * limit;
    let load = (page + 1) * limit;
    if (username) {
      User.findOne({ username }).exec((err, result) => {
        if (err) throw err;
        let friends = result.following.map((el) => el.username);
        console.log("friends", friends);
        Posts.find({ username: { $in: friends } })
          .sort({ timestamps: -1 })
          .populate("author")
          .exec((err, result) => {
            if (err) throw err;
            let pageRes = result.slice(from, load);
            // pageRes.populate('User').execPopulate()
            return res.send(pageRes);
          });
      });
    } else {
      Posts.find()
        .sort({ timestamps: -1 })
        .populate("author")
        .exec((err, result) => {
          if (err) throw err;
          let pageRes = result.slice(from, load);
          // pageRes.populate('User').execPopulate()
          return res.send(pageRes);
        });
    }
  },
  getByUser: (req, res, next) => {
    Posts.find({ username: req.params.username })
      .sort({ timestamps: -1 })
      .exec((err, result) => {
        if (err) throw err;
        if (!result) return res.status(404).send("empty post");
        return res.json(result);
      });
  },
  getByMentions: (req, res, next) => {
    Posts.find({ tag: req.params.username })
      .populate("author")
      .sort({ timestamps: -1 })
      .exec((err, result) => {
        if (err) throw err;
        if (!result) return res.status(404).send("empty post");
        console.log("by mentions", result);
        return res.json(result);
      });
  },
  getDetail: (req, res, next) => {
    Posts.findById(req.params.postId)
      .populate("author")
      .exec((err, result) => {
        if (err) throw err;
        if (!result) return res.json({ msg: "post not found" });
        return res.json(result);
      });
  },
  post: (req, res, next) => {
    let images = req.file ? req.file.path : "";
    console.log("images", images);
    let { author, username, caption, tag } = req.body;
    console.log("tag", tag);
    let post = new Posts({
      author,
      username,
      images,
      caption,
    });
    post.save((err, result) => {
      if (err) return res.status(500).send(err);
      console.log(result);
      // return res.json(result)
      if (tag) {
        Posts.findByIdAndUpdate(
          result._id,
          { $push: { tag: { $each: tag } } },
          { new: true }
        ).exec((err, data) => {
          if (err) throw err;

          let notif_message = "just tags you in their post";
          for (var i = 0; i < tag.length; i++) {
            User.findOneAndUpdate(
              { username: tag[i] },
              {
                $push: {
                  notification: {
                    subject: username,
                    refer: result._id,
                    notif_type: "tag",
                    notif_message: notif_message,
                  },
                },
              }
            );
          }
        });
      }
      return res.json(result);
    });
  },
  edit: (req, res, next) => {
    let { caption } = req.body;
    Posts.findByIdAndUpdate(
      req.params.postId,
      { $set: { caption } },
      { new: true }
    )
      .populate("author")
      .exec((err, result) => {
        if (err) throw err;
        return res.json(result);
      });
  },
  delete: (req, res, next) => {
    Posts.findById(req.params.postId).exec((err, result) => {
      console.log("del res", result);
      let file = result.images;
      Posts.deleteOne({
        _id: req.params.postId,
      }).exec((err, result) => {
        if (err) return res.status(500).send(err);
        console.log("delete post", result);
        // fs.unlink(file,(err)=>{
        //   console.log('file deleted',result.images)
        // })
        return res.json({ msg: "delete success" });
      });
    });
  },
  likes: (req, res, next) => {
    let { postId, username } = req.params;
    let { fullname, avatar } = req.body;
    Posts.findOne({
      likes: { username: username },
    }).exec((err, isLiked) => {
      if (!isLiked) {
        console.log(isLiked);
        Posts.findByIdAndUpdate(
          postId,
          { $push: { likes: { username, fullname, avatar } } },
          { new: true }
        )
          .populate("author")
          .exec((err, result) => {
            if (err) console.log(err);
            let notif_message = "just likes to your post";
            User.findOne({
              username: result.username,
              notification: {
                subject: username,
                refer: postId,
                notif_type: "likes",
              },
            }).exec((err, notif) => {
              let alreadyNotif = notif;
              console.log("notif", alreadyNotif);
              if (username !== result.username && alreadyNotif == null) {
                User.findOneAndUpdate(
                  { username: result.username },
                  {
                    $push: {
                      notification: {
                        subject: username,
                        refer: postId,
                        notif_type: "likes",
                        notif_message: notif_message,
                      },
                    },
                  },
                  { new: true }
                ).exec(() => {
                  console.log("notif added");
                });
              }
            });
            return res.json(result);
          });
      }
    });
  },
  unlike: (req, res, next) => {
    let { postId, username } = req.params;
    let { fullname, avatar } = req.body;
    Posts.findByIdAndUpdate(
      postId,
      {
        $pull: {
          likes: { username, fullname, avatar },
        },
      },
      { new: true }
    )
      .populate("author")
      .exec((err, result) => {
        if (err) console.log(err);
        res.json(result);

        return;
      });
  },
};

export default PostsController;
