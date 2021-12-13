import { types } from '../../types/types';


describe('Pruebas en types', () => {
    const  typesRequired = {
    login: "[Auth] Login",
    logout: "[Auth] Logout",

    uiSetError: "[UI] Set Error",
    uiRemoveError: "[UI] Remove Error",

    uiStartLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',

    notesAddNew: "[Notes] New note",
    notesActive: "[Notes] New set active note",
    notesLoad: "[Notes] Load note",
    notesUpdated: "[Notes] Updated note",
    notesFileUrl: "[Notes] Updated img url",
    notesDelete: "[Notes] Delete note",
    notesLogoutCleaning: "[Notes] Logout Cleaning",
    
    }
    test('deben estar todos los Types ', () => {
        expect(types).toEqual(typesRequired)
    })
    

})
