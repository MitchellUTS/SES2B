// import { Question } from '../../../lib/database';

let dummyQuestions = [
    {
        id: "1",
        question: "Evaluate the following expression: 1 + 1 = ?",
        answer: "2",
        level: 1,
    },
    {
        id: "2",
        question: "Evaluate the following expression: 3 + 2 = ?",
        answer: "5",
        level: 1,
    },
    {
        id: "3",
        question: "Evaluate the following expression: 2 - 1 = ?",
        answer: "1",
        level: 2,
    },
];

export default async function get(req, res) {
    try {
        let question_id = parseInt(req.query.QuestionID)-1;
        let question = dummyQuestions[question_id];
        if (dummyQuestions[question_id] == undefined) {
            res.status(404).json({ error: { code: 404, message: "Resource Not Found" } });
            return; 
        }

        switch(req.method) {
            case "GET":
                    res.status(200).json(question);
                break;
            case "PUT":
                    dummyQuestions[question_id].question = req.body.question;
                    dummyQuestions[question_id].answer = req.body.answer;
                    dummyQuestions[question_id].level = req.body.level;
                    res.status(200).json(dummyQuestions[question_id]);
                break;
            case "DELETE":
                    dummyQuestions.splice(question_id, 1);
                    res.status(204).end();
                break;
            default:
                res.status(405).json({ error: { code: 405, message: "Method Not Supported" } });
          }
          
    } catch (err) {
      res.status(500).json({ error: { code: 500, message: "Internal Server Error: " + err } });
    }
}
