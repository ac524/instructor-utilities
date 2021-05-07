

import { useState, useEffect } from "react";

export const getWindowDimensions = () => {
	const { innerWidth: width } = window;
	return {
		width
	};
};

export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		const handleResize = () => {
			setWindowDimensions(getWindowDimensions());
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
};
