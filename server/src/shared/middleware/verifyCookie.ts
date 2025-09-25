import type { NextFunction, Response, Request } from "express";

export const veryCooki = (req: Request, res: Response, next: NextFunction) => {

    // ? Primero extraemos el cookie lo mandamos a decodificar y luego mandamos la fecha que regresa el payload si ya tiene tiempo de expiracion elevado 
    // ? si me regresa true entonces vuelvo a mandar a revalidar la cookie por lo tanto lo dejamos pasar y que vaya a la ruta que tenga que ir
    // ? tambien necesitamos una funcion que sea la encargada de refrescar la cookie
    try {

        const cookie = req.cookies
        req.session = null
        //verficamos token
        // const payload = VerifyToken()
        // payload.logintime
        // validamos fecha

        // volvemos a crear cookie si aun es valido



    } catch (error) {

        return res.status(400).json({ message: 'Error en servidor' })
    }


    next()


}

