import React from 'react';
import { ApiImage } from '../types';

interface OwnProps {
	image: ApiImage;
	onCloseButtonClick: () => void;
}

export default function ImageViewModal({ image, onCloseButtonClick }: OwnProps) {
	return (
		<div className="image-view-modal">
			<div className="modal-content">
				<div className="modal-header">
					<div className="user">
						<img src={image.user.profile_image.medium} alt="" />
						<h6>{image.user.username}</h6>
					</div>
					<div className="actions">
						<a
							href={image.links.download}
							rel="noopener noreferrer"
							className="download"
							target="_blank"
							download
						>
							<i className="icofont-download"></i>
						</a>
						<button onClick={onCloseButtonClick} className="close-button">
							<i className="icofont-close"></i>
						</button>
					</div>
				</div>
				<img
					className="main"
					src={image.urls.regular}
					alt={image.alt_description ? image.alt_description : image.description}
				/>
				<div className="modal-footer">
					<p>{image.description ? image.description : image.alt_description}</p>
				</div>
			</div>
		</div>
	);
}
