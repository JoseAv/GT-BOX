
export class InvalidationSchema extends Error {
    status: number;
    field: string[] | [];
    constructor(message: 'Invalid Schema', field: string[]) {
        super(message)
        this.status = 401
        this.message = message
        this.field = field || []
    }
}