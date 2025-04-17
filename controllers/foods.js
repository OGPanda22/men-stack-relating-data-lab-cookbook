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
    //Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);

    //Use the .deleteOne() method to delete a food using the id supplied from req.params
      currentUser.pantry.id(req.params.itemId).deleteOne();

    //Save changes to the user
      await currentUser.save();

    //Redirect back to the index view
      res.redirect(`/users/${currentUser._id}/foods`);

    //If any errors, log them and redirect back home /
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
});

router.get('/:itemId/edit', async (req, res) => {
    try {
    //Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);

    //Find the current food from the id using req.params
      const item = currentUser.pantry.id(req.params.itemId);

    //This route should res.render() an edit.ejs view
      res.render('foods/edit.ejs', { 

    //Send the current food to the view via res.locals
        item: item });

    //If any errors, log them and redirect back home /
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
});

router.put('/:itemId', async (req, res) => {
    //find user from req.session
    try {
    const currentUser = await User.findById(req.session.user._id);

    //find current food from id supplied by req.params
    const item = currentUser.pantry.id(req.params.itemId);
    
     // Update food item with new form data
      item.set(req.body);

    // Save changes to the user document
      await currentUser.save();
    
    //redirect back to index
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {

    //if any errors, log them and redirect back to home
      console.log(error);
      res.redirect('/');
    };
});

module.exports = router;