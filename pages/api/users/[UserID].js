import db from '../../../lib/database';

export default async function get(req, res) {
    try {
        let filter = { sub: req.query };
        let user = await db.User.findOne({sub: req.query.UserID}); // Throws a 500 error if the User ID is not in a valid format (appears to be 25 hex characters)

        if (user == null) {
            res.status(404).json({ error: { code: 404, message: "Resource Not Found" } });
            return; 
        }

        switch(req.method) {
            case "GET":
                res.status(200).json(user);
                break;

            case "PUT":
                let updatedResponse = await db.User.updateOne(filter, req.body);

                // Check if anything was actually updated
                if (updatedResponse.n != 1) {
                    res.status(400).json({ error: { code: 400, message: "Unable to update requested object." } })
                } else {
                    user = await db.User.findOne({ _id: req.query.UserID });
                    res.status(200).json(user);
                }                
                break;

            case "DELETE":
                let deleteResponse = await db.User.deleteOne(filter);
                
                // Check if anything was actually deleted
                if (deleteResponse.n != 1) {
                    res.status(400).json({ error: { code: 400, message: "Unable to delete requested object." } })
                } else {
                    res.status(204).end();
                }
                break;

            default:
                res.status(405).json({ error: { code: 405, message: "Method Not Supported" } });
          }
          
    } catch (err) {
      res.status(500).json({ error: { code: 500, message: "Internal Server Error: " + err } });
    }
}