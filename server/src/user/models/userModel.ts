import type { typeUserModel, userCreate, sendInformation } from "../interfaces/user.js";


export class userModel implements typeUserModel {


    static createUser = (user: userCreate): sendInformation => {

        return [2343, 'hola']

    }




}