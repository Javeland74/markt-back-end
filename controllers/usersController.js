const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const getUsers = async (req, res) => {
    try {

        const users = await prisma.users.findMany();

        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

// const getUserByID = async (req, res) => {
//     try{
//         const id = parseInt(req.params.userid)

//         const singleUser = await prisma.users.findMany({
//             where: { userid: id }

//             // THIS IS HOW TO DYNAMICALLY USE A USER ID TO DETERMINE API CALLS
//         })
//     }

// }


const addUser = async (req, res) => {
    const user = req.body;
    try {
        const newUser = await prisma.users.create({
            data: {
                email: user.email,
                name: user.name,
                username: user.username,
                password: user.password,
                address: user.address,
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
                        user_id: 2
                    }
                }
            },
            select: {
                id: true,
                biz_name: true,
                business_type: true

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
                                in: [1, 2, 3, 4]
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
    getUsers,
    // getUserByID,
    addUser,
    follow,
    unfollow,
    followedBusinesses,
    followedBusinessPosts
}