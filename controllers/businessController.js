const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const getAllBusinesses = async (req, res) => {
    try {

        const businesses = await prisma.businesses.findMany();

        res.status(200).json(businesses);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const businessWithAddress = async (req, res) => {
    try {

        const businessAddress = await prisma.businesses.findUnique({
            where: {
                id: 1,
            },
            select: {
                biz_name: true,
                address: true,
                business_type: true,
                lat: true,
                lng: true,
                id: true
            },
        })
        res.status(200).json(businessAddress);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const businessesAddresses = async (req, res) => {
    try {
        const allBizAddresses = await prisma.businesses.findMany({
            select: {
                biz_name: true,
                address: true,
                business_type: true,
                lat: true,
                lng: true,
                id: true
            }
        })
        res.status(200).json(allBizAddresses);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const addBusiness = async (req, res) => {
    const business = req.body;
    try {

        const newBusiness = await prisma.businesses.create({
            data: {
                biz_name: business.name,
                owner: business.owner,
                email: business.email,
                password: business.password,
                business_type: business.business_type,
                address: business.address,
            }
        })
        res.status(200).json(newBusiness);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

// const addPost = async (req, res) => {
//     // const post = req.body.data;
//     try {

// const newPost = await prisma.post.create({
//     data: {
//                 business_id: 4,
//                 : 'Nellys Nails'
// image: 'img/example.jpg',
//     body: 'this is an example post for Pascals Cycles',
//             }
//         })
// res.status(200).json(newPost);
//     } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
// }
// }

const editPost = async (req, res) => {
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
}

const deletePost = async (req, res) => {
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
}

const businessPosts = async (req, res) => {
    // const allBizPosts = req.data.body;
    const bizID = Number(req.params.bizID)

    try {
        const businessPosts = await prisma.post.findMany({
            where: {
                business_id: bizID
            },
        })
        res.status(200).json(businessPosts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = {
    getAllBusinesses,
    businessWithAddress,
    businessesAddresses,
    addBusiness,
    // addPost,
    editPost,
    deletePost,
    businessPosts
}
