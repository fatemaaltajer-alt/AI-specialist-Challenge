
import React, { useState, useCallback } from 'react';
import { WelcomeScreen, Stage1, Stage2, Stage3, Stage4, ResultsScreen } from './components/QuizStages';
import { MAX_SCORE } from './constants';

const App: React.FC = () => {
    const [userName, setUserName] = useState<string>('');
    const [currentStage, setCurrentStage] = useState<number>(0); // 0: Welcome, 1-4: Stages, 5: Results
    const [score, setScore] = useState<number>(0);

    const startQuiz = useCallback((name: string) => {
        if (name.trim()) {
            setUserName(name.trim());
            setCurrentStage(1);
            setScore(0);
        }
    }, []);

    const advanceStage = useCallback(() => {
        setCurrentStage(prev => prev + 1);
    }, []);

    const updateScore = useCallback((points: number) => {
        setScore(prev => prev + points);
    }, []);

    const restartQuiz = useCallback(() => {
        setUserName('');
        setCurrentStage(0);
        setScore(0);
    }, []);
    
    const renderStage = () => {
        switch (currentStage) {
            case 1:
                return <Stage1 onComplete={advanceStage} updateScore={updateScore} />;
            case 2:
                return <Stage2 onComplete={advanceStage} updateScore={updateScore} />;
            case 3:
                return <Stage3 onComplete={advanceStage} updateScore={updateScore} />;
            case 4:
                return <Stage4 onComplete={advanceStage} updateScore={updateScore} />;
            case 5:
                return <ResultsScreen score={score} userName={userName} maxScore={MAX_SCORE} onRestart={restartQuiz} />;
            case 0:
            default:
                return <WelcomeScreen onStart={startQuiz} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <header className="w-full max-w-4xl text-center mb-8">
                <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">AI Specialist Badge Challenge</h1>
                {currentStage > 0 && currentStage < 5 && (
                     <div className="mt-4 text-xl font-semibold text-gray-300">
                        <span>Stage {currentStage} of 4</span>
                        <span className="mx-4">|</span>
                        <span>Score: {score}</span>
                     </div>
                )}
            </header>
            <main className="w-full max-w-4xl">
                {renderStage()}
            </main>
        </div>
    );
};

export default App;
