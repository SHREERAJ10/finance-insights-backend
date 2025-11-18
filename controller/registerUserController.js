import { usernameSchema } from "../models/username.js";
import registerUserInDB from "../service/registerUserInDB.js";

const registerUserController = async (req, res)=>{
    try{
        const userId = req.uid;
        const userInput = req.body;
        const parsedUsername = await usernameSchema.parseAsync(userInput);
        const registerUser = await registerUserInDB(parsedUsername.username, userId);
        res.status(200).json({'success':true,'message':'user successfully registered.'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({'success':false,'error':'internal server error!'});
    }
}

export default registerUserController;