import '../Dashboard.css';

export const JobDashboard = ({ id }) => {
    return (
        <div id='dashboard'>
            <div id='side-panel'></div>
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
                </div>
            </div>
        </div>
    )
};