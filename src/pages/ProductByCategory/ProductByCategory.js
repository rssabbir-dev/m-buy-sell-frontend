import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import useAuthHeader from '../../hooks/useAuthHeader';
import useBuyer from '../../hooks/useBuyer';
import DisplaySellerProductCard from '../Seller/DisplaySellerProducts/DisplaySellerProductCard';
import SpinnerSeller from '../shared/Spinners/SpinnerSeller';
import BookProductModal from './BookProductModal';
import ProductByCategoryCard from './ProductByCategoryCard';

const ProductByCategory = () => {
	document.title = 'Category Products - mBuy';
	const params = useParams();
	const [authHeader] = useAuthHeader();
	const [bookedProduct, setBookedProduct] = useState({});
	const [orderLoading, setOrderLoading] = useState(false);
	const [isBuyer] = useBuyer();
	const { user } = useContext(AuthContext);
	const {
		data: products,
		isLoading,
		refetch,
	} = useQuery({
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
			order_status: false,
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

	const handleReport = (id, reportCount) => {
		Swal.fire({
			title: 'Do you want to Report this Product?',
			showDenyButton: true,
			showCancelButton: false,
			confirmButtonText: 'Confirm',
			denyButtonText: `Don't Confirm`,
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				fetch(
					`${process.env.REACT_APP_SERVER_URL}/report-product/${user?.uid}?id=${id}&reportCount=${reportCount}`,
					{
						method: 'PATCH',
						headers: authHeader,
					}
				)
					.then((res) => res.json())
					.then((data) => {
						Swal.fire('Reported Success!', '', 'success');
						refetch();
					})
					.catch((err) => {
						Swal.fire(
							'Oops! Something was wrong, please try again',
							'',
							'error'
						);
					});
			} else if (result.isDenied) {
				Swal.fire('Changes are not saved', '', 'info');
			}
		});

		console.log(id);
	};
	return (
		<div className='my-10'>
			<p className='text-2xl'>All Product</p>
			<div className='divider'></div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
				{products.map((product) => (
					<ProductByCategoryCard
						setBookedProduct={setBookedProduct}
						key={product._id}
						product={product}
						handleReport={handleReport}
						isBuyer={isBuyer}
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
