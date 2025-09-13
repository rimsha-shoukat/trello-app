'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const BoardContext = createContext();

export function BoardProvider({ children }) {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    const storedBoards = JSON.parse(localStorage.getItem('boards'));
    if (storedBoards) {
      setBoardList(storedBoards);
    }
  }, []);

   useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boardList));
  }, [boardList]);

  return (
    <BoardContext.Provider value={{ boardList, setBoardList }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  return useContext(BoardContext);
}
