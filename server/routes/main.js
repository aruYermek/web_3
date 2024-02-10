const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');

//Home Get
router.get('', async (req, res) => {
    const locals = {
        title: "Blog",
        description: "asxdcfvg"
    }

    try {
        const data = await Post.find();
        res.render('index', { locals, data });
    } catch (error) {
        console.log(error)
    }

});

//get post

router.get('/post/:id', async (req, res) => {

    try {

        let slug = req.params.id;

        const data = await Post.findById({ _id: slug });

        const locals = {
            title: data.title,
            description: "asxdcfvg"
        }

        res.render('post', { locals, data });
    } catch (error) {
        console.log(error)
    }

});

//get to add new post
router.get('/add-post',  async (req, res) => {
    try {
        const locals = {
            title: 'Add Post',
            description: 'new.'
        }

        const data = await Post.find();
        res.render('./partials/add-post.ejs', {
            locals,
            data
        });

    } catch (error) {
        console.log(error);
    }

});

//post a new post
router.post('/add-post', async (req, res) => {
console.log(req.body);
        try {
            const newPost = new Post({
                title: req.body.title,
                body: req.body.body
            });

            await Post.create(newPost);
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }

});

//get to update
router.get('/edit-post/:id',  async (req, res) => {
    try {
  
      const locals = {
        title: "Edit Post",
        description: "update",
      };
  
      const data = await Post.findOne({ _id: req.params.id });
  
      res.render('./partials/edit-post.ejs', {
        locals,
        data
      })
  
    } catch (error) {
      console.log(error);
    }
  
  });
  

//put updated
router.put('/edit-post/:id', async (req, res) => {
    try {
  
      await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now()
      });
  
      res.redirect(`/`);
  
    } catch (error) {
      console.log(error);
    }
  
  });

 //delete post
router.delete('/delete-post/:id', async (req, res) => {

    try {
      await Post.deleteOne( { _id: req.params.id } );
      res.redirect('/');
    } catch (error) {
      console.log(error);
    }
  
  });
  





module.exports = router;