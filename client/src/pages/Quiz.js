import React, { useState, useEffect } from 'react';
import { getQuizList, getQuiz, saveScore } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FileText, Timer, Check, X as XIcon, Lightbulb } from 'lucide-react';

function Quiz() {
  const { user } = useAuth();
  const [quizList, setQuizList] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  
  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Time tracking (optional feature)
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const data = await getQuizList();
      setQuizList(data);
    };
    fetchQuizzes();
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      handleSubmit(); // Auto-submit when time is up
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const startQuiz = async (quizId) => {
    const data = await getQuiz(quizId);
    if (data) {
      setActiveQuiz(data);
      setCurrentQuestionIndex(0);
      setSelectedOptions({});
      setIsSubmitted(false);
      setScore(0);
      
      // Allow 1 minute per question
      setTimeLeft(data.questions.length * 60);
      setTimerActive(true);
    }
  };

  const handleOptionSelect = (optionIndex) => {
    if (isSubmitted) return;
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setTimerActive(false);
    setIsSubmitted(true);
    
    // Calculate Score
    let calculatedScore = 0;
    activeQuiz.questions.forEach((q, index) => {
      if (selectedOptions[index] === q.answer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);

    // Save score if user is logged in
    if (user) {
      await saveScore({
        userId: user.id || user._id,
        userName: user.name,
        quizId: activeQuiz.id,
        category: activeQuiz.category,
        score: calculatedScore,
        totalQuestions: activeQuiz.questions.length
      });
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // ─── Render: Quiz Selection ─────────────────────────────────
  if (!activeQuiz) {
    return (
      <div className="section-container py-12 page-enter">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Practice Quizzes</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Test your preparation level with our topic-wise Mock Tests. Real exam pattern with timer and detailed explanations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizList.map((quiz) => (
            <div key={quiz.id} className="card p-6 flex flex-col items-start bg-white hover:border-primary-300">
              <span className="badge bg-primary-100 text-primary-800 mb-4">{quiz.category}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{quiz.category} Mock Test</h3>
              <p className="text-gray-600 mb-6 flex-grow text-sm flex items-center gap-4">
                <span className="flex items-center gap-1"><FileText className="w-4 h-4"/> {quiz.totalQuestions} Questions</span>
                <span className="flex items-center gap-1"><Timer className="w-4 h-4"/> {quiz.totalQuestions} Mins</span>
              </p>
              <button 
                onClick={() => startQuiz(quiz.id)}
                className="btn-primary w-full justify-center"
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── Render: Active Quiz ────────────────────────────────────
  const currentQ = activeQuiz.questions[currentQuestionIndex];
  const totalQ = activeQuiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQ) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 page-enter">
      {/* Quiz Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{activeQuiz.category} Test</h2>
          <p className="text-sm text-gray-500 mt-1">Question {currentQuestionIndex + 1} of {totalQ}</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-sm text-gray-500 block">Time Left</span>
            <span className={`text-xl font-display font-bold ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-primary-700'}`}>
              <Timer className="w-5 h-5 inline mr-1" /> {formatTime(timeLeft)}
            </span>
          </div>
          <button onClick={() => setActiveQuiz(null)} className="btn-outline px-4 py-2 text-sm hidden sm:block">
            Quit Setup
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 mb-8 rounded-full overflow-hidden">
        <div className="bg-primary-500 h-2 transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Question Area */}
        <div className="lg:w-2/3">
          <div className="card p-6 md:p-8 bg-white min-h-[400px]">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
              <span className="text-primary-600 mr-2">Q{currentQuestionIndex + 1}.</span> 
              {currentQ.question}
            </h3>

            <div className="space-y-4">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOptions[currentQuestionIndex] === idx;
                const isCorrect = isSubmitted && idx === currentQ.answer;
                const isWrong = isSubmitted && isSelected && idx !== currentQ.answer;
                
                let optionStyle = 'border-gray-200 hover:border-primary-300 hover:bg-gray-50';
                if (isSelected && !isSubmitted) optionStyle = 'option-selected';
                if (isCorrect) optionStyle = 'option-correct';
                if (isWrong) optionStyle = 'option-wrong';

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={isSubmitted}
                    className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{String.fromCharCode(65 + idx)}. {option}</span>
                    {isCorrect && <span className="text-green-600"><Check className="w-5 h-5" /></span>}
                    {isWrong && <span className="text-red-500"><XIcon className="w-5 h-5" /></span>}
                  </button>
                );
              })}
            </div>

            {/* Explanation box (shows only after submit) */}
            {isSubmitted && (
              <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl animate-fade-in">
                <h4 className="font-semibold text-blue-800 mb-1 flex items-center gap-2">
                  <span className="text-blue-600"><Lightbulb className="w-5 h-5" /></span> Explanation
                </h4>
                <p className="text-blue-900 text-sm">{currentQ.explanation}</p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                currentQuestionIndex === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              ← Previous
            </button>

            {currentQuestionIndex === totalQ - 1 ? (
              !isSubmitted && (
                <button 
                  onClick={handleSubmit}
                  className="btn-primary animate-pulse-green"
                >
                  Submit Final Test
                </button>
              )
            ) : (
              <button
                onClick={nextQuestion}
                className="btn-primary"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        {/* Sidebar / Result Board */}
        <div className="lg:w-1/3 space-y-6">
          {/* Result Card */}
          {isSubmitted && (
            <div className="card p-6 bg-white text-center border-t-8 border-t-primary-500 animate-slide-up">
              <h3 className="font-bold text-gray-900 mb-2">Test Completed!</h3>
              <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-primary-50 mb-4 border-4 border-primary-200">
                <span className="text-3xl font-display font-bold text-primary-700">{score}/{totalQ}</span>
              </div>
              <p className="mb-4 text-sm text-gray-600">
                Percentage: {Math.round((score / totalQ) * 100)}%
              </p>
              
              {!user && (
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 mb-4 text-xs text-amber-800">
                  <Link to="/login" className="font-bold underline">Login</Link> to permanently save your scores!
                </div>
              )}
              
              <button 
                onClick={() => setActiveQuiz(null)}
                className="btn-outline w-full justify-center text-sm"
              >
                Back to All Quizzes
              </button>
            </div>
          )}

          {/* Question Palette */}
          <div className="card p-6 bg-white">
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Question Navigator</h3>
            <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-5 gap-2">
              {activeQuiz.questions.map((_, idx) => {
                const isSelected = selectedOptions[idx] !== undefined;
                const isCurrent = currentQuestionIndex === idx;
                
                let btnClass = 'h-10 w-full rounded-md font-medium text-sm flex items-center justify-center transition-all ';
                
                if (isSubmitted) {
                   const correct = selectedOptions[idx] === activeQuiz.questions[idx].answer;
                   btnClass += correct ? 'bg-green-100 text-green-700 border border-green-300' : 
                               (isSelected ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-gray-100 text-gray-400');
                } else {
                  if (isCurrent) btnClass += 'bg-primary-600 text-white shadow-md ring-2 ring-primary-200 ring-offset-1';
                  else if (isSelected) btnClass += 'bg-primary-100 text-primary-800 border border-primary-300';
                  else btnClass += 'bg-gray-100 text-gray-600 hover:bg-gray-200';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={btnClass}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            
            {!isSubmitted && (
              <div className="mt-6 flex flex-col gap-2 text-xs text-gray-500">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-primary-600"></span> Current</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-primary-100 border border-primary-300"></span> Answered</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-gray-100"></span> Unanswered</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
