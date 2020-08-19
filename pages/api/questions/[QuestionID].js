// import { Question } from '../../../lib/database';

export default async function get(req, res) {
    try {
        let question_id = req.query.QuestionID;

        switch(req.method) {
            case "GET":
                res.status(200).end("Found");
              break;
            case "PUT":
              res.status(200).end("Updated");
              break;
            case "DELETE":
                res.status(200).end("Deleted");
              break;
            default:
                res.status(405).end("Method Not Supported");
          }
          
    } catch (err) {
        res.status(500).end("Internal Server Error: " + err);
    }
}