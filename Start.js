import React from "react"

export default function Start(props) {
    return (
         <section className="wrapper">
            <div className="overlay">
                <div className="content--wrapper">
                    <h1 className="main--title">Quizzical</h1>
                    <h3 className="title--description">Try your luck on some of the toughest Quiz questions out there...</h3>
                    <button className="button start-button" onClick={props.startQuiz}>Start Quiz</button>
                </div>
            </div>
        </section>
    )
}