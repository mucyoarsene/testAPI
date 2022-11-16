import Mongoose from "mongoose";
import userModel from "../models/body/user.model";
import validation from "../helpers/validation";
import Authenticate from "../helpers/authenticate";
import User from "../models/db/user.model";
import multer from "multer";



class UserController {
    static profile(req, res){
        const storage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, "./profiles");
            },
            filename: (req, file, callback) => {
                callback(null, `${file.fieldname}-${Date.now()}.jpg`);
            } 
        });
        
        const upload = multer({ storage: storage }).single("profile")
        upload(req, res, err => {
            if(err) {
                console.log(err)
                return res.status(400).json({
                    message: "uploading failed"
                })
            }

            res.status(201).json({
                message: "upload successfully done"
            })
        })
    }
    static signup(req, res) {
        const {names,email, password} = req.body;
        const loEmail = email.toLowerCase();
        const {error} = validation.registerValidations(userModel.createUser(req));
        
        if (error) {
        
            return res.status(400).json({
                status: 400,
                message: error.details[0].message.replace(/"/g, '')

            });
        }

    User.find({email: loEmail}, (error, result) => {
        if (result.length) {
            return res.status(409).json({
                status: 409,
                message: "Email already exists, try another"
            });
        }
        
        const hashedPassword = Authenticate.hashPassword(password);

        const user = new User ({
            _id: new Mongoose.Types.ObjectId(),
            names: names,
            email: loEmail,
            password: hashedPassword
        });

        user
            .save()
            .then(() => {
                res.status(201).json({
                    message: "U have created an account, thanks",
                    status: 201
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "There is something wrong, check your internet or call the support",
                    status: 500
                })
            })

    });


    }

    static signIn(req, res) {
        const {email, password} = req.body;
        const loEmail = email.toLowerCase();

        User.find({email: loEmail}, (error, result) => {
            if (result.length) {
                const compared = Authenticate.comparePassword(password, result[0].password);

                if (compared) {
                    res.status(200).json({
                    message: "You are logged in successfully",
                    status: 200,
                    token: Authenticate.generateToken(result[0])

             });
             
            }

                else {
                    res.status(403).json({
                    message: "incorrect email/password",
                    status: 403
                });
              }

            }    
            else {
                    res.status(403).json({
                        message: "Incorrect email/password",
                        status: 403
                    });
         
            }            
                
        });
    }
}

export default UserController;




