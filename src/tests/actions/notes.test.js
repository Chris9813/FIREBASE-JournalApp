/*** @jest-environment node */
import * as fs from 'fs';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { startLoadingNotes, startNewNote, startSaveNote, startUpLoading } from '../../actions/notes'
import { db } from '../../firebase/firebase-config'
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState= {
    auth: {
        uid: "TESTING",
    },
    notes: {
        active: {
            id: "bxOTAD1c3Oa5oqh9N7R2"
        }
    }
}

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn()
}))

let store = mockStore(initState)


describe('Pruebas con accoines e notes', () => {

    beforeEach(() => {
        store = mockStore(initState);
    })

    test('debe crear una nueva nota StarNewNote ', async() => {
        await store.dispatch( startNewNote() );
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
            id: expect.any(String),
            title: "",
            body: "",
            date: expect.any(Number),
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
            id: expect.any(String),
            title: "",
            body: "",
            date: expect.any(Number),
            }
        });

        const docId = actions[0].payload.id;
        await db.doc(`/TESTING/journal/notes/${docId}`).delete();

    })

    test('startLoadingNotes debe cargar las notas ', async() => {
        await store.dispatch( startLoadingNotes("TESTING") );
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        })
        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }
        expect(actions[0].payload[0]).toMatchObject(expected)
    })
    
    test('startSaveNOte debe actualiar la nota ', async() => {
        
        const note = {
            id: "bxOTAD1c3Oa5oqh9N7R2",
            title: "titulo",
            body: "body",
        }
        await store.dispatch(startSaveNote(note));
        const actions = store.getActions();
        expect(actions[0].type).toBe(types.notesUpdated);
        const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
        expect(docRef.data().title).toBe(note.title);
    })
    
    test('startUpLoading debe de actualizar el url del entry ', async() => {
        fileUpload.mockReturnValue('https://hola-mundo.com')
        fs.writeFileSync('foto.jpg', '')
        const file = fs.readFileSync('foto.jpg')
        await store.dispatch(startUpLoading(file))
        const docRef = await db.doc(`/TESTING/journal/notes/bxOTAD1c3Oa5oqh9N7R2`).get()
        expect(docRef.data().url).toBe('https://hola-mundo.com')
    })  
    
})
