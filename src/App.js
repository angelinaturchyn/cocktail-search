
import './App.css';
import {GameBanner} from "./components/gameBanner";
import {QuizQuestions} from "./components/quizQuestions";

function App() {
  return (
    < div className="App">
    <GameBanner/>
      <QuizQuestions/>
    </div>
  );
}

export default App;
