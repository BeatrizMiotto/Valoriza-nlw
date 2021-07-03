import {Request, Response} from "express";
import { AuthenticateUserservice } from "../services/AuthenticateUserService";


class AuthenticateUserController{
    async handle(request: Request, response: Response){
        const {email, password} = request.body

        const authenticateUserservice = new AuthenticateUserservice();

        const token = await authenticateUserservice.execute({
            email, password
        });
        return response.json(token);
    }
}
export {AuthenticateUserController}