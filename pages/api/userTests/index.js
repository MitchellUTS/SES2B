import db from "../../../lib/database";

export default async function get(req, res) {
  try {
    switch (req.method) {
      case "GET":
        const results = [];
        let usertests = await db.UserTest.find({});
        for (let i = 0; i < usertests.length; i++) {
          let user = await db.User.findOne({
            _id: usertests[i].userID,
          });
          let test = await db.Test.findOne({
            _id: usertests[i].testID,
          });

          if (user && test) {
            results.push({
              _id: usertests[i]._id,
              username: user.userName ? user.userName : user.sub,
              testName: test.name ? test.name : test._id,
              testResult: usertests[i].testResult,
              complete: usertests[i].complete
            });
          }
        }
        res.status(200).json(results);
        break;
      case "POST":
        let userTest = new db.UserTest(req.body);
        userTest = await userTest.save();
        res.status(201).json(userTest);
        break;
      case "DELETE":
        await db.UserTest.deleteMany();
        res.status(204).end();
        break;
      default:
        res.status(405).json({
          error: {
            code: 405,
            message: "Method Not Supported",
          },
        });
    }
  } catch (err) {
    res.status(500).json({
      error: {
        code: 500,
        message: "Internal Server Error: " + err,
      },
    });
  }
}
