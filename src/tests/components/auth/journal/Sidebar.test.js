import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startLogout } from "../../../../actions/auth";
import { noteLogout, startNewNote } from "../../../../actions/notes";
import { Sidebar } from "../../../../components/journal/Sidebar";



jest.mock("../../../../actions/auth", () => ({
    startLogout: jest.fn(),
}));

jest.mock("../../../../actions/notes", () => ({
    noteLogout: jest.fn(),
    startNewNote: jest.fn(),
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
            id: "hola",
        },
        notes: [],
    }
};

let store = mockStore(initState)
store.dispatch = jest.fn();

describe('Pruebas en <SideBar />', () => {
    
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <Sidebar />
        </MemoryRouter>
    </Provider>
    );

    test('debe de mostrarse correctaente ', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe llamar la accion starLogout ', () => {
        wrapper.find('.btn').prop('onClick')();
        expect(startLogout).toHaveBeenCalled();
        expect(noteLogout).toHaveBeenCalled();
    });

    test('debe de llamar el startNewNote ', () => {
        wrapper.find('.journal_new-entry').prop('onClick')();
        expect(startNewNote).toHaveBeenCalled();
        
    });

});
