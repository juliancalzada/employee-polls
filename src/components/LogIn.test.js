import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer from "../reducers";
import LogIn from "./LogIn";
const mockStore = configureStore([thunk]);

describe("LogIn", () => {
  const AUTHED_USER = "zoshikanlu";
  let store, component;

  beforeEach(() => {
    store = mockStore({
      authedUser: null,
      users: {
        [AUTHED_USER]: {
          id: AUTHED_USER,
          password: "pass246",
          avatarURL: "https://placekitten.com/g/240/240",
        },
      },
    });

    store.replaceReducer(reducer);

    component = render(
      <Provider store={store}>
        <Router>
          <LogIn />
        </Router>
      </Provider>
    );
  });

  it("should match the snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  it("should empty the fields", () => {
    const username = screen.getByLabelText(/Username/);
    const password = screen.getByLabelText(/Password/);
    fireEvent.change(username, { target: { value: "" } });
    fireEvent.change(password, { target: { value: "" } });
    expect(username.value).toBe("");
    expect(password.value).toBe("");
  });
});
