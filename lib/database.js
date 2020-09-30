import { UserSchema } from './models/users';
import { QuestionSchema } from './models/questions';
import { TestSchema } from './models/tests';
import { UserTestSchema } from './models/userTests';
const URI = process.env.DB_CONNECTION;

class Database {
    constructor() {
        this.instance = require('mongoose');
        this.instance.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.User = this.instance.model("Users", UserSchema);
        this.Question = this.instance.model("Questions", QuestionSchema);
        this.Test = this.instance.model("Tests", TestSchema);
        this.UserTest = this.instance.model("UserTests", UserTestSchema);
    }

    test() {
        let user = new this.User({sub: "abc"});
        user.save().then((a) => console.log(a));
        console.log();
    }
}

if (!global.database)
    global.database = new Database();

export default global.database;


// export function connection() {
//     mongoose.connect(URI, { useNewUrlParser: true })
//         .then((data) => { console.log(data); })
//         .catch((err) => { console.error(err); });
// }

