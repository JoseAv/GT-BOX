export const SideBar = () => {
    const options: Record<string, string> =
        {
            Products: '#',
            Inicio: '#',
            Clients: '#',
            Prices: '#'
        } as const

    return (
        <>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                GT BOX
            </h4>
            <ul className="!p-2 w-full">
                {Object.entries(options).map(([key, value]) => (
                    <li key={key} className="h-[60px]"><a href={value} className="scroll-m-20 text-xl font-semibold tracking-tight ">{key}</a></li>
                ))}
            </ul>
        </>

    )

}