import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { activeNote } from "../../../../actions/notes";
import { NoteScreen } from "../../../../components/notes/NoteScreen";


jest.mock("../../../../actions/notes", () => ({
    activeNote: jest.fn(),
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

configure({ adapter: new Adapter() });

const initState = {
    auth: {name: 'chris'},
    ui: {
        loading: false,
        msgError: null,
    },
    notes: {
        active:{
            id: 1234,
            title: 'hola',
            body: 'mundo',
            date: 0,

        },
        notes: [],
    }
};

let store = mockStore(initState)
store.dispatch = jest.fn();

describe('Pruebas en <NoteScreen />', () => {
    
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <NoteScreen />
        </MemoryRouter>
    </Provider>
    );

    test('should ', () => {
        expect( wrapper ).toMatchSnapshot();

    });
    
    test('debe de disparar el activeNOte ', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'holalala'
            }
        });

        expect( activeNote ).toHaveBeenLastCalledWith(
            1234,
            {
                body: 'mundo',
                title: 'holalala',
                id: 1234,
                date: 0,
            }
        );

    });
    

})
