import { combineReducers } from "redux";
import { reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import dataReducer from './dataReducer';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    data: dataReducer
});

export default rootReducer;