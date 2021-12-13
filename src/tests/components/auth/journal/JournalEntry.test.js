import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { activeNote } from "../../../../actions/notes";
import { JournalEntry } from "../../../../components/journal/JournalEntry";


jest.mock("../../../../actions/notes", () => ({
    activeNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

configure({ adapter: new Adapter() });

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();


const nota = {
    id: 10,
    date: 0,
    title: 'hola',
    body: 'mundo',
    url: 'https://asas.com'
};



describe('Pruebas en <JournalEntry />', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <JournalEntry {...nota}/>
        </MemoryRouter>
    </Provider>
    );
    
    test('debe e mostrarse correctamente ', () => {
        expect( wrapper ).toMatchSnapshot()
    });

    test('ebe de activar la nota ', () => {
        wrapper.find('.journal_entry').prop('onClick')();
        expect(activeNote).toHaveBeenCalledWith();
    })
    
    

})
