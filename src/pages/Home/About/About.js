import React from 'react';
import aboutImg from '../../../assets/about.jpg'

const About = () => {
    return (
		<section>
			<div class='mx-auto max-w-screen-2xl px-4 pb-16 sm:px-6 lg:px-8'>
				<div class='grid grid-cols-1 lg:h-screen lg:grid-cols-2'>
					<div class='relative z-10 lg:py-16'>
						<div class='relative h-64 sm:h-80 lg:h-full'>
							<img
								alt='House'
								src={aboutImg}
								class='absolute inset-0 h-full w-full object-cover'
							/>
						</div>
					</div>

					<div class='relative flex items-center bg-gray-100'>
						<span class='hidden lg:absolute lg:inset-y-0 lg:-left-16 lg:block lg:w-16 lg:bg-gray-100'></span>

						<div class='p-8 sm:p-16 lg:p-24'>
							<h2 class='text-2xl font-bold sm:text-3xl'>
								Browse your necessary items on our organized
								category
							</h2>

							<p class='mt-4 text-gray-600'>
								You can choose your any necessary here in cheap
								price without any hassles, we handle for it you.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;