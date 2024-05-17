import React from "react"

export default function Question(props) {
    const {id, question, answers, correctAnswer, selectedAnswer, handleSelect, showAnswer} = props
    
    const answerElements = answers.map(answer => {
        const isSelected = selectedAnswer === answer
        const isCorrect = answer === correctAnswer
        let backgroundColor = ""
        let color = ""
        let border = ""
        
        if(!showAnswer) {
            backgroundColor = isSelected ? "#D6DBF5" : ""
        } else {
            if(isCorrect) {
                backgroundColor = "#94D7A2"
                border = "none"
            } else if(isSelected && !isCorrect) {
                backgroundColor = "#F8BCBC"
                color = "#7d8bc9"
                border = "none"
            } else {
                color = "#7d8bc9"
                border = "1px solid #7d8bc9"
            }
        }
        
        const answerStyles = {
            backgroundColor,
            color,
            border,
            pointerEvents: showAnswer ? "none" : "auto"
        } 
        
        return (
            <div key={answer} className="question--answer">
                <input
                    type="radio"
                    id={`${id}-${answer}`}
                    name={`question-${id}`}
                    value={answer}
                    checked={selectedAnswer === answer}
                    onChange={() => handleSelect(answer, id)}
                    disabled={showAnswer}
                />
                <label htmlFor={`${id}-${answer}`} style={answerStyles}>{answer}</label>
            </div>
        )
    })
    
    return (
        <div>
            <h2>{question}</h2>
            <div className="question--answer-container">
                {answerElements}
            </div>
            <hr />
        </div>
    )
}
