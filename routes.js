var express = require("express")
var mongoose = require("mongoose")
var apiConfig = require("./apiconfig.json")

var Post = require("./model/post");

var router = express.Router();
//routes
router.get('/', (req,res) =>{
    res.json({
        message: "Hello how are you? :)"
    })
});
//get All for Web app
router.get('/getall', async (req,res) =>{
    try {
        var post = await Post.find();
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({message: err})
    }
})
//get all instance on a character
router.get('/character/:character', async (req,res) =>{
    try {
        var post = await Post.find({
            Character: req.params.character
        });
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({message: error})
    }
})
//Get one specific instance on one specific character
router.get('/inst/:character/:instID', async (req,res) =>{
    try {
        var post = await Post.findOne({
            Character: req.params.character,
            instID: req.params.instID
        });
        if(post === null) return res.status(404).json({message: '404 not found.'})
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({message: error})
    }
});
//Delete an instance on that character
router.delete('/delete/:character/:instID', async (req,res) =>{
    try {
        var removedPost = await Post.deleteOne({
            Character: req.params.character,
            instID: req.params.instID
        });
        if(removedPost === null) return res.status(404).json({message: '404 not found.'})
        res.status(200).json({message: "This instance has been delete as requested."})
    } catch (error) {
        res.status(500).json({message: error})
    }
});
//Update an instance
let messageAdd = +1
router.patch('/update/:character/:instID', async (req, res) =>{
    try {
        var updatePost = await Post.updateOne({
            Character: req.params.character, 
            instID: req.params.instID
        },
          {
            Money: req.body.Money,
            run: +1,
            date: Date.now()
            }
        );
        res.json({
            message: "The instance has been updated.",
            Money: req.body.Money,
            Last_Run: Date.now()

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "" + error})
    }
})
//Submit
router.post('/post', async (req,res) =>{
    var post = new Post({
        Character: req.body.Character,
        name: req.body.name,
        zone: req.body.zone,
        way: req.body.way,
        Money: req.body.Money,
        run: 1,
        instID: req.body.name.toLowerCase().replace(/\s/g,'')
    });
    try {
        var savedPost = await post.save()
        res.status(200).json(savedPost)        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error" + error
        })
    }
});

module.exports = router;