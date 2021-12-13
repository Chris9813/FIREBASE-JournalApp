import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, mount } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { login } from "../../actions/auth";
import { RouterApp } from "../../routers/RouterApp";
import {firebase} from '../../firebase/firebase-config'
import Swal from 'sweetalert2'


jest.mock("../../actions/auth", () => ({
    login: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
    fire: jest.fn(),
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


describe('Pruebas en <RouterApp />', () => {

    test('debe llmar el login estoy autenticado ', async() => {

        let user;

        await act(async () => {

            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCred.user;

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <RouterApp />
                    </MemoryRouter>
                </Provider>
                )
        });
        expect(login).toHaveBeenCalledWith('Sw7D8SOIBBZNiwhorvScLIybCkd2', null);
    });
    


})
