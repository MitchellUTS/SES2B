import db from "../../../lib/database";

export default async function get(req, res) {
  try {
    switch (req.method) {
      case "GET":
        let tests = await db.Test.find({});
        res.status(200).json(tests);
        break;
      case "POST":
        let test = new db.Test(req.body);
        test = await test.save();
        res.status(201).json(test);
        break;
      case "DELETE":
        await db.Test.deleteMany({
          _id: req.body._id,
        });
        res.status(204).end();
        break;
      default:
        res
          .status(405)
          .json({ error: { code: 405, message: "Method Not Supported" } });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: { code: 500, message: "Internal Server Error: " + err } });
  }
}
