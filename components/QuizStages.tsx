
import React, { useState } from 'react';
import type { StageProps } from '../types';
import Badge from './Badge';

// --- UI Components ---
const Card: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => (
    <div className={`bg-gray-800 border border-gray-700 rounded-lg p-6 sm:p-8 shadow-2xl animate-slide-in-up ${className}`}>
        {children}
    </div>
);

const Button: React.FC<{onClick: () => void, children: React.ReactNode, disabled?: boolean, className?: string}> = ({ onClick, children, disabled = false, className = '' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full sm:w-auto mt-6 px-8 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed ${className}`}
    >
        {children}
    </button>
);

const CheckboxOption: React.FC<{id: string, label: string, checked: boolean, onChange: (checked: boolean) => void}> = ({ id, label, checked, onChange }) => (
    <label htmlFor={id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 transition-colors">
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 rounded bg-gray-900 border-gray-600 text-indigo-600 focus:ring-indigo-500"/>
        <span>{label}</span>
    </label>
);

const RadioOption: React.FC<{id: string, name: string, label: string, value: string, checked: boolean, onChange: (value: string) => void}> = ({ id, name, label, value, checked, onChange }) => (
     <label htmlFor={id} className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer transition-colors ${checked ? 'bg-indigo-900 ring-2 ring-indigo-500' : 'bg-gray-700 hover:bg-gray-600'}`}>
        <input id={id} type="radio" name={name} value={value} checked={checked} onChange={(e) => onChange(e.target.value)} className="h-5 w-5 bg-gray-900 border-gray-600 text-indigo-600 focus:ring-indigo-500"/>
        <span>{label}</span>
    </label>
);

