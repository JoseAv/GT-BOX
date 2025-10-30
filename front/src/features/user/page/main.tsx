import { AllUser } from "../hooks/fechUser"
import type { ColumnDef } from "@tanstack/react-table"
import type { user } from "../interfaces/user"
import { DataTable } from "@/shared/dataTable/TableUser"

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
            .split('_')                           // Divide por underscore
            .map(word =>
                word.charAt(0).toUpperCase() +    // Primera letra mayúscula
                word.slice(1).toLowerCase()        // Resto en minúscula
            )
            .join(' ');                           // Une con espacio
    }

    const columns: ColumnDef<user>[] = Object.keys(Object.values(data.data)[0]).map((value) => (
        {
            accessorKey: value,
            header: formatHeader(value),
        }
    ))
    const userData = Object.values(data.data).map((value) => value)

    return (

        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={userData} />
        </div>
    )

}