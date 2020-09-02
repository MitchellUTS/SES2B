const db = global.database;

export default async function get(req, res) {
    try {
        switch (req.method) {
            case "GET":
                let usertests = await db.UserTest.find({});
                res.status(200).json(usertests);
                break;
            case "POST":
                let userTest = new db.UserTest(req.body);
                userTest = await userTest.save();
                res.status(201).json(userTest);
                break;
            case "DELETE":
                await db.Test.deleteMany({
                    _id: req.body._id,
                    userID: req.body.userID,
                    testID: req.body.testID,
                    testResult: req.body.testResult
                });
                res.status(204).end();
                break;
            default:
                res.status(405).json({
                    error: {
                        code: 405,
                        message: "Method Not Supported"
                    }
                });
        }

    } catch (err) {
        res.status(500).json({
            error: {
                code: 500,
                message: "Internal Server Error: " + err
            }
        });
    }
}