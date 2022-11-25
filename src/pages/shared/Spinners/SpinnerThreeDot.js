import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const SpinnerThreeDot = () => {
	return (
		<div className='flex justify-center items-center h-screen'>
			<ThreeDots
				height='40'
				width='40'
				radius='9'
				color='#570DF8'
				ariaLabel='three-dots-loading'
				wrapperStyle={{}}
				wrapperClassName=''
				visible={true}
			/>
		</div>
	);
};

export default SpinnerThreeDot;
