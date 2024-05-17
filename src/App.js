import React from "react"
import Start from "./Start"
import Question from "./Question"

export default function App() {
    const [showQuestion, setShowQuestion] = React.useState(false)
    const [showAnswer, setShowAnswer] = React.useState(false)
    
    const [amount, setAmount] = React.useState(5)
    const [difficulty, setDifficulty] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [type, setType] = React.useState("")
    
    const [questions, setQuestions] = React.useState([])
    
    const [errorMessage, setErrorMessage] = React.useState("")
    
    const correctAnswers = questions.filter(question => question.selectedAnswer === question.correct_answer)

    function handleStart() {
        setShowQuestion(true)
        fetchTriviaApi()
    }

    async function fetchTriviaApi() {
         try {
            const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
            const data = await response.json()
            
            const formattedQuestions = data.results.map((question, index) => {
                let answers
                if (question.type === 'boolean') {
                    answers = [parseHTMLString(question.correct_answer), parseHTMLString(question.incorrect_answers[0])]
                } else {
                    answers = [parseHTMLString(question.correct_answer), ...question.incorrect_answers.map(parseHTMLString)].sort(() => Math.random() - 0.5)
                }
                
                return {
                    id: index++, 
                    type: question.type,
                    difficulty: question.difficulty,
                    category: question.category,
                    question: parseHTMLString(question.question), // Parse HTML string
                    correct_answer: parseHTMLString(question.correct_answer), // Parse HTML string
                    incorrect_answers: question.incorrect_answers.map(parseHTMLString), // Parse HTML strings in the incorrect answers
                    answers,
                    selectedAnswer: ""
                }
            })
            setQuestions(formattedQuestions)
            
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }

    // Function to parse HTML string
    function parseHTMLString(htmlString) {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(htmlString, 'text/html').body.textContent;
        return decodedString;
    }
    
    
    function handleSelect(answer, questionId) {
        setQuestions(prevQuestions => {
            return prevQuestions.map(question => {
                if(question.id === questionId) {
                    return {
                        ...question,
                        selectedAnswer: answer
                    }
                }
                return question
            })
        })
    }
    
    function handleCheckAnswer() {
        const unansweredQuestion = questions.filter(question => !question.selectedAnswer)
        if(unansweredQuestion.length > 0) {
            setErrorMessage("Please answer all questions before checking the answers.")
        } else {
            setShowAnswer(true)
            setErrorMessage("")
        }
    }
    
    function handleReset() {
        setShowQuestion(false)
        setShowAnswer(false)
        setQuestions([])
        setAmount(5)
        setDifficulty("")
        setCategory("")
        setType("")
    }

    const questionElements = questions.map(question => {
        return <Question 
                    key={question.id}
                    id={question.id}
                    question={question.question}
                    answers={question.answers}
                    correctAnswer={question.correct_answer}
                    selectedAnswer={question.selectedAnswer}
                    handleSelect={handleSelect}
                    showAnswer={showAnswer}
                />
    })
    
    return (    
        <div>
            {showQuestion ? 
                <div className="question-container">
                    <div className="question--question-container">
                        {questionElements}
                    </div>
                    <div className="question--button-container">
                        {!showAnswer ?
                            <div className="question--button-before-container">
                                {errorMessage && (
                                    <div className="error-message">
                                        {errorMessage}
                                    </div>
                                )}
                                <button className="question--button" onClick={handleCheckAnswer}>
                                    Check Answers
                                </button>
                            </div>
                            
                        :
                            <div className="question--button-after-container">
                                <h4>
                                    You scored {correctAnswers.length}/{questions.length} correct answers
                                </h4>
                                <button className="question--reset-button" onClick={handleReset}>
                                    Play again
                                </button>
                            </div>
                        }
                    </div>
                </div>
                
            : 
                <Start 
                    handleStart={handleStart} 
                    amount={amount}
                    setAmount={setAmount}
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                    category={category}
                    setCategory={setCategory}
                    type={type}
                    setType={setType}
                />
            }
        </div>
    )
}