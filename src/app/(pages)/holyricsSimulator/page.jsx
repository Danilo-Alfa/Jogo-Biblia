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
  // Mapeamentos (Display -> chaves do CSV e abreviações)
  const displayToCsv = { "Gênesis":"Genesis","Êxodo":"Exodo","Levítico":"Levitico","Números":"Numeros","Deuteronômio":"Deuteronomio","Josué":"Josue","Juízes":"Juizes","Rute":"Rute","1 Samuel":"1Samuel","2 Samuel":"2Samuel","1 Reis":"1Reis","2 Reis":"2Reis","1 Crônicas":"1Cronicas","2 Crônicas":"2Cronicas","Esdras":"Esdras","Neemias":"Neemias","Ester":"Ester","Jó":"Jo","Salmos":"Salmos","Provérbios":"Proverbios","Eclesiastes":"Eclesiastes","Cantares":"Canticos","Isaías":"Isaias","Jeremias":"Jeremias","Lamentações":"Lamentacoes","Ezequiel":"Ezequiel","Daniel":"Daniel","Oséias":"Oseias","Joel":"Joel","Amós":"Amos","Obadias":"Obadias","Jonas":"Jonas","Miquéias":"Miqueias","Naum":"Naum","Habacuque":"Habacuque","Sofonias":"Sofonias","Ageu":"Ageu","Zacarias":"Zacarias","Malaquias":"Malaquias","Mateus":"Mateus","Marcos":"Marcos","Lucas":"Lucas","João":"Joao","Atos":"Atos","Romanos":"Romanos","1 Coríntios":"1Corintios","2 Coríntios":"2Corintios","Gálatas":"Galatas","Efésios":"Efesios","Filipenses":"Filipenses","Colossenses":"Colossenses","1 Tessalonicenses":"1Tessalonicenses","2 Tessalonicenses":"2Tessalonicenses","1 Timóteo":"1Timoteo","2 Timóteo":"2Timoteo","Tito":"Tito","Filemom":"Filemom","Hebreus":"Hebreus","Tiago":"Tiago","1 Pedro":"1Pedro","2 Pedro":"2Pedro","1 João":"1Joao","2 João":"2Joao","3 João":"3Joao","Judas":"Judas","Apocalipse":"Apocalipse" };
  const displayToAbbr = { "Gênesis":"Gn","Êxodo":"Ex","Levítico":"Lv","Números":"Nm","Deuteronômio":"Dt","Josué":"Js","Juízes":"Jz","Rute":"Rt","1 Samuel":"1Sm","2 Samuel":"2Sm","1 Reis":"1Rs","2 Reis":"2Rs","1 Crônicas":"1Cr","2 Crônicas":"2Cr","Esdras":"Ed","Neemias":"Ne","Ester":"Et","Jó":"Jó","Salmos":"Sl","Provérbios":"Pv","Eclesiastes":"Ec","Cantares":"Ct","Isaías":"Is","Jeremias":"Jr","Lamentações":"Lm","Ezequiel":"Ez","Daniel":"Dn","Oséias":"Os","Joel":"Jl","Amós":"Am","Obadias":"Ob","Jonas":"Jn","Miquéias":"Mq","Naum":"Na","Habacuque":"Hc","Sofonias":"Sf","Ageu":"Ag","Zacarias":"Zc","Malaquias":"Ml","Mateus":"Mt","Marcos":"Mc","Lucas":"Lc","João":"Jo","Atos":"At","Romanos":"Rm","1 Coríntios":"1Co","2 Coríntios":"2Co","Gálatas":"Gl","Efésios":"Ef","Filipenses":"Fp","Colossenses":"Cl","1 Tessalonicenses":"1Ts","2 Tessalonicenses":"2Ts","1 Timóteo":"1Tm","2 Timóteo":"2Tm","Tito":"Tt","Filemom":"Fm","Hebreus":"Hb","Tiago":"Tg","1 Pedro":"1Pe","2 Pedro":"2Pe","1 João":"1Jo","2 João":"2Jo","3 João":"3Jo","Judas":"Jd","Apocalipse":"Ap" };
  const gridOrder = [
    ["Gênesis","Êxodo","Levítico","Números","Deuteronômio","Josué","Juízes","Rute","1 Samuel","2 Samuel","1 Reis"],
    ["2 Reis","1 Crônicas","2 Crônicas","Esdras","Neemias","Ester","Jó","Salmos","Provérbios","Eclesiastes","Cantares"],
    ["Isaías","Jeremias","Lamentações","Ezequiel","Daniel","Oséias","Joel","Amós","Obadias","Jonas","Miquéias"],
    ["Naum","Habacuque","Sofonias","Ageu","Zacarias","Malaquias","Mateus","Marcos","Lucas","João","Atos"],
    ["Romanos","1 Coríntios","2 Coríntios","Gálatas","Efésios","Filipenses","Colossenses","1 Tessalonicenses","2 Tessalonicenses","1 Timóteo","2 Timóteo"],
    ["Tito","Filemom","Hebreus","Tiago","1 Pedro","2 Pedro","1 João","2 João","3 João","Judas","Apocalipse"]
  ];
  const rowColors = [
    "bg-amber-600", // Linha 1 - marrom/amarelo
    "bg-red-600", // Linha 2 - vermelho
    "bg-purple-600", // Linha 3 - roxo
    "bg-indigo-600", // Linha 4 - azul escuro
    "bg-green-600", // Linha 5 - verde
    "bg-teal-600", // Linha 6 - azul esverdeado
  ];
  const [bibleGrid, setBibleGrid] = useState([]);
  const [bookVersesMap, setBookVersesMap] = useState({});
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

  // Gerar nova referência aleatória usando dados reais do CSV
  const generateNewReference = () => {
    const allBooks = bibleGrid.flat();
    if (!allBooks.length) return;
    const randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];
    const info = bookVersesMap[randomBook.name];
    if (!info) return;
    const randomChapter = Math.floor(Math.random() * info.chapters) + 1;
    const versesInChapter = info.versesPerChapter[randomChapter - 1] || 1;
    const randomVerse = Math.floor(Math.random() * versesInChapter) + 1;

    setTargetReference({ book: randomBook.name, chapter: randomChapter, verse: randomVerse });
    setSelectedBook("");
    setSelectedChapter(null);
    setSelectedVerse(null);
    setGameState("selecting-book");
    setAvailableChapters([]);
    setAvailableVerses([]);
  };

  // Carregar CSV e montar grade
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/biblia_versiculos.csv');
        const text = await res.text();
        const lines = text.trim().split(/\r?\n/);
        const csvMap = {};
        for (const line of lines) {
          const [book, ch, vs] = line.split(',');
          if (!book || !ch || !vs) continue;
          const c = parseInt(ch, 10);
          const v = parseInt(vs, 10);
          if (!csvMap[book]) csvMap[book] = {};
          csvMap[book][c] = v;
        }
        const displayMap = {};
        Object.keys(displayToCsv).forEach((display) => {
          const key = displayToCsv[display];
          const chaptersObj = csvMap[key] || {};
          const chapters = Object.keys(chaptersObj).map(Number);
          const maxCh = chapters.length ? Math.max(...chapters) : 0;
          const versesPerChapter = Array.from({ length: maxCh }, (_, i) => chaptersObj[i + 1] || 0);
          displayMap[display] = { chapters: maxCh, versesPerChapter };
        });
        const rows = gridOrder.map((row) => row.map((name) => ({ name, abbr: displayToAbbr[name], chapters: displayMap[name]?.chapters || 0 })));
        setBookVersesMap(displayMap);
        setBibleGrid(rows);
        const savedBestStreak = localStorage?.getItem("bibleNavBestStreak") || 0;
        setBestStreak(parseInt(savedBestStreak));
        // Referência inicial será gerada quando os dados estiverem prontos (hook abaixo)
      } catch (e) {
        console.error('Erro ao carregar /biblia_versiculos.csv', e);
      }
    };
    load();
  }, []);

  // Gera a primeira referência somente quando CSV/grade estiverem prontos
  useEffect(() => {
    if (bibleGrid.length > 0 && Object.keys(bookVersesMap).length > 0 && !targetReference.book) {
      generateNewReference();
    }
  }, [bibleGrid, bookVersesMap, targetReference.book]);

  // Selecionar capítulo (usar total real de versículos do CSV)
  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    if (chapter === targetReference.chapter) {
      const info = bookVersesMap[selectedBook];
      const versesInChapter = info?.versesPerChapter?.[chapter - 1] || 0;
      const verses = Array.from({ length: versesInChapter }, (_, i) => i + 1);
      setAvailableVerses(verses);
      setGameState("selecting-verse");
    } else {
      handleIncorrect();
    }
  };

  // Selecionar livro
  const handleBookSelect = (bookName) => {
    setSelectedBook(bookName);

    if (bookName === targetReference.book) {
      const book = bibleGrid.flat().find((book) => book.name === bookName);
      const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);
      setAvailableChapters(chapters);
      setGameState("selecting-chapter");
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
                    {targetReference.book
                      ? `${targetReference.book} ${targetReference.chapter}:${targetReference.verse}`
                      : 'Carregando referência...'}
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
                        Sequência: {streak}
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
                          disabled={gameState !== "selecting-book" || !targetReference.book}
                          className={`
                          ${
                            rowColors[rowIndex]
                          } hover:opacity-80 text-white text-xs font-bold 
                          py-2 px-1 rounded transition-all duration-200 hover:scale-105
                          ${
                            gameState !== "selecting-book" || !targetReference.book
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
              Como Jogar
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
