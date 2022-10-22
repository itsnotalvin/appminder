import '../Dashboard.css';
import axios from 'axios';

export const JobDashboard = ({ id }) => {
    return (
        <div id='dashboard'>
            <div id='side-panel'>
                <div id='side-panel-content'>
                    <h3>App Minder</h3>
                    <h3>Hello, first name</h3>
                    <div>
                        <div className='nav-btn'>Applications</div>
                        <div className='nav-btn'>Profile</div>
                        <div className='nav-btn'>Settings</div>
                    </div>
                </div>
            </div>
            <div id='main-screen'>
                <header id='application-bar'>
                    <h2>Applications</h2>
                    <div className='application-btn'>Add Application</div>
                </header>
                <div id='applications-display'>
                    <div id='application-stage-selection'>
                        <div className='application-stage-btn'>Draft</div>
                        <div className='application-stage-btn'>Applied</div>
                        <div className='application-stage-btn'>Interviewing</div>
                        <div className='application-stage-btn'>Awaiting</div>
                    </div>
                    <div id='application-content'>
                        {
                            axios.get('/jobs')
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};