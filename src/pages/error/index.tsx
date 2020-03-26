import React from 'react';
import errorPlaceholder from '../../assets/dribbble_1.gif';

interface OwnProps {
	message: string;
}

export default function ErrorPage({ message }: OwnProps) {
	return (
		<div className="error-page">
			<img src={errorPlaceholder} alt="Error placeholder" />
			<p className="error-paragraph">{message}</p>
		</div>
	);
}
