import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import StickyNote from "./StickyNote";
const mockStore = configureStore([thunk]);

describe("StickyNote", () => {
  const NAME = "Sarah Edo";
  const AUTHOR = "sarahedo";
  const ID = "8xf0y6ziyjabvozdd253nd";
  let store, component;

  beforeEach(() => {
    store = mockStore({
      users: {
        [AUTHOR]: {
          id: AUTHOR,
          name: NAME,
          avatarURL: "https://placekitten.com/g/240/240",
        },
      },
      questions: {
        [ID]: {
          id: ID,
          author: AUTHOR,
          timestamp: 1467166872634,
        },
      },
    });

    component = render(
      <Provider store={store}>
        <BrowserRouter>
          <StickyNote id={ID} />
        </BrowserRouter>
      </Provider>
    );
  });

  it("should render a card for a question", () => {
    const name = screen.getByText(NAME);
    expect(name).toBeInTheDocument();
  });

  it("should match the snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});
