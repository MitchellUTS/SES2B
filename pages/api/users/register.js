// import { Db } from 'mongodb';
import auth0 from '../../../lib/auth0';
import db from '../../../lib/database';

export default async function users(req, res) {
    try {
        const session = await auth0.getSession(req);

        if (!session || !session.user) {
            res.writeHead(302, { Location: '/api/auth/login', });
            res.end();
            return;
        }

        res.writeHead(302, { Location: '/', });
        res.end();

        let email = session.user.email;
        let userName = session.user.nickname;
        let userSub = session.user.sub;
        let userType = 'student';
        console.log(session.user.sub);
        

        if(!db.User.findOne({sub: session.user.sub})){
            let user = new db.User({
                sub: userSub,
                email: email,
                userName: userName,
                userType: userType
            });
                user = await user.save();
                // res.status(201).json(user);
                console.log(user);
            
        }
        
    } catch (err) {
        res.status(500).end("Internal Server Error: " + err);
    } 
}
