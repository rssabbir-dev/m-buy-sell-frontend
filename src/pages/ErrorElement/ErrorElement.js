import React from 'react';

const ErrorElement = ({ message }) => {
	if (message) {
		return (
			<div>
                <p>{message}</p>
			</div>
		);
	}
	return <div></div>;
};

export default ErrorElement;
