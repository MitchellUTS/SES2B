import db from '../../../lib/database';

export default async function get(req, res) {
    try {
        switch (req.method) {
            case "GET":
                let userTest = await db.UserTest.findOne(
                    {
                        _id: req.query.UserTestID
                    }
                );
                res.status(200).json(userTest);
                break;
            case "PUT":
                const updatedUserTest = await db.UserTest.updateOne(
                    {
                        _id: req.query.UserTestID
                    },
                    {
                        $set:
                        {
                            userID: req.body.userID,
                            testID: req.body.testID,
                            testResult: req.body.testResult,
                            complete: req.body.complete
                        }
                    }
                );
                res.status(200).json(updatedUserTest);
                break;
            case "DELETE":
                await db.UserTest.deleteMany(
                    {
                        _id: req.query.UserTestID
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
