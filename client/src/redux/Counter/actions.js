

    import { SHOWADDTRIPWINDOW, SHOWPROFILINFOTOGGLE } from './types';


    export const changeShowProfileInfo = () => {

        return {

            type: SHOWPROFILINFOTOGGLE,

        };

    };

    export const changeShowAddTripWindow = () => {

        return {

            type: SHOWADDTRIPWINDOW,

        };

    };
