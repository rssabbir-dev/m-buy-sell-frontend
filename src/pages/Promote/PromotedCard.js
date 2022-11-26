import React from 'react';

const PromotedCard = ({product}) => {
    return (
		<div
			class='h-full relative block overflow-hidden rounded-xl  bg-contain bg-center bg-no-repeat'
			style={{ backgroundImage: `url(${product.product_image})` }}
		>
			<span class='absolute right-4 top-4 z-10 inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-semibold text-white'>
				Sponsor
			</span>

			<div class='relative bg-black bg-opacity-40 px-8 pb-4 pt-16 text-white h-full'>
                <h3 class='text-2xl font-bold'>{product.product_name}</h3>
                <p class='text-sm'>Only ${product.resell_price}</p>
			</div>
		</div>
	);
};

export default PromotedCard;