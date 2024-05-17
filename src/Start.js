import React from "react"

export default function Start(props) {
    const {handleStart, amount, setAmount, difficulty, setDifficulty, category, setCategory, type, setType} = props
    
    return (
        <div className="start-container">
            <h1 className="start--title">Quizzical</h1>
            <h3 className="start--description">Do you wanna play?</h3>
            <form className="start--form">
                <label htmlFor="amount">Number of Questions (Max 20):</label>
                <div className="start--amount">
                    <input 
                        type="range" 
                        id="amount" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)}
                        min={1} 
                        max={20}
                    />
                    <span>{amount}</span>
                </div>
                <label htmlFor="difficulty">Select Difficulty:</label>
                <select
                    id="difficulty"
                    value={difficulty} 
                    onChange={(e)=> setDifficulty(e.target.value)}
                >
                    <option value="">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <label htmlFor="type">Select Type:</label>
                <select 
                    id="type"
                    value={type} 
                    onChange={(e)=> setType(e.target.value)}
                >
                    <option value="">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select>
                <label htmlFor="category">Select Category:</label>
                <select 
                    id="category"
                    value={category} 
                    onChange={(e)=> setCategory(e.target.value)}
                >
                    <option value="">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals & Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science & Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                </select>
            </form>
            <button className="start--button" onClick={handleStart}>Start quiz</button>
        </div>
    )
}