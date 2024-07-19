import React from "react"
import ReactDOM from "react-dom"
import Start from "./Start"
import Question from "./Question"
import CheckAnswers from "./CheckAnswers"

export default function App() {
  
    const [quizStarted, setQuizStarted] = React.useState(false)
    const [quizQuestions, setQuizQuestions] = React.useState()
    const [correctAnswers, setCorrectAnswers] = React.useState({
                                                  checked: false,
                                                  count:0
                                                  })
        
    React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => {
        const processedQuestions = data.results.map((question, index) => {
          const allAnswers = [...question.incorrect_answers, question.correct_answer]
          const shuffledAnswers = shuffleArray(allAnswers)
          return {
            ...question,
            allAnswers: shuffledAnswers,
            selectedAnswer: null,
            isWrong: false,
            id: index  
          };
        });
        setQuizQuestions(processedQuestions)
      });
  }, [quizStarted])

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
    
    function startQuiz() {
        setQuizStarted(true)
    }
    
    function selectAnswer(answer, questionId, e) {
    e.preventDefault()
    
  

    setQuizQuestions(prevQuestions =>
        prevQuestions.map(question =>
            question.id === questionId
                ? { ...question, selectedAnswer: answer }
                : question
        )
    );
}

function checkAnswers() {
  
  function markWrong() {
    setQuizQuestions(prevQuestions =>
        prevQuestions.map(question => 
            question.allAnswers[question.selectedAnswer] !== question.correct_answer
                ? { ...question, isWrong: true }
                : question
        )
    );
}
  
  let count = 0
    quizQuestions.map(question => 
      question.allAnswers[question.selectedAnswer] === question.correct_answer 
      && count++

      )
      
      setCorrectAnswers({
            checked:true,
            counter:count
            
      })
    markWrong()
}

function resetGame() {
    setQuizStarted(false)
    setCorrectAnswers({ 
      checked: false,
      count:0
      })
}
    
    return (
        !quizStarted ? <Start startQuiz={startQuiz} /> :
        
        <section className="wrapper">
            <div className="overlay">
                <div className="content--wrapper">
                    <Question quizQuestions={quizQuestions} selectAnswer={selectAnswer} />
                    <CheckAnswers checkAnswers={checkAnswers} 
                                  correctAnswers={correctAnswers}
                                  resetGame={resetGame} 
                                  />   
                </div>
            </div>
        </section>
    )
}
