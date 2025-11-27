import { useNavigate } from "react-router"
import { GetAllProducts } from "../context/getAllProducts"
import type { TypeGetAllProducts } from '../interfaces/produc'
import { Button } from "@/components/ui/button"
import { formatHeader } from "@/features/user/util/dataForm"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/shared/dataTable/TableUser"

export const userLinks = {
    Create: '/products/create',
    Edit: '/products/edit/',
    nameCreate: 'Crear Producto',
    nameEdit: 'Editar Producto'
} as const

export const MainProducts = () => {
    const { data, error, isPending } = GetAllProducts()
    const navigate = useNavigate()

    console.log(data)
    if (error || !data || !data.data) {
        return <h1>Error</h1>
    }

    const columns: ColumnDef<TypeGetAllProducts>[] = Object.keys(Object.values(data.data)[0]).map((value) => (
        {
            accessorKey: value,
            header: formatHeader(value),
            cell: ({ row }) => {
                const information = String(row.getValue(value))
                return value === 'is_active' ? <Button onClick={() => navigate(`/products/edit/:${row.original.id}`, { state: { data: row.original } })}>Editar</Button> : <div>{information}</div>
            },
        }
    ))

    return (

        <main className="container mx-auto py-10">
            {isPending && <h1>Cargando</h1>}
            {error && <h1>Error</h1>}
            {!isPending && !error && data.data.length > 0 && (
                <DataTable<TypeGetAllProducts, any> columns={columns} data={data.data} links={userLinks} />
            )}

        </main>
    )

}