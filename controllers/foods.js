const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab
router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      res.render('foods/index.ejs', { pantry: currentUser.pantry });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

router.get('/new', async (req,res)=>{
    res.render('foods/new.ejs');
});

router.post('/', async (req, res) => {
    try {
    //Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);

    //Push req.body (the new form data object) to the pantry array of the current user.
      currentUser.pantry.push(req.body);
    
    //Save changes to the user
      await currentUser.save();

    //Redirect back to the application’s index view.
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
    //If any errors, log them and redirect back home /
      console.log(error);
      res.redirect('/');
    }
});

router.delete('/:itemId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.pantry.id(req.params.itemId).deleteOne();
      await currentUser.save();
      res.redirect(`/users/${user._id}/foods`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
});

router.get('/:itemId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const item = currentUser.pantry.id(req.params.itemId);
      res.render('foods/edit.ejs', { item });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
});

router.put('/:itemId', async (req, res) => {
    //find user from req.session
    try {
      const currentUser = await User.findById(req.session.user._Id);

    //find current food from id supplied by req.params
      const food = user.pantry.id(req.params.itemId);

     // Update food item with new form data
      food.set(req.body);

    // Save changes to the user document
      await user.save();
    
    //redirect back to index
      res.redirect(`/users/${user._id}/foods`);
    } catch (error) {

    //if any errors, log them and redirect back to home
      console.log(error);
      res.redirect('/');
    };
});

module.exports = router;