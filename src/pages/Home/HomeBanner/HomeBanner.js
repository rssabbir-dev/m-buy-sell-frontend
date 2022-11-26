import React from 'react';
import { Link } from 'react-router-dom';

const HomeBanner = () => {
    return (
		<section class='bg-gray-50'>
			<div class='mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center'>
				<div class='mx-auto max-w-xl text-center'>
					<h1 class='text-3xl font-extrabold sm:text-5xl uppercase'>
						Join Thousand Used Mobile.
						<strong class='font-extrabold text-primary sm:block'>
							Resell Shop in BD.
						</strong>
					</h1>

					<p class='mt-4 sm:text-xl sm:leading-relaxed'>
						You can choose your any necessary here in cheap price without any hassles, we handle for it you.
					</p>

					<div class='mt-8 flex flex-wrap justify-center gap-4'>
						<Link
							class='block w-full rounded bg-primary px-12 btn-primary py-3 text-sm font-medium text-white shadow  focus:outline-none focus:ring  sm:w-auto'
							to='/registration'
						>
							Get Started
						</Link>

						<Link
							class='block w-full rounded px-12 py-3 text-sm font-medium  shadow btn-primary focus:outline-none focus:ring sm:w-auto'
							to='/blogs'
						>
							Learn More
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomeBanner;