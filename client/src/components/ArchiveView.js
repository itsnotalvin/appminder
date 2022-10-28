import { useState, useEffect } from "react";
import axios from 'axios';
import { JobDetails } from "./JobDetails";
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const ArchiveView = () => {
    const [jobInfo, setJobInfo] = useState([]);
    const [infoChange, setInfoChange] = useState(0);
    useEffect(() => {
        axios.get('/jobs/allUserJobs')
            .then(res => {
                setJobInfo(res.data)
            })
    }, [infoChange]);
    const changedJobInfo = () => {
        setInfoChange(infoChange === 0 ? 1 : 0);
    };
    return (
        <>
            <header id='application-bar'>
                <h2>Archived Applications</h2>
            </header>
            <div id='applications-display'>
                <div id='application-stage-selection'>
                    <div className='app-stage-tab draft-stage-tab'>Archive<br /></div>
                </div>
                <TableContainer component={Paper}>
                    <Table size="medium" sx={{ minWidth: 650 }} aria-label="archive-table">
                        <TableHead style={{ backgroundColor: '#6bc1ff' }}>
                            <TableRow>
                                <TableCell>Company</TableCell>
                                <TableCell>Position</TableCell>
                                <TableCell>Key Date</TableCell>
                                <TableCell align="right">Last Updated</TableCell>
                                <TableCell align="right">Details</TableCell>
                                <TableCell align="right">Unarchive</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <JobDetails jobs={jobInfo} selected={'Archive'} changedJobInfo={changedJobInfo} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
};