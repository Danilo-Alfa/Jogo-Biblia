"use client";
import React, { useState, useEffect } from "react";
import {
  BookOpen,
  RotateCcw,
  Trophy,
  Target,
  CheckCircle,
  XCircle,
  Star,
  Hash,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const BibleNavigationGame = () => {
  // Lista de livros da Bíblia organizados como no Holyrics (6 fileiras x 11 colunas)
  const bibleGrid = [
    // Linha 1
    [
      { name: "Gênesis", abbr: "Gn", chapters: 50 },
      { name: "Êxodo", abbr: "Ex", chapters: 40 },
      { name: "Levítico", abbr: "Lv", chapters: 27 },
      { name: "Números", abbr: "Nm", chapters: 36 },
      { name: "Deuteronômio", abbr: "Dt", chapters: 34 },
      { name: "Josué", abbr: "Js", chapters: 24 },
      { name: "Juízes", abbr: "Jz", chapters: 21 },
      { name: "Rute", abbr: "Rt", chapters: 4 },
      { name: "1 Samuel", abbr: "1Sm", chapters: 31 },
      { name: "2 Samuel", abbr: "2Sm", chapters: 24 },
      { name: "1 Reis", abbr: "1Rs", chapters: 22 },
    ],
    // Linha 2
    [
      { name: "2 Reis", abbr: "2Rs", chapters: 25 },
      { name: "1 Crônicas", abbr: "1Cr", chapters: 29 },
      { name: "2 Crônicas", abbr: "2Cr", chapters: 36 },
      { name: "Esdras", abbr: "Ed", chapters: 10 },
      { name: "Neemias", abbr: "Ne", chapters: 13 },
      { name: "Ester", abbr: "Et", chapters: 10 },
      { name: "Jó", abbr: "Jó", chapters: 42 },
      { name: "Salmos", abbr: "Sl", chapters: 150 },
      { name: "Provérbios", abbr: "Pv", chapters: 31 },
      { name: "Eclesiastes", abbr: "Ec", chapters: 12 },
      { name: "Cantares", abbr: "Ct", chapters: 8 },
    ],
    // Linha 3
    [
      { name: "Isaías", abbr: "Is", chapters: 66 },
      { name: "Jeremias", abbr: "Jr", chapters: 52 },
      { name: "Lamentações", abbr: "Lm", chapters: 5 },
      { name: "Ezequiel", abbr: "Ez", chapters: 48 },
      { name: "Daniel", abbr: "Dn", chapters: 12 },
      { name: "Oséias", abbr: "Os", chapters: 14 },
      { name: "Joel", abbr: "Jl", chapters: 3 },
      { name: "Amós", abbr: "Am", chapters: 9 },
      { name: "Obadias", abbr: "Ob", chapters: 1 },
      { name: "Jonas", abbr: "Jn", chapters: 4 },
      { name: "Miquéias", abbr: "Mq", chapters: 7 },
    ],
    // Linha 4
    [
      { name: "Naum", abbr: "Na", chapters: 3 },
      { name: "Habacuque", abbr: "Hc", chapters: 3 },
      { name: "Sofonias", abbr: "Sf", chapters: 3 },
      { name: "Ageu", abbr: "Ag", chapters: 2 },
      { name: "Zacarias", abbr: "Zc", chapters: 14 },
      { name: "Malaquias", abbr: "Ml", chapters: 4 },
      { name: "Mateus", abbr: "Mt", chapters: 28 },
      { name: "Marcos", abbr: "Mc", chapters: 16 },
      { name: "Lucas", abbr: "Lc", chapters: 24 },
      { name: "João", abbr: "Jo", chapters: 21 },
      { name: "Atos", abbr: "At", chapters: 28 },
    ],
    // Linha 5
    [
      { name: "Romanos", abbr: "Rm", chapters: 16 },
      { name: "1 Coríntios", abbr: "1Co", chapters: 16 },
      { name: "2 Coríntios", abbr: "2Co", chapters: 13 },
      { name: "Gálatas", abbr: "Gl", chapters: 6 },
      { name: "Efésios", abbr: "Ef", chapters: 6 },
      { name: "Filipenses", abbr: "Fp", chapters: 4 },
      { name: "Colossenses", abbr: "Cl", chapters: 4 },
      { name: "1 Tessalonicenses", abbr: "1Ts", chapters: 5 },
      { name: "2 Tessalonicenses", abbr: "2Ts", chapters: 3 },
      { name: "1 Timóteo", abbr: "1Tm", chapters: 6 },
      { name: "2 Timóteo", abbr: "2Tm", chapters: 4 },
    ],
    // Linha 6
    [
      { name: "Tito", abbr: "Tt", chapters: 3 },
      { name: "Filemom", abbr: "Fm", chapters: 1 },
      { name: "Hebreus", abbr: "Hb", chapters: 13 },
      { name: "Tiago", abbr: "Tg", chapters: 5 },
      { name: "1 Pedro", abbr: "1Pe", chapters: 5 },
      { name: "2 Pedro", abbr: "2Pe", chapters: 3 },
      { name: "1 João", abbr: "1Jo", chapters: 5 },
      { name: "2 João", abbr: "2Jo", chapters: 1 },
      { name: "3 João", abbr: "3Jo", chapters: 1 },
      { name: "Judas", abbr: "Jd", chapters: 1 },
      { name: "Apocalipse", abbr: "Ap", chapters: 22 },
    ],
  ];

  // Cores para cada linha (inspiradas no Holyrics)
  const rowColors = [
    "bg-amber-600", // Linha 1 - marrom/amarelo
    "bg-red-600", // Linha 2 - vermelho
    "bg-purple-600", // Linha 3 - roxo
    "bg-indigo-600", // Linha 4 - azul escuro
    "bg-green-600", // Linha 5 - verde
    "bg-teal-600", // Linha 6 - azul esverdeado
  ];

  const [targetReference, setTargetReference] = useState({
    book: "",
    chapter: 1,
    verse: 1,
  });
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [gameState, setGameState] = useState("selecting-book");
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [availableChapters, setAvailableChapters] = useState([]);
  const [availableVerses, setAvailableVerses] = useState([]);

  // Função para encontrar livro por nome
  const findBookByName = (name) => {
    for (let row of bibleGrid) {
      for (let book of row) {
        if (book.name === name) {
          return book;
        }
      }
    }
    return null;
  };

  // Gerar nova referência aleatória
  const generateNewReference = () => {
    const allBooks = bibleGrid.flat();
    const randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];
    const randomChapter = Math.floor(Math.random() * randomBook.chapters) + 1;
    const maxVerses = Math.min(
      50,
      Math.max(
        10,
        randomChapter === 1 ? 31 : Math.floor(Math.random() * 40) + 10
      )
    );
    const randomVerse = Math.floor(Math.random() * maxVerses) + 1;

    setTargetReference({
      book: randomBook.name,
      chapter: randomChapter,
      verse: randomVerse,
    });

    // Reset seleções
    setSelectedBook("");
    setSelectedChapter(null);
    setSelectedVerse(null);
    setGameState("selecting-book");
    setAvailableChapters([]);
    setAvailableVerses([]);
  };

  // Inicializar jogo
  useEffect(() => {
    generateNewReference();
    const savedBestStreak = localStorage?.getItem("bibleNavBestStreak") || 0;
    setBestStreak(parseInt(savedBestStreak));
  }, []);

  // Selecionar livro
  const handleBookSelect = (bookName) => {
    setSelectedBook(bookName);

    if (bookName === targetReference.book) {
      const book = findBookByName(bookName);
      const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);
      setAvailableChapters(chapters);
      setGameState("selecting-chapter");
    } else {
      handleIncorrect();
    }
  };

  // Selecionar capítulo
  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);

    if (chapter === targetReference.chapter) {
      const maxVerses = Math.min(
        50,
        Math.max(10, chapter === 1 ? 31 : Math.floor(Math.random() * 40) + 10)
      );
      const verses = Array.from({ length: maxVerses }, (_, i) => i + 1);
      setAvailableVerses(verses);
      setGameState("selecting-verse");
    } else {
      handleIncorrect();
    }
  };

  // Selecionar versículo
  const handleVerseSelect = (verse) => {
    setSelectedVerse(verse);

    if (verse === targetReference.verse) {
      handleCorrect();
    } else {
      handleIncorrect();
    }
  };

  const handleCorrect = () => {
    setGameState("correct");
    setScore(score + 1);
    setTotalQuestions(totalQuestions + 1);
    setStreak(streak + 1);

    if (streak + 1 > bestStreak) {
      setBestStreak(streak + 1);
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("bibleNavBestStreak", (streak + 1).toString());
      }
    }

    setTimeout(() => {
      generateNewReference();
    }, 2000);
  };

  const handleIncorrect = () => {
    setGameState("incorrect");
    setTotalQuestions(totalQuestions + 1);
    setStreak(0);

    setTimeout(() => {
      generateNewReference();
    }, 3000);
  };

  const resetGame = () => {
    setScore(0);
    setTotalQuestions(0);
    setStreak(0);
    generateNewReference();
  };

  const accuracy =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-4 pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-center mb-4">
              <BookOpen className="text-yellow-400 mr-3" size={40} />
              <h1 className="text-3xl font-bold text-white">
                Navegação Bíblica - Holyrics Style
              </h1>
              <BookOpen className="text-yellow-400 ml-3" size={40} />
            </div>
            <p className="text-lg text-gray-200">
              Navegue até a referência bíblica mostrada!
            </p>
          </div>

          {/* Stats Panel */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-blue-500/20 backdrop-blur-lg rounded-xl p-3 text-center">
              <Target className="mx-auto text-blue-400 mb-2" size={20} />
              <div className="text-xl font-bold text-white">{score}</div>
              <div className="text-xs text-blue-200">Acertos</div>
            </div>

            <div className="bg-red-500/20 backdrop-blur-lg rounded-xl p-3 text-center">
              <XCircle className="mx-auto text-red-400 mb-2" size={20} />
              <div className="text-xl font-bold text-white">
                {totalQuestions - score}
              </div>
              <div className="text-xs text-red-200">Erros</div>
            </div>

            <div className="bg-purple-500/20 backdrop-blur-lg rounded-xl p-3 text-center">
              <Star className="mx-auto text-purple-400 mb-2" size={20} />
              <div className="text-xl font-bold text-white">{accuracy}%</div>
              <div className="text-xs text-purple-200">Precisão</div>
            </div>

            <div className="bg-orange-500/20 backdrop-blur-lg rounded-xl p-3 text-center">
              <Trophy className="mx-auto text-orange-400 mb-2" size={20} />
              <div className="text-xl font-bold text-white">{streak}</div>
              <div className="text-xs text-orange-200">Sequência</div>
            </div>

            <div className="bg-green-500/20 backdrop-blur-lg rounded-xl p-3 text-center flex align-center items-center justify-center">
              <button
                onClick={resetGame}
                className="flex flex-col items-center justify-center w-full h-[76%] bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
              >
                <RotateCcw size={20} />
                <span className="text-xs mt-1">Reiniciar</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - Display Area */}
            <div className="space-y-6">
              {/* Target Reference Display */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center shadow-2xl">
                <div className="mb-4">
                  <Hash className="mx-auto text-yellow-400 mb-4" size={48} />
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Encontre esta referência:
                  </h2>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                    {targetReference.book} {targetReference.chapter}:
                    {targetReference.verse}
                  </div>
                </div>

                {/* Game State Messages */}
                {gameState === "correct" && (
                  <div className="bg-green-500/20 border-2 border-green-400 rounded-xl p-4 mt-6">
                    <CheckCircle
                      className="mx-auto text-green-400 mb-2"
                      size={32}
                    />
                    <div className="text-green-300 font-bold text-lg">
                      Correto!
                    </div>
                    <div className="text-green-200">
                      Referência encontrada com sucesso!
                    </div>
                    {streak > 1 && (
                      <div className="text-yellow-300 mt-2">
                        🔥 Sequência: {streak}
                      </div>
                    )}
                  </div>
                )}

                {gameState === "incorrect" && (
                  <div className="bg-red-500/20 border-2 border-red-400 rounded-xl p-4 mt-6">
                    <XCircle className="mx-auto text-red-400 mb-2" size={32} />
                    <div className="text-red-300 font-bold text-lg">
                      Incorreto!
                    </div>
                    <div className="text-red-200">
                      A referência correta era:{" "}
                      <strong>
                        {targetReference.book} {targetReference.chapter}:
                        {targetReference.verse}
                      </strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Current Selection Display */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-4 text-center">
                  Sua Navegação
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-500/20 rounded-xl">
                    <span className="text-blue-200">Livro:</span>
                    <span className="text-white font-bold">
                      {selectedBook || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/20 rounded-xl">
                    <span className="text-green-200">Capítulo:</span>
                    <span className="text-white font-bold">
                      {selectedChapter || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-500/20 rounded-xl">
                    <span className="text-purple-200">Versículo:</span>
                    <span className="text-white font-bold">
                      {selectedVerse || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Navigation (Holyrics Style) */}
            <div className="space-y-4">
              {/* Books Grid - 6x11 como no Holyrics */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  Livros da Bíblia
                </h3>
                <div className="space-y-1">
                  {bibleGrid.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-11 gap-1">
                      {row.map((book, colIndex) => (
                        <button
                          key={colIndex}
                          onClick={() => handleBookSelect(book.name)}
                          disabled={gameState !== "selecting-book"}
                          className={`
                          ${
                            rowColors[rowIndex]
                          } hover:opacity-80 text-white text-xs font-bold 
                          py-2 px-1 rounded transition-all duration-200 hover:scale-105
                          ${
                            gameState !== "selecting-book"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }
                          ${
                            selectedBook === book.name
                              ? "ring-2 ring-yellow-400"
                              : ""
                          }
                        `}
                        >
                          {book.abbr}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Chapters and Verses Tables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Chapters Table */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-2xl">
                  <h4 className="text-lg font-bold text-white mb-3 text-center">
                    Capítulos
                  </h4>
                  {availableChapters.length > 0 ? (
                    <div className="grid grid-cols-9 gap-1 max-h-80 overflow-y-auto">
                      {availableChapters.map((chapter) => (
                        <button
                          key={chapter}
                          onClick={() => handleChapterSelect(chapter)}
                          disabled={gameState !== "selecting-chapter"}
                          className={`
                          bg-amber-700 hover:bg-amber-600 text-white text-sm font-bold 
                          py-2 px-1 rounded transition-all duration-200 hover:scale-105
                          ${
                            gameState !== "selecting-chapter"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }
                          ${
                            selectedChapter === chapter
                              ? "ring-2 ring-yellow-400"
                              : ""
                          }
                        `}
                        >
                          {chapter}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center py-8">
                      Selecione um livro primeiro
                    </div>
                  )}
                </div>

                {/* Verses Table */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-2xl">
                  <h4 className="text-lg font-bold text-white mb-3 text-center">
                    Versículos
                  </h4>
                  {availableVerses.length > 0 ? (
                    <div className="grid grid-cols-9 gap-1 max-h-80 overflow-y-auto">
                      {availableVerses.map((verse) => (
                        <button
                          key={verse}
                          onClick={() => handleVerseSelect(verse)}
                          disabled={gameState !== "selecting-verse"}
                          className={`
                          bg-amber-700 hover:bg-amber-600 text-white text-sm font-bold 
                          py-2 px-1 rounded transition-all duration-200 hover:scale-105
                          ${
                            gameState !== "selecting-verse"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }
                          ${
                            selectedVerse === verse
                              ? "ring-2 ring-yellow-400"
                              : ""
                          }
                        `}
                        >
                          {verse}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center py-8">
                      Selecione um capítulo primeiro
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              📖 Como Jogar
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-amber-500/10 rounded-xl p-4">
                <div className="text-3xl mb-2">1️⃣</div>
                <p className="text-white text-sm">
                  Uma referência bíblica aparece no lado esquerdo
                </p>
              </div>
              <div className="bg-blue-500/10 rounded-xl p-4">
                <div className="text-3xl mb-2">2️⃣</div>
                <p className="text-white text-sm">
                  Clique no livro correto na grade (6x11 livros)
                </p>
              </div>
              <div className="bg-green-500/10 rounded-xl p-4">
                <div className="text-3xl mb-2">3️⃣</div>
                <p className="text-white text-sm">
                  Depois escolha o capítulo e versículo nas tabelas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BibleNavigationGame;
