import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3000'
});
// axios.post
// remove localhost