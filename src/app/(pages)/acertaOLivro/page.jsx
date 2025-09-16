'use client'
import React, { useState, useEffect } from 'react';
import { Hash, RotateCcw, Trophy, Target, BookOpen, Star, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '../../../components/Navbar';

const BibleNumberGame = () => {
  const bibleBooks = [
    'Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio',
    'Josué', 'Juízes', 'Rute', '1 Samuel', '2 Samuel',
    '1 Reis', '2 Reis', '1 Crônicas', '2 Crônicas', 'Esdras',
    'Neemias', 'Ester', 'Jó', 'Salmos', 'Provérbios',
    'Eclesiastes', 'Cantares', 'Isaías', 'Jeremias', 'Lamentações',
    'Ezequiel', 'Daniel', 'Oséias', 'Joel', 'Amós',
    'Obadias', 'Jonas', 'Miquéias', 'Naum', 'Habacuque',
    'Sofonias', 'Ageu', 'Zacarias', 'Malaquias',
    'Mateus', 'Marcos', 'Lucas', 'João', 'Atos',
    'Romanos', '1 Coríntios', '2 Coríntios', 'Gálatas', 'Efésios',
    'Filipenses', 'Colossenses', '1 Tessalonicenses', '2 Tessalonicenses', '1 Timóteo',
    '2 Timóteo', 'Tito', 'Filemom', 'Hebreus', 'Tiago',
    '1 Pedro', '2 Pedro', '1 João', '2 João', '3 João',
    'Judas', 'Apocalipse'
  ];

  const [currentNumber, setCurrentNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [gameMode, setGameMode] = useState('endless'); // 'endless' or 'challenge'
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [options, setOptions] = useState([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Função para gerar número aleatório
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 66) + 1;
  };

  // Função para gerar opções de resposta
  const generateOptions = (correctNumber) => {
    const correctBook = bibleBooks[correctNumber - 1];
    const wrongOptions = [];
    
    while (wrongOptions.length < 3) {
      const randomIndex = Math.floor(Math.random() * bibleBooks.length);
      const randomBook = bibleBooks[randomIndex];
      if (randomBook !== correctBook && !wrongOptions.includes(randomBook)) {
        wrongOptions.push(randomBook);
      }
    }
    
    const allOptions = [correctBook, ...wrongOptions];
    return shuffleArray(allOptions);
  };

  // Função para embaralhar array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Inicializar nova pergunta
  const newQuestion = () => {
    const number = generateRandomNumber();
    setCurrentNumber(number);
    setOptions(generateOptions(number));
    setSelectedAnswer('');
    setShowResult(false);
    setTimeLeft(30);
    setIsTimerActive(true);
  };

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeout();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  // Função para timeout
  const handleTimeout = () => {
    setIsTimerActive(false);
    setSelectedAnswer('');
    setShowResult(true);
    setIsCorrect(false);
    setStreak(0);
    setTotalQuestions(totalQuestions + 1);
  };

  // Inicializar jogo
  useEffect(() => {
    newQuestion();
    const savedBestStreak = localStorage?.getItem('bibleBestStreak') || 0;
    setBestStreak(parseInt(savedBestStreak));
  }, []);

  const handleAnswer = (answer) => {
    if (showResult) return;
    
    setIsTimerActive(false);
    setSelectedAnswer(answer);
    setShowResult(true);
    setTotalQuestions(totalQuestions + 1);
    
    const correctBook = bibleBooks[currentNumber - 1];
    const correct = answer === correctBook;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
      setStreak(streak + 1);
      if (streak + 1 > bestStreak) {
        setBestStreak(streak + 1);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('bibleBestStreak', (streak + 1).toString());
        }
      }
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    newQuestion();
  };

  const resetGame = () => {
    setScore(0);
    setTotalQuestions(0);
    setStreak(0);
    newQuestion();
  };

  const getTestamentInfo = (number) => {
    if (number <= 39) {
      return { testament: 'Antigo Testamento', color: 'text-amber-400' };
    } else {
      return { testament: 'Novo Testamento', color: 'text-blue-400' };
    }
  };

  const getButtonStyle = (option) => {
    let baseStyle = "w-full p-4 rounded-xl font-semibold text-left transition-all duration-300 transform hover:scale-102 ";
    
    if (!showResult) {
      baseStyle += "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg ";
    } else {
      const correctBook = bibleBooks[currentNumber - 1];
      if (option === correctBook) {
        baseStyle += "bg-green-500 text-white shadow-lg border-2 border-green-300 ";
      } else if (option === selectedAnswer) {
        baseStyle += "bg-red-500 text-white shadow-lg border-2 border-red-300 ";
      } else {
        baseStyle += "bg-gray-400 text-gray-100 ";
      }
    }
    
    return baseStyle;
  };

  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const testamentInfo = getTestamentInfo(currentNumber);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pt-20">
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Hash className="text-yellow-400 mr-3" size={40} />
            <h1 className="text-4xl font-bold text-white">
              Jogo dos Números Bíblicos
            </h1>
            <Hash className="text-yellow-400 ml-3" size={40} />
          </div>
          <p className="text-xl text-gray-200">
            Identifique o livro da Bíblia pelo seu número!
          </p>
        </div>

        {/* Stats Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-500/20 backdrop-blur-lg rounded-xl p-4 text-center">
            <Target className="mx-auto text-blue-400 mb-2" size={24} />
            <div className="text-2xl font-bold text-white">{score}</div>
            <div className="text-sm text-blue-200">Acertos</div>
          </div>
          
          <div className="bg-purple-500/20 backdrop-blur-lg rounded-xl p-4 text-center">
            <Star className="mx-auto text-purple-400 mb-2" size={24} />
            <div className="text-2xl font-bold text-white">{accuracy}%</div>
            <div className="text-sm text-purple-200">Precisão</div>
          </div>

          <div className="bg-orange-500/20 backdrop-blur-lg rounded-xl p-4 text-center">
            <Trophy className="mx-auto text-orange-400 mb-2" size={24} />
            <div className="text-2xl font-bold text-white">{streak}</div>
            <div className="text-sm text-orange-200">Sequência</div>
          </div>

          <div className="bg-green-500/20 backdrop-blur-lg rounded-xl p-4 text-center">
            <CheckCircle className="mx-auto text-green-400 mb-2" size={24} />
            <div className="text-2xl font-bold text-white">{bestStreak}</div>
            <div className="text-sm text-green-200">Recorde</div>
          </div>
        </div>

        {/* Timer */}
        <div className="mb-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">Tempo Restante</span>
              <span className={`text-xl font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-green-400'}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${
                  timeLeft <= 10 ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 text-center shadow-2xl">
          <div className="mb-6">
            <BookOpen className="mx-auto text-yellow-400 mb-4" size={48} />
            <h2 className="text-3xl font-bold text-white mb-2">
              Qual é o livro número
            </h2>
            <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
              {currentNumber}
            </div>
            <div className={`text-lg font-semibold ${testamentInfo.color}`}>
              {testamentInfo.testament}
            </div>
          </div>

          {/* Result Display */}
          {showResult && (
            <div className={`mb-6 p-4 rounded-xl ${isCorrect ? 'bg-green-500/20 border-2 border-green-400' : 'bg-red-500/20 border-2 border-red-400'}`}>
              <div className="flex items-center justify-center mb-2">
                {isCorrect ? (
                  <CheckCircle className="text-green-400 mr-2" size={24} />
                ) : (
                  <XCircle className="text-red-400 mr-2" size={24} />
                )}
                <span className={`text-lg font-bold ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                  {isCorrect ? 'Correto!' : timeLeft === 0 ? 'Tempo Esgotado!' : 'Incorreto!'}
                </span>
              </div>
              <div className="text-white">
                A resposta correta é: <strong>{bibleBooks[currentNumber - 1]}</strong>
              </div>
              {streak > 0 && isCorrect && (
                <div className="text-yellow-300 mt-2">
                  🔥 Sequência de {streak} acertos!
                </div>
              )}
            </div>
          )}

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
                className={getButtonStyle(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {showResult && (
              <button
                onClick={nextQuestion}
                className="flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                <ArrowRight className="mr-2" size={18} />
                Próxima Pergunta
              </button>
            )}
            
            <button
              onClick={resetGame}
              className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              <RotateCcw className="mr-2" size={18} />
              Reiniciar Jogo
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            🎯 Como Jogar
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-blue-500/10 rounded-xl p-4">
              <div className="text-3xl mb-2">📱</div>
              <p className="text-white text-sm">
                Um número de 1 a 66 será mostrado aleatoriamente
              </p>
            </div>
            <div className="bg-yellow-500/10 rounded-xl p-4">
              <div className="text-3xl mb-2">⏰</div>
              <p className="text-white text-sm">
                Você tem 30 segundos para escolher a resposta correta
              </p>
            </div>
            <div className="bg-green-500/10 rounded-xl p-4">
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-white text-sm">
                Faça sequências de acertos para quebrar seu recorde!
              </p>
            </div>
          </div>
          
          <div className="mt-6 bg-indigo-500/10 rounded-xl p-4">
            <h4 className="text-lg font-bold text-white mb-2 text-center">💡 Dica</h4>
            <p className="text-white text-sm text-center">
              Livros 1-39: <span className="text-amber-400">Antigo Testamento</span> • 
              Livros 40-66: <span className="text-blue-400">Novo Testamento</span>
            </p>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default BibleNumberGame;