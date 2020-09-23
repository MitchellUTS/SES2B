const db = global.database;

export default async function get(req, res) {
    try {
        switch (req.method) {
            case "GET":
                // Returns an array of all the tests a user can take
                let tests = await db.Test.find({});
                const testList = [];
                tests.forEach(t => {
                    testList.push(
                        {
                            _id: t._id,
                            name: t.name
                        }
                    )
                });
                res.status(200).json(testList);
                break;
            case "POST":
                // For a user to start a new test. Send a userId and TestId in the body
                let test = new db.Test(req.body);
                test = await test.save();
                res.status(201).json(test);
                break;
            case "DELETE":
                const removedTest = await db.Test.deleteMany(
                    {
                        _id: req.body._id,
                        name: req.body.name,
                        questions: req.body.questions
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
