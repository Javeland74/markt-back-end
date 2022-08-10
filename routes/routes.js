const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// async function main() {
//     const allUsers = await prisma.users.findMany(
//         console.log(allUsers);
//     )
// }

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
router.route('/businessWithAddress').get(async (res, req) => {
    try {

        const business = await prisma.businesses.findUnique({
            where: {
                name_date: {
                    biz_name: 'Nellys Nails',
                    address: '123_123st_Edmonton_AB'
                }
            }
        })
        res.status(200).json(business);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})


//GET ALL BUSINESSES WITH ADDRESS
// router.route('/businessWithQuery').get(async (res, req) => {
//     try {

//         const { includeAddress } = req.query;

//         const businesses = await prisma.businesses.findMany({
//             include: includeRatings ? { ratings: true } : undefined
//         })
//         res.status(200).json(businesses);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// })

// //ADD BUSINESS
// router.route('/businesses').post(async (req, res) => {
//     const newBusiness = await prisma.businesses.create({
//         data: {
//             biz_name: "Test",
//             email: 'test@test.com',
//             password: 'password',
//             business_type: 'hobbies',
//             address: '123 Test St.',
//             image: '../assets/test.jpg',
//         }
//     })
// })

//  )

module.exports = router