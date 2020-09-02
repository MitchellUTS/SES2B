// import { Question } from '../../../lib/database';
const db = global.database; // Bring the database into local file scoping

export default async function get(req, res) {
    try {
        switch (req.method) {
            case "GET":
                let questions = await db.Question.find({});
                res.status(200).json(questions);
                break;
            case "POST":
                let result = db.Question.insertMany(req.body.questions);
                res.status(201).json(result);
                break;
            case "DELETE":
                const removedQuestion = await db.Question.deleteMany(
                    {
                        _id: req.body._id,
                        question: req.body.question,
                        answer: req.body.answer,
                        level: req.body.level,
                        test: req.body.test
                    }
                );
                res.status(204).end();
                break;
            default:
                res.status(405).json({ error: { code: 405, message: "Method Not Supported" } });
        }

    } catch (err) {
        res.status(500).json({ error: { code: 500, message: "Internal Server Error: " + err } });
    }
}
