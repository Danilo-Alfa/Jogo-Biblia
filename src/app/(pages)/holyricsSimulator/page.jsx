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
  // Dados de versículos da Bíblia (incorporados diretamente para evitar problemas com GitHub Pages)
  const bibleVersesData = {
    "Genesis": [31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26],
    "Exodo": [22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38],
    "Levitico": [17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34],
    "Numeros": [54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13],
    "Deuteronomio": [46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12],
    "Josue": [18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33],
    "Juizes": [36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25],
    "Rute": [22,23,18,22],
    "1Samuel": [28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13],
    "2Samuel": [27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25],
    "1Reis": [53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53],
    "2Reis": [18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30],
    "1Cronicas": [54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30],
    "2Cronicas": [17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23],
    "Esdras": [11,70,13,24,17,22,28,36,15,44],
    "Neemias": [11,20,32,23,19,19,73,18,38,39,36,47,31],
    "Ester": [22,23,15,17,14,14,10,17,32,3],
    "Jo": [22,13,26,21,27,30,35,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17],
    "Salmos": [6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6],
    "Proverbios": [33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31],
    "Eclesiastes": [18,26,22,16,20,12,29,17,18,20,10,14],
    "Canticos": [17,17,11,16,16,13,13,14],
    "Isaias": [31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24],
    "Jeremias": [19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34],
    "Lamentacoes": [22,22,66,22,22],
    "Ezequiel": [28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35],
    "Daniel": [21,49,30,37,31,28,28,27,27,21,45,13],
    "Oseias": [11,23,5,19,15,11,16,14,17,15,12,14,16,9],
    "Joel": [20,32,21],
    "Amos": [15,16,15,13,27,14,17,14,15],
    "Obadias": [21],
    "Jonas": [17,10,10,11],
    "Miqueias": [16,13,12,13,15,16,20],
    "Naum": [15,13,19],
    "Habacuque": [17,20,19],
    "Sofonias": [18,15,20],
    "Ageu": [15,23],
    "Zacarias": [21,13,10,14,11,15,14,23,17,12,17,14,9,21],
    "Malaquias": [14,17,18,6],
    "Mateus": [25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20],
    "Marcos": [45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20],
    "Lucas": [80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53],
    "Joao": [51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25],
    "Atos": [26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31],
    "Romanos": [32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27],
    "1Corintios": [31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24],
    "2Corintios": [24,17,18,18,21,18,16,24,15,18,33,21,14],
    "Galatas": [24,21,29,31,26,18],
    "Efesios": [23,22,21,32,33,24],
    "Filipenses": [30,30,21,23],
    "Colossenses": [29,23,25,18],
    "1Tessalonicenses": [10,20,13,18,28],
    "2Tessalonicenses": [12,17,18],
    "1Timoteo": [20,15,16,16,25,21],
    "2Timoteo": [18,26,17,22],
    "Tito": [16,15,15],
    "Filemom": [25],
    "Hebreus": [14,18,19,16,14,20,28,13,28,39,40,29,25],
    "Tiago": [27,26,18,17,20],
    "1Pedro": [25,25,22,19,14],
    "2Pedro": [21,22,18],
    "1Joao": [10,29,24,21,21],
    "2Joao": [13],
    "3Joao": [14],
    "Judas": [25],
    "Apocalipse": [20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21]
  };

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

  // Montar grade usando dados incorporados
  useEffect(() => {
    // Processar dados incorporados
    const displayMap = {};
    Object.keys(displayToCsv).forEach((display) => {
      const key = displayToCsv[display];
      const versesPerChapter = bibleVersesData[key] || [];
      const chapters = versesPerChapter.length;
      displayMap[display] = { chapters, versesPerChapter };
    });

    const rows = gridOrder.map((row) =>
      row.map((name) => ({
        name,
        abbr: displayToAbbr[name],
        chapters: displayMap[name]?.chapters || 0
      }))
    );

    setBookVersesMap(displayMap);
    setBibleGrid(rows);

    const savedBestStreak = localStorage?.getItem("bibleNavBestStreak") || 0;
    setBestStreak(parseInt(savedBestStreak));
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
