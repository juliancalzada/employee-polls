import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer from "../reducers";
import SignOut from "./SignOut";
const mockStore = configureStore([thunk]);

describe("SignOut", () => {
  const NAME = "Sarah Edo";
  const AUTHED_USER = "sarahedo";
  let store, component;

  beforeEach(() => {
    store = mockStore({
      authedUser: AUTHED_USER,
      users: {
        [AUTHED_USER]: {
          id: AUTHED_USER,
          name: NAME,
          avatarURL: "https://placekitten.com/g/240/240",
        },
      },
    });

    store.replaceReducer(reducer);

    component = render(
      <Provider store={store}>
        <Router>
          <SignOut />
        </Router>
      </Provider>
    );
  });

  it("should match the snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  it("should sign out the current user", () => {
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const { authedUser } = store.getState();
    expect(authedUser).toBeNull();
  });
});