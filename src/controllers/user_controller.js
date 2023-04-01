let { response, authlibrary } = require("../library/index");
let { User } = require("../services/schema");
const bcrypt = require("bcrypt");
const httpStatus = require('http-status')

const controller = "[User Controller]";
class UserController {
  async signUp(_, args, context) {
    const method = "[signUp]"
    try {
      let { username, email, password, confirmpassword } = args;

      if (password !== confirmpassword) {
        return response.failResponse(400 , "Password fields are not matching!")
      }

      let user = await User.findOne({email : email})

      if(user){
        return response.failResponse(400 , "User already exists!")
      }

      let salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));

      let hashedPassword = await bcrypt.hash(password, salt);

      let newUser = await User.create({
        username,
        email,
        salt,
        password: hashedPassword,
      });

      return response.success(httpStatus.OK , httpStatus["200"] , newUser)
    } catch (err) {
      console.log(`Error : ${method} ${controller} : `, err);
      return response.throwError(err)
    }
  };

  async signin(_ , args , context){
    const method = "[signin]"
    try{
      let {email , password} = args

      let user = await User.findOne({email : email})

      if(!user){
       return  response.failResponse(404, "User not found!")
      }

      let passwordMatch = await bcrypt.compare(password,user.password)

      if(!passwordMatch){
        return response.failResponse(401,"Wrong Password!")
      }

      user['loggedIn'] = true
      await user.save()

      let token = await authlibrary.createAccessToken({id : user._id})
      return response.success(httpStatus.OK , httpStatus["200"] , token)

    }catch(err){
      console.log(`Error : ${method} ${controller} : `, err);           
      return response.throwError(err)
    }
  };
}

module.exports = UserController;
