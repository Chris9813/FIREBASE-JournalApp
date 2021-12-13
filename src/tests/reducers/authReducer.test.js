import { authReducer } from "../../components/reducers/authReducer"
import { types } from "../../types/types";


describe('Pruebas en authReducer', () => {

    
    
    test('debe loguear correctamente al usuario ', () => {
        const action = {
            type: types.login,
            payload: {
                uid: "123",
                displayname: "Chris"
            }
        }
        
        expect(authReducer({},action)).toEqual({
            uid: action.payload.uid,
            name: action.payload.displayname
        })
    })

    test('debe sacar correctamente al usuario ', () => {
        const action = {
            type: types.logout,
        }

        expect(authReducer({uid: "123",
        displayname: "Chris"},action)).toEqual({})
    })

    test('debe mostrar valor por defecto ', () => {
        const action = {
            type: "hola"
        }
        
        expect(authReducer({uid: "123",
        displayname: "Chris"},action)).toEqual({uid: "123",
        displayname: "Chris"})
    })

})
