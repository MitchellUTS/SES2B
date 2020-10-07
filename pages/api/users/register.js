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

        let userType = 'student';
   
        let user = await db.User.findOne(
            {
                sub: session.user.sub
            }            
        )

        if(!user){
            let user = new db.User({
                        sub: session.user.sub,
                        email: session.user.name,
                        userName: session.user.nickname,
                        userType: userType
                    });
                        user = await user.save();
        }
        
    } catch (err) {
        // res.status(500).end("Internal Server Error: " + err);
        console.error("Res error:", err);
    } 
}
