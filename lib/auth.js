import auth0 from './auth0';
const AUTH_HACK = process.env.AUTH_HACK;

const fakeUser = {
    given_name: 'Test Account',
    nickname: 'Test Man',
    name: 'Test',
    picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQSFbV0QIFjopgXWGLbdRJo3E-jDevxhQfd8Q&usqp=CAU',
    locale: 'en',
    updated_at: '2020-09-02T04:00:59.034Z',
    sub: 'google-oauth2|110394242529931160999'
};

export default async function authenticate(req, res, next) {
    let shouldDisableAuth = AUTH_HACK && AUTH_HACK == req.headers["disable-auth"];
    
    if (shouldDisableAuth) {
        return next(req, res, fakeUser);
    }
    
    const session = await auth0.getSession(req);
    if (!session || !session.user) {
        // console.log(shouldDisableAuth);
        res.writeHead(302, { Location: '/api/auth/login', });
        res.end();
        return;
    }

    return next(req, res, session.user);
    
}
