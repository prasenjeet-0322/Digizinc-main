'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface Image {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	return (
		<div ref={container} className="relative h-[250vh] bg-black">
			<div className="sticky top-0 h-screen overflow-hidden">
				{images.map(({ src, alt }, index) => {
					const scale = scales[index % scales.length];

					return (
						<motion.div
							key={index}
							style={{ scale }}
							className={`absolute top-0 h-full w-full items-center justify-center 
                ${[1, 3, 4, 5].includes(index) ? 'hidden md:flex' : 'flex'}
                ${index === 0 ? '[&>div]:!h-[28vh] [&>div]:!w-[85vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[25vw]' : ''}
                ${index === 1 ? 'md:[&>div]:!-top-[30vh] md:[&>div]:!left-[5vw] md:[&>div]:!h-[30vh] md:[&>div]:!w-[35vw]' : ''} 
                ${index === 2 ? '[&>div]:!-top-[33vh] [&>div]:!w-[85vw] [&>div]:!h-[34vh] md:[&>div]:!-top-[10vh] md:[&>div]:!-left-[25vw] md:[&>div]:!h-[45vh] md:[&>div]:!w-[20vw]' : ''} 
                ${index === 3 ? 'md:[&>div]:!left-[27.5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[25vw]' : ''} 
                ${index === 4 ? 'md:[&>div]:!top-[27.5vh] md:[&>div]:!left-[5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[20vw]' : ''} 
                ${index === 5 ? 'md:[&>div]:!top-[27.5vh] md:[&>div]:!-left-[22.5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[30vw]' : ''} 
                ${index === 6 ? '[&>div]:!top-[24vh] [&>div]:!w-[85vw] [&>div]:!h-[16vh] md:[&>div]:!top-[22.5vh] md:[&>div]:!left-[25vw] md:[&>div]:!h-[15vh] md:[&>div]:!w-[15vw]' : ''} 
              `}
						>
							<div className="relative h-[25vh] w-[25vw] overflow-hidden rounded-xl border border-white/10 shadow-xl shadow-black/50 bg-black">
								{src.endsWith('.mp4') ? (
									<video
										src={src}
										autoPlay
										loop
										muted
										playsInline
										className="h-full w-full object-contain scale-[1.35]"
									/>
								) : (
									<img
										src={src || '/placeholder.svg'}
										alt={alt || `Parallax image ${index + 1}`}
										className="h-full w-full object-cover"
									/>
								)}
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
