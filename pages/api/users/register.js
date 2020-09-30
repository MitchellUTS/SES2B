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

        
        let userName = session.user.nickname;
        let userSub = session.user.sub;
        let userType = 'user';
        console.log(session.user.sub);

        if(!db.User.find(session.user.sub)){
            
        }

        // if (userExists) {
        //     updateName();
        // } else {
        //     createUser();
        // }

        // let users = await table("SES2B", "users");
        // users.find({sub: session.user.sub}).toArray(function(err, results) {
        //     if (err) throw err;
        //     if (results.length == 0) {
        //         users.insert({sub: session.user.sub, usertype: 'user'}, function(err, result) {
        //             if (err) {
        //                 throw err;
        //             } else {
        //                 console.log(result);
        //             }
        //         });
        //     } else {
        //         console.log(results[0]);
        //     }
        // });

        
    } catch (err) {
        res.status(500).end("Internal Server Error: " + err);
    } 
}
