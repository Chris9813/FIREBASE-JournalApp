import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startRegisterWithEmailPasswordName } from "../../../../actions/auth";
import { LoginScreen } from "../../../../components/auth/LoginScreen";
import { RegisterScreen } from "../../../../components/auth/RegisterScreen";
import { types } from "../../../../types/types";



const middlewares = [thunk];
const mockStore = configureStore(middlewares);

configure({ adapter: new Adapter() });

const initState = {
    auth: { },
    ui: {
        loading: false,
        msgError: null,
    }
};

let store = mockStore(initState)
//store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
    );

describe('Pruebas en <RegisterScreen />', () => {
    test('debe de mostrrse correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    test('debe de hacer dispatch de la accion respectiva ', () => {
        const emailField = wrapper.find('input[name="email"]')
        emailField.simulate("change", {
            target: {
                value: '',
                name: 'email',
            }
        });
        wrapper.find("form").simulate("submit", {
            preventDefault(){}
        });
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email Incorrect',
        });
    });
    
    test('debe dde mostrar alert de error ', () => {
        
        const initState = {
            auth: { },
            ui: {
                loading: false,
                msgError: 'Email Incorrect',
            }
        };
        
        const store = mockStore(initState)
        
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find('.auth_alert-error').text().trim()).toBe('Email Incorrect');

    });
    

});
