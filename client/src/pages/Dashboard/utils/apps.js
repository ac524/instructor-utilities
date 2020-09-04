import { useDashboardDispatch, getDashboardAction as gda } from "../store"
import { SET_MANAGE_APPS } from "../store/actions";

export const useManageApps = () => {

    const dispatch = useDashboardDispatch();

    return ( state ) => dispatch( gda( SET_MANAGE_APPS, state ) );

}