const TextInput: React.FC<{label: string, value: string, onChange: (value: string) => void, placeholder?: string}> = ({ label, value, onChange, placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"/>
    </div>
);

// --- Screen Components ---

export const WelcomeScreen: React.FC<{ onStart: (name: string) => void }> = ({ onStart }) => {
    const [name, setName] = useState('');
    return (
        <Card>
            <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Welcome, Trainee!</h2>
            <p className="text-center text-gray-300 mb-6">Enter your name to begin the AI Specialist certification test.</p>
            <div className="max-w-sm mx-auto">
                <TextInput label="Your Name" value={name} onChange={setName} placeholder="e.g., Alex Doe" />
                <Button onClick={() => onStart(name)} disabled={!name.trim()}>Start Challenge</Button>
            </div>
        </Card>
    );
};

export const Stage1: React.FC<StageProps> = ({ onComplete, updateScore }) => {
    const [q1, setQ1] = useState<string[]>([]);
    const [q2, setQ2] = useState({ fullName: '', subject: '', address: '', phone: '', age: '' });
    const [q3, setQ3] = useState({ choice: '', explanation: '' });
    const [q4, setQ4] = useState<string[]>([]);

    const handleSubmit = () => {
        let points = 0;
        // Q1
        if (q1.includes('A')) points++;
        if (q1.includes('B')) points++;
        // Q2
        if (q2.address.trim()) points--;
        if (q2.phone.trim()) points--;
        // Q3
        if (q3.choice === 'AI Made') points++;
        else points --;
        if (q3.explanation.trim()) points++;
        // Q4
        if (q4.includes('links')) points++;
        if (q4.includes('urgency')) points++;

        updateScore(points);
        onComplete();
    };

    return (
        <Card className="space-y-8">
            <div>
                <h3 className="text-xl font-bold mb-2">Stage 1: AI Interactions & Safety</h3>
                <p className="text-gray-400">Assume you are asking ChatGPT to create a full research report about water recycling. Answer the following questions.</p>
            </div>
            {/* Question 1 */}
            <div className="space-y-3">
                <p>1. Select the statements that look like an AI hallucination.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <CheckboxOption id="s1q1a" label="A) The water cycle was invented in 1850." checked={q1.includes('A')} onChange={(c) => setQ1(c ? [...q1, 'A'] : q1.filter(i => i !== 'A'))} />
                    <CheckboxOption id="s1q1b" label="B) The sun cools the water to make it evaporate." checked={q1.includes('B')} onChange={(c) => setQ1(c ? [...q1, 'B'] : q1.filter(i => i !== 'B'))} />
                    <CheckboxOption id="s1q1c" label="C) Water moves through the cycle again and again." checked={q1.includes('C')} onChange={(c) => setQ1(c ? [...q1, 'C'] : q1.filter(i => i !== 'C'))} />
                    <CheckboxOption id="s1q1d" label="D) The sun heats up water and turns it into vapor." checked={q1.includes('D')} onChange={(c) => setQ1(c ? [...q1, 'D'] : q1.filter(i => i !== 'D'))} />
                </div>
            </div>
            {/* Question 2 */}
            <div className="space-y-3">
                <p>2. ChatGPT asks for the following information. Enter some dummy info, but remember which fields are unsafe to share.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput label="Full Name" value={q2.fullName} onChange={(v) => setQ2(p => ({...p, fullName: v}))} />
                    <TextInput label="Subject" value={q2.subject} onChange={(v) => setQ2(p => ({...p, subject: v}))} />
                    <TextInput label="Address" value={q2.address} onChange={(v) => setQ2(p => ({...p, address: v}))} />
                    <TextInput label="Phone Number" value={q2.phone} onChange={(v) => setQ2(p => ({...p, phone: v}))} />
                    <TextInput label="Age" value={q2.age} onChange={(v) => setQ2(p => ({...p, age: v}))} />
                </div>
            </div>
            {/* Question 3 */}
            <div className="space-y-3">
                <p>3. You asked for a hand-drawn picture of the water cycle. Do you think this is hand-drawn or AI-made?</p>
                <img src="https://picsum.photos/seed/watercycle/600/400" alt="Water Cycle" className="rounded-lg mx-auto"/>
                <p className="text-center text-xs text-gray-500">Image of a detailed, colorful water cycle diagram with slightly odd-looking text labels.</p>
                <div className="flex gap-4">
                    <RadioOption id="s1q3a" name="q3" label="AI Made" value="AI Made" checked={q3.choice === 'AI Made'} onChange={(v) => setQ3(p => ({...p, choice: v}))} />
                    <RadioOption id="s1q3b" name="q3" label="Hand Drawn" value="Hand Drawn" checked={q3.choice === 'Hand Drawn'} onChange={(v) => setQ3(p => ({...p, choice: v}))} />
                </div>
                <textarea value={q3.explanation} onChange={(e) => setQ3(p => ({...p, explanation: e.target.value}))} placeholder="Explain your answer... (1 extra point)" className="w-full h-20 bg-gray-700 border border-gray-600 rounded-md p-2 mt-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
             {/* Question 4 */}
            <div className="space-y-3">
                <p>4. After your chat, you received this email. What elements are suspicious?</p>
                <img src="https://picsum.photos/seed/scamemail/500/600" alt="Scam Email" className="rounded-lg mx-auto border-2 border-gray-600"/>
                <p className="text-center text-xs text-gray-500">An email with a "Security Alert" title, a blurry logo, urgent language about account suspension, and a "Verify Your Account NOW" button.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     <CheckboxOption id="s1q4a" label="Suspicious links" checked={q4.includes('links')} onChange={(c) => setQ4(c ? [...q4, 'links'] : q4.filter(i => i !== 'links'))} />
                     <CheckboxOption id="s1q4b" label="Urgency" checked={q4.includes('urgency')} onChange={(c) => setQ4(c ? [...q4, 'urgency'] : q4.filter(i => i !== 'urgency'))} />
                     <CheckboxOption id="s1q4c" label="Nothing suspicious" checked={q4.includes('nothing')} onChange={(c) => setQ4(c ? [...q4, 'nothing'] : q4.filter(i => i !== 'nothing'))} />
                </div>
            </div>
            <div className="text-right">
                <Button onClick={handleSubmit}>Complete Stage 1</Button>
            </div>
        </Card>
    );
};

export const Stage2: React.FC<StageProps> = ({ onComplete, updateScore }) => {
    const [q1, setQ1] = useState<string[]>([]);
    const [q2Rewrite, setQ2Rewrite] = useState('');
    const [q3Choice, setQ3Choice] = useState('');

    const handleSubmit = () => {
        let points = 0;
        // Q1
        const correctQ1 = ['name', 'school', 'location', 'email'];
        correctQ1.forEach(item => {
            if (q1.includes(item)) points++;
        });
        // Q2
        if (q2Rewrite.trim()) points++;
        // Q3
        if(q3Choice === 'AI made') points++;
        else if(q3Choice) points--;

        updateScore(points);
        onComplete();
    };

    return (
        <Card className="space-y-8">
            <div>
                <h3 className="text-xl font-bold mb-2">Stage 2: Sharing Personal Information with AI</h3>
                <p className="text-gray-400">Your younger brother, Ahmed, used the following prompt with Google Gemini: <br/><i className="text-gray-500">“Hello Gemeni, I am Ahmed, I need you to give examples of activities I can do in school for PE lesson, My school is Al wisam school, and I live in Muharraq, and my email address is Ahmed@gmail.com”</i></p>
            </div>
             {/* Question 1 */}
            <div className="space-y-3">
                <p>1. What parts of the prompt shouldn't Ahmed have shared?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <CheckboxOption id="s2q1a" label="I am Ahmed" checked={q1.includes('name')} onChange={c => setQ1(c ? [...q1, 'name'] : q1.filter(i => i !== 'name'))} />
                    <CheckboxOption id="s2q1b" label="My school is Al wisam school" checked={q1.includes('school')} onChange={c => setQ1(c ? [...q1, 'school'] : q1.filter(i => i !== 'school'))} />
                    <CheckboxOption id="s2q1c" label="I live in Muharraq" checked={q1.includes('location')} onChange={c => setQ1(c ? [...q1, 'location'] : q1.filter(i => i !== 'location'))} />
                    <CheckboxOption id="s2q1d" label="my email address is Ahmed@gmail.com" checked={q1.includes('email')} onChange={c => setQ1(c ? [...q1, 'email'] : q1.filter(i => i !== 'email'))} />
                </div>
            </div>
             {/* Question 2 */}
            <div className="space-y-3">
                <p>2. Rewrite the prompt in a better way to avoid sharing sensitive data.</p>
                <textarea value={q2Rewrite} onChange={e => setQ2Rewrite(e.target.value)} placeholder="e.g., Give me some examples of PE activities..." className="w-full h-24 bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            {/* Question 3 */}
            <div className="space-y-3">
                <p>3. Ahmed attached this picture to his project. Is it AI-made or real?</p>
                <img src="https://picsum.photos/seed/peproject/600/400" alt="PE Project" className="rounded-lg mx-auto"/>
                <p className="text-center text-xs text-gray-500">Image of children playing a sport, but some have distorted faces or extra limbs.</p>
                <div className="flex gap-4">
                    <RadioOption id="s2q3a" name="q3" label="AI made" value="AI made" checked={q3Choice === 'AI made'} onChange={setQ3Choice} />
                    <RadioOption id="s2q3b" name="q3" label="Real picture" value="Real picture" checked={q3Choice === 'Real picture'} onChange={setQ3Choice} />
                </div>
            </div>
            <div className="text-right">
                <Button onClick={handleSubmit}>Complete Stage 2</Button>
            </div>
        </Card>
    );
};

export const Stage3: React.FC<StageProps> = ({ onComplete, updateScore }) => {
    const questions = [
        { id: 1, image: 'https://picsum.photos/seed/project1/500/500', caption: 'An abstract painting with swirling colors, where some shapes seem inconsistent and oddly textured.', answer: 'AI Made', options: ['AI Made', 'Created by students'] },
        { id: 2, image: 'https://picsum.photos/seed/project2/500/500', caption: 'A photograph of a clay sculpture with visible fingerprints and imperfections.', answer: 'Created by students', options: ['AI Made', 'Created by students'] },
        { id: 3, image: 'https://picsum.photos/seed/project3/500/500', caption: 'A simple pencil sketch of a house with eraser marks and uneven lines.', answer: 'Created by students', options: ['AI Made', 'Created by students'] }
    ];

    const [qIndex, setQIndex] = useState(0);
    const [choice, setChoice] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [feedback, setFeedback] = useState('');

    const handleNext = () => {
        if (!choice) return;

        const isCorrect = choice === questions[qIndex].answer;
        if (isCorrect) {
            updateScore(1);
            setFeedback('Correct! Moving to the next question.');
        } else {
            if (attempts === 0) {
                setAttempts(1);
                setFeedback('Not quite. Take another look and try again.');
                return; // Don't advance
            } else {
                updateScore(-1);
                setFeedback('Incorrect. Let\'s move on.');
            }
        }

        setTimeout(() => {
            if (qIndex < questions.length - 1) {
                setQIndex(qIndex + 1);
                setChoice('');
                setAttempts(0);
                setFeedback('');
            } else {
                onComplete();
            }
        }, 1500);
    };

    const currentQuestion = questions[qIndex];
    
    return (
        <Card>
            <h3 className="text-xl font-bold mb-2">Stage 3: Identifying AI-Generated Art</h3>
            <p className="text-gray-400 mb-6">Sameer, an art teacher, needs your help identifying if student projects are real or AI-made.</p>
            <div className="text-center space-y-4">
                <p className="text-lg font-semibold">Question {qIndex + 1}: Real project or AI made?</p>
                <img src={currentQuestion.image} alt={`Project ${currentQuestion.id}`} className="rounded-lg mx-auto w-full max-w-md border-2 border-gray-600"/>
                <p className="text-center text-xs text-gray-500">{currentQuestion.caption}</p>
                <div className="flex justify-center gap-4 py-4">
                    {currentQuestion.options.map(opt => (
                        <RadioOption key={opt} id={`s3q${qIndex}${opt}`} name={`q${qIndex}`} label={opt} value={opt} checked={choice === opt} onChange={setChoice} />
                    ))}
                </div>
                 {feedback && <p className={`text-center font-bold ${feedback.startsWith('Correct') ? 'text-green-400' : 'text-yellow-400'}`}>{feedback}</p>}
                <Button onClick={handleNext} disabled={!choice || !!feedback}>{qIndex === questions.length - 1 ? 'Finish Stage' : 'Next Question'}</Button>
            </div>
        </Card>
    );
};

export const Stage4: React.FC<StageProps> = ({ onComplete, updateScore }) => {
    const [q1, setQ1] = useState('');
    const [q2, setQ2] = useState('');

    const handleSubmit = () => {
        let points = 0;
        if (q1 === 'A') points++;
        if (q2 === 'B') points++;
        updateScore(points);
        onComplete();
    };

    return (
        <Card className="space-y-8">
            <div>
                <h3 className="text-xl font-bold mb-2">Stage 4: AI Ethics & Responsible Use</h3>
                <p className="text-gray-400">The final test. Show you understand the responsibilities of using AI.</p>
            </div>
            {/* Question 1 */}
            <div className="space-y-3">
                <p>1. You use an AI image generator to create a logo for a client. What should you do?</p>
                <div className="space-y-3">
                    <RadioOption id="s4q1a" name="q1" label="A) Tell the client it was AI-generated and check the tool's usage rights." value="A" checked={q1 === 'A'} onChange={setQ1} />
                    <RadioOption id="s4q1b" name="q1" label="B) Claim you designed it entirely yourself." value="B" checked={q1 === 'B'} onChange={setQ1} />
                    <RadioOption id="s4q1c" name="q1" label="C) Not worry about it, it's just a logo." value="C" checked={q1 === 'C'} onChange={setQ1} />
                </div>
            </div>
             {/* Question 2 */}
            <div className="space-y-3">
                <p>2. An AI model gives you information for a research paper. What is the most important next step?</p>
                <div className="space-y-3">
                    <RadioOption id="s4q2a" name="q2" label="A) Copy and paste it directly into your paper." value="A" checked={q2 === 'A'} onChange={setQ2} />
                    <RadioOption id="s4q2b" name="q2" label="B) Fact-check the information using reliable sources." value="B" checked={q2 === 'B'} onChange={setQ2} />
                    <RadioOption id="s4q2c" name="q2" label="C) Assume the AI is always correct." value="C" checked={q2 === 'C'} onChange={setQ2} />
                </div>
            </div>
            <div className="text-right">
                <Button onClick={handleSubmit} disabled={!q1 || !q2}>Finish Challenge</Button>
            </div>
        </Card>
    );
};

export const ResultsScreen: React.FC<{ score: number, userName: string, maxScore: number, onRestart: () => void }> = ({ score, userName, maxScore, onRestart }) => {
    const passed = score >= maxScore - 2;

    return (
        <Card className="text-center">
            <h2 className="text-3xl font-bold mb-4">Challenge Complete!</h2>
            <p className="text-2xl mb-2">Your Final Score: <span className="font-bold text-indigo-400">{score}</span> / {maxScore}</p>
            
            <div className="my-8">
            {passed ? (
                <div>
                    <h3 className="text-2xl font-semibold text-green-400 mb-4">Congratulations, {userName}!</h3>
                    <p className="text-gray-300 mb-6">You've earned the AI Specialist Badge!</p>
                    <Badge userName={userName} />
                </div>
            ) : (
                 <div>
                    <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Almost There!</h3>
                    <p className="text-gray-300 mb-6">You were so close! Review the concepts and try again to earn your badge.</p>
                </div>
            )}
            </div>

            <Button onClick={onRestart}>Take the Challenge Again</Button>
        </Card>
    );
};
