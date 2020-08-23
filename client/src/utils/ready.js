import { useStoreContext } from "../store";

export const useIsReady = () => {

    const [ { ready: { complete, when } } ] = useStoreContext();

    return !when.length || when.every( step => complete.includes( step ) );

}