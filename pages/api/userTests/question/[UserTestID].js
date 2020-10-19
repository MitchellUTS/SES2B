import db from '../../../../lib/database';

export default async function get(req, res) {
    try {
        let userTest;
        let test;
        switch (req.method) {
            case "GET":
                // Gets the next question of a test
                userTest = await db.UserTest.findOne(
                    {
                        _id: req.query.UserTestID
                    }
                );
                // console.log(userTest);
                test = await db.Test.findOne(
                    {
                        _id: userTest.testID
                    }
                );
                // console.log(test);
                if(userTest.numOfQuestionsAnswered === test.numberOfQuestions) {
                    res.status(200).json("Test is complete, no more questions");
                }
                let questionsOfTestLevel = test.questions.filter(function(question) {
                    return question.level == userTest.testResult;
                });
                if(!(Array.isArray(questionsOfTestLevel) && questionsOfTestLevel.length)) {
                    res.status(200).json("Test is complete, no more questions");
                } else {
                    var randomQuestion = questionsOfTestLevel[Math.floor(Math.random() * questionsOfTestLevel.length)];
                    res.status(200).json({
                        _id: randomQuestion._id,
                        question: randomQuestion.question
                    });
                }
                break;
            case "POST":
                // Submit the answer of a question
                userTest = await db.UserTest.findOne(
                    {
                        _id: req.query.UserTestID
                    }
                );
                test = await db.Test.findOne(
                    {
                        _id: userTest.testID
                    }
                );
                let question = test.questions.find(question => question._id == req.body._id);
                console.log(question.answer);
                console.log(req.body.answer);
                if(question.answer === req.body.answer) {
                    console.log("Correct!");
                    await db.UserTest.updateOne(
                        {
                            _id: req.query.UserTestID
                        },
                        {
                            $set:
                            {
                                testResult: userTest.testResult + 1,
                                numOfQuestionsAnswered: userTest.numOfQuestionsAnswered + 1
                            }
                        }
                    )
                } else {
                    console.log("Incorrect!");
                    await db.UserTest.updateOne(
                        {
                            _id: req.query.UserTestID
                        },
                        {
                            $set:
                            {
                                testResult: userTest.testResult == 1 ? userTest.testResult : userTest.testResult - 1,
                                numOfQuestionsAnswered: userTest.numOfQuestionsAnswered + 1
                            }
                        }
                    )
                }
                res.status(200).json(true);
                break;
            case "DELETE":
                await db.Test.deleteMany(
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
