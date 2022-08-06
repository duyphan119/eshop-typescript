import { useLayoutEffect } from "react";

function useTitle(title: string) {
	useLayoutEffect(() => {
		document.title = title;
	}, [title]);
	return title;
}

export default useTitle;
