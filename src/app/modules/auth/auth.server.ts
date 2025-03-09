import config from "../../config";
import { User } from "../user/user.model";
import { LoginSchema } from "./auth.interface";
import { generateToken } from "./auth.utils";

const LoginUser = async ( payload: LoginSchema)=>{
    const user = await User.findOne({id:payload.id})
    if(!user){
        throw new Error('User not found')
    }
    if(user.status==='blocked'){
        throw new Error('User is blocked')
    }
    if(user.isDeleted){
        throw new Error('User is deleted')
    }
    if((payload.password !== user.password)){
        throw new Error('Password is incorrect')
    }

    const jwtPayload={
        userId:user.id,
        role:user.role
    }
    const accessToken= generateToken(jwtPayload, config.JWT_SECRET as string, config.JWT_EXPIRES_IN as string)
    const refreshToken= generateToken(jwtPayload, config.JWT_REFRESH_SECRET as string, config.JWT_REFRESH_EXPIRES_IN as string)
    return {accessToken,refreshToken,needsPasswordChange:user.needsPasswordChange}

    

}

export const authSerivces={
    LoginUser
}

