
export const getAllAttributes = async () => {

    try {
        const res = await fetch('http://localhost:3000/attribute/get-all')
        if (!res.ok) {
            throw new Error('Error Server')
        }
        const resJson = await res.json()
        return resJson

    } catch (error) {
        throw new Error(String(error))

    }

}

export const getOneAttributes = async ({ id }: { id: number }) => {

    try {
        const url = 'http://localhost:3000/attribute/get-one/' + `${id}`
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error('Error Server')
        }
        const resJson = await res.json()
        return resJson

    } catch (error) {
        throw new Error(String(error))
    }

}