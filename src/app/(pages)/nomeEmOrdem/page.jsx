'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, RotateCcw, Trophy, Heart, BookOpen, Star, CheckCircle, XCircle, Lightbulb, ArrowRight } from 'lucide-react';
import Navbar from '../../../components/Navbar';

const BibleTypingGame = () => {
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

  // Alternativas aceitas para alguns livros
  const bookAlternatives = {
    'Gênesis': ['genesis', 'genêsis'],
    'Êxodo': ['exodo', 'êxodo'],
    '1 Samuel': ['i samuel', '1samuel', 'primeiro samuel'],
    '2 Samuel': ['ii samuel', '2samuel', 'segundo samuel'],
    '1 Reis': ['i reis', '1reis', 'primeiro reis'],
    '2 Reis': ['ii reis', '2reis', 'segundo reis'],
    '1 Crônicas': ['i cronicas', '1cronicas', 'i crônicas', '1crônicas', 'primeiro cronicas', 'primeiro crônicas'],
    '2 Crônicas': ['ii cronicas', '2cronicas', 'ii crônicas', '2crônicas', 'segundo cronicas', 'segundo crônicas'],
    'Salmos': ['salmo'],
    'Provérbios': ['proverbios', 'provérbio', 'proverbio'],
    'Eclesiastes': ['eclesiastes', 'eclesiaste'],
    'Isaías': ['isaias'],
    'Lamentações': ['lamentacoes', 'lamentação', 'lamentacao'],
    'Miquéias': ['miqueias'],
    'Sofonias': ['sofonias'],
    'Zacarias': ['zacarias'],
    'Malaquias': ['malaquias'],
    '1 Coríntios': ['i corintios', '1corintios', 'i coríntios', '1coríntios', 'primeiro corintios', 'primeiro coríntios'],
    '2 Coríntios': ['ii corintios', '2corintios', 'ii coríntios', '2coríntios', 'segundo corintios', 'segundo coríntios'],
    'Gálatas': ['galatas'],
    'Efésios': ['efesios'],
    '1 Tessalonicenses': ['i tessalonicenses', '1tessalonicenses', 'primeiro tessalonicenses'],
    '2 Tessalonicenses': ['ii tessalonicenses', '2tessalonicenses', 'segundo tessalonicenses'],
    '1 Timóteo': ['i timoteo', '1timoteo', 'i timóteo', '1timóteo', 'primeiro timoteo', 'primeiro timóteo'],
    '2 Timóteo': ['ii timoteo', '2timoteo', 'ii timóteo', '2timóteo', 'segundo timoteo', 'segundo timóteo'],
    'Filemom': ['filemom'],
    'Hebreus': ['hebreus', 'hebreu'],
    'Tiago': ['tiago'],
    '1 Pedro': ['i pedro', '1pedro', 'primeiro pedro'],
    '2 Pedro': ['ii pedro', '2pedro', 'segundo pedro'],
    '1 João': ['i joao', '1joao', 'i joão', '1joão', 'primeiro joao', 'primeiro joão'],
    '2 João': ['ii joao', '2joao', 'ii joão', '2joão', 'segundo joao', 'segundo joão'],
    '3 João': ['iii joao', '3joao', 'iii joão', '3joão', 'terceiro joao', 'terceiro joão']
  };

  const [currentPosition, setCurrentPosition] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [errors, setErrors] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
  const [completedBooks, setCompletedBooks] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [lastResult, setLastResult] = useState(null); // 'correct' or 'incorrect'
  const [showResult, setShowResult] = useState(false);
  const inputRef = useRef(null);

  // Função para normalizar texto
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Função para verificar se a resposta está correta
  const isAnswerCorrect = (input, correctBook) => {
    const normalizedInput = normalizeText(input);
    const normalizedCorrect = normalizeText(correctBook);
    
    if (normalizedInput === normalizedCorrect) {
      return true;
    }
    
    // Verificar alternativas
    const alternatives = bookAlternatives[correctBook];
    if (alternatives) {
      return alternatives.some(alt => normalizeText(alt) === normalizedInput);
    }
    
    return false;
  };

  // Função para obter dica
  const getHint = (book) => {
    const hints = {
      'Gênesis': 'Primeiro livro da Bíblia, fala sobre a criação',
      'Êxodo': 'Saída do Egito, Moisés e os 10 mandamentos',
      'Levítico': 'Leis para os levitas (sacerdotes)',
      'Números': 'Censo do povo de Israel no deserto',
      'Deuteronômio': 'Segunda lei, discursos de Moisés',
      'Josué': 'Conquista da Terra Prometida',
      'Juízes': 'Período dos juízes de Israel',
      'Rute': 'História de lealdade e amor (bisavó de Davi)',
      '1 Samuel': 'Primeiro livro sobre o profeta Samuel',
      '2 Samuel': 'Segundo livro sobre Samuel e Davi',
      '1 Reis': 'Primeiro livro sobre os reis de Israel',
      '2 Reis': 'Segundo livro sobre os reis',
      '1 Crônicas': 'Primeira crônica da história de Israel',
      '2 Crônicas': 'Segunda crônica da história',
      'Esdras': 'Retorno do exílio babilônico',
      'Neemias': 'Reconstrução dos muros de Jerusalém',
      'Ester': 'Rainha que salvou seu povo',
      'Jó': 'História sobre sofrimento e fé (2 letras)',
      'Salmos': 'Livro de cânticos e poesias de Davi',
      'Provérbios': 'Sabedoria de Salomão',
      'Eclesiastes': 'Reflexões sobre a vida',
      'Cantares': 'Cântico dos cânticos, poesia de amor',
      'Isaías': 'Grande profeta, fala sobre o Messias',
      'Jeremias': 'Profeta das lágrimas',
      'Lamentações': 'Choro pela destruição de Jerusalém',
      'Ezequiel': 'Profeta do exílio',
      'Daniel': 'Profeta na corte babilônica, sonhos e visões',
      'Oséias': 'Profeta do amor de Deus',
      'Joel': 'Profeta do Dia do Senhor',
      'Amós': 'Profeta da justiça social',
      'Obadias': 'Menor livro do Antigo Testamento',
      'Jonas': 'Profeta que foi engolido por um grande peixe',
      'Miquéias': 'Profeta que predisse o local do nascimento de Jesus',
      'Naum': 'Profeta contra Nínive',
      'Habacuque': 'Profeta que questionou Deus',
      'Sofonias': 'Profeta do juízo divino',
      'Ageu': 'Profeta da reconstrução do templo',
      'Zacarias': 'Profeta messiânico',
      'Malaquias': 'Último profeta do Antigo Testamento',
      'Mateus': 'Primeiro evangelho, genealogia de Jesus',
      'Marcos': 'Evangelho mais curto, Jesus como servo',
      'Lucas': 'Evangelho médico, parábolas',
      'João': 'Evangelho do amor, "Eu Sou"',
      'Atos': 'História da igreja primitiva',
      'Romanos': 'Carta sobre salvação pela fé',
      '1 Coríntios': 'Primeira carta aos coríntios, amor (cap. 13)',
      '2 Coríntios': 'Segunda carta aos coríntios',
      'Gálatas': 'Liberdade em Cristo',
      'Efésios': 'Carta sobre a igreja',
      'Filipenses': 'Carta da alegria',
      'Colossenses': 'Supremacia de Cristo',
      '1 Tessalonicenses': 'Primeira carta, Segunda Vinda',
      '2 Tessalonicenses': 'Segunda carta aos tessalonicenses',
      '1 Timóteo': 'Primeira carta pastoral',
      '2 Timóteo': 'Segunda carta pastoral, último escrito de Paulo',
      'Tito': 'Carta pastoral a Tito',
      'Filemom': 'Carta sobre perdão e escravidão',
      'Hebreus': 'Jesus como sumo sacerdote',
      'Tiago': 'Fé e obras práticas',
      '1 Pedro': 'Primeira carta de Pedro, sofrimento',
      '2 Pedro': 'Segunda carta, falsos mestres',
      '1 João': 'Primeira carta do amor',
      '2 João': 'Segunda carta sobre verdade',
      '3 João': 'Terceira carta sobre hospitalidade',
      'Judas': 'Carta sobre falsos mestres',
      'Apocalipse': 'Revelação, fim dos tempos'
    };
    
    return hints[book] || 'Sem dica disponível';
  };

  const handleSubmit = () => {
    if (!userInput.trim() || gameState !== 'playing') return;

    const correctBook = bibleBooks[currentPosition];
    const isCorrect = isAnswerCorrect(userInput, correctBook);

    setShowResult(true);
    setLastResult(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setCompletedBooks([...completedBooks, correctBook]);
      setCurrentPosition(currentPosition + 1);
      
      // Verificar vitória
      if (currentPosition + 1 === bibleBooks.length) {
        setGameState('won');
      }
    } else {
      setErrors(errors + 1);
      
      // Verificar derrota
      if (errors + 1 >= 3) {
        setGameState('lost');
      }
    }

    // Limpar resultado após 2 segundos
    setTimeout(() => {
      setShowResult(false);
      setLastResult(null);
      setUserInput('');
      setShowHint(false);
      // Força o foco no input após um pequeno delay adicional
      setTimeout(() => {
        if (inputRef.current && gameState === 'playing') {
          inputRef.current.focus();
        }
      }, 100);
    }, 2000);
  };

  const resetGame = () => {
    setCurrentPosition(0);
    setUserInput('');
    setErrors(0);
    setGameState('playing');
    setCompletedBooks([]);
    setShowHint(false);
    setLastResult(null);
    setShowResult(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  // Focar no input quando o componente carregar ou quando o jogo resetar
  useEffect(() => {
    if (inputRef.current && gameState === 'playing' && !showResult) {
      inputRef.current.focus();
    }
  }, [gameState, showResult]);

  // Focar no input quando o componente carregar inicialmente
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const currentBook = bibleBooks[currentPosition];
  const progress = (currentPosition / bibleBooks.length) * 100;

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Keyboard className="text-yellow-400 mr-3" size={40} />
            <h1 className="text-4xl font-bold text-white">
              Digite os Livros da Bíblia
            </h1>
            <Keyboard className="text-yellow-400 ml-3" size={40} />
          </div>
          <p className="text-xl text-gray-200">
            Digite o nome dos livros na ordem correta!
          </p>
        </div>

        {/* Status Panel */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-500/20 rounded-xl p-4">
              <div className="flex items-center justify-center mb-2">
                <Star className="text-blue-400 mr-2" size={24} />
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
                {errors} / 3
              </div>
              <div className="flex justify-center mt-2">
                {[1, 2, 3].map((life) => (
                  <Heart
                    key={life}
                    className={`mx-1 ${errors >= life ? 'text-red-500' : 'text-red-200'}`}
                    size={20}
                    fill={errors >= life ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
            </div>

            <div className="bg-green-500/20 rounded-xl p-4">
              <div className="text-white font-semibold mb-2">Livro Atual</div>
              <div className="text-lg font-bold text-green-300">
                #{currentPosition + 1}
              </div>
            </div>

            <div className="bg-purple-500/20 rounded-xl p-4">
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

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-center mt-2 text-white font-semibold">
            {Math.round(progress)}% Completo
          </div>
        </div>

        {/* Game State Messages */}
        {gameState === 'won' && (
          <div className="bg-green-500/20 backdrop-blur-lg border-2 border-green-400 rounded-2xl p-8 mb-8 text-center shadow-2xl">
            <Trophy className="mx-auto text-yellow-400 mb-4" size={60} />
            <h2 className="text-3xl font-bold text-green-300 mb-2">
              🎉 Perfeito! Você Venceu! 🎉
            </h2>
            <p className="text-xl text-green-200">
              Parabéns! Você digitou todos os 66 livros da Bíblia corretamente!
            </p>
            <p className="text-lg text-green-200 mt-2">
              Erros cometidos: {errors}/3
            </p>
          </div>
        )}

        {gameState === 'lost' && (
          <div className="bg-red-500/20 backdrop-blur-lg border-2 border-red-400 rounded-2xl p-8 mb-8 text-center shadow-2xl">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-3xl font-bold text-red-300 mb-2">
              Fim de Jogo!
            </h2>
            <p className="text-xl text-red-200 mb-4">
              Você chegou até o livro <strong>#{currentPosition + 1}</strong>
            </p>
            <p className="text-lg text-red-200">
              O próximo livro seria: <strong>{currentBook}</strong>
            </p>
          </div>
        )}

        {/* Main Game Area */}
        {gameState === 'playing' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 shadow-2xl">
            <div className="text-center mb-6">
              <BookOpen className="mx-auto text-yellow-400 mb-4" size={48} />
              <h2 className="text-2xl font-bold text-white mb-2">
                Digite o nome do livro #{currentPosition + 1}
              </h2>
              
              {/* Hint Button */}
              <button
                onClick={toggleHint}
                className="flex items-center justify-center mx-auto mb-4 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-xl hover:bg-yellow-500/30 transition-all duration-300"
              >
                <Lightbulb className="mr-2" size={18} />
                {showHint ? 'Esconder Dica' : 'Ver Dica'}
              </button>

              {/* Hint Display */}
              {showHint && (
                <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-4 mb-4">
                  <p className="text-yellow-200">
                    💡 <strong>Dica:</strong> {getHint(currentBook)}
                  </p>
                </div>
              )}

              {/* Result Display */}
              {showResult && (
                <div className={`mb-4 p-4 rounded-xl ${
                  lastResult === 'correct' 
                    ? 'bg-green-500/20 border-2 border-green-400' 
                    : 'bg-red-500/20 border-2 border-red-400'
                }`}>
                  <div className="flex items-center justify-center mb-2">
                    {lastResult === 'correct' ? (
                      <CheckCircle className="text-green-400 mr-2" size={24} />
                    ) : (
                      <XCircle className="text-red-400 mr-2" size={24} />
                    )}
                    <span className={`text-lg font-bold ${
                      lastResult === 'correct' ? 'text-green-300' : 'text-red-300'
                    }`}>
                      {lastResult === 'correct' ? 'Correto!' : 'Incorreto!'}
                    </span>
                  </div>
                  {lastResult === 'incorrect' && (
                    <div className="text-white">
                      A resposta correta é: <strong>{currentBook}</strong>
                    </div>
                  )}
                </div>
              )}

              {/* Input Area */}
              <div className="space-y-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit();
                    }
                  }}
                  placeholder="Digite o nome do livro..."
                  className="w-full p-4 text-lg rounded-xl bg-white/20 text-white placeholder-gray-300 border-2 border-transparent focus:border-blue-400 focus:outline-none transition-all duration-300"
                  disabled={showResult}
                />
                
                <button
                  onClick={handleSubmit}
                  disabled={!userInput.trim() || showResult}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                >
                  <ArrowRight className="inline mr-2" size={20} />
                  Confirmar Resposta
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Completed Books Display */}
        {completedBooks.length > 0 && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              📚 Livros Completados
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {completedBooks.map((book, index) => (
                <div
                  key={index}
                  className="bg-green-500/20 text-green-200 px-3 py-2 rounded-lg text-sm font-medium text-center"
                >
                  {index + 1}. {book}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            ⌨️ Como Jogar
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-blue-500/10 rounded-xl p-4">
              <div className="text-3xl mb-2">✍️</div>
              <p className="text-white text-sm">
                Digite o nome exato dos livros da Bíblia na ordem correta
              </p>
            </div>
            <div className="bg-yellow-500/10 rounded-xl p-4">
              <div className="text-3xl mb-2">💡</div>
              <p className="text-white text-sm">
                Use as dicas quando precisar de ajuda para lembrar
              </p>
            </div>
            <div className="bg-red-500/10 rounded-xl p-4">
              <div className="text-3xl mb-2">❤️</div>
              <p className="text-white text-sm">
                Você tem 3 chances de erro antes de perder o jogo
              </p>
            </div>
          </div>
          
          <div className="mt-6 bg-green-500/10 rounded-xl p-4">
            <h4 className="text-lg font-bold text-white mb-2 text-center">✨ Dicas de Digitação</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-white">
              <div>
                <strong>Aceito variações como:</strong>
                <ul className="mt-2 space-y-1 text-green-200">
                  <li>• Com ou sem acentos</li>
                  <li>• "1 Samuel" ou "I Samuel"</li>
                  <li>• "Gênesis" ou "Genesis"</li>
                </ul>
              </div>
              <div>
                <strong>Atenção especial:</strong>
                <ul className="mt-2 space-y-1 text-yellow-200">
                  <li>• Números nos livros (1, 2, 3)</li>
                  <li>• Acentuação opcional</li>
                  <li>• Maiúsculas/minúsculas ignoradas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BibleTypingGame;