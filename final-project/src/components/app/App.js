import './App.css';
import Board from './board/Board';
import Info from './info/Info';
import Hint from './hint/Hint';
import Move from './move/Move';
import Proceed from './proceed/Proceed';
import Promotion from './promotion/Promotion'
import InfoContext from '../../context/info.context';
import { useState } from "react";

let PUZZLES = [
  {
    "OpeningFamily": "Slav_Defense",
    "Popularity": "93",
    "NbPlays": "666",
    "PuzzleId": "001xO",
    "RatingDeviation": "76",
    "Themes": "crushing master masterVsMaster middlegame sacrifice short",
    "OpeningVariation": "Slav_Defense_Other_variations",
    "FEN": "k1r1b3/p1r1nppp/1p1qpn2/2Np4/1P1P4/PQRBPN2/5PPP/2R3K1 w - - 0 19",
    "Rating": "2011",
    "Moves": "d3a6 b6c5 a6c8 c5c4",
    "GameUrl": "https://lichess.org/fNCePFgY#37"
  },
  {
    "OpeningFamily": "Sicilian_Defense",
    "Popularity": "90",
    "NbPlays": "132",
    "PuzzleId": "00Ahb",
    "RatingDeviation": "78",
    "Themes": "crushing middlegame short",
    "OpeningVariation": "Sicilian_Defense_Franco-Sicilian_Variation",
    "FEN": "1k4nr/pp1r1ppp/4p3/1Nb2q2/2Pp4/6P1/PP3P1P/R1BQR1K1 b - - 2 14",
    "Rating": "1206",
    "Moves": "g8h6 c1f4 f5f4 g3f4",
    "GameUrl": "https://lichess.org/Cyj8Qkox/black#28"
  },
  {
    "OpeningFamily": "Sicilian_Defense",
    "Popularity": "55",
    "NbPlays": "28",
    "PuzzleId": "00IF7",
    "RatingDeviation": "85",
    "Themes": "crushing middlegame short",
    "OpeningVariation": "Sicilian_Defense_Old_Sicilian",
    "FEN": "b3k2r/4bpp1/2q1p2p/1p1nP3/1Pp1N3/2P5/2B2PPP/2BQR1K1 w k - 0 19",
    "Rating": "1666",
    "Moves": "c1e3 d5c3 d1g4 c3e4",
    "GameUrl": "https://lichess.org/7PRHzjIO#37"
  },
  {
    "OpeningFamily": "Sicilian_Defense",
    "Popularity": "97",
    "NbPlays": "2067",
    "PuzzleId": "002Ua",
    "RatingDeviation": "75",
    "Themes": "crushing kingsideAttack middlegame short",
    "OpeningVariation": "Sicilian_Defense_Lowenthal_Variation",
    "FEN": "r4rk1/pp3ppp/3p1q2/P1P1p3/2B5/2B2n2/2P2P1P/R2Q1RK1 w - - 0 16",
    "Rating": "1782",
    "Moves": "g1h1 f6f4 d1f3 f4f3",
    "GameUrl": "https://lichess.org/06i3eMVp#31"
  },
  {
    "OpeningFamily": "Sicilian_Defense",
    "Popularity": "44",
    "NbPlays": "146",
    "PuzzleId": "001gi",
    "RatingDeviation": "169",
    "Themes": "bodenMate hangingPiece mate mateIn1 middlegame oneMove",
    "OpeningVariation": "Sicilian_Defense_Other_variations",
    "FEN": "r6r/1pNk1ppp/2np4/b3p3/4P1b1/N1Q5/P4PPP/R3KB1R w KQ - 3 18",
    "Rating": "1013",
    "Moves": "c7a8 a5c3",
    "GameUrl": "https://lichess.org/1sV2Hr22#35"
  },
  {
    "OpeningFamily": "Sicilian_Defense",
    "Popularity": "92",
    "NbPlays": "639",
    "PuzzleId": "004BW",
    "RatingDeviation": "75",
    "Themes": "advantage middlegame short",
    "OpeningVariation": "Sicilian_Defense_Modern_Variations",
    "FEN": "r1bk2r1/ppq2pQp/3bpn2/1BpnN3/5P2/1P6/PBPP2PP/RN2K2R w KQ - 3 13",
    "Rating": "1696",
    "Moves": "e5f7 d8e7 g7g8 f6g8",
    "GameUrl": "https://lichess.org/EXlG6TZs#25"
  },
  {
    "OpeningFamily": "Sicilian_Defense",
    "Popularity": "90",
    "NbPlays": "194",
    "PuzzleId": "004Ys",
    "RatingDeviation": "83",
    "Themes": "advantage defensiveMove middlegame veryLong",
    "OpeningVariation": "Sicilian_Defense_McDonnell_Attack",
    "FEN": "r4rk1/3q1pbp/p1n1p1p1/2p3NP/1p3B2/3P3Q/PPP3P1/R3R1K1 b - - 2 19",
    "Rating": "2233",
    "Moves": "d7d4 f4e3 d4f6 e1f1 f6e5 h5g6 e5e3 h3e3",
    "GameUrl": "https://lichess.org/LcIJdugn/black#38"
  },
  {
    "OpeningFamily": "Scandinavian_Defense",
    "Popularity": "90",
    "NbPlays": "1572",
    "PuzzleId": "00M7w",
    "RatingDeviation": "77",
    "Themes": "crushing long opening",
    "OpeningVariation": "Scandinavian_Defense_Main_Line",
    "FEN": "r1b1k2r/ppp2ppp/2n5/2bBp3/2Pq4/3P1QP1/P2B1P1P/1R2K1NR b Kkq - 2 12",
    "Rating": "2274",
    "Moves": "f7f6 g1e2 d4f2 f3f2 c5f2 e1f2",
    "GameUrl": "https://lichess.org/rhyiYyX3/black#24"
  },
  {
    "OpeningFamily": "Ruy_Lopez",
    "Popularity": "50",
    "NbPlays": "18",
    "PuzzleId": "001wb",
    "RatingDeviation": "288",
    "Themes": "mate mateIn1 middlegame oneMove",
    "OpeningVariation": "Ruy_Lopez_Bird_Variation",
    "FEN": "r3k2r/pb1p1ppp/1b4q1/1Q2P3/8/2NP1Pn1/PP4PP/R1B2R1K w kq - 1 17",
    "Rating": "1480",
    "Moves": "h2g3 g6h5",
    "GameUrl": "https://lichess.org/hNzYRMWP#33"
  },
  {
    "OpeningFamily": "Ruy_Lopez",
    "Popularity": "88",
    "NbPlays": "36",
    "PuzzleId": "004kB",
    "RatingDeviation": "158",
    "Themes": "kingsideAttack long mate mateIn3 middlegame sacrifice",
    "OpeningVariation": "Ruy_Lopez_Steinitz_Defense",
    "FEN": "4rr1k/pQpn2pp/3p1q2/8/8/2P5/PP3PPP/RN3RK1 w - - 1 16",
    "Rating": "1324",
    "Moves": "b7c7 f6f2 f1f2 e8e1 f2f1 e1f1",
    "GameUrl": "https://lichess.org/Cl9T6bjt#31"
  },
  {
    "OpeningFamily": "Ruy_Lopez",
    "Popularity": "95",
    "NbPlays": "2731",
    "PuzzleId": "00JYV",
    "RatingDeviation": "73",
    "Themes": "advantage kingsideAttack long opening",
    "OpeningVariation": "Ruy_Lopez_Steinitz_Defense",
    "FEN": "r2q1rk1/p1p1bppp/2pp1nb1/4p3/4P1PN/2NP3P/PPP2PK1/R1BQ1R2 b - - 4 11",
    "Rating": "1704",
    "Moves": "f6e4 h4g6 e4c3 g6e7 d8e7 b2c3",
    "GameUrl": "https://lichess.org/rJrzfvfs/black#22"
  },
  {
    "OpeningFamily": "Queens_Pawn_Game",
    "Popularity": "100",
    "NbPlays": "79",
    "PuzzleId": "002O7",
    "RatingDeviation": "80",
    "Themes": "crushing middlegame short",
    "OpeningVariation": "Queens_Pawn_Game_Accelerated_London_System",
    "FEN": "r3qrk1/2p2pp1/p2bpn1p/2ppNb2/3P1P2/1PP1P1B1/P2N2PP/R2Q1RK1 b - - 0 14",
    "Rating": "1267",
    "Moves": "f5g4 e5g4 f6g4 d1g4",
    "GameUrl": "https://lichess.org/dFEPPiEc/black#28"
  },
  {
    "OpeningFamily": "Queens_Gambit_Declined",
    "Popularity": "85",
    "NbPlays": "185",
    "PuzzleId": "00K8j",
    "RatingDeviation": "75",
    "Themes": "advantage opening short",
    "OpeningVariation": "Queens_Gambit_Declined_Queens_Knight_Variation",
    "FEN": "r2q2kr/p4pp1/4b2p/n1Qn4/5B2/4P3/PP3PPP/2KR1BNR w - - 1 14",
    "Rating": "1428",
    "Moves": "f4c7 d8c7 c5c7 d5c7",
    "GameUrl": "https://lichess.org/AiNXhpcc#27"
  },
  {
    "OpeningFamily": "Ponziani_Opening",
    "Popularity": "83",
    "NbPlays": "27",
    "PuzzleId": "0092V",
    "RatingDeviation": "90",
    "Themes": "crushing exposedKing long opening",
    "OpeningVariation": "Ponziani_Opening_Other_variations",
    "FEN": "r2qk1nr/ppp3pp/2n5/1B1pp3/1b1P4/5Q1P/PP1B1PP1/RN2K2R b KQkq - 3 11",
    "Rating": "2074",
    "Moves": "e5e4 b5c6 b7c6 f3h5 g7g6 h5e5",
    "GameUrl": "https://lichess.org/bW5LiCa5/black#22"
  },
  {
    "OpeningFamily": "Polish_Opening",
    "Popularity": "97",
    "NbPlays": "2172",
    "PuzzleId": "00Nf5",
    "RatingDeviation": "75",
    "Themes": "advantage fork long opening",
    "OpeningVariation": "Polish_Opening_Other_variations",
    "FEN": "r1bq1rk1/pp2bppp/2pp1n2/8/5P2/5N2/PBPPB1PP/RN1Q1RK1 w - - 5 11",
    "Rating": "1606",
    "Moves": "b1c3 d8b6 g1h1 b6b2 a1b1 b2a3",
    "GameUrl": "https://lichess.org/JkE5qS7u#21"
  },
  {
    "OpeningFamily": "Philidor_Defense",
    "Popularity": "84",
    "NbPlays": "112",
    "PuzzleId": "00IFk",
    "RatingDeviation": "77",
    "Themes": "attraction crushing long middlegame",
    "OpeningVariation": "Philidor_Defense_Lion_Variation",
    "FEN": "r1b4r/ppk2ppp/2p5/3n2B1/2P5/6P1/P1P1B2P/2KR3R b - - 0 16",
    "Rating": "2118",
    "Moves": "d5c3 g5f4 c7b6 c4c5 b6c5 f4e3",
    "GameUrl": "https://lichess.org/aDBJY27j/black#32"
  },
  {
    "OpeningFamily": "Kings_Gambit",
    "Popularity": "100",
    "NbPlays": "18",
    "PuzzleId": "00C3O",
    "RatingDeviation": "151",
    "Themes": "crushing kingsideAttack opening short",
    "OpeningVariation": "Kings_Gambit_Other_variations",
    "FEN": "r2qkbnr/pp4pp/2p2p2/4n2b/2B1P3/2N2N2/PPP3PP/R1BQ1RK1 w kq - 0 10",
    "Rating": "1924",
    "Moves": "d1e2 h5f3 g2f3 d8d4",
    "GameUrl": "https://lichess.org/F4Vo1eZG#19"
  },
  {
    "OpeningFamily": "Italian_Game",
    "Popularity": "97",
    "NbPlays": "1099",
    "PuzzleId": "00FF5",
    "RatingDeviation": "74",
    "Themes": "attackingF2F7 crushing middlegame short",
    "OpeningVariation": "Italian_Game_Giuoco_Pianissimo",
    "FEN": "r3k3/ppp1qp2/1b1p3p/4p2r/2B1P1b1/P1PP1P2/1P4PQ/RN3R1K b q - 2 18",
    "Rating": "1993",
    "Moves": "e7h4 c4f7 e8e7 f7h5",
    "GameUrl": "https://lichess.org/YBDgjNpz/black#36"
  },
  {
    "OpeningFamily": "French_Defense",
    "Popularity": "88",
    "NbPlays": "439",
    "PuzzleId": "00BKa",
    "RatingDeviation": "88",
    "Themes": "advantage long middlegame",
    "OpeningVariation": "French_Defense_Winawer_Variation",
    "FEN": "5rk1/p1Rb1ppp/2n1pn2/8/8/2P3P1/q4PBP/1rNQK2R b K - 2 16",
    "Rating": "2403",
    "Moves": "f8c8 c7c8 d7c8 c1a2 b1d1 e1d1",
    "GameUrl": "https://lichess.org/0bBHtpd4/black#32"
  },
  {
    "OpeningFamily": "Czech_Defense",
    "Popularity": "69",
    "NbPlays": "54",
    "PuzzleId": "00Knu",
    "RatingDeviation": "80",
    "Themes": "advantage defensiveMove opening pin short",
    "OpeningVariation": "Czech_Defense_Other_variations",
    "FEN": "r2q1rk1/p3bpp1/2pp1nb1/4p1Q1/8/1B3N1P/PPP3P1/R1B2RK1 b - - 0 18",
    "Rating": "1824",
    "Moves": "f6e4 g5g6 d8b6 g1h2",
    "GameUrl": "https://lichess.org/ICZqsNVs/black#36"
  },
  {
    "OpeningFamily": "Caro-Kann_Defense",
    "Popularity": "68",
    "NbPlays": "41",
    "PuzzleId": "00LI0",
    "RatingDeviation": "103",
    "Themes": "crushing hangingPiece middlegame short",
    "OpeningVariation": "Caro-Kann_Defense_Exchange_Variation",
    "FEN": "r2qk2r/pp1n1ppp/4pn2/3p2B1/1b1P4/2N1QN1P/PPb1BPP1/R4RK1 w kq - 0 12",
    "Rating": "1434",
    "Moves": "c3d5 f6d5 g5d8 d5e3",
    "GameUrl": "https://lichess.org/sUoFIFQT#23"
  },
  {
    "OpeningFamily": "Caro-Kann_Defense",
    "Popularity": "93",
    "NbPlays": "591",
    "PuzzleId": "002KJ",
    "RatingDeviation": "75",
    "Themes": "crushing discoveredAttack middlegame short",
    "OpeningVariation": "Caro-Kann_Defense_Advance_Variation",
    "FEN": "r3kb1r/ppq2ppp/4pn2/2Ppn3/1P4bP/2P2N2/P3BPP1/RNBQ1RK1 b kq - 2 10",
    "Rating": "1499",
    "Moves": "f8e7 f3e5 c7e5 e2g4",
    "GameUrl": "https://lichess.org/2NpTzh7O/black#20"
  },
  {
    "OpeningFamily": "Caro-Kann_Defense",
    "Popularity": "78",
    "NbPlays": "26",
    "PuzzleId": "007AS",
    "RatingDeviation": "85",
    "Themes": "crushing master middlegame short",
    "OpeningVariation": "Caro-Kann_Defense_Advance_Variation",
    "FEN": "r3kb1r/3nnpp1/4p1bp/1NppP3/3P4/6N1/P2BBPPP/R3K2R b KQkq - 0 17",
    "Rating": "1569",
    "Moves": "a8b8 b5d6 e8d8 d2a5",
    "GameUrl": "https://lichess.org/Nfuw1Dug/black#34"
  },
  {
    "OpeningFamily": "Caro-Kann_Defense",
    "Popularity": "74",
    "NbPlays": "137",
    "PuzzleId": "00Er4",
    "RatingDeviation": "75",
    "Themes": "crushing hangingPiece middlegame short",
    "OpeningVariation": "Caro-Kann_Defense_Other_variations",
    "FEN": "r3k2r/p1bN2pp/2p1pp2/3p3b/3P1q2/2N4P/PPPQ1PP1/R3R1K1 w kq - 0 16",
    "Rating": "1290",
    "Moves": "e1e6 e8d7 d2f4 c7f4",
    "GameUrl": "https://lichess.org/xukRQ21f#31"
  },
  {
    "Themes": "crushing kingsideAttack long middlegame pin",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "9",
    "PuzzleId": "002rd",
    "FEN": "r6k/q1pb1p1p/1b3Pr1/p1ppP2Q/3P2p1/4B3/PP2NRPP/3R2K1 b - - 1 25",
    "Moves": "d7e6 e2f4 c5d4 f4g6 f7g6 h5h6",
    "Rating": "1829",
    "RatingDeviation": "255",
    "GameUrl": "https://lichess.org/NcD6lul8/black#50"
  },
  {
    "Themes": "crushing endgame rookEndgame veryLong",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "19",
    "PuzzleId": "00FHO",
    "FEN": "8/1pp5/p2p3p/3P1Pk1/P3K1P1/1P5R/8/2r5 w - - 1 39",
    "Moves": "e4f3 c1c3 f3g2 c3h3 g2h3 h6h5 g4h5 g5h5",
    "Rating": "2233",
    "RatingDeviation": "112",
    "GameUrl": "https://lichess.org/0KBMAMQh#77"
  },
  {
    "Themes": "crushing endgame long pawnEndgame quietMove",
    "OpeningFamily": "",
    "Popularity": "85",
    "NbPlays": "26",
    "PuzzleId": "00H2L",
    "FEN": "8/8/2p2p2/p4P1p/Pk5P/4K1P1/8/8 w - - 1 39",
    "Moves": "e3d3 c6c5 d3e2 c5c4 g3g4 h5g4",
    "Rating": "2351",
    "RatingDeviation": "112",
    "GameUrl": "https://lichess.org/UMoEkwn0#77"
  },
  {
    "Themes": "crushing endgame fork hangingPiece short",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "1",
    "PuzzleId": "00HEx",
    "FEN": "b7/5pk1/R3pn1p/8/3NP3/5P2/6PP/2rB2K1 w - - 1 31",
    "Moves": "a6a8 c1d1 g1f2 d1d4",
    "Rating": "1490",
    "RatingDeviation": "486",
    "GameUrl": "https://lichess.org/Kl5pBLfs#61"
  },
  {
    "Themes": "crushing middlegame pin veryLong",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "3",
    "PuzzleId": "00JFF",
    "FEN": "4r1k1/ppqb3p/6B1/3pb2Q/8/2P5/PP1B2PP/5RK1 b - - 0 20",
    "Moves": "h7g6 h5g6 e5g7 f1f7 c7c5 g1h1 c5f8 f7f8",
    "Rating": "1700",
    "RatingDeviation": "268",
    "GameUrl": "https://lichess.org/e986oDw6/black#40"
  },
  {
    "Themes": "crushing endgame veryLong",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "1",
    "PuzzleId": "0068D",
    "FEN": "7r/pppk4/2pb1r2/8/2NP2p1/2P5/PP2RPP1/4R1K1 w - - 2 26",
    "Moves": "c4d6 f6h6 f2f4 g4g3 e2e7 d7d6 g1f1 h6h1",
    "Rating": "1500",
    "RatingDeviation": "500",
    "GameUrl": "https://lichess.org/WNAZgV2o#51"
  },
  {
    "Themes": "endgame mate mateIn1 oneMove",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "18",
    "PuzzleId": "008o6",
    "FEN": "Q5k1/p1p3p1/5rP1/8/3P4/7P/q3r3/B4RK1 b - - 1 34",
    "Moves": "f6f8 a8f8",
    "Rating": "1076",
    "RatingDeviation": "228",
    "GameUrl": "https://lichess.org/1k4lXfEi/black#68"
  },
  {
    "Themes": "crushing long middlegame",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "1",
    "PuzzleId": "00N3B",
    "FEN": "r2q1rk1/1bb2ppp/p1n1p3/4P3/Np1P4/1B2NP2/1P4PP/2RQ1RK1 b - - 0 20",
    "Moves": "d8d4 d1d4 c6d4 c1c7 d4b3 c7b7",
    "Rating": "1500",
    "RatingDeviation": "500",
    "GameUrl": "https://lichess.org/knYvxXRq/black#40"
  },
  {
    "Themes": "attraction crushing discoveredAttack endgame long sacrifice",
    "OpeningFamily": "",
    "Popularity": "76",
    "NbPlays": "42",
    "PuzzleId": "004RF",
    "FEN": "5rk1/5ppp/1p6/1qp2P1Q/3p3P/6R1/6PK/8 b - - 0 30",
    "Moves": "c5c4 g3g7 g8g7 f5f6 g7f6 h5b5",
    "Rating": "1788",
    "RatingDeviation": "80",
    "GameUrl": "https://lichess.org/2UeWcE4h/black#60"
  },
  {
    "Themes": "endgame hangingPiece mate mateIn2 short",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "27",
    "PuzzleId": "00KVb",
    "FEN": "2k2r2/pp5p/3p4/3Nb1p1/8/1P1P3P/P1Pn4/1K1R1R2 w - - 3 28",
    "Moves": "d1d2 f8f1 d2d1 f1d1",
    "Rating": "1013",
    "RatingDeviation": "182",
    "GameUrl": "https://lichess.org/tzIW1ZLM#55"
  },
  {
    "Themes": "crushing kingsideAttack middlegame pin sacrifice short",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "25",
    "PuzzleId": "008LT",
    "FEN": "r4rk1/6p1/b3p1nN/p1pp4/1p3P1q/3P1Q1B/PPP2PK1/R6R b - - 0 26",
    "Moves": "g8h8 h6f7 f8f7 h3e6",
    "Rating": "1645",
    "RatingDeviation": "133",
    "GameUrl": "https://lichess.org/vnxisKeU/black#52"
  },
  {
    "Themes": "kingsideAttack mate mateIn2 middlegame short",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "15",
    "PuzzleId": "00LdT",
    "FEN": "r5k1/pbp2ppp/6q1/2pp4/3B3r/2P1R1P1/PP2QP1P/R5K1 b - - 1 20",
    "Moves": "c5d4 e3e8 a8e8 e2e8",
    "Rating": "1078",
    "RatingDeviation": "185",
    "GameUrl": "https://lichess.org/MH7zaBHa/black#40"
  },
  {
    "Themes": "crushing discoveredAttack endgame long",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "0",
    "PuzzleId": "00AdI",
    "FEN": "3r4/4kp1p/1PQ1p1p1/p3b3/1p2P2P/1P6/6PK/8 w - - 1 36",
    "Moves": "h2h3 d8d3 g2g3 d3g3 h3h2 g3c3",
    "Rating": "1500",
    "RatingDeviation": "500",
    "GameUrl": "https://lichess.org/WWyIGzPi#71"
  },
  {
    "Themes": "advantage hangingPiece intermezzo middlegame veryLong",
    "OpeningFamily": "",
    "Popularity": "84",
    "NbPlays": "39",
    "PuzzleId": "00Ns0",
    "FEN": "r2qr1k1/pn1p2pp/bp3p2/2p1N3/2P5/1PB3Q1/P1P3PP/R4RK1 w - - 0 18",
    "Moves": "f1f6 d8f6 a1f1 f6h6 e5g4 h6g6 c3g7 e8e4 g4f6 g8g7",
    "Rating": "2539",
    "RatingDeviation": "106",
    "GameUrl": "https://lichess.org/ZyKw24YE#35"
  },
  {
    "Themes": "endgame mate mateIn1 oneMove rookEndgame",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "12",
    "PuzzleId": "00HHN",
    "FEN": "4r2k/p6p/1p3R2/2p5/2P5/1P4R1/r5PP/2K5 w - - 0 32",
    "Moves": "f6f7 e8e1",
    "Rating": "1225",
    "RatingDeviation": "203",
    "GameUrl": "https://lichess.org/tMmxk7ja#63"
  },
  {
    "Themes": "endgame mate mateIn2 short",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "7",
    "PuzzleId": "000Zo",
    "FEN": "4r3/1k6/pp3r2/1b2P2p/3R1p2/P1R2P2/1P4PP/6K1 w - - 0 35",
    "Moves": "e5f6 e8e1 g1f2 e1f1",
    "Rating": "1564",
    "RatingDeviation": "299",
    "GameUrl": "https://lichess.org/n8Ff742v#69"
  },
  {
    "Themes": "endgame mate mateIn2 short",
    "OpeningFamily": "",
    "Popularity": "83",
    "NbPlays": "10",
    "PuzzleId": "004X6",
    "FEN": "1r4k1/p4ppp/2Q5/3pq3/8/P6P/2PR1PP1/Rr4K1 w - - 1 26",
    "Moves": "a1b1 b8b1 d2d1 b1d1",
    "Rating": "1176",
    "RatingDeviation": "278",
    "GameUrl": "https://lichess.org/wvPFkjF9#51"
  },
  {
    "Themes": "endgame mate mateIn1 oneMove",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "26",
    "PuzzleId": "00HPz",
    "FEN": "6r1/7p/2pk1p2/P2p4/P2KbP2/4P3/4NR1P/8 w - - 1 35",
    "Moves": "e2c3 c6c5",
    "Rating": "975",
    "RatingDeviation": "181",
    "GameUrl": "https://lichess.org/ElfQqRYp#69"
  },
  {
    "Themes": "advancedPawn crushing endgame exposedKing long",
    "OpeningFamily": "",
    "Popularity": "81",
    "NbPlays": "26",
    "PuzzleId": "005xu",
    "FEN": "8/3k4/1K1P4/2P3r1/R7/5b2/8/8 b - - 0 68",
    "Moves": "g5g8 a4a7 d7e6 a7e7 e6d5 d6d7",
    "Rating": "1930",
    "RatingDeviation": "95",
    "GameUrl": "https://lichess.org/TDu28XvE/black#136"
  },
  {
    "Themes": "endgame hookMate mate mateIn2 short",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "39",
    "PuzzleId": "00HzH",
    "FEN": "2r2Qk1/p2q2p1/1p2p1Np/3p3P/3Pb1P1/2P5/PP3R2/6K1 b - - 4 33",
    "Moves": "c8f8 f2f8 g8h7 f8h8",
    "Rating": "1003",
    "RatingDeviation": "124",
    "GameUrl": "https://lichess.org/XB8lgZ9N/black#66"
  },
  {
    "Themes": "crushing middlegame veryLong",
    "OpeningFamily": "",
    "Popularity": "67",
    "NbPlays": "2",
    "PuzzleId": "00NGM",
    "FEN": "3k1rr1/pR1b3Q/2pqp3/8/N2P4/8/5PB1/R4K2 w - - 5 34",
    "Moves": "b7a7 f8f2 f1e1 d6b4 a4c3 b4c3 e1f2 c3d4 f2f1 g8f8",
    "Rating": "2107",
    "RatingDeviation": "317",
    "GameUrl": "https://lichess.org/Z5cYm9YQ#67"
  },
  {
    "Themes": "crushing endgame fork short",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "18",
    "PuzzleId": "00HzX",
    "FEN": "4r1k1/5pp1/2R4p/1p6/8/1PP3QP/2q2PP1/6K1 w - - 0 29",
    "Moves": "c6h6 c2c1 g1h2 c1h6",
    "Rating": "1545",
    "RatingDeviation": "178",
    "GameUrl": "https://lichess.org/tKKATkce#57"
  },
  {
    "Themes": "advantage endgame long master quietMove",
    "OpeningFamily": "",
    "Popularity": "83",
    "NbPlays": "186",
    "PuzzleId": "00Mei",
    "FEN": "8/6rk/6p1/1R3b1p/2pQ1P2/2P3P1/qP4PK/8 b - - 0 36",
    "Moves": "f5d3 d4d8 a2a7 b5b8 a7b8 d8b8",
    "Rating": "2567",
    "RatingDeviation": "78",
    "GameUrl": "https://lichess.org/xvCSyLc3/black#72"
  },
  {
    "Themes": "crushing middlegame short",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "4",
    "PuzzleId": "000mr",
    "FEN": "5r1k/5rp1/p7/1b2B2p/1P1P1Pq1/2R1Q3/P3p1P1/2R3K1 w - - 0 41",
    "Moves": "e3g3 f7f4 e5f4 f8f4",
    "Rating": "1500",
    "RatingDeviation": "500",
    "GameUrl": "https://lichess.org/8sVpuwso#81"
  },
  {
    "Themes": "crushing defensiveMove endgame long rookEndgame skewer",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "84",
    "PuzzleId": "0039T",
    "FEN": "1r5r/p3kp2/4p2p/4P3/3R1Pp1/6P1/P1P4P/4K2R w K - 1 25",
    "Moves": "d4a4 b8b1 e1f2 b1h1 a4a7 e7f8",
    "Rating": "1200",
    "RatingDeviation": "84",
    "GameUrl": "https://lichess.org/BrtVeJlj#49"
  },
  {
    "Themes": "crushing endgame long rookEndgame",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "32",
    "PuzzleId": "004d8",
    "FEN": "8/4kr2/R2p4/1p1Pp1p1/5p2/3K1P2/PPP5/8 b - - 0 39",
    "Moves": "g5g4 a6a7 e7f6 a7f7 f6f7 f3g4",
    "Rating": "1560",
    "RatingDeviation": "103",
    "GameUrl": "https://lichess.org/FrR3BHbW/black#78"
  },
  {
    "Themes": "crushing endgame fork short",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "25",
    "PuzzleId": "00Lyc",
    "FEN": "4R3/1p4k1/1q1N1bpp/3B4/5p1P/p4P2/3RK1P1/8 w - - 4 42",
    "Moves": "d6e4 b6b5 d2d3 b5e8",
    "Rating": "1711",
    "RatingDeviation": "129",
    "GameUrl": "https://lichess.org/YB9ozD4y#83"
  },
  {
    "Themes": "kingsideAttack mate mateIn2 middlegame sacrifice short",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "30",
    "PuzzleId": "00HEh",
    "FEN": "3R1rk1/pp3ppp/2p3b1/2n3P1/2B2q1P/5N2/PPP1QP2/4R1K1 b - - 0 23",
    "Moves": "f8d8 e2e8 d8e8 e1e8",
    "Rating": "1044",
    "RatingDeviation": "143",
    "GameUrl": "https://lichess.org/ekEf00kl/black#46"
  },
  {
    "Themes": "advantage fork master opening short",
    "OpeningFamily": "",
    "Popularity": "83",
    "NbPlays": "1153",
    "PuzzleId": "008D5",
    "FEN": "r1bqk2r/pp3ppp/4p2n/3pP3/1b1P1P2/2N5/PP4PP/R1BQKB1R b KQkq - 2 9",
    "Moves": "h6f5 d1a4 c8d7 a4b4",
    "Rating": "1313",
    "RatingDeviation": "74",
    "GameUrl": "https://lichess.org/jIGC2FuP/black#18"
  },
  {
    "Themes": "long mate mateIn3 middlegame queensideAttack sacrifice",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "67",
    "PuzzleId": "005wy",
    "FEN": "1r6/pp2kpp1/2n1p1n1/3p2PQ/5P2/2PqP3/PP1N4/2KR3R w - - 3 27",
    "Moves": "h5h7 c6b4 c3b4 b8c8 d2c4 c8c4",
    "Rating": "1815",
    "RatingDeviation": "97",
    "GameUrl": "https://lichess.org/mBQMheB4#53"
  },
  {
    "Themes": "advantage fork middlegame short",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "416",
    "PuzzleId": "00Evs",
    "FEN": "5qk1/pQ3pp1/7p/b2N1b2/P3r3/5K2/7P/R4B2 b - - 1 24",
    "Moves": "g7g5 d5f6 g8h8 f6e4",
    "Rating": "1055",
    "RatingDeviation": "74",
    "GameUrl": "https://lichess.org/ZuufvD5S/black#48"
  },
  {
    "Themes": "advantage defensiveMove middlegame short",
    "OpeningFamily": "",
    "Popularity": "77",
    "NbPlays": "133",
    "PuzzleId": "0055Y",
    "FEN": "r1b2rk1/p3pp2/2B4b/2Qpq3/3N2pp/4P3/2P2PPP/1R2K2R b K - 1 23",
    "Moves": "h6e3 f2e3 e5e3 e1d1",
    "Rating": "2089",
    "RatingDeviation": "77",
    "GameUrl": "https://lichess.org/7Jpwzowt/black#46"
  },
  {
    "Themes": "endgame mate mateIn2 short",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "15",
    "PuzzleId": "00F2o",
    "FEN": "6k1/4qpp1/3p3p/8/2BP4/1Pn5/2Qn1PPP/6K1 w - - 0 29",
    "Moves": "c2c3 e7e1 c4f1 e1f1",
    "Rating": "1047",
    "RatingDeviation": "181",
    "GameUrl": "https://lichess.org/Xik1cEk4#57"
  },
  {
    "Themes": "crushing deflection exposedKing long middlegame",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "31",
    "PuzzleId": "00DkJ",
    "FEN": "3r1bnr/2p2ppp/2b5/R1k5/5P2/2N5/4N1PP/1R4K1 b - - 3 21",
    "Moves": "c5d6 b1d1 d6e7 a5e5 e7f6 d1d8",
    "Rating": "1758",
    "RatingDeviation": "123",
    "GameUrl": "https://lichess.org/JJiGlqDg/black#42"
  },
  {
    "Themes": "endgame mate mateIn2 sacrifice short",
    "OpeningFamily": "",
    "Popularity": "63",
    "NbPlays": "46",
    "PuzzleId": "00NUc",
    "FEN": "6k1/6pp/1PP5/4b3/3p4/Br5P/4prP1/R5RK w - - 1 30",
    "Moves": "c6c7 b3h3 g2h3 f2h2",
    "Rating": "1578",
    "RatingDeviation": "137",
    "GameUrl": "https://lichess.org/8FRZVN6d#59"
  },
  {
    "Themes": "advancedPawn attraction mate mateIn2 middlegame promotion short",
    "OpeningFamily": "",
    "Popularity": "79",
    "NbPlays": "20",
    "PuzzleId": "001w5",
    "FEN": "1rb2rk1/q5P1/4p2p/3p3p/3P1P2/2P5/2QK3P/3R2R1 b - - 0 29",
    "Moves": "f8f7 c2h7 g8h7 g7g8q",
    "Rating": "1444",
    "RatingDeviation": "140",
    "GameUrl": "https://lichess.org/0e1vxAEn/black#58"
  },
  {
    "Themes": "crushing hangingPiece middlegame short",
    "OpeningFamily": "",
    "Popularity": "54",
    "NbPlays": "5",
    "PuzzleId": "00IpT",
    "FEN": "r1bk3r/ppp1n2p/3pNQ2/8/2BpP2p/8/PPPq2PP/R5K1 b - - 2 21",
    "Moves": "d8d7 f6h8 d7c6 h8e8",
    "Rating": "1686",
    "RatingDeviation": "267",
    "GameUrl": "https://lichess.org/pxYUaQJx/black#42"
  },
  {
    "Themes": "crushing fork long middlegame",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "12",
    "PuzzleId": "00Ea3",
    "FEN": "3r4/p5k1/1p1qprnp/1Q1pN1p1/3P1pP1/1PP5/P5PP/4RRK1 b - - 3 29",
    "Moves": "g6e5 d4e5 d6c5 b5c5 b6c5 e5f6",
    "Rating": "1329",
    "RatingDeviation": "277",
    "GameUrl": "https://lichess.org/6TJRc5H1/black#58"
  },
  {
    "Themes": "advancedPawn doubleCheck mate mateIn4 middlegame promotion queensideAttack sacrifice veryLong",
    "OpeningFamily": "",
    "Popularity": "91",
    "NbPlays": "167",
    "PuzzleId": "00LRq",
    "FEN": "1k6/1p1q4/P2p3p/1NpPpn1Q/5b2/2P3r1/1P2B1P1/R6K b - - 3 28",
    "Moves": "g3g7 a6a7 b8a8 b5c7 d7c7 h5e8 c7b8 a7b8q",
    "Rating": "2291",
    "RatingDeviation": "77",
    "GameUrl": "https://lichess.org/i9yxFCW9/black#56"
  },
  {
    "Themes": "crushing endgame short",
    "OpeningFamily": "",
    "Popularity": "69",
    "NbPlays": "124",
    "PuzzleId": "002VP",
    "FEN": "8/6p1/2B1bn2/6k1/3B4/6K1/4P3/8 b - - 4 44",
    "Moves": "e6d5 d4f6 g5f5 c6d5",
    "Rating": "1368",
    "RatingDeviation": "81",
    "GameUrl": "https://lichess.org/7yJGEbUK/black#88"
  },
  {
    "Themes": "crushing discoveredAttack long master middlegame sacrifice",
    "OpeningFamily": "",
    "Popularity": "92",
    "NbPlays": "622",
    "PuzzleId": "001XA",
    "FEN": "1qr2rk1/pb2bppp/8/8/2p1N3/P1Bn2P1/2Q2PBP/1R3RK1 b - - 3 23",
    "Moves": "b8c7 b1b7 c7b7 e4f6 e7f6 g2b7",
    "Rating": "1787",
    "RatingDeviation": "75",
    "GameUrl": "https://lichess.org/KZRiN695/black#46"
  },
  {
    "Themes": "crushing endgame pin short",
    "OpeningFamily": "",
    "Popularity": "67",
    "NbPlays": "44",
    "PuzzleId": "00Dt6",
    "FEN": "5rk1/p4p1p/4p1p1/5nq1/8/5QPP/5PK1/2RR4 w - - 6 35",
    "Moves": "c1b1 f5h4 g2f1 h4f3",
    "Rating": "1174",
    "RatingDeviation": "79",
    "GameUrl": "https://lichess.org/TTZUVvIZ#69"
  },
  {
    "Themes": "mate mateIn1 middlegame oneMove",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "171",
    "PuzzleId": "00HoG",
    "FEN": "5r1k/5r2/2b2RQp/1p1p2p1/1q4P1/8/8/1B3R1K b - - 0 36",
    "Moves": "f7f6 g6h7",
    "Rating": "1383",
    "RatingDeviation": "90",
    "GameUrl": "https://lichess.org/zwJu9mKP/black#72"
  },
  {
    "Themes": "crushing endgame master short skewer",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "468",
    "PuzzleId": "00KOz",
    "FEN": "8/r4k2/7R/5PK1/1n6/8/8/8 b - - 3 56",
    "Moves": "b4d5 h6h7 f7f8 h7a7",
    "Rating": "981",
    "RatingDeviation": "79",
    "GameUrl": "https://lichess.org/QVprMNzR/black#112"
  },
  {
    "Themes": "crushing endgame fork master short",
    "OpeningFamily": "",
    "Popularity": "79",
    "NbPlays": "74",
    "PuzzleId": "00K0G",
    "FEN": "8/8/8/2Pk4/pK4p1/3N4/5P2/3b4 b - - 7 59",
    "Moves": "d1e2 d3f4 d5c6 f4e2",
    "Rating": "746",
    "RatingDeviation": "84",
    "GameUrl": "https://lichess.org/xIDctz9w/black#118"
  },
  {
    "Themes": "crushing deflection endgame short",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "91",
    "PuzzleId": "0088O",
    "FEN": "7Q/2p5/1p2prp1/p4k1p/P4p1P/8/6RK/3q4 b - - 2 37",
    "Moves": "d1a4 g2g5 f5e4 h8f6",
    "Rating": "1121",
    "RatingDeviation": "76",
    "GameUrl": "https://lichess.org/GmH1DPx6/black#74"
  },
  {
    "Themes": "endgame mate mateIn1 oneMove rookEndgame",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "49",
    "PuzzleId": "00C7m",
    "FEN": "8/5k2/1P4R1/6PK/1r6/8/8/8 w - - 1 58",
    "Moves": "h5h6 b4h4",
    "Rating": "756",
    "RatingDeviation": "119",
    "GameUrl": "https://lichess.org/ZbuTrTYp#115"
  },
  {
    "Themes": "crushing endgame short skewer",
    "OpeningFamily": "",
    "Popularity": "73",
    "NbPlays": "53",
    "PuzzleId": "00EoE",
    "FEN": "r1b1k3/ppr4p/5p2/5p2/8/2P3P1/P4PP1/4RK1R b q - 1 23",
    "Moves": "e8f7 h1h7 f7g6 h7c7",
    "Rating": "957",
    "RatingDeviation": "79",
    "GameUrl": "https://lichess.org/25vOJGCF/black#46"
  },
  {
    "Themes": "crushing middlegame veryLong",
    "OpeningFamily": "",
    "Popularity": "95",
    "NbPlays": "283",
    "PuzzleId": "00GWg",
    "FEN": "1r1r2k1/pp4pp/2nNb3/2R2p2/2P1p3/8/P4PPP/3BR1K1 w - - 1 26",
    "Moves": "d6b7 b8b7 c5c6 b7b1 g1f1 d8d1 e1d1 b1d1 f1e2 e6d7",
    "Rating": "2243",
    "RatingDeviation": "74",
    "GameUrl": "https://lichess.org/M7Dta3mv#51"
  },
  {
    "Themes": "crushing fork long middlegame",
    "OpeningFamily": "",
    "Popularity": "99",
    "NbPlays": "1367",
    "PuzzleId": "00Aas",
    "FEN": "3r1rk1/1p2q1pp/5p2/8/1P1n4/6Q1/PPbB1PPP/R2B1RK1 w - - 9 20",
    "Moves": "d1c2 d4e2 g1h1 e2g3 f2g3 d8d2",
    "Rating": "1303",
    "RatingDeviation": "75",
    "GameUrl": "https://lichess.org/wYjuq3zz#39"
  },
  {
    "Themes": "crushing kingsideAttack master middlegame pin short",
    "OpeningFamily": "",
    "Popularity": "90",
    "NbPlays": "182",
    "PuzzleId": "00KNB",
    "FEN": "2rr2k1/5p2/4p2p/4N1pQ/1p3P2/4P3/np3P1P/2q2BRK b - - 1 32",
    "Moves": "c8c7 h5h6 b2b1q h6g5",
    "Rating": "2627",
    "RatingDeviation": "83",
    "GameUrl": "https://lichess.org/Ri0duT8T/black#64"
  },
  {
    "Themes": "mate mateIn2 middlegame short",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "45",
    "PuzzleId": "009lk",
    "FEN": "1R6/6pk/2p4p/3bP2r/5B1P/2P2qP1/P4P1Q/4R1K1 w - - 2 40",
    "Moves": "e1e3 f3d1 e3e1 d1e1",
    "Rating": "1189",
    "RatingDeviation": "133",
    "GameUrl": "https://lichess.org/gLNPef4f#79"
  },
  {
    "Themes": "crushing middlegame short",
    "OpeningFamily": "",
    "Popularity": "86",
    "NbPlays": "139",
    "PuzzleId": "00B7G",
    "FEN": "1rb2r1k/4q2p/p2p4/3B1p2/1pPb4/1P2NQ2/P5PP/2R2RK1 w - - 1 24",
    "Moves": "g1h1 e7e3 f3e3 d4e3",
    "Rating": "1714",
    "RatingDeviation": "74",
    "GameUrl": "https://lichess.org/jBgjHSYd#47"
  },
  {
    "Themes": "crushing endgame fork long master",
    "OpeningFamily": "",
    "Popularity": "98",
    "NbPlays": "1371",
    "PuzzleId": "006om",
    "FEN": "1r3k2/5p1p/2p1pp2/P2n4/2r1N3/P4PK1/2R2P1P/2R5 b - - 9 29",
    "Moves": "c4a4 e4c5 a4a5 c5d7 f8g7 d7b8",
    "Rating": "1881",
    "RatingDeviation": "75",
    "GameUrl": "https://lichess.org/BMIgw1OR/black#58"
  },
  {
    "Themes": "advancedPawn clearance crushing endgame long master sacrifice",
    "OpeningFamily": "",
    "Popularity": "78",
    "NbPlays": "42",
    "PuzzleId": "00KYC",
    "FEN": "5rk1/p6p/2r1pBp1/4P3/2b5/3p4/P4PPP/1R2R1K1 w - - 0 27",
    "Moves": "b1b7 f8f6 e5f6 d3d2 e1d1 c4e2",
    "Rating": "2243",
    "RatingDeviation": "83",
    "GameUrl": "https://lichess.org/wxhreSsZ#53"
  },
  {
    "Themes": "crushing endgame long rookEndgame zugzwang",
    "OpeningFamily": "",
    "Popularity": "71",
    "NbPlays": "204",
    "PuzzleId": "00MHi",
    "FEN": "8/8/5pp1/5k1p/5P1P/4R1P1/2r5/5K2 w - - 0 43",
    "Moves": "e3e2 c2e2 f1e2 f5g4 e2f2 g4h3",
    "Rating": "2248",
    "RatingDeviation": "80",
    "GameUrl": "https://lichess.org/im48PGD7#85"
  },
  {
    "Themes": "advancedPawn advantage middlegame pin veryLong",
    "OpeningFamily": "",
    "Popularity": "85",
    "NbPlays": "63",
    "PuzzleId": "006NL",
    "FEN": "1r6/k2qn1b1/p1b1p1p1/2PpPpN1/2nN1P1P/p4B2/1PP2Q2/1K1R3R w - - 0 32",
    "Moves": "d4c6 e7c6 b2b3 a3a2 b1a1 c4e5 f4e5 g7e5 a1a2 b8b5",
    "Rating": "2279",
    "RatingDeviation": "114",
    "GameUrl": "https://lichess.org/yA3M5Q6W#63"
  },
  {
    "Themes": "advantage endgame pin veryLong",
    "OpeningFamily": "",
    "Popularity": "88",
    "NbPlays": "368",
    "PuzzleId": "00EJb",
    "FEN": "6k1/5pp1/2R1p2p/8/P1B5/1P4P1/1q3Q1P/3r2K1 w - - 1 35",
    "Moves": "g1g2 d1d2 c6c8 g8h7 c4d3 f7f5 c8c2 d2f2",
    "Rating": "2341",
    "RatingDeviation": "80",
    "GameUrl": "https://lichess.org/ki9WEgCM#69"
  },
  {
    "Themes": "advantage master middlegame short",
    "OpeningFamily": "",
    "Popularity": "82",
    "NbPlays": "57",
    "PuzzleId": "00LBF",
    "FEN": "3r2k1/1b2qpb1/pp4p1/3rp3/3R2P1/2P2NBP/PP2Q2K/3R4 b - - 0 33",
    "Moves": "e7d7 d4d5 b7d5 c3c4",
    "Rating": "2175",
    "RatingDeviation": "80",
    "GameUrl": "https://lichess.org/HG0KKbWc/black#66"
  },
  {
    "Themes": "endgame hangingPiece mate mateIn1 oneMove",
    "OpeningFamily": "",
    "Popularity": "100",
    "NbPlays": "171",
    "PuzzleId": "00FHX",
    "FEN": "2r3k1/5p1p/4pP2/3p3P/8/5P2/p1b3P1/2R3K1 b - - 0 30",
    "Moves": "c2b1 c1c8",
    "Rating": "664",
    "RatingDeviation": "88",
    "GameUrl": "https://lichess.org/rztVgThB/black#60"
  },
  {
    "Themes": "attraction crushing endgame fork long sacrifice",
    "OpeningFamily": "",
    "Popularity": "73",
    "NbPlays": "511",
    "PuzzleId": "006wz",
    "FEN": "2r5/4ppkp/5bp1/1p6/1P6/P3B3/2r2PPP/1R1R2K1 b - - 2 22",
    "Moves": "f6b2 b1b2 c2b2 e3d4 f7f6 d4b2",
    "Rating": "1444",
    "RatingDeviation": "75",
    "GameUrl": "https://lichess.org/qT0W6o27/black#44"
  },
  {
    "Themes": "advantage fork middlegame short",
    "OpeningFamily": "",
    "Popularity": "90",
    "NbPlays": "364",
    "PuzzleId": "003Jb",
    "FEN": "6k1/3bqr1p/2rpp1pR/p7/Pp1QP3/1B3P2/1PP3P1/2KR4 w - - 6 22",
    "Moves": "d4a7 e7g5 c1b1 g5h6",
    "Rating": "1010",
    "RatingDeviation": "77",
    "GameUrl": "https://lichess.org/8RvK0idj#43"
  },
  {
    "Themes": "crushing intermezzo opening short",
    "OpeningFamily": "",
    "Popularity": "92",
    "NbPlays": "822",
    "PuzzleId": "00Htd",
    "FEN": "rnbqk2r/1p3ppp/p4b2/2Pp4/8/2N2N2/PP2PPPP/R2QKB1R w KQkq - 0 9",
    "Moves": "d1d5 f6c3 b2c3 d8d5",
    "Rating": "878",
    "RatingDeviation": "79",
    "GameUrl": "https://lichess.org/ZWQwqa9S#17"
  },
  {
    "Themes": "crushing endgame short",
    "OpeningFamily": "",
    "Popularity": "46",
    "NbPlays": "116",
    "PuzzleId": "00LoE",
    "FEN": "2k5/1p4p1/p4b2/3p4/3P4/2PQN3/PP3q2/1K6 w - - 0 37",
    "Moves": "e3d5 f2g1 b1c2 g1g2",
    "Rating": "1868",
    "RatingDeviation": "74",
    "GameUrl": "https://lichess.org/bDt5hp3w#73"
  },
  {
    "Themes": "crushing endgame long rookEndgame",
    "OpeningFamily": "",
    "Popularity": "88",
    "NbPlays": "1009",
    "PuzzleId": "00D12",
    "FEN": "8/6pp/8/3kP3/1p1P2P1/rPpK3P/4R3/8 b - - 1 39",
    "Moves": "a3b3 e5e6 c3c2 d3c2 b3c3 c2d2",
    "Rating": "2415",
    "RatingDeviation": "81",
    "GameUrl": "https://lichess.org/iC0vC5to/black#78"
  },
  {
    "Themes": "endgame mate mateIn1 oneMove",
    "OpeningFamily": "",
    "Popularity": "85",
    "NbPlays": "496",
    "PuzzleId": "003IX",
    "FEN": "8/3pk3/R7/1R2Pp1p/2PPnKr1/8/8/8 w - - 4 43",
    "Moves": "f4f5 e4g3",
    "Rating": "1636",
    "RatingDeviation": "85",
    "GameUrl": "https://lichess.org/576Btq56#85"
  },
  {
    "Themes": "endgame master masterVsMaster mate mateIn1 oneMove",
    "OpeningFamily": "",
    "Popularity": "67",
    "NbPlays": "34",
    "PuzzleId": "00J7i",
    "FEN": "3r2k1/pQ3ppp/4R1n1/2q5/2P5/2B3P1/P4PBP/6K1 b - - 0 24",
    "Moves": "f7e6 b7g7",
    "Rating": "1000",
    "RatingDeviation": "100",
    "GameUrl": "https://lichess.org/nBfwpOrE/black#48"
  },
  {
    "Themes": "crushing deflection kingsideAttack middlegame pin sacrifice skewer veryLong",
    "OpeningFamily": "",
    "Popularity": "91",
    "NbPlays": "698",
    "PuzzleId": "004Op",
    "FEN": "2kr2r1/1bp4n/1pq1p2p/p1P5/1P3B2/P6P/5RP1/RB2Q1K1 w - - 3 26",
    "Moves": "e1f1 d8d1 f1d1 g8g2 g1f1 g2g1 f1e2 g1d1",
    "Rating": "2136",
    "RatingDeviation": "76",
    "GameUrl": "https://lichess.org/tneg9Bzk#51"
  },
  {
    "Themes": "kingsideAttack mate mateIn2 middlegame short",
    "OpeningFamily": "",
    "Popularity": "95",
    "NbPlays": "194",
    "PuzzleId": "00MGA",
    "FEN": "r3r1k1/6b1/p2Nn2p/1P1Qp3/6nq/2P5/1PB2PP1/R1B1R1K1 w - - 1 30",
    "Moves": "g2g3 h4h2 g1f1 h2f2",
    "Rating": "1267",
    "RatingDeviation": "75",
    "GameUrl": "https://lichess.org/dsGjft94#59"
  },
  {
    "Themes": "crushing endgame master rookEndgame short skewer",
    "OpeningFamily": "",
    "Popularity": "80",
    "NbPlays": "130",
    "PuzzleId": "006yP",
    "FEN": "6R1/8/Kpk1p3/1p1pP3/6P1/PPP1r3/8/8 b - - 3 40",
    "Moves": "e3c3 g8c8 c6d7 c8c3",
    "Rating": "806",
    "RatingDeviation": "81",
    "GameUrl": "https://lichess.org/vf9MOLH1/black#80"
  },
  {
    "Themes": "advantage endgame rookEndgame short",
    "OpeningFamily": "",
    "Popularity": "87",
    "NbPlays": "260",
    "PuzzleId": "00Kd8",
    "FEN": "3R4/3P4/8/5p2/5kPp/8/3r1KP1/8 w - - 1 64",
    "Moves": "f2g1 f4g3 g1f1 f5g4",
    "Rating": "2150",
    "RatingDeviation": "75",
    "GameUrl": "https://lichess.org/loJK0sJF#127"
  },
  {
    "Themes": "crushing long middlegame",
    "OpeningFamily": "",
    "Popularity": "76",
    "NbPlays": "34",
    "PuzzleId": "009Os",
    "FEN": "r2b2k1/1p3q1p/p2p4/3P2p1/2P1PRQr/8/P2B3P/2R4K w - - 1 29",
    "Moves": "g4g3 h4f4 d2f4 f7f4 g3f4 g5f4",
    "Rating": "1447",
    "RatingDeviation": "93",
    "GameUrl": "https://lichess.org/AdjEnXlm#57"
  },
  {
    "Themes": "crushing endgame short",
    "OpeningFamily": "",
    "Popularity": "96",
    "NbPlays": "4012",
    "PuzzleId": "00LH7",
    "FEN": "6k1/6Bp/6pP/3q1p2/p2PnQ2/2r5/P5PK/4R3 b - - 1 39",
    "Moves": "d5d6 e1e4 d6f4 e4f4",
    "Rating": "1757",
    "RatingDeviation": "75",
    "GameUrl": "https://lichess.org/7mA63Gfs/black#78"
  },
  {
    "Themes": "backRankMate mate mateIn2 middlegame short",
    "OpeningFamily": "",
    "Popularity": "98",
    "NbPlays": "669",
    "PuzzleId": "0042j",
    "FEN": "3r2k1/4nppp/pq1p1b2/1p2P3/2r2P2/2P1NR2/PP1Q2BP/3R2K1 b - - 0 24",
    "Moves": "d6e5 d2d8 b6d8 d1d8",
    "Rating": "622",
    "RatingDeviation": "84",
    "GameUrl": "https://lichess.org/DuM2FZjg/black#48"
  },
  {
    "Themes": "crushing long middlegame",
    "OpeningFamily": "",
    "Popularity": "70",
    "NbPlays": "241",
    "PuzzleId": "00GAf",
    "FEN": "r5k1/5pp1/1p1rb2p/3pR2q/p1pP4/P1P3Q1/5PPN/4R1K1 b - - 1 30",
    "Moves": "h5g6 g3g6 f7g6 e5e6 d6e6 e1e6",
    "Rating": "1334",
    "RatingDeviation": "75",
    "GameUrl": "https://lichess.org/DJ3edB5i/black#60"
  },
  {
    "Themes": "advantage attackingF2F7 fork long opening",
    "OpeningFamily": "",
    "Popularity": "25",
    "NbPlays": "28",
    "PuzzleId": "00LZf",
    "FEN": "r1b1kb1r/pppp1ppp/2n1p3/3nN3/3P2q1/4B3/PPP1BPPP/RN1Q1RK1 b kq - 9 8",
    "Moves": "d5e3 f2e3 g4g5 e5f7 g5e3 g1h1",
    "Rating": "2205",
    "RatingDeviation": "91",
    "GameUrl": "https://lichess.org/sVgQxr8Q/black#16"
  }
]

