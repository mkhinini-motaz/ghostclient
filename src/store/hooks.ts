import { useContext } from "react";
import StoreContext from "./StoreContext";

export function useStoreContext() {
    return useContext(StoreContext);
}

export function useSelector(selector: (state: object) => any) {
    const { state } = useStoreContext();
    return selector(state);
}

export function useDispatch() {
    const { dispatch } = useStoreContext();
    return dispatch;
}
