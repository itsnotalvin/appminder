import '../LoadingScreen.css'
import appminder_logo from '../images/appminder_logo.png'
import ReactDom from 'react-dom';

export const LoadingScreen = () => {
    return ReactDom.createPortal(
        <>
            <div className='background-container'>
                <img src={appminder_logo} id='appminderlogo' />
            </div>
        </>
        ,
        document.getElementById('portal')
    )
};