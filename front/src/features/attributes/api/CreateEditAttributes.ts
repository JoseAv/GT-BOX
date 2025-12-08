import type { TypeAttributeCreate, TypeAttributeEdit } from "../schemas/attributeSchema"

export const PostNewAttribute = async (data: TypeAttributeCreate) => {

    try {
        const res = await fetch('http://localhost:3000/attribute/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
        if (!res.ok) {
            throw new Error('Error Server')
        }
        const resJson = await res.json()
        return resJson

    } catch (error) {
        throw new Error(String(error))
    }

}


export const PatchAttribute = async (data: TypeAttributeEdit) => {

    try {
        const res = await fetch('http://localhost:3000/attribute/edit', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
        if (!res.ok) {
            throw new Error('Error Server')
        }
        const resJson = await res.json()
        return resJson

    } catch (error) {
        throw new Error(String(error))
    }

}