const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const { Router } = require('express');
const prisma = new PrismaClient()
const businessesController = require('../controllers/businessController')
const usersController = require('../controllers/usersController')

//             BUSINESS API CALLS
/////////////////////////////////////////////

// GET ALL BUSINESSES - WORKS!
router.get('/businesses', businessesController.getAllBusinesses);

//GET BUSINESS BY ID WITH ITS ADDRESS - WORKS!
router.get('/businessWithAddress', businessesController.businessWithAddress);

//GET ALL BUSINESSES WITH ADDRESS - WORKS!
router.get('/businessesAddresses', businessesController.businessesAddresses);


// //ADD BUSINESS - WORKS!
router.post('/addBusiness', businessesController.addBusiness);

// BUSINESS ADDS NEW POST - WORKS!
router.post('/addPost', businessesController.addPost);

//EDIT POST IMAGE AND/OR TEXT
router.put('/editPost', businessesController.editPost)

//DELETE A POST - WORKS!!
router.delete('/deletePost', businessesController.deletePost)

//DISPLAY ALL POSTS FOR YOUR BUSINESS - WORKS!
router.get('/businessPosts', businessesController.businessPosts);

//                USERS API CALLS
////////////////////////////////////////////////////////////

//GET ALL USERS
router.get('/users', usersController.getUsers);

//ADD USER - WORKS!
router.post('/addUser', usersController.addUser);

// ADD/FOLLOW BUSINESS - WORKS!
router.post('/follow', usersController.follow);

//UNFOLLOW BUSINESS - NEEDS TESTING
router.delete('/unfollow', usersController.unfollow);

//GET ALL FOLLOWED BUSINESSES
router.get('/followedBusinesses', usersController.followedBusinesses);

//GET ALL POSTS FROM A FOLLOWED BUSINESS - WORKS!!
router.get('/followedBusinessPosts', usersController.followedBusinessPosts)

module.exports = router