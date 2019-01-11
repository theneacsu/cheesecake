import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import authReducer from '../reducers/authReducer'
import projectsReducer from '../reducers/projectsReducer'
import tasksReducer from '../reducers/tasksReducer'

const store = createStore(
  combineReducers({
    auth: authReducer,
    projects: projectsReducer,
    tasks: tasksReducer
  }),
  composeWithDevTools(applyMiddleware(reduxThunk))
)

export default store
