
    import { SHOWPROFILINFOTOGGLE } from './types';


    const INITIAL_STATE = {
        show: false,
    };

    const reducer = (state = INITIAL_STATE, action) => {

        switch (action.type) {

            case SHOWPROFILINFOTOGGLE:

               return {

                 ...state, show: !state.show,

               };

             default: return state;

        }

    };

    export default reducer;