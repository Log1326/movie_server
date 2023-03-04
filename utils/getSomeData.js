import {generateToken} from "../Middlewares/Auth.js";

export const getSomeData = (user) => {
   return {
       _id: user._id,
       fullName: user.fullName,
       email: user.email,
       image: user.image,
       isAdmin: user.isAdmin,
       token: generateToken(user._id)
   }
}