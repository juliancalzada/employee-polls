import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("_saveQuestion", () => {
  it("will return an error", async () => {
    await expect(_saveQuestion({})).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("will save and return a formatted question", async () => {
    const author = "author_id";
    const optionOneText = "option_one_text";
    const optionTwoText = "option_two_text";
    const question = { author, optionOneText, optionTwoText };
    const expectation = {
      author: author,
      optionOne: {
        votes: [],
        text: optionOneText,
      },
      optionTwo: {
        votes: [],
        text: optionTwoText,
      },
    };
    await expect(_saveQuestion(question)).resolves.toMatchObject(expectation);
  });
});

describe("_saveQuestionAnswer", () => {
  it("will return an error", async () => {
    await expect(_saveQuestionAnswer({})).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });

  it("will save the answer to the questions and returns true", async () => {
    const authedUser = "zoshikanlu";
    const qid = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionTwo";

    await expect(
      _saveQuestionAnswer({ authedUser, qid, answer })
    ).resolves.toBe(true);
  });
});
