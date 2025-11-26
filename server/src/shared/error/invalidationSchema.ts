
export class InvalidationSchema extends Error {
    status: number;
    field: Record<string, string>[];
    constructor({ status = 400, message = 'Invalid Schema', field = [] as Record<string, string>[] } = {}) {
        super(message)
        this.status = status ?? 400
        this.message = message ?? 'Invalid Schema'
        this.field = field ?? []
    }
}


export class InvalidationDB extends Error {
    status: number;
    field: Record<string, string>[];
    constructor({ status = 400, message = 'Invalid DB', field = [] as Record<string, string>[] } = {}) {
        super(message)
        this.status = status ?? 400
        this.message = message ?? 'Invalid DB'
        this.field = field ?? []
    }
}


