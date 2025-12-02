import type { ReactNode } from "react"
import { AdminsSVG, ArrowsSVG, BoxSVG, HomeSVG } from "../svgs/SideBar"

interface typesSideBar {
    icon: ReactNode
    href: string
}


export const SideBar = () => {
    const options: Record<string, typesSideBar> =
        {
            Inicio: { icon: <HomeSVG />, href: '#' },
            Prices: { icon: <ArrowsSVG />, href: '#' },
            Products: { icon: <BoxSVG />, href: 'products' },
            User: { icon: <AdminsSVG />, href: 'user' },
        } as const

    return (
        <>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                GT BOX
            </h4>
            <ul className="p-2 w-full">
                {Object.entries(options).map(([key, value]) => (
                    <a href={value.href} key={key}>
                        <div className="flex items-center gap-3 ">
                            <div className="flex justify-center items-center h-full">{value.icon}</div>
                            <li key={key} className="h-20 flex justify-center items-center">{key}</li>
                        </div>
                    </a>
                ))}
            </ul>
        </>

    )

}