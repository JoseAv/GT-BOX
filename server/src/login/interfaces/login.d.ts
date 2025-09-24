export interface typeLoginControler {
    controlModelLogin: typeLoginModel
    login: (req: Request, res: Response) => Promise<Response>

}

export interface typeLoginModel {


}