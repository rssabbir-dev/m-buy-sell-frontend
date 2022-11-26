
import axios from 'axios';
import { GoogleAuthProvider } from 'firebase/auth';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const ProviderLogin = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state?.from?.pathname || '/';
	const { providerLogin } = useContext(AuthContext);
	const handleGoogleLogin = () => {
		const provider = new GoogleAuthProvider();
		providerLogin(provider)
			.then((res) => {
				const user = res.user;
				toast.success('Login Success');
                getAccessToken(user?.uid);
                savedUserInDb(user)
				navigate(from, { replace: true });
			})
			.catch((err) => toast.error(err.message));
	};
	const getAccessToken = (uid) => {
		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/jwt`, { uid })
			.then((res) => {
				localStorage.setItem('accessToken',res.data.accessToken)
				navigate(from, { replace: true });
			})
			.catch((err) => {
				console.log(err);
			});
    };
    
    const savedUserInDb = (data) => {
		const user = {
			displayName: data.displayName,
			email: data.email,
			photoURL:data.photoURL,
			role: 'buyer',
			uid: data.uid,
			status: 'unverified',
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
		<div className='flex justify-center'>
			<div
				onClick={handleGoogleLogin}
				className='btn btn-ghost flex justify-center items-center gap-3 border border-gray-300 shadow'
			>
				
				<span>Continue With Google</span>
			</div>
		</div>
	);
};

export default ProviderLogin;
