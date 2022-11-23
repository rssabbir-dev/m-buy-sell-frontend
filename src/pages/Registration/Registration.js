import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import SpinnerThreeDot from '../shared/Spinners/SpinnerThreeDot';

const Registration = () => {
	const { createUser, updateUserProfileOnFirebase, logOut } =
		useContext(AuthContext);
	const [createUserLoading, setCreateUserLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();

	const handleRegistration = (data) => {
		setCreateUserLoading(true);
		const image = data.image[0];
		const formData = new FormData();
		formData.append('image', image);
		handleCreateUser(data, formData);
	};

	const handleCreateUser = (data, formData) => {
		createUser(data.email, data.password)
			.then((res) => {
				getImgLink(formData, res, data);
			})
			.catch((err) => {
				console.log(err);
				setCreateUserLoading(false);
				toast.error(err.message);
			});
	};
	const getImgLink = (formData, user, data) => {
		axios
			.post(
				`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API_KEY}`,
				formData
			)
			.then((res) => {
				console.log(res.data.data.url);
				savedUserInDb(data, user.user.uid, res.data.data.url);
				handleUpdateUserProfile(data.name, res.data.data.url);
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
				setCreateUserLoading(false);
			});
	};
	const handleUpdateUserProfile = (name, photoURL) => {
		const profileData = { displayName: name, photoURL };
		updateUserProfileOnFirebase(profileData)
			.then(() => {
				setCreateUserLoading(false);
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Registration Success',
					message: 'Now you can login',
					showConfirmButton: false,
					timer: 2500,
				});
				logOut()
					.then(() => {
						navigate('/login');
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => {
				console.log(err);
				setCreateUserLoading(false);
			});
	};
	const savedUserInDb = (data, uid, photoURL) => {
		const user = {
			displayName: data.name,
			email: data.email,
			photoURL,
			role: data.role,
			uid: uid,
		};
		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/users`, user)
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
			<div className='mx-auto max-w-lg'>
				<h1 className='text-center text-2xl font-bold text-indigo-600 sm:text-3xl'>
					Register Now
				</h1>

				<p className='mx-auto mt-4 max-w-md text-center text-gray-500'>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Obcaecati sunt dolores deleniti inventore quaerat mollitia?
				</p>

				<form
					onSubmit={handleSubmit(handleRegistration)}
					className='mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl'
				>
					<p className='text-lg font-medium'>
						Sign in to your account
					</p>
					<div>
						<label htmlFor='email' className='text-sm font-medium'>
							Full Name
						</label>

						<div className='relative mt-1'>
							<input
								type='text'
								className='w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm'
								placeholder='Enter Full Name'
								{...register('name', {
									required: 'Full name is required',
								})}
							/>
							{errors.name && (
								<p className='text-red-500'>
									{errors.name?.message}
								</p>
							)}
						</div>
					</div>
					<div>
						<label htmlFor='email' className='text-sm font-medium'>
							Email
						</label>

						<div className='relative mt-1'>
							<input
								type='email'
								id='email'
								className='w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm'
								placeholder='Enter email'
								{...register('email', {
									required: 'Email address is required',
                                })}
                                autoComplete='username'
							/>
							{errors.email && (
								<p className='text-red-500'>
									{errors.email?.message}
								</p>
							)}
							<span className='absolute inset-y-0 right-4 inline-flex items-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 text-gray-400'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
									/>
								</svg>
							</span>
						</div>
					</div>

					<div>
						<label
							htmlFor='password'
							className='text-sm font-medium'
						>
							Your Photo
						</label>

						<div className='relative mt-1'>
							<input
								type='file'
								className='file-input w-full rounded-lg border-gray-200 text-sm shadow-sm'
								{...register('image', {
									required: 'Image is required',
								})}
							/>
							{errors.password && (
								<p className='text-red-500'>
									{errors.image?.message}
								</p>
							)}
						</div>
					</div>
					<div>
						<label
							htmlFor='password'
							className='text-sm font-medium'
						>
							You are a?
						</label>

						<div className='relative mt-1'>
							<select
								{...register('role', {
									required: 'Role is required',
                                })}
                                defaultValue='buyer'
								className='select select-bordered w-full'
							>
								<option value='buyer'>
									Buyer
								</option>
								<option value='seller'>Seller</option>
							</select>
							{errors.role && (
								<p className='text-red-500'>
									{errors.role?.message}
								</p>
							)}
						</div>
					</div>
					<div>
						<label
							htmlFor='password'
							className='text-sm font-medium'
						>
							Password
						</label>

						<div className='relative mt-1'>
							<input
								type='password'
								className='w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm'
								placeholder='Enter password'
								{...register('password', {
									required: 'Password is required',
									minLength: {
										value: 6,
										message: 'Password must be 6 character',
									},
                                })}
                                autoComplete='current-password'
							/>
							{errors.password && (
								<p className='text-red-500'>
									{errors.password?.message}
								</p>
							)}
							<span className='absolute inset-y-0 right-4 inline-flex items-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 text-gray-400'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
									/>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
									/>
								</svg>
							</span>
						</div>
					</div>
					{createUserLoading && (
						<div className='flex justify-center'>
							<SpinnerThreeDot />
						</div>
					)}
					{!createUserLoading && (
						<button
							type='submit'
							className='block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white'
						>
							Registration
						</button>
					)}

					<p className='text-center text-sm text-gray-500'>
						No account?
						<a className='underline' href=''>
							Registration
						</a>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Registration;
