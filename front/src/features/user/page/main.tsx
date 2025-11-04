import { AllUser } from "../context/fechUser"
import type { ColumnDef } from "@tanstack/react-table"
import type { user } from "../interfaces/user"
import { DataTable } from "@/shared/dataTable/TableUser"
import { Button } from "@/components/ui/button"
import { formatHeader } from "../util/dataForm"
import { useNavigate } from "react-router"

export const userLinks = {
    CreateUser: '/user/create',
    EditUser: '/user/edit/',
    nameCreate: 'Crear Usuario',
    nameEdit: 'Editar'
} as const

export const PageUsers = () => {
    const { data, error, isPending } = AllUser()
    const navigate = useNavigate()


    if (error || !data || !data.data) {
        return <h1>Error</h1>
    }

    const columns: ColumnDef<user>[] = Object.keys(Object.values(data.data)[0]).map((value) => (
        {
            accessorKey: value,
            header: formatHeader(value),
            cell: ({ row }) => {
                const information = String(row.getValue(value))
                return value === 'is_active' ? <Button onClick={() => navigate('/user/edit', { state: { data: row.original } })}>Editar</Button> : <div>{information}</div>
            },
        }
    ))

    const userData: user[] = Object.values(data.data).map((value) => value)
    return (

        <main className="container mx-auto py-10">
            {isPending && <h1>Cargando</h1>}
            {error && <h1>Error</h1>}
            {!isPending && !error && userData.length > 0 && (
                <DataTable<user, any> columns={columns} data={userData} links={userLinks} />
            )}

        </main>
    )

}