import PostModel from "../models/Post.js";

/*
export const getOne = async (req, res) => {
    try {
        // take dinamic param 'id' from request
        const postId = req.params.id
        PostModel.findOneAndUpdate(
            { _id: postId, },
            { $inc: {viewsCount: 1}, },
            //{returnDocement: 'after',},
            { new: true, },
            (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Post was not received',
                });
            }

            if(!doc) {
                return res.status(404).json({
                    message: 'Post was not found',
                });
            }
            res.json(doc)
            }
        );
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Post was not received',
        })
    }
}
*/

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Post was not created',
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id
        const getOne = await PostModel.findOneAndUpdate(
            {_id: postId},
            {$inc: {viewsCount: 1}},
            {new: true}
        );

        if (!getOne) {
            return res.status(404).json({
                message: 'Post was not found',
            });
        }

        res.json(getOne);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Post was not received',
        });
    }
}

export const getAll = async (req, res) => {
    try {
        //receive all posts, connect with user-author, exec???
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Posts was not received',
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id
        const remove = await PostModel.findOneAndDelete({
                _id: postId
            });
        /*if (err) {
            console.log(err);
                return res.status(500).json({
                   message: "Post wasn't delete"
                });
            }*/
        if (!remove) {
            return res.status(404).json({
                  message: 'Post not found'
                  });
            }
            res.json({
                success: true,
            });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Post was not received',
        });
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id
        const update = await PostModel.findOneAndUpdate({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });
        res.json({
            success: true
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Post was not updated',
        });
    }
}
