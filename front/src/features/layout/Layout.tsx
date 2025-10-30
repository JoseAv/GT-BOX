import { Outlet } from 'react-router';
import { Navbar } from './components/Navbar';
import { SideBar } from './components/SideBar';
import './layout.css'

export const Layout = () => {

    return <div className='layout-container'>
        <nav className='layout-nav-principal flex'><Navbar /></nav>
        <aside className='layout-aside-principal '><SideBar /></aside>
        <main className='layout-main layout-main-principal'><Outlet /></main>
    </div>
}