import React from 'react';
import { Link } from 'react-router-dom';
import errorImage from '../../assets/error.png';

const ErrorPage = () => {
	document.title = '404 - Not Found';
	return (
		<div className='grid h-screen px-4 bg-white place-content-center'>
			<div className='text-center'>
				<img className='w-96' src={errorImage} alt='' />

				<h1 className=' text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
					Uh-oh!
				</h1>

				<p className='mt-4 text-gray-500'>We can't find that page.</p>
				<Link to='/' className='btn btn-primary'>
					GO BACK HOME
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;
