import auth0 from '../../lib/auth0';
import { table } from '../../lib/database';

export default async function users(req, res) {
    try {
        const session = await auth0.getSession(req)

        if (!session || !session.user) {
            res.writeHead(302, { Location: '/api/auth/login', });
            res.end();
            return;
        }

        let user = session.user;
        res.json(session.user.sub);

        // let users = await table("auth0", "users");
        // users.find({}).toArray(function(err, results) {
        //     if (err) throw err;
        //     console.log(results);
        // });

    } catch (err) {
        res.status(500).end("Internal Server Error: " + err);
    }
}
