 import { Question } from '../../../lib/database';

export default async function get(req, res) {
    try {    
        switch(req.method) {
            case "GET":
                res.status(200).end("Found");
                break;
            case "POST":
                res.status(201).end("Created");
                break;
            default:
                res.status(405).end("Method Not Supported");
            }
            
    } catch (err) {
        res.status(500).end("Internal Server Error: " + err);
    }
}
