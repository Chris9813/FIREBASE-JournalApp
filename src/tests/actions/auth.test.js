import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import "@testing-library/jest-dom"
import { login, logout, startLoginEmailPaswword, startLogout } from "../../actions/auth"
import { types } from "../../types/types"


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState= {};

let store = mockStore(initState)

describe('Pruebas en auth', () => {

    beforeEach(() => {
        store = mockStore(initState);
    })
    
    test('Login y Logout deben de crear la accion respectiva ', () => {
        const user = {
            uid: "123",
            displayname:"Chris"
        }
        const actionLog = login(user.uid,user.displayname)
        const actionLogout = logout()
        expect(actionLog.type).toBe(types.login);
        expect(actionLog.payload).toMatchObject(user)
        expect(actionLogout.type).toBe(types.logout)
    })

    test('debe realizar el logout ', async() => {
        
        await store.dispatch(startLogout());
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.logout
        });
        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        });
    })

    test('debe de iniciar el startLoginEmailAndPassword ', async() => {
        await store.dispatch(startLoginEmailPaswword("test@testing.com","123456"))
        const actions = store.getActions();
        expect(actions[1]).toEqual({
            type: types.login,
            payload:{
                uid: "Sw7D8SOIBBZNiwhorvScLIybCkd2",
                displayname: null,
            }
        })
    })
    
    
    
})
