import React from 'react';
interface OwnProps {
	message: string;
}
export default function NoContent({ message }: OwnProps) {
	return (
		<div className="no-content">
			<p>{message}</p>
		</div>
	);
}
