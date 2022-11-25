import React from 'react';
import { Link } from 'react-router-dom';

const PromotedCard = ({product}) => {
    return (
		<Link
			class='relative block overflow-hidden rounded-xl  bg-cover bg-center bg-no-repeat'
			style={{ backgroundImage: `url(${product.product_image})` }}
		>
			<span class='absolute right-4 top-4 z-10 inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-semibold text-white'>
				Sponsor
			</span>

			<div class='relative bg-black bg-opacity-40 p-8 pt-40 text-white'>
                <h3 class='text-2xl font-bold'>{product.product_name}</h3>

                <p class='text-sm'>Only ${product.resell_price}</p>
			</div>
		</Link>
	);
};

export default PromotedCard;