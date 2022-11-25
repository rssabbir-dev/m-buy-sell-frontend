import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import DisplaySellerProductCard from '../Seller/DisplaySellerProducts/DisplaySellerProductCard';
import SpinnerSeller from '../shared/Spinners/SpinnerSeller';
import BookProductModal from './BookProductModal';
import ProductByCategoryCard from './ProductByCategoryCard';

const ProductByCategory = () => {
    const params = useParams();
    const [bookedProduct, setBookedProduct] = useState({})
    const {user} = useContext(AuthContext)
	const { data: products, isLoading } = useQuery({
		queryKey: ['productsByCategory'],
		queryFn: async () => {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/category/${params.id}`
			);
			return res.data;
		},
	});
	if (isLoading) {
		return <SpinnerSeller />;
    }
    const handleProductBooked = (data) => {
        
    }
    
	return (
		<div>
			<p>All Product</p>
			<div className='grid grid-cols-3 gap-5'>
				{products.map((product) => (
					<ProductByCategoryCard
						setBookedProduct={setBookedProduct}
						key={product._id}
						product={product}
					/>
				))}
			</div>
			{user?.uid && (
				<BookProductModal
					handleProductBooked={handleProductBooked}
					bookedProduct={bookedProduct}
				/>
			)}
		</div>
	);
};

export default ProductByCategory;
