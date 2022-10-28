import '../LoadingScreen.css'
import appminder_logo from '../images/appminder_logo.png'


export const LoadingScreen = () => {
   
    return (
        <div className='background-container'>
            <div> 
                <img src={appminder_logo} id='appminderlogo' />

            </div>
            <div className='main-box'>
                Loading...
            </div>
            
        </div>
    )
};