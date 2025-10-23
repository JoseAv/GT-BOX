import { Navbar } from './components/Navbar';
import { SideBar } from './components/SideBar';
import './layout.css'
import type { ReactNode } from "react";

export const Layout = (children: ReactNode) => {

    return <div className='layout-container'>
        <nav className='layout-nav-principal flex'><Navbar /></nav>
        <aside className='layout-aside-principal '><SideBar /></aside>
        <main className='layout-main bg-red-500 layout-main-principal'>{children}</main>
    </div>
}