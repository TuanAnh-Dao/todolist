import rootReducer from './reducers/rootReducer';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension';



const middleware = [thunk]


export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middleware)
        // other store enhancers if any
      )
)





export default store;