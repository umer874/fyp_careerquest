"use client";
import React, { useState } from 'react';
import classNames from "classnames";
import styles from "./style.module.scss";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { updateUserProfile } from 'redux/reducers/authSlice';
import { submitAssessmentService } from "services/assessment";
import axios from 'axios';
import { setAuthReducer } from 'redux/reducers/authSlice';
import { Endpoint, BaseURL } from 'utils/endpoints';
import { useDispatch } from "react-redux";
import { GetUserWithSkills } from 'services/user';
import Toast from 'components/common/toast';






interface Option {
    id: string;
    text: string;
    tags: string[];
    weight: number;
}

interface Question {
    questionId: number;
    category: string;
    question: string;
    options: Option[];
}

type CareerMatch = {
    title: string;
    description: string;
    icon: string;
};

type CareerKey =
    | 'frontend'
    | 'backend'
    | 'fullstack'
    | 'devops'
    | 'dataScientist'
    | 'aiEngineer'
    | 'cloudArchitect'
    | 'securityEngineer'
    | 'mobileDeveloper'
    | 'qaEngineer'
    | 'databaseAdmin'
    | 'technicalManager';

const categoryCareerMap: Record<string, CareerKey[]> = {
    fundamentals: ['backend', 'fullstack', 'technicalManager'],
    frontend: ['frontend', 'fullstack'],
    backend: ['backend', 'fullstack', 'databaseAdmin'],
    devops: ['devops', 'cloudArchitect', 'securityEngineer'],
    database: ['databaseAdmin', 'backend'],
    security: ['securityEngineer', 'devops'],
    testing: ['qaEngineer'],
    architecture: ['cloudArchitect', 'technicalManager', 'fullstack'],
    ai: ['aiEngineer', 'dataScientist'],
    mobile: ['mobileDeveloper'],
    'soft-skills': ['technicalManager', 'fullstack'],
    tools: ['technicalManager', 'devops'],
};





