const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const { Router } = require('express');
const prisma = new PrismaClient()

//             BUSINESS API CALLS
/////////////////////////////////////////////

// GET ALL BUSINESSES - WORKS!
router.route('/businesses').get(async (req, res) => {
    try {

        const businesses = await prisma.businesses.findMany();

        res.status(200).json(businesses);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

});

//GET BUSINESS BY ID WITH ITS ADDRESS - WORKS!
router.route('/businessWithAddress').get(async (req, res) => {
    try {

        const businessAddress = await prisma.businesses.findUnique({
            where: {
                id: 1,
            },
            select: {
                biz_name: true,
                address: true,
            },
        })
        res.status(200).json(businessAddress);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//GET ALL BUSINESSES WITH ADDRESS - WORKS!
router.route('/businessesaddresses').get(async (req, res) => {
    try {
        const allBizAddresses = await prisma.businesses.findMany({
            select: {
                biz_name: true,
                address: true,
            }
        })
        res.status(200).json(allBizAddresses);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


// //ADD BUSINESS - WORKS!
router.route('/addBusiness').post(async (req, res) => {
    const business = req.body.data;
    try {

        const newBusiness = await prisma.businesses.create({
            data: {
                name: business.biz_name,
                email: business.email,
                password: business.password,
                business_type: business.business_type,
                address: business.address,
                image: business.image,
            }
        })
        res.status(200).json(newBusiness);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// BUSINESS ADDS NEW POST - WORKS!
router.route('/addPost').post(async (req, res) => {
    const post = req.body.data;
    try {

        const newPost = await prisma.post.create({
            data: {
                business_id: post.business_id,
                business: post.biz_name,
                image: post.image,
                comment: post.body,
            }
        })
        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//EDIT POST IMAGE AND/OR TEXT
router.route('/editPost').put(async (req, res) => {
    const post = req.body.data;
    try {
        const editPost = await prisma.post.update({
            where: {
                id: post.id
            },
            data: {
                image: post.image,
                comment: post.body,
            },
        })
        res.status(200).json(editPost);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//DELETE A POST - WORKS!!
router.route('/deletePost').delete(async (req, res) => {
    const post = req.body.data;
    try {
        const deletePost = await prisma.post.delete({
            where: {
                id: post.id
            }
        })
        res.status(200).json(deletePost);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

//                USERS API CALLS
////////////////////////////////////////////////////////////

//ADD USER - WORKS!
router.route('/addUser').post(async (req, res) => {
    const user = req.body.data;
    try {
        const newUser = await prisma.users.create({
            data: {
                name: user.name,
                email: user.email,
                username: user.username,
                password: user.password,
                address: user.address,
                image: user.image
            }
        })
        res.status(200).json(newUser);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// ADD/FOLLOW BUSINESS - WORKS!
router.route('/follow').post(async (req, res) => {
    const business = req.data.body;
    try {
        const followedBusiness = await prisma.association_table.create({
            data: {
                business_id: business.business_id,
                user_id: business.user_id
            }
        })
        res.status(200).json(followedBusiness);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

})

//UNFOLLOW BUSINESS - NOT FINISHED
router.route('/unfollow').delete(async (req, res) => {
    // const business = req.data.body;
    try {
        const unfollowBusiness = await prisma.association_table.delete({
            where: {
                id: 1
            }
        })
        res.status(200).json(unfollowBusiness);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

//GET ALL POSTS FROM A FOLLOWED BUSINESS
// router.route('/followedBusiness').get(async (req, res) => {
//     try {
//         const businessPosts = await prisma.post.findUnique({
//             where: {
//                 business_id: 1
//             },
//             select: {
//                 post
//             }
//         })
//     }
// });

module.exports = router