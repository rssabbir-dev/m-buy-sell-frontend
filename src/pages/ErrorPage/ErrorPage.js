import React from 'react';
import { Link } from 'react-router-dom';
import errorImage from '../../assets/error.png'

const ErrorPage = () => {
	return (
		<div class='grid h-screen px-4 bg-white place-content-center'>
			<div class='text-center'>
				<img className='w-96' src={errorImage} alt='' />

				<h1 class=' text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
					Uh-oh!
				</h1>

                <p class='mt-4 text-gray-500'>We can't find that page.</p>
                <Link to='/' className='btn btn-primary'>GO BACK HOME</Link>
			</div>
		</div>
	);
};

export default ErrorPage;
