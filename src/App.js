import React, { useState, useRef, useEffect } from 'react';
import { useCallback } from 'react';
import music from './olsenemes.mp3'
export default function App() {
	const questions = [
		{
			questionText: 'Что поет Кайрош в этом моменте?',
			img: "./images/shashlyk.jpeg",
			answerOptions: [
				{ answerText: 'Гаражым-ай', isCorrect: false },
				{ answerText: 'Шашлыгым-ей', isCorrect: false },
				{ answerText: 'Шашлыгым-ай', isCorrect: true },
				{ answerText: 'Бұл өмірде сан тараулы жол бар', isCorrect: false },
			]
		},
		{
			questionText: 'С какого клипа Кайрат Нуртаса данный кадр?',
			img: './images/universe.jpeg',
			answerOptions: [
				{ answerText: 'Алматы түні', isCorrect: false },
				{ answerText: 'My Universe', isCorrect: true },
				{ answerText: 'Сені сүйем', isCorrect: false },
				{ answerText: 'Жұбатуға арналады бұл әнім', isCorrect: false },
			],
		},
		{
			questionText: 'Что сказал Абдурозик?',
			img: './images/burgir.jpeg',
			answerOptions: [
				{ answerText: 'бургер', isCorrect: false },
				{ answerText: 'бургир', isCorrect: true },
				{ answerText: 'burger', isCorrect: false },
				{ answerText: 'бөргір', isCorrect: false },
			],
		},
		{
			questionText: 'Ой красавчик, дай мне тоже чуть-чуть…?',
			img:'./images/havai.jpeg',
			answerOptions: [
				{ answerText: 'кушай кушай кушай', isCorrect: false },
				{ answerText: 'ешь ешь ешь', isCorrect: false },
				{ answerText: 'давай давай давай', isCorrect: false },
				{ answerText: 'хавай хавай хавай', isCorrect: true },
			],
		},
		{
			questionText: 'Все __ сы праздником!',
			img:'./images/meme.jpeg',
			answerOptions: [
				{ answerText: 'алматинские', isCorrect: false },
				{ answerText: 'актауские', isCorrect: false },
				{ answerText: 'актюбинские', isCorrect: true },
				{ answerText: 'семейские', isCorrect: false },
			],
		},
		{
			questionText: 'Кто приехал на матч Анжи?',
			img:'./images/match.jpeg',
			answerOptions: [
				{ answerText: 'дагестанские москвичи', isCorrect: true },
				{ answerText: 'с москвы дагестанцы', isCorrect: true },
				{ answerText: 'ингуши', isCorrect: true },
				{ answerText: 'кабардинцы', isCorrect: true },
			],
		},
		{
			questionText: '104 ағамыздың сөзін аяқта “много думал…”:',
			img:'./images/104.jpeg',
			answerOptions: [
				{ answerText: 'поумнели', isCorrect: false },
				{ answerText: 'заболела голова', isCorrect: true },
				{ answerText: 'передумал', isCorrect: false },
				{ answerText: 'и вдруг понял', isCorrect: false },
			],
		},
		{
			questionText: 'Что сделал Кама Пуля?',
			img:'./images/kamapulya.jpeg',
			answerOptions: [
				{ answerText: 'приземлился', isCorrect: false },
				{ answerText: 'присел', isCorrect: false },
				{ answerText: 'припарковался', isCorrect: true },
				{ answerText: 'упал', isCorrect: false },
			],
		},
		{
			questionText: 'Осы суретте Қайрөш не сұрап тұр?',
			img:'./images/bank.jpeg',
			answerOptions: [
				{ answerText: 'қалай төлеуге болатынын', isCorrect: true },
				{ answerText: 'сорпа', isCorrect: false },
				{ answerText: 'білезіктің бағасы', isCorrect: false },
				{ answerText: 'шашлыгын', isCorrect: false },
			],
		},
	];
	const Ref = useRef(null);
  
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [timer, setTimer] = useState('00:00:00');
	const [shake, setShake] = useState(false);
	const audio = new Audio(music);
	// const [audio, SetAudio] = useState("");
	const Playit = () => {
		var audio = new Audio(music);
		audio.play();
	}
	useEffect(() => {Playit()}, []);

	const animate = () => {
        
        // Button begins to shake
        setShake(true);
        
        // Buttons stops to shake after 2 seconds
        setTimeout(() => setShake(false), 2000);

		clearTimeout(2000)
        
    }

	

	

	const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }

	const startTimer = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
  
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
		
    }

	const clearTimer = (e) => {   
        setTimer('00:00:10');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
		return;
    }
	const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    }

	const handleAnswerOptionClick = (answer) => {
		if (answer.isCorrect) {
			setScore(score + 1);
			animate();

			setTimeout(() => nextQuestion(), 3000);

			clearTimeout(3000)
		}
		else{
			alert("no")
		}

	};
	

	const nextQuestion = () =>{
		if(handleClicked){
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
			onClickReset()
		} else {
			setShowScore(true);
		}

		}
		else{
			alert("Answer please")
		}
		
	}
	

	const handleClicked=(isCorrect)=>{
		console.log(isCorrect);

	}
	const shuffle = (questions) => {
		let currentIndex = questions.length, randomIndex;
		while (currentIndex !== 0) {
		  randomIndex = Math.floor(Math.random() * currentIndex);
		  currentIndex--;
		  [questions[currentIndex], questions[randomIndex]] = [
			questions[randomIndex], questions[currentIndex]
		  ];
		}
		return questions;
	  }
	const onClickReset = () => {
        clearTimer(getDeadTime());
    }

	
	


	const answersArray = useCallback(() => questions[currentQuestion].answerOptions, [questions, currentQuestion]);

	return (
		<div className='full'>
		<div className="timer">
					<h2>{timer}</h2>
					<button id="main" onClick={onClickReset}>Start Game</button>
		</div>
		<div className="row justify-content-center p-3">
		<div className="image-section col-xs-6 ">
			<img className='image-sec' src={questions[currentQuestion].img} />
		
						
				</div>
				<div className='app col-xs-6'>
			
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
					
				</div>
			) : (
				<>
				
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{answersArray().map((answerOption) => {

							return (
								<button
									className={(answerOption.isCorrect && shake) ? 'answer correct shake' : 'answer'} 
									key={answerOption.answerText}
									onClick={() => handleAnswerOptionClick(answerOption)}
									>
										{answerOption.answerText}
									</button>
							)
						})}
					</div>
					
					
				</>
			)}
			<div className="next">
						<button id='start' onClick={nextQuestion}>Next Question</button>
					</div>
			</div>
			
			
				
		
		</div>

		</div>
		
		
		
	);
}
