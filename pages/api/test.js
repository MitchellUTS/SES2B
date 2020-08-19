import auth0 from '../../lib/auth0';
import Database from '../../lib/database'; // Import Class
const db = global.database; // Bring the database into local file scoping

export default async function users(req, res) {
    try {
        const session = await auth0.getSession(req)

        if (!session || !session.user) {
            res.writeHead(302, { Location: '/api/auth/login', });
            res.end();
            return;
        }

        // Create a new user for the current user
        let user = new db.User({sub: session.user.sub});
        // Save the user
        let newUserObject = await user.save();
        res.json(newUserObject);

    } catch (err) {
        res.status(500).end("Internal Server Error: " + err);
        throw err;
    }
}



