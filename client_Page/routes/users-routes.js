const User = require('../../landing_Page/models/user-model');
const router = require("express").Router();

//update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin){
        if (req.body.password){
            try{
                req.body.password = await bcrypt.hash(req.body.password, 10);
            } catch (err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated")

        } catch (err){
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update only your account!"); 
    }
})


//delete user
router.delete("/:id", async (req, res) =>{
    if (req.body.userId === req.params.id || req.body.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
})


//get a user
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, updateAt, ...other} = user._doc
        res.status(200).json(other)
    } catch (err) {
        res.status(500).json(err);
    }
})


//follow a user
router.put("/:id/follow", async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.follows.includes(req.body.userId)){
                await user.updateOne({ $push: {followers: req.body.userID} });
                await currentUser.updateOne({ $push: {followings: req.params.id} });
                res.status(200).json("user has been followed")
            } else {
                res.status(403).json("you already follow this user")
            }

        } catch (err) {
            res.status(500).json(err)
        }
    }else {
        res.status(403).json("you cant follow yourself")
    }

});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.follows.includes(req.body.userId)){
                await user.updateOne({ $pull: {followers: req.body.userID} });
                await currentUser.updateOne({ $pull: {followings: req.params.id} });
                res.status(200).json("user has been unfollowed")
            } else {
                res.status(403).json("you don't follow this user")
            }

        } catch (err) {
            res.status(500).json(err)
        }
    }else {
        res.status(403).json("you cant unfollow yourself")
    }

});


module.exports = router;