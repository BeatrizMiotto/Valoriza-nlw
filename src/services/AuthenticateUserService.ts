import { getCustomRepository } from "typeorm";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserservice{
    async execute({email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({email});
        
        if(!user){
            throw new Error("Email/Password incorrect")
        }
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Email/Password incorrect")
        }
        const token = sign({
            email: user.email}, 
            "1dd8d651eb05e5e020cfd35dbf710495",{
                subject: user.id,
                expiresIn: "1d"
            });
            return token;
    }

}
export {AuthenticateUserservice}