import { RouterApp } from './routers/RouterApp'
import {Provider} from 'react-redux'
import { store } from './store/store.';




export const JournalApp = () => {

    return (
        <Provider store = {store}>
            <div>
                <RouterApp />
            </div>
        </Provider>
    )
}
