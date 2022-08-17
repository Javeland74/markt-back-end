const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const addUser = async (req, res) => {
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
}


const follow = async (req, res) => {
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
}

const unfollow = async (req, res) => {
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
}


const followedBusinesses = async (req, res) => {
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
}

const followedBusinessPosts = async (req, res) => {
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
}

module.exports = {
    addUser,
    follow,
    unfollow,
    followedBusinesses,
    followedBusinessPosts
}