import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

function App() {
	// Add a request interceptor
	// axios.interceptors.request.use(function (config) {
	// 	const token = `Bearer ${localStorage.getItem('accessToken')}`;
	// 	config.headers.authorization = token;
	// 	return config;
	// });
	return (
		<div >
			<Toaster />
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
