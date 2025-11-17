import admin from '../config/firebase.js'

const verifyToken = async (req, res, next)=>{
    const authHeader = req.headers.authorization;
    const idToken = authHeader.split(' ')[1];
    if(!idToken){
        res.status(401).json({"message":"unauthorized"});
    }
    else{
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.uid = decodedToken.uid;
        next();
    }
}

export default verifyToken;