const Test = () => {




    const [step, setStep] = useState<'quiz' | 'result'>('quiz');
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    // Change selectedOptions state to store both questionId & optionId
    const [selectedOptions, setSelectedOptions] = useState<{ questionId: number, selectedOptionId: string }[]>([]);

    const [progress, setProgress] = useState<number>(0);
    const [careerMatch, setCareerMatch] = useState<CareerKey | null>(null);

    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { isLoggedIn, user } = useSelector((state: any) => state.root.auth); // ✅ fixed

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

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace("/auth/login"); // Redirect if not logged in
        }
    }, [isLoggedIn]);

    // useEffect(() => {
    //     if (!user) return;

    //     if (user.has_taken_test) {
    //         router.push('/fellow/dashboard');
    //     } else {
    //         setLoading(false);
    //     }
    // }, [user]);

    type CareerKey =
        | 'frontend'
        | 'backend'
        | 'fullstack'
        | 'devops'
        | 'dataScientist'
        | 'aiEngineer'
        | 'cloudArchitect'
        | 'securityEngineer'
        | 'mobileDeveloper'
        | 'qaEngineer'
        | 'databaseAdmin'
        | 'technicalManager';

    interface CareerMatch {
        title: string;
        description: string;
        icon: string;
        coreSkills: string[];
        relatedCategories: string[];
    }





    const careerMatches: Record<CareerKey, CareerMatch> = {
        frontend: {
            title: "Frontend Specialist",
            description: "You excel at creating intuitive user interfaces with modern frameworks like React, Angular, or Vue.",
            icon: "💻",
            coreSkills: ['react', 'javascript', 'ui', 'css', 'responsive'],
            relatedCategories: ['ui', 'tools']
        },
        backend: {
            title: "Backend Engineer",
            description: "You specialize in server-side logic, databases, and API development.",
            icon: "🔌",
            coreSkills: ['node', 'java', 'api', 'microservices', 'rest'],
            relatedCategories: ['backend', 'database', 'architecture']
        },
        fullstack: {
            title: "Full Stack Developer",
            description: "You're proficient in both frontend and backend technologies, capable of building complete web applications.",
            icon: "🔄",
            coreSkills: ['javascript', 'node'],
            relatedCategories: ['ui', 'backend', 'database']
        },
        devops: {
            title: "DevOps Engineer",
            description: "You focus on automation, CI/CD pipelines, and infrastructure management using tools like Docker, Kubernetes, and cloud platforms.",
            icon: "⚙️",
            coreSkills: ['docker', 'kubernetes', 'ci-cd', 'automation', 'cloud'],
            relatedCategories: ['devops', 'cloud', 'tools']
        },
        dataScientist: {
            title: "Data Scientist",
            description: "You extract insights from complex datasets using statistical analysis, machine learning, and data visualization techniques.",
            icon: "📊",
            coreSkills: ['python', 'machine-learning', 'statistics', 'data-analysis', 'pandas'],
            relatedCategories: ['ai', 'database', 'analytics']
        },
        aiEngineer: {
            title: "AI Engineer",
            description: "You build intelligent systems using deep learning, natural language processing, and computer vision technologies.",
            icon: "🤖",
            coreSkills: ['neural-networks', 'tensorflow', 'nlp', 'deep-learning', 'python'],
            relatedCategories: ['ai', 'ml', 'deep-learning']
        },
        cloudArchitect: {
            title: "Cloud Architect",
            description: "You design and implement scalable cloud infrastructure solutions on platforms like AWS, Azure, or GCP.",
            icon: "☁️",
            coreSkills: ['aws', 'azure', 'gcp', 'cloud', 'scalability'],
            relatedCategories: ['cloud', 'devops', 'architecture']
        },
        securityEngineer: {
            title: "Security Engineer",
            description: "You protect systems and data from cyber threats through encryption, authentication, and security protocols.",
            icon: "🔒",
            coreSkills: ['encryption', 'security', 'oauth', 'jwt', 'cybersecurity'],
            relatedCategories: ['security', 'authentication', 'encryption']
        },
        mobileDeveloper: {
            title: "Mobile Developer",
            description: "You create native or cross-platform mobile applications for iOS and Android using technologies like React Native or Flutter.",
            icon: "📱",
            coreSkills: ['react-native', 'flutter', 'ios', 'android', 'mobile'],
            relatedCategories: ['mobile', 'cross-platform', 'ui']
        },
        qaEngineer: {
            title: "QA Engineer",
            description: "You ensure software quality through automated testing, manual testing, and quality assurance processes.",
            icon: "🧪",
            coreSkills: ['testing', 'automation', 'qa', 'tdd', 'quality'],
            relatedCategories: ['testing', 'automation', 'quality']
        },
        databaseAdmin: {
            title: "Database Administrator",
            description: "You specialize in database design, optimization, and management for SQL, NoSQL, and NewSQL systems.",
            icon: "💾",
            coreSkills: ['sql', 'nosql', 'database', 'optimization', 'data-modeling'],
            relatedCategories: ['database', 'data-modeling', 'optimization']
        },
        technicalManager: {
            title: "Technical Manager",
            description: "You lead technical teams, manage projects, and bridge the gap between technical and business requirements.",
            icon: "👔",
            coreSkills: ['leadership', 'communication', 'project-management', 'agile', 'strategy'],
            relatedCategories: ['soft-skills', 'management', 'communication']
        }
    };



    const handleOptionSelect = (optionId: string) => {
        const questionId = questions[currentQuestion].questionId;

        // Check if already answered:
        const existing = selectedOptions.find(opt => opt.questionId === questionId);
        let updatedOptions;

        if (existing) {
            updatedOptions = selectedOptions.map(opt =>
                opt.questionId === questionId ? { questionId, selectedOptionId: optionId } : opt
            );
        } else {
            updatedOptions = [...selectedOptions, { questionId, selectedOptionId: optionId }];
        }

        setSelectedOptions(updatedOptions);
    };


    // Update the calculateCareerMatch function
    const calculateCareerMatch = (
        questions: Question[],
        selectedOptions: { questionId: number; selectedOptionId: string }[]
    ): CareerKey => {
        // Initialize career scores
        const careerScores: Record<CareerKey, number> = {
            frontend: 0,
            backend: 0,
            fullstack: 0,
            devops: 0,
            dataScientist: 0,
            aiEngineer: 0,
            cloudArchitect: 0,
            securityEngineer: 0,
            mobileDeveloper: 0,
            qaEngineer: 0,
            databaseAdmin: 0,
            technicalManager: 0,
        };

        // Process each answer
        selectedOptions.forEach(({ questionId, selectedOptionId }) => {
            const question = questions.find(q => q.questionId === questionId);
            if (!question) return;

            const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
            if (!selectedOption) return;

            // Apply scores to relevant careers
            selectedOption.tags?.forEach(tag => {
                Object.entries(careerMatches).forEach(([careerKey, career]) => {
                    if (
                        career.coreSkills.includes(tag) ||
                        career.relatedCategories.includes(question.category)
                    ) {
                        careerScores[careerKey as CareerKey] += selectedOption.weight;
                    }
                });
            });
        });

        // Find best match
        const bestCareer = Object.entries(careerScores).reduce(
            (best, [career, score]) => score > best.score ?
                { career: career as CareerKey, score } : best,
            { career: 'fullstack' as CareerKey, score: -1 }
        );

        return bestCareer.career;
    };



    const handleContinue = async () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setProgress(((currentQuestion + 1) / questions.length) * 100);
        } else {
            if (selectedOptions.length < questions.length) {
                console.error("Please answer all questions before submitting.");
                return;
            }

            const match = calculateCareerMatch(questions, selectedOptions);
            setCareerMatch(match);
            setStep('result');
            setProgress(100);

            try {
                await submitAssessmentService({
                    userId: user.id,
                    answers: selectedOptions.map(opt => ({
                        questionId: opt.questionId,
                        optionId: opt.selectedOptionId
                    })),
                     
                });

                dispatch(updateUserProfile({ has_taken_test: true }));

            } catch (error: any) {
                console.error(" Submit error:", error?.response?.data || error.message);
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





    //     const navigate = useNavigate();

    //     const handleGoToDashboard = () => {
    //     navigate('fellow/dashboard'); 
    // };

    const isContinueDisabled = !selectedOptions.find(opt => opt.questionId === questions[currentQuestion]?.questionId);


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
                                                    {
                                                        [styles.selected]: selectedOptions.find(
                                                            (opt) =>
                                                                opt.questionId === questions[currentQuestion].questionId &&
                                                                opt.selectedOptionId === option.id
                                                        ),
                                                    }
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
