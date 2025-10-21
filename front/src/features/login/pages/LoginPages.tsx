import { LoginMain } from '../components/Main'
import { SectionLogin } from '../components/Section'
import '../css/page.css'

export const Login = () => {


    return (
        <div className='login-main-container'>
            <section className='login-section'>
                <SectionLogin />
            </section>
            <div className='login-main'>
                <h1 className='text-4xl'>LOGIN - GTBOX</h1>
                <LoginMain />
            </div>

        </div>


    )





}