import { useEffect } from "react";

export default function useWatch(fn, args) {
    useEffect(
        () => {
            const retorno = fn();
            if (!(retorno instanceof Promise)) {
                return retorno;
            }
        },
        args instanceof Array ? args : [args],
    );
}
