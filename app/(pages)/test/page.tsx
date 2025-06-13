"use client";
import React, { useState } from 'react';
import classNames from "classnames";
import { useNavigate } from 'react-router-dom';
import styles from "./style.module.scss";
import { Icons, Images } from "assets";
import Image from "next/image";
import { jobData } from "utils/constants";
import CustomInput from "components/common/customInput";
import CustomPhoneInput from "components/common/customPhoneInput";
import CustomTextArea from "components/common/customTextArea";
import CustomButton from "components/common/customButton";
import ProgressBar from "components/common/progressBar";
import VacancyStatsChart from "components/common/vacancyStatsChart";
import RatingLine from "components/common/customRatingLine";
import { ContactUsService } from "services/general";
import { toastMessage } from "components/common/toast";
import { handleErrors } from "utils/helper";
import { ContactVS } from "utils/validation";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


type Option = {
    id: string;
    text: string;
};

type Question = {
    id: number;
    question: string;
    options: Option[];
};

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

    const questions: Question[] = [
        {
            id: 1,
            question: "Which programming language are you most proficient in?",
            options: [
                { id: 'A', text: 'C++' },
                { id: 'B', text: 'Python' },
                { id: 'C', text: 'Java' },
                { id: 'D', text: 'JavaScript' },
                { id: 'E', text: 'Other' },
            ],
        },
        {
            id: 2,
            question: "Which area of software development interests you most?",
            options: [
                { id: 'A', text: 'Frontend (React, Angular, Vue)' },
                { id: 'B', text: 'Backend (Node.js, Django, Spring)' },
                { id: 'C', text: 'Mobile Development' },
                { id: 'D', text: 'Data Science/AI' },
                { id: 'E', text: 'DevOps/Cloud' },
            ],
        },
        {
            id: 3,
            question: "Which UI/UX design tool do you prefer?",
            options: [
                { id: 'A', text: 'Figma' },
                { id: 'B', text: 'Adobe XD' },
                { id: 'C', text: 'Sketch' },
                { id: 'D', text: 'InVision Studio' },
                { id: 'E', text: 'Other' },
            ],
        },
        {
            id: 4,
            question: "Which database technology are you most familiar with?",
            options: [
                { id: 'A', text: 'SQL (MySQL, PostgreSQL)' },
                { id: 'B', text: 'NoSQL (MongoDB, Cassandra)' },
                { id: 'C', text: 'Graph Databases (Neo4j)' },
                { id: 'D', text: 'In-memory (Redis)' },
                { id: 'E', text: 'NewSQL' },
            ],
        },
        {
            id: 5,
            question: "Which version control system do you primarily use?",
            options: [
                { id: 'A', text: 'Git (GitHub, GitLab)' },
                { id: 'B', text: 'Mercurial' },
                { id: 'C', text: 'SVN' },
                { id: 'D', text: 'Perforce' },
                { id: 'E', text: 'Other' },
            ],
        },
    ];

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

    const handleContinue = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setProgress(((currentQuestion + 1) / questions.length) * 100);
        } else {
            const match = calculateCareerMatch();
            setCareerMatch(match);
            setStep('result');
            setProgress(100);
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
    const { isLoggedIn } = useSelector((state: any) => state.root.auth);

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
                        </div>

                    </div>
                </div>
            </div>

        </div>

    :null
};

export default Test;
