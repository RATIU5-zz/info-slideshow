import React, { useEffect } from "react";
import useInterval from "../../hooks/useInterval";
import Slide from "./slide";
import useTimeout from "../../hooks/useTimeout";

// Yes, it's messy I know
const Slideshow = (props: { slides: string[]; duration?: number; time?: number }) => {
	const slideCount = props.slides.length;
	const [nextSlidePos, setNextSlidePos] = React.useState<number>(0);
	const [showCurrent, setShowCurrent] = React.useState<boolean>(false);
	const [isSwitching, setIsSwitching] = React.useState<boolean>(false);

	const time = props.time || 5000;
	const duration = props.duration || 1000;

	const nextSlide = () => {
		// Set next slide
		if (nextSlidePos >= slideCount - 1) setNextSlidePos(0);
		else setNextSlidePos(nextSlidePos + 1);
	};

	useInterval(() => {
		setShowCurrent(false);
		setIsSwitching(true);
	}, time);

	useTimeout(() => {
		setShowCurrent(true);
		nextSlide();
		setIsSwitching(false);
	}, (isSwitching && duration) || null);

	return (
		<div>
			<Slide
				useTransitions={false}
				src={props.slides[nextSlidePos]}
				alt={`image ${props.slides[nextSlidePos]} cannot be shown 2`}
				duration={duration}
			/>
			<Slide
				useTransitions={true}
				src={
					nextSlidePos === 0
						? props.slides[slideCount - 1]
						: props.slides[nextSlidePos - 1]
				}
				alt={`image ${
					nextSlidePos === 0
						? props.slides[slideCount - 1]
						: props.slides[nextSlidePos - 1]
				} cannot be shown 1`}
				showSlide={showCurrent}
				duration={duration}
			/>
		</div>
	);
};

export default Slideshow;
