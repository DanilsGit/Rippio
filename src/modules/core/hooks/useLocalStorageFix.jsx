import { useEffect } from "react";

export const useLocalStorageFix = () => {
    const fix = window.localStorage.getItem('fix6') === 'true';
    const white = window.localStorage.getItem('white') === 'true';

    useEffect(() => {
        if (!fix) {
            window.localStorage.clear();
            window.localStorage.setItem('fix6', 'true');
            if (white) {
                window.localStorage.setItem('white', 'true');
            }
        }
    }, [fix, white]);
};