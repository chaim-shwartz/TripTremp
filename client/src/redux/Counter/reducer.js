
    import { SHOWPROFILINFOTOGGLE } from './types';
    import { SHOWADDTRIPWINDOW } from './types';


    const INITIAL_STATE = {
        show: false,
        showAddNewTrip: false
    };

    const reducer = (state = INITIAL_STATE, action) => {

        switch (action.type) {

            case SHOWPROFILINFOTOGGLE:

               return {

                 ...state, show: !state.show,

               };
            
               case SHOWADDTRIPWINDOW:

               return {

                 ...state, showAddNewTrip: !state.showAddNewTrip,

               };
             default: return state;

        }

    };

    export default reducer;