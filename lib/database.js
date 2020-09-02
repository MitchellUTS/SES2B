import { UserSchema } from './models/users';
import { QuestionSchema } from './models/questions';
import { TestSchema } from './models/tests';
const URI = process.env.DB_CONNECTION;

class Database {
    constructor() {
        this.instance = require('mongoose');
        this.instance.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.User = this.instance.model("Users", UserSchema);
        this.Question = this.instance.model("Questions", QuestionSchema);
        this.Test = this.instance.model("Tests", TestSchema);
    }

    test() {
        let user = new this.User({sub: "abc"});
        user.save().then((a) => console.log(a));
        console.log();
    }
}

if (!global.database)
    global.database = new Database();

export default Database;


// export function connection() {
//     mongoose.connect(URI, { useNewUrlParser: true })
//         .then((data) => { console.log(data); })
//         .catch((err) => { console.error(err); });
// }

