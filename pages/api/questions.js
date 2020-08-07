function Questions(req, res) {
    let questions = [
        {
            'Question': 'What is 1 + 1?',
            'Answer': '2',
        },
        {
            'Question': 'What is 2 + 2?',
            'Answer': '4',
        },
    ];
    res.json(questions);
}
export default Questions;