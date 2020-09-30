<<<<<<< HEAD:pages/api/test-bugged.js
import auth0 from '../../lib/auth0';
=======
import authenicate from '../../lib/auth';
>>>>>>> dev:pages/api/test.js
import db from '../../lib/database';

async function users(req, res, user) {
    try {
        // let dbUser = await db.User.findOne({sub: user.sub});
        // res.json(dbUser);
        res.json(user);
    } catch (err) {
        res.status(500).end("Internal Server Error: " + err);
        throw err;
    }
}

export default function main(req, res) {
    authenicate(req, res, users);
}

