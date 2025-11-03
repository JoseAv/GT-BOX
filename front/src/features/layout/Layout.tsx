import { Outlet } from 'react-router';
import { Navbar } from './components/Navbar';
import { SideBar } from './components/SideBar';
import './layout.css'
import { useNotificationStore } from '@/shared/notifications/Notifications';
import { DialogCloseButton } from '../user/components/Dialog';

export const Layout = () => {
    const notification = useNotificationStore((state) => state.create)
    console.log('Notificaciones', notification)
    return <div className='layout-container'>
        {notification ? <DialogCloseButton /> : null}
        <nav className='layout-nav-principal flex'><Navbar /></nav>
        <aside className='layout-aside-principal '><SideBar /></aside>
        <main className='layout-main layout-main-principal'><Outlet /></main>
    </div>
}