'use client';
import { createContext, useContext, useState } from 'react';

const BoardContext = createContext();

export function BoardProvider({ children }) {
  const [boardList, setBoardList] = useState([]);
  localStorage.setItd
  return (
    <BoardContext.Provider value={{ boardList, setBoardList }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  return useContext(BoardContext);
}
