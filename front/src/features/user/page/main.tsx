import { AllUser } from "../hooks/fechUser"
import type { ColumnDef } from "@tanstack/react-table"
import type { user } from "../interfaces/user"
import { DataTable } from "@/shared/dataTable/TableUser"
import { Button } from "@/components/ui/button"

export const userLinks = {
    CreateUser: '/user/create',
    EditUser: '/user/edit/',
    nameCreate: 'Crear Usuario',
    nameEdit: 'Editar'
} as const

export const PageUsers = () => {
    const { data, error, isPending } = AllUser()
    if (isPending) {
        return <h1>Cargando</h1>
    }

    if (error || !data || !data.data) {
        return <h1>Error</h1>
    }


    const formatHeader = (key: string): string => {
        return key
            .split('_')
            .map(word =>
                word.charAt(0).toUpperCase() +
                word.slice(1).toLowerCase()
            )
            .join(' ');
    }

    const columns: ColumnDef<user>[] = Object.keys(Object.values(data.data)[0]).map((value) => (
        {
            accessorKey: value,
            header: formatHeader(value),
            cell: ({ row }) => {
                const information = String(row.getValue(value))
                return value === 'is_active' ? <Button onClick={() => console.log(row.original)}>Editar</Button> : <div>{information}</div>
            },
        }
    ))

    const userData: user[] = Object.values(data.data).map((value) => value)
    return (

        <main className="container mx-auto py-10">
            <DataTable<user, any> columns={columns} data={userData} links={userLinks} />
        </main>
    )

}