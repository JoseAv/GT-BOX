import { useState } from 'react'
import '../layout.css'

export const Navbar = () => {
    const [open, setOpen] = useState<boolean>(false)
    const show = open ? 'open' : 'close'

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

            <div className='main-perfil'>
                <div className='perfil' onClick={() => setOpen((open) => !open)}></div>
                <ul className={`perfil-options ${show}`}  >
                    <a href="#" ><li className='text-xl font-medium text-slate-400 perfil-option'>Cerrar session</li></a>
                    <a href="#" ><li className='text-xl font-medium text-slate-400 perfil-option'>Cerrar session</li></a>
                    <a href="#" ><li className='text-xl font-medium text-slate-400 perfil-option'>Cerrar session</li></a>
                </ul>
            </div>

        </>

    )



}