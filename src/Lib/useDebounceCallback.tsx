import { useRef } from "react";

function useDebounceCallback<T>(cb: (arg: T) => void, time: number = 500) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    return (arg: T) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            cb(arg)
        }, time);
    }

}

export default useDebounceCallback;