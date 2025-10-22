import '../layout.css'

export const Navbar = () => {

    return (
        <>
            <img className="logo" src='../../../../design/Images/logo2.png'></img>

            <div >
                <ul className='flex gap-20 h-full justify-center items-center'>
                    <li><a href="#" className='text-base font-medium'>Dashboard</a></li>
                    <li><a href="#" className='text-base font-medium'>Dashboard</a></li>
                    <li><a href="#" className='text-base font-medium'>Dashboard</a></li>
                </ul>


            </div>

            <div className='perfil'></div>

        </>

    )



}