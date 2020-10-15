import db from '../../../lib/database';

export default async function get(req, res) {
    try {
        switch (req.method) {
            case "GET":
                let test = await db.Test.findOne(
                    {
                        _id: req.query.TestID
                    }
                );
                res.status(200).json(test);
                break;
            case "PUT":
                const updatedTest = await db.Test.updateOne(
                    {
                        _id: req.query.TestID
                    },
                    {
                        $set:
                        {
                            name: req.body.name,
                            numberOfQuestions: req.body.numberOfQuestions,
                            questions: req.body.questions
                        }
                    }
                );
                res.status(200).json(updatedTest);
                break;
            case "DELETE":
                await db.Test.deleteMany(
                    {
                        _id: req.query.TestID
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
