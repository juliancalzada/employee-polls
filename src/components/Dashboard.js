import { connect } from "react-redux";
import Question from "./Question";

const Dashboard = ({ questionIds }) => {
  return (
    <div className="container">
      <h2 className="my-5 is-size-3 has-text-centered-mobile">Dashboard</h2>
      <div className="columns is-multiline">
        {questionIds.map((id) => (
          <Question key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions }) => ({
  questionIds: Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  ),
});

export default connect(mapStateToProps)(Dashboard);
