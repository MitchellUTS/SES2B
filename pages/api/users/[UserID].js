import Database from '../../../lib/database'; // Import Class
const db = global.database; // Bring the database into local file scoping

export default async function get(req, res) {
    try {
        let filter = { _id: req.query.UserID };
        let user = await db.User.findOne(filter); // Need to re-implement 404 error when user don't exist

        // let question = dummyQuestions[question_id];
        // if (dummyQuestions[question_id] == undefined) {
        //     res.status(404).json({ error: { code: 404, message: "Resource Not Found" } });
        //     return; 
        // }

        switch(req.method) {
            case "GET":
                res.status(200).json(user);
                break;

            case "PUT":
                let updatedResponse = await db.User.updateOne(filter, req.body);
                user = await db.User.findOne({ _id: req.query.UserID });
                res.status(200).json(user);
                break;

            case "DELETE":
                let deleteResponse = await db.User.deleteOne(filter);

                // TODO check if deleteResponse.n == 1
                // If not then nothing was deleted and throw an error
                res.status(204).end();
                break;

            default:
                res.status(405).json({ error: { code: 405, message: "Method Not Supported" } });
          }
          
    } catch (err) {
      res.status(500).json({ error: { code: 500, message: "Internal Server Error: " + err } });
    }
}