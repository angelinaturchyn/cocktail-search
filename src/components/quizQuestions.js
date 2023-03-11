import React, { useState } from "react";

export const QuizQuestions = () => {
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            answer: "Paris",
        },
        {
            question: "What is the currency of Japan?",
            options: ["Dollar", "Yuan", "Euro", "Yen"],
            answer: "Yen",
        },
        {
            question: "What is the largest planet in our solar system?",
            options: ["Mars", "Jupiter", "Venus", "Saturn"],
            answer: "Jupiter",
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const refreshQuiz = () => {
        setCurrentQuestion(0);
        setShowScore(false);
        setScore(0);
    };

    const startQuiz = () => {
        setGameStarted(true);
    };

    return (
        <div className="quiz">
            {!gameStarted ? (
                <button onClick={startQuiz}>Start the Game</button>
            ) : showScore ? (
                <div className="score-section">
                    You scored {score} out of {questions.length}
                </div>
            ) : (
                <>
                    <div className="question-section">
                        <div className="question-count">
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className="question-text">
                            {questions[currentQuestion].question}
                        </div>
                    </div>
                    <div className="answer-section">
                        {questions[currentQuestion].options.map((option) => (
                            <button
                                key={option}
                                onClick={() =>
                                    handleAnswerOptionClick(option === questions[currentQuestion].answer)
                                }
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            )}
            {gameStarted && <button onClick={refreshQuiz}>Refresh</button>}
        </div>
    );
};
