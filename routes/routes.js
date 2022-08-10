const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//             BUSINESSES

// GET ALL BUSINESSES
router.route('/businesses').get(async (req, res) => {
    try {

        const businesses = await prisma.businesses.findMany();

        res.status(200).json(businesses);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

});

//GET A BUSINESS WITH ITS ADDRESS
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

//GET ALL BUSINESSES WITH ADDRESS
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


// //ADD BUSINESS
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

//                USERS

//ADD USER
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

module.exports = router