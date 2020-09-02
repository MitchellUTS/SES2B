import auth0 from '../../lib/auth0';
import db from '../../../lib/database';

async function createUser(req, res, sub) {
    // Create a new user for the current user
    let user = new db.User({sub: sub});
    // Save the user
    let newUserObject = await user.save();
    res.json(newUserObject);
}

async function deleteAllUsers(req, res) {
    await db.User.deleteMany({});
}

async function getCurrentUser(req, res, sub) {
    res.json(await db.User.findOne({sub: sub}));
}

export default async function users(req, res) {
    try {
        const session = await auth0.getSession(req)

        if (!session || !session.user) {
            res.writeHead(302, { Location: '/api/auth/login', });
            res.end();
            return;
        }

        // createUser(req, res, session.user.sub);
        // deleteAllUsers(req, res);
        getCurrentUser(req, res, session.user.sub);

        // await db.User.deleteMany({});

    } catch (err) {
        res.status(500).end("Internal Server Error: " + err);
        throw err;
    }
}

