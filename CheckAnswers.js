import React from "react"

export default function CheckAnswers(props) {
    return (
        <section className="check-wrapper">
                    { props.correctAnswers.checked 
                        ? <section className="results-wrapper"><h2>You have answered {props.correctAnswers.counter}/5 questions correctly.</h2><button className="button reset-button" onClick={props.resetGame}>Reset Game</button></section> 
                        : <button className="button check-answers-button" onClick={props.checkAnswers}>Check Answers</button> }
        </section>
    )
}