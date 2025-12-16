import type { ColumnDef } from "@tanstack/react-table"
import { ContextAttributes } from "../context/getAttributes"
import { formatHeader } from "@/features/user/util/dataForm"
import { useNavigate } from "react-router"
import { DataTable } from "@/shared/dataTable/TableUser"
import { Button } from "@/components/ui/button"

export const AttributeLinks = {
    Create: '/attributes/create',
    Edit: '/attributes/edit/',
    nameCreate: 'Crear Atributo',
    nameEdit: 'Editar Atributo'
} as const

interface typeAttributes {
    name: string
    id: number
    edit?: boolean
}


export const MainAttribute = () => {
    const { data, isLoading, isError } = ContextAttributes()
    const navigate = useNavigate()

    if (isLoading)
        return <h1>Loading</h1>

    if (isError)
        return <h1>Error Page</h1>

    const resAttribute = data.data.map((ele: typeAttributes) => {
        return { ...ele, edit: true }
    })

    const columns: ColumnDef<typeAttributes>[] = Object.keys(resAttribute[0]).map((value) => (
        {
            accessorKey: value,
            header: formatHeader(value),
            cell: ({ row }) => {
                const information = String(row.getValue(value))
                return value === 'edit' ? <Button onClick={() => navigate(`/attributes/edit/:${row.original.id}`, { state: { data: row.original } })}>Editar</Button> : <div>{information}</div>
            },
        }
    ))

    return <>
        <DataTable<typeAttributes, any> columns={columns} data={resAttribute} links={AttributeLinks} />
    </>


}