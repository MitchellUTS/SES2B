import authenicate from '../../lib/auth';
import db from '../../lib/database';

async function users(req, res, user) {
    try {
        let dbUser = await db.User.findOne({sub: sub});
        res.json(dbUser);
    } catch (err) {
        res.status(500).end("Internal Server Error: " + err);
        throw err;
    }
}

export default function main(req, res) {
    authenicate(req, res, users);
}

