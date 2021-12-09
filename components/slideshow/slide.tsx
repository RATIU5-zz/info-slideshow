import Image from "next/image";
import styles from "./slide.module.css";
import { CSSTransition } from "react-transition-group";

const Slide = (
	props: {
		showSlide?: boolean;
		src: string;
		alt: string;
		duration: number;
		useTransitions?: boolean;
	} = { showSlide: true, src: "", alt: "", duration: 1000, useTransitions: true },
) => {
	const transitionStyle = {
		transition: `opacity ${props.duration}ms ease-in-out`,
	};

	if (props.useTransitions) {
		return (
			<CSSTransition
				style={{ ...transitionStyle }}
				in={props.showSlide}
				timeout={props.duration}
				classNames={{
					enter: styles.enter,
					enterActive: styles.enterActive,
					enterDone: styles.enterDone,
					exit: styles.exit,
					exitActive: styles.exitActive,
					exitDone: styles.exitDone,
				}}
				unmountOnExit>
				<div>
					<Image
						className={styles.background}
						src={props.src}
						alt={props.alt}
						layout="fill"
						objectFit="cover"
						objectPosition="center"
					/>
					<Image
						src={props.src}
						alt={props.alt}
						layout="fill"
						objectFit="contain"
						objectPosition="center"
					/>
				</div>
			</CSSTransition>
		);
	} else {
		return (
			<div>
				<Image
					className={styles.background}
					src={props.src}
					alt={props.alt}
					layout="fill"
					objectFit="cover"
					objectPosition="center"
				/>
				<Image
					src={props.src}
					alt={props.alt}
					layout="fill"
					objectFit="contain"
					objectPosition="center"
				/>
			</div>
		);
	}
};

export default Slide;
