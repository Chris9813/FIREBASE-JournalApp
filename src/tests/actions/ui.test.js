import { remError, setError } from "../../actions/ui"
import { types } from "../../types/types"


describe('Pruebas en ui-actions', () => {
    
    test('todas las acciones deben funcionar', () => {
        
        const action = setError("Help");
        expect(action).toEqual({
            type: types.uiSetError,
            payload: "Help",
        });

        const removeErrorAction = remError();
        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError,
        })
    });

    


    
})
