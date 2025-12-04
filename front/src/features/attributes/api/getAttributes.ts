
export const getAllAttributes = async () => {

    try {
        const res = await fetch('http://localhost:3000/attribute/get-all')
        if (!res.ok) {
            throw new Error('Error Server')
        }
        const resJson = await res.json()
        return resJson

    } catch (error) {
        console.log(error)
    }

}