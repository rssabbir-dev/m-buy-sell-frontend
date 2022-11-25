import React from 'react';
import { BallTriangle } from 'react-loader-spinner';

const SpinnerSeller = () => {
    return (
		<div className='flex justify-center items-center h-screen'>
			<BallTriangle
				height={100}
				width={100}
				radius={5}
				color='#570DF8'
				ariaLabel='ball-triangle-loading'
				wrapperClass={{}}
				wrapperStyle=''
				visible={true}
			/>
		</div>
	);
};

export default SpinnerSeller;