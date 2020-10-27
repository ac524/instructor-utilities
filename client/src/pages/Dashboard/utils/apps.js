import { useDashboardDispatch, getDashboardAction as gda } from "pages/Dashboard/store"
import { SET_MANAGE_APPS } from "pages/Dashboard/store/actionsNames";

export const useManageApps = () => {

    const dispatch = useDashboardDispatch();

    return ( state ) => dispatch( gda( SET_MANAGE_APPS, state ) );

}