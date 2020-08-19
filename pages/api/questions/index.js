// import { Question } from '../../../lib/database';

const dummyQuestions = [
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
        switch(req.method) {
            case "GET":
                res.status(200).json(dummyQuestions);
                break;
            case "POST":
                res.status(201).json(dummyQuestions[0]);
                break;
            default:
                res.status(405).json({ error: { code: 405, message: "Method Not Supported" } });
            }
            
    } catch (err) {
        res.status(500).json({ error: { code: 500, message: "Internal Server Error: " + err } });
    }
}
