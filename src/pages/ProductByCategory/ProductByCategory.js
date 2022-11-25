import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import DisplaySellerProductCard from '../Seller/DisplaySellerProducts/DisplaySellerProductCard';
import SpinnerSeller from '../shared/Spinners/SpinnerSeller';
import BookProductModal from './BookProductModal';
import ProductByCategoryCard from './ProductByCategoryCard';

const ProductByCategory = () => {
	const params = useParams();
	const [bookedProduct, setBookedProduct] = useState({});
	const [orderLoading, setOrderLoading] = useState(false);
	const { user } = useContext(AuthContext);
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
		const order = {
			customer_info: {
				customer_name: user?.displayName,
				customer_email: user?.email,
				customer_uid: user?.uid,
				customer_phone: data.customer_phone,
				meeting_location: data.customer_location,
			},
			product_info: {
				product_name: bookedProduct.product_name,
				product_image: bookedProduct.product_image,
				product_price: bookedProduct.resell_price,
				product_id: bookedProduct._id,
				product_category: bookedProduct.category_name,
				product_category_id: bookedProduct.category_id,
			},
			seller_info: {
				seller_name: bookedProduct.seller_name,
				seller_phone: bookedProduct.seller_phone,
				seller_email: bookedProduct.seller_email,
				seller_uid: bookedProduct.seller_uid,
				seller_image: bookedProduct.seller_image,
				seller_location: bookedProduct.seller_location,
			},
		};
		setOrderLoading(true);
		fetch(`${process.env.REACT_APP_SERVER_URL}/orders/${user?.uid}`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				'content-type': 'application/json',
			},
			body: JSON.stringify(order),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.acknowledged) {
					document.getElementById(
						'book-product-modal'
					).checked = false;
					Swal.fire(
						'Order Confirm',
						'The Seller Contact you soon',
						'success'
					);
				}
				setOrderLoading(false);
			})
			.catch((err) => {
				setOrderLoading(false);
				Swal.fire(
					'Oops!',
					'Something was wrong! please try again',
					'error'
				);
			});
	};

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
