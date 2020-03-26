import React, { useState, useEffect } from 'react';

interface OwnProps {
	src: string;
	alt: string;
}

enum ImageStates {
	'loaded',
	'error',
}

export default function LazyImage({ src, alt }: OwnProps) {
	const placeHolder =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

	const [imageSrc, setImageSrc] = useState(placeHolder);
	const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

	const onImageLoad = (event: any) => {
		event.target.classList.add(ImageStates.loaded);
	};

	const onImageError = (event: any) => {
		event.target.classList.add(ImageStates.error);
	};

	useEffect(() => {
		let observer: any;
		let didCancel = false;

		if (imageRef && imageSrc !== src) {
			if (IntersectionObserver) {
				observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (
								!didCancel &&
								(entry.intersectionRatio > 0 || entry.isIntersecting)
							) {
								setImageSrc(src);
								observer.unobserve(imageRef);
							}
						});
					},
					{
						threshold: 0.01,
						rootMargin: '75%',
					}
				);
				observer.observe(imageRef);
			} else {
				setImageSrc(src);
			}
		}
		return () => {
			didCancel = true;

			if (observer && observer.unobserve) {
				observer.unobserve(imageRef);
			}
		};
	}, [src, imageSrc, imageRef]);
	return (
		<img
			ref={setImageRef}
			src={imageSrc}
			alt={alt}
			onLoad={onImageLoad}
			onError={onImageError}
		/>
	);
}
