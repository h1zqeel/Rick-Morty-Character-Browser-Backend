import axios from 'axios';

const END_POINT = 'https://rickandmortyapi.com/';

const axiosInstace = axios.create({
	baseURL: END_POINT
});

export default axiosInstace;
