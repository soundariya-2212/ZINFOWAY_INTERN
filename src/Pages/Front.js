import React from 'react'
import '../Assets/Style/Front.css'
import Img1 from '../Assets/Images/home.jpg';
import { Link } from 'react-router-dom';
function Front()
{
    return(
        <>
        <div>
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#A2D9FF" fill-opacity="1" d="M0,288L48,245.3C96,
            203,192,117,
            288,112C384,107,480,181,576,176C672,171,768,85,864,85.3C960,85,1056,171,1152,208C1248,245,1344,235,
            1392,229.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,
            0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            <img src={Img1} alt="no image" className='pic' />
            <div>
                <h1 className='heads'>ATTENDANCE MANAGEMENT SYSTEM</h1>
                <p className='para'>Attend today, and Achieve tomorrow.</p>
                <Link to='/add'><button className='sign'>SIGNUP</button></Link>
                <Link to='/login'><button className='login'>LOGIN</button></Link>
                <button className='admin'>ADMIN</button>
            </div>
        </div>
        </>
    )
}
export default Front;