function App() {

  if (localStorage.getItem("rating") == null) {
    localStorage.setItem("rating", "1500");
  }
  let [currentPuzzle, setCurrentPuzzle] = useState({...PUZZLES[Math.floor(Math.random() * PUZZLES.length)]});
  let [rating, setRating] = useState(parseInt(localStorage.getItem("rating")));
  let [finishedState, setFinishedState] = useState(false);

  let [promoting, setPromoting] = useState(false);
  let [pieceOfPromotion, setPieceOfPromotion] = useState("");
  let [correctPromotion, setCorrectPromotion] = useState("");

  let [moveHintUsed, setMoveHintUsed] = useState(false);


  function update(won) {
    setFinishedState(true);


    let my_rating = parseInt(rating); // Ea
    let puzzle_rating = parseInt(currentPuzzle["Rating"]); // Eb

    let win_probability = 1 / (  1 + Math.pow(10, (puzzle_rating - my_rating) / 400)  );

    let newRatingWins = parseInt(my_rating + 20 * (1 - win_probability));
    let newRatingLoses = parseInt(my_rating + 20 * (0 - win_probability));

    localStorage.setItem("rating", won ? newRatingWins.toString() : newRatingLoses.toString());
    setRating(won ? newRatingWins : newRatingLoses);

  }

  function setPuzzle() {
    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
        document.getElementById(String.fromCharCode(97 + i) + String.fromCharCode(49 + j)).style.border = "none";
      }
    }

    setFinishedState(false);

    let t_puzzle = PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
    t_puzzle["NbPlays"] += "1";
    setCurrentPuzzle({...t_puzzle});

  }

  function setPromotionPiece() {
    let text = document.getElementById('pieceName').value.toLowerCase();
    if (text == 'q' || text == 'r' || text == 'n' || text == 'b') {
      setPieceOfPromotion(text);
    }
  }

  return (
    <div className="App">
      <InfoContext.Provider value = {{update, setPuzzle, promoting, setPromoting, setPromotionPiece, 
      pieceOfPromotion, setPieceOfPromotion, correctPromotion, setCorrectPromotion, moveHintUsed, setMoveHintUsed}}>
      <Board currentPuzzle = {currentPuzzle} pieceOfPromotion = {pieceOfPromotion}/>
      <div>
        <Info currentPuzzle = {currentPuzzle} myRating = {rating}/>
        <div class = "fwrapper">
          <Hint/>
          <Move/>
        </div>
        <Proceed finished = {finishedState}/>
        <Promotion isPromoting = {promoting}/>
      </div>
      </InfoContext.Provider>
    </div>
  );
}

export default App;
