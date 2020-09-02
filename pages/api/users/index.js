import db from '../../../lib/database';

export default async function get(req, res) {
    try {    
        switch(req.method) {
            case "GET":
                let users = await db.User.find({});
                res.status(200).json(users);
                break;

            case "POST":
                let user = new db.User(req.body);
                user = await user.save();
                res.status(201).json(user);
                break;
                
            default:
                res.status(405).json({ error: { code: 405, message: "Method Not Supported" } });
            }
            
    } catch (err) {
        res.status(500).json({ error: { code: 500, message: "Internal Server Error: " + err } });
    }
}
