import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startGoogleLogin, startLoginEmailPaswword } from "../../../../actions/auth";
import { LoginScreen } from "../../../../components/auth/LoginScreen";

jest.mock("../../../../actions/auth", () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPaswword: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

configure({ adapter: new Adapter() });

const initState = {
    auth: [],
    ui: {
        loading: false,
        msgError: null,
    }
};

let store = mockStore(initState)
store.dispatch = jest.fn();


describe('Pruebas en <LoginScrren />', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
    )
    test('debe de mostrarse correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe e dispar la acccion de starloginscreen ', () => {
        
        wrapper.find(".google-btn").prop("onClick")();
        expect( startGoogleLogin ).toHaveBeenCalled();
        
    })
    
    test('debe disparar el starLogin con los respectivo argumentos ', () => {
        wrapper.find("form").prop("onSubmit")({preventDefault(){}})
        expect( startLoginEmailPaswword ).toHaveBeenCalledWith("chris9813@gmail.com", "123456");
        
    })
})
