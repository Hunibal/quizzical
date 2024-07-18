import React from "react"
import he from "he"

export default function Question(props) {
    
    return (
       <section className="question--wrapper">
            {props.quizQuestions.map(question => (
                <section key={question.id} className="question--wrapper">
                    <h2 className="question">{he.decode(question.question)}</h2>
                    <section className="answer--selection">
                        {question.allAnswers.map((answer, index) => (
                        <button key={index} onClick={(e) => props.selectAnswer(index, question.id, e)} style={{
                            backgroundColor: question.selectedAnswer === index ? 'rgba(0, 128, 0, 0.7)' : 'rgba(0,0,0,0.7)' }} 
                            className={`button answer-button ${question.isWrong && question.correct_answer === answer ? "isWrong" : ""}`}>
                            {he.decode(answer)}
                        </button>
                        ))}
                    </section>
                </section>
            ))}
        </section>
    )
}