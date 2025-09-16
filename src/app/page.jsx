'use client'

import React, { useState, useEffect } from 'react';
import { Shuffle, RotateCcw, Trophy, Heart, BookOpen, Star } from 'lucide-react';
import Navbar from '../components/Navbar';

const BibleBooksGame = () => {
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
    'Filipenses', 'Colossenses', '1 Tessa...', '2 Tessa...', '1 Timóteo',
    '2 Timóteo', 'Tito', 'Filemom', 'Hebreus', 'Tiago',
    '1 Pedro', '2 Pedro', '1 João', '2 João', '3 João',
    'Judas', 'Apocalipse'
  ];

  const [shuffledBooks, setShuffledBooks] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [errors, setErrors] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [lastClickedBook, setLastClickedBook] = useState('');

  // Função para embaralhar array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Inicializar jogo
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setShuffledBooks(shuffleArray(bibleBooks));
    setCurrentPosition(0);
    setErrors(0);
    setGameState('playing');
    setSelectedBooks([]);
    setLastClickedBook('');
  };

  const handleBookClick = (book) => {
    if (gameState !== 'playing') return;

    const correctBook = bibleBooks[currentPosition];
    setLastClickedBook(book);

    if (book === correctBook) {
      // Resposta correta
      setSelectedBooks([...selectedBooks, book]);
      setCurrentPosition(currentPosition + 1);

      // Verificar se ganhou
      if (currentPosition + 1 === bibleBooks.length) {
        setGameState('won');
      }
    } else {
      // Resposta errada
      setErrors(errors + 1);
      
      if (errors + 1 >= 1) {
        setGameState('lost');
      }
    }
  };

  const getButtonStyle = (book) => {
    const isSelected = selectedBooks.includes(book);
    const isLastClicked = lastClickedBook === book;
    const isCorrect = isLastClicked && selectedBooks.includes(book);
    const isWrong = isLastClicked && !selectedBooks.includes(book);

    let baseStyle = "m-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ";
    
    if (isSelected) {
      baseStyle += "bg-green-500 text-white shadow-lg scale-105 ";
    } else if (isWrong) {
      baseStyle += "bg-red-500 text-white shadow-lg animate-pulse ";
    } else if (gameState === 'playing') {
      baseStyle += "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md ";
    } else {
      baseStyle += "bg-gray-300 text-gray-500 cursor-not-allowed ";
    }

    return baseStyle;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 pt-20">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <BookOpen className="text-yellow-400 mr-3" size={40} />
            <h1 className="text-4xl font-bold text-white">
              Jogo dos Livros da Bíblia
            </h1>
            <BookOpen className="text-yellow-400 ml-3" size={40} />
          </div>
          <p className="text-xl text-gray-200">
            Clique nos livros da Bíblia na ordem correta!
          </p>
        </div>

        {/* Status Panel */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-500/20 rounded-xl p-4">
              <div className="flex items-center justify-center mb-2">
                <Star className="text-yellow-400 mr-2" size={24} />
                <span className="text-white font-semibold">Progresso</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {currentPosition} / {bibleBooks.length}
              </div>
            </div>
            
            <div className="bg-red-500/20 rounded-xl p-4">
              <div className="flex items-center justify-center mb-2">
                <Heart className="text-red-400 mr-2" size={24} />
                <span className="text-white font-semibold">Erros</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {errors} / 1
              </div>
            </div>

            <div className="bg-green-500/20 rounded-xl p-4">
              <div className="text-white font-semibold mb-2">Ultimo Livro</div>
              <div className="text-lg font-bold text-green-300">
                {currentPosition < bibleBooks.length ? (bibleBooks[currentPosition - 1] === undefined && 'Nenhum') : 'Concluído!'}
              </div>
            </div>

            <div className="bg-purple-500/20 rounded-xl p-4 flex align-center"> 
              <button
                onClick={resetGame}
                className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 w-full"
              >
                <RotateCcw className="mr-2" size={18} />
                Reiniciar
              </button>
            </div>
          </div>
        </div>

        {/* Game State Messages */}
        {gameState === 'won' && (
          <div className="bg-green-500/20 backdrop-blur-lg border-2 border-green-400 rounded-2xl p-8 mb-8 text-center shadow-2xl">
            <Trophy className="mx-auto text-yellow-400 mb-4" size={60} />
            <h2 className="text-3xl font-bold text-green-300 mb-2">
              🎉 Parabéns! Você Ganhou! 🎉
            </h2>
            <p className="text-xl text-green-200">
              Você decorou todos os 66 livros da Bíblia na ordem correta!
            </p>
          </div>
        )}

        {gameState === 'lost' && (
          <div className="bg-red-500/20 backdrop-blur-lg border-2 border-red-400 rounded-2xl p-8 mb-8 text-center shadow-2xl">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-3xl font-bold text-red-300 mb-2">
              Que pena! Você perdeu
            </h2>
            <p className="text-xl text-red-200 mb-4">
              Você chegou até o livro número {currentPosition + 1}: <strong>{bibleBooks[currentPosition]}</strong>
            </p>
            <p className="text-lg text-red-200">
              Continue praticando! A próxima vez você consegue!
            </p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${(currentPosition / bibleBooks.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-center mt-2 text-white font-semibold">
            {Math.round((currentPosition / bibleBooks.length) * 100)}% Completo
          </div>
        </div>

        {/* Books Grid */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <Shuffle className="text-yellow-400 mr-2" size={24} />
            <h3 className="text-2xl font-bold text-white">
              Livros Embaralhados
            </h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            {shuffledBooks.map((book, index) => (
              <button
                key={index}
                onClick={() => handleBookClick(book)}
                disabled={gameState !== 'playing'}
                className={getButtonStyle(book)}
              >
                {book}
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            📖 Como Jogar
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-blue-500/10 rounded-xl p-4">
              <div className="text-3xl mb-2">1️⃣</div>
              <p className="text-white">
                Clique nos livros da Bíblia na ordem correta, começando com Gênesis
              </p>
            </div>
            <div className="bg-yellow-500/10 rounded-xl p-4">
              <div className="text-3xl mb-2">2️⃣</div>
              <p className="text-white">
                Você pode errar apenas uma vez durante todo o jogo
              </p>
            </div>
            <div className="bg-green-500/10 rounded-xl p-4">
              <div className="text-3xl mb-2">3️⃣</div>
              <p className="text-white">
                Complete todos os 66 livros para ganhar o jogo!
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default BibleBooksGame;