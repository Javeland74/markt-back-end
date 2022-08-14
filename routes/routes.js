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
router.route('/businessesAddresses').get(async (req, res) => {
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
    // const post = req.body.data;
    try {

        const newPost = await prisma.post.create({
            data: {
                business_id: 3,
                // business: 'Nellys Nails'
                image: 'img/example.jpg',
                body: 'this is an example post for Pascals Cycles',
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

//DISPLAY ALL POSTS FOR YOUR BUSINESS - WORKS!
router.route('/businessPosts').get(async (req, res) => {
    // const allBizPosts = req.data.body;
    try {
        const businessPosts = await prisma.post.findMany({
            where: {
                businesses: {
                    association_table: {
                        every: {
                            business_id: 3
                        }
                    }
                }
            },
            include: {
                businesses: {
                    select: {
                        biz_name: true
                    }
                }
            }
        })
        res.status(200).json(businessPosts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

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

//UNFOLLOW BUSINESS - NEEDS TESTING
router.route('/unfollow').delete(async (req, res) => {
    const business = req.data.body;
    try {
        const unfollowBusiness = await prisma.association_table.delete({
            where: {
                id: business.business_id
            }
        })
        res.status(200).json(unfollowBusiness);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

//GET ALL FOLLOWED BUSINESSES
router.route('/followedBusinesses').get(async (req, res) => {
    try {
        const myBusinesses = await prisma.businesses.findMany({
            where: {
                association_table: {
                    some: {
                        user_id: 1
                    }
                }
            },
            select: {
                biz_name: true
            }
        })
        res.status(200).json(myBusinesses);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

//GET ALL POSTS FROM A FOLLOWED BUSINESS - WORKS!!
router.route('/followedBusinessPosts').get(async (req, res) => {
    // const newBizFollow = req.data.body;
    try {
        const businessPosts = await prisma.post.findMany({
            where: {
                businesses: {
                    association_table: {
                        every: {
                            business_id: {
                                in: [1, 3]
                            }
                        }
                    }
                }
            },
            include: {
                businesses: {
                    select: {
                        biz_name: true
                    }
                }
            }
        })
        res.status(200).json(businessPosts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = router