"use client";
import React, { useState } from 'react';
import classNames from "classnames";
import styles from "./style.module.scss";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { submitAssessmentService } from "services/assessment";
import axios from 'axios';
import { Endpoint, BaseURL } from 'utils/endpoints';
import { useDispatch } from "react-redux";
import { GetUserWithSkills } from 'services/user';
import Toast from 'components/common/toast';




type Option = {
    id: string;
    text: string;
};
interface Question {
    _id: string;
    questionId: number; // Add this
    question: string;
    options: {
        id: string;
        text: string;
        tags?: string[]; // Add for debugging
        weight?: number; // Add for debugging
    }[];
}

type CareerKey =
    | 'dataScientist'
    | 'frontendDeveloper'
    | 'backendDeveloper'
    | 'fullstackDeveloper'
    | 'devopsEngineer'
    | 'uiUxDesigner';

type CareerMatch = {
    title: string;
    description: string;
    icon: string;
};

const Test = () => {


    const [step, setStep] = useState<'quiz' | 'result'>('quiz');
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>(Array(5).fill(null));
    const [progress, setProgress] = useState<number>(0);
    const [careerMatch, setCareerMatch] = useState<CareerKey | null>(null);

    const [questions, setQuestions] = useState<Question[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${BaseURL}${Endpoint.assessment.questions}`)
            .then((res) => {
                setQuestions(res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch questions:", err);
            });
    }, []);



    const careerMatches: Record<CareerKey, CareerMatch> = {
        dataScientist: {
            title: "Data Scientist",
            description: "With your analytical skills and interest in AI, a career as a Data Scientist could be a perfect fit for you!",
            icon: "📊",
        },
        frontendDeveloper: {
            title: "Frontend Developer",
            description: "Your passion for UI/UX and modern frameworks makes you an ideal candidate for a Frontend Developer role!",
            icon: "💻",
        },
        backendDeveloper: {
            title: "Backend Developer",
            description: "With your strong server-side skills and database knowledge, you'd excel as a Backend Developer!",
            icon: "🔌",
        },
        fullstackDeveloper: {
            title: "Full Stack Developer",
            description: "Your diverse skills across the tech stack make you a perfect candidate for Full Stack Development!",
            icon: "🔄",
        },
        devopsEngineer: {
            title: "DevOps Engineer",
            description: "Your interest in cloud technologies and deployment pipelines is ideal for a DevOps career!",
            icon: "⚙️",
        },
        uiUxDesigner: {
            title: "UI/UX Designer",
            description: "Your design sensibility and tool expertise would make you a great UI/UX Designer!",
            icon: "🎨",
        },
    };

    const handleOptionSelect = (optionId: string) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[currentQuestion] = optionId;
        setSelectedOptions(newSelectedOptions);
    };

    const calculateCareerMatch = (): CareerKey => {
        const scores: Record<CareerKey, number> = {
            dataScientist: 0,
            frontendDeveloper: 0,
            backendDeveloper: 0,
            fullstackDeveloper: 0,
            devopsEngineer: 0,
            uiUxDesigner: 0,
        };

        if (selectedOptions[0] === 'B') scores.dataScientist += 3;
        if (selectedOptions[0] === 'D') scores.frontendDeveloper += 2;

        if (selectedOptions[1] === 'A') scores.frontendDeveloper += 4;
        if (selectedOptions[1] === 'B') scores.backendDeveloper += 4;
        if (selectedOptions[1] === 'D') scores.dataScientist += 4;
        if (selectedOptions[1] === 'E') scores.devopsEngineer += 4;

        if (selectedOptions[2] !== null) scores.uiUxDesigner += 3;

        if (selectedOptions[3] === 'A') scores.backendDeveloper += 2;
        if (selectedOptions[3] === 'B') scores.dataScientist += 1;
        if (selectedOptions[3] === 'C') scores.dataScientist += 2;

        if (selectedOptions[4] === 'A') scores.devopsEngineer += 2;

        if (scores.frontendDeveloper > 2 && scores.backendDeveloper > 2) {
            scores.fullstackDeveloper = scores.frontendDeveloper + scores.backendDeveloper;
        }

        let maxScore = 0;
        let match: CareerKey = 'dataScientist';

        (Object.entries(scores) as [CareerKey, number][]).forEach(([career, score]) => {
            if (score > maxScore) {
                maxScore = score;
                match = career;
            }
        });

        return match;
    };



    const handleContinue = async () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setProgress(((currentQuestion + 1) / questions.length) * 100);
        } else {
            const match = calculateCareerMatch();
            setCareerMatch(match);
            setStep('result');
            setProgress(100);

            if (selectedOptions.some(option => option === null)) {
                console.error("Some questions are not answered");
                // Toast.error("Please answer all questions before submitting.");
                return;
            }
            // Before submission:
            console.log("Submitting:", {
                userId: user._id,
                answers: questions.map((q, i) => ({
                    questionId: q.questionId,
                    questionText: q.question,
                    optionId: selectedOptions[i],
                    optionText: q.options.find(o => o.id === selectedOptions[i])?.text
                }))
            });


            // ✅ Send match to backend
            try {
                // In handleContinue():
                await submitAssessmentService({
                    userId: user._id,
                    answers: questions.map((q, i) => ({
                        questionId: q.questionId, // Changed from _id to questionId
                        optionId: selectedOptions[i] as string,
                    })),
                });

    
            } catch (error: any) {
                console.error(" Submit error:", error?.response?.data || error.message);
                console.error("Failed to submit assessment. Please try again later.");
            }

        }
    };


    const handleRestart = () => {
        setStep('quiz');
        setCurrentQuestion(0);
        setSelectedOptions(Array(5).fill(null));
        setProgress(0);
        setCareerMatch(null);
    };

    const router = useRouter();
    const { isLoggedIn, user } = useSelector((state: any) => state.root.auth); // ✅ fixed

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace("/auth/login"); // Redirect if not logged in
        }
    }, [isLoggedIn]);

    //     const navigate = useNavigate();

    //     const handleGoToDashboard = () => {
    //     navigate('fellow/dashboard'); 
    // };

    const isContinueDisabled = selectedOptions[currentQuestion] === null;

    if (step === 'result' && careerMatch) {
        return (
            <div className={classNames(styles.resultContainer, 'items-center')}>
                <div className={classNames(styles.resultCard, 'items-center')}>
                    <div className={classNames(styles.confetti)}>
                        {Array.from({ length: 50 }).map((_, i) => (
                            <div key={i} className={classNames(styles.confettiPiece)} />
                        ))}
                    </div>

                    <h1 className={classNames(styles.congratulations)}>Congratulations!</h1>
                    <h2 className={classNames(styles.matchTitle)}>Here's Your Career Match!</h2>

                    <div className={classNames(styles.careerIcon)}>{careerMatches[careerMatch].icon}</div>

                    <h3 className={classNames(styles.careerTitle)}>{careerMatches[careerMatch].title}</h3>

                    <p className={classNames(styles.careerDescription)}>{careerMatches[careerMatch].description}</p>

                    <div className='flex gap-4 items-center text-center'>
                        <button className={classNames(styles.restartButton)} onClick={handleRestart}>
                            Take Quiz Again
                        </button>

                        {/* New Dashboard Button */}
                        <button
                            className={classNames(styles.restartButton, styles.dashboardButton)}
                            onClick={() => window.location.href = '/fellow/dashboard'}
                        >
                            Go to Dashboard
                        </button>
                    </div>

                </div>
            </div>
        );
    }

    return isLoggedIn ?



        <div className={classNames(styles.customContainer)}>
            <div className={classNames(styles.pageDetailWrapper)}>

                <div className={classNames(styles.box)}>

                    <div className={classNames(styles.text)}>
                        <h3 className="text-center"> Interest-based questions</h3>

                        <div className={classNames(styles.quizContainer)}>
                            <div className={classNames(styles.progressWrapper)}>
                                <div className={classNames(styles.progressContainer)}>
                                    <div
                                        className={classNames(styles.progressBar)}
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <div className={classNames(styles.progressLabel)}>
                                    {Math.round(progress)}% Complete
                                </div>
                            </div>

                            {questions.length > 0 && questions[currentQuestion] && (




                                <div className={classNames(styles.questionContainer)}>
                                    <h2>Question {currentQuestion + 1}/{questions.length}</h2>
                                    <h3>{questions[currentQuestion].question}</h3>

                                    <div className={classNames(styles.optionsContainer)}>
                                        {questions[currentQuestion].options.map((option) => (
                                            <div
                                                key={option.id}
                                                className={classNames(
                                                    styles.option,
                                                    { [styles.selected]: selectedOptions[currentQuestion] === option.id }
                                                )}
                                                onClick={() => handleOptionSelect(option.id)}
                                            >
                                                <span className={classNames(styles.optionId)}>{option.id}</span>
                                                <span className={classNames(styles.optionText)}>{option.text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={classNames(styles.buttonContainer)}>
                                        <button
                                            className={classNames(
                                                styles.continueBtn,
                                                { [styles.disabled]: isContinueDisabled }
                                            )}
                                            onClick={handleContinue}
                                            disabled={isContinueDisabled}
                                        >
                                            {currentQuestion === questions.length - 1 ? 'SEE RESULTS' : 'CONTINUE'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

        </div>

        : null
};

export default Test;
