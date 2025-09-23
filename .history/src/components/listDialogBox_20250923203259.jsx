'use client';
import { useState } from 'react';

export default function listDialogBox({ listBox, setListBox, boardId, boardList, setBoardList }) {
  const [title, setTitle] = useState('');
  const [bg, setBg] = useState('#616060');
  const [text, setText] = useState('#f5f2f2');

  const handleNewList = (e) => {
    e.preventDefault();
    if (!title.trim()) return; // Prevent empty lists

    const newList = { 
      id: Date.now().toString(), 
      title: title.trim(), 
      bg: bg, 
      text: text, 
      cards: [] 
    };

    const updatedBoards = boardList.map(b => {
      if (b.id === boardId) {
        return { ...b, lists: Array.isArray(b.lists) ? [...b.lists, newList] : [newList] };
      }
      return b;
    });

    localStorage.setItem('boards', JSON.stringify(updatedBoards));
    setBoardList(updatedBoards);
    setTitle('');
    setBg('#616060');
    setText('#f5f2f2');
    setListBox(false);
  };

  if (!listBox) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="w-[100%] h-[100%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-0 backdrop-blur-sm z-20 flex items-center justify-center p-4" onClick={() => setListBox(false)}>
        {/* Modal Content */}
        <form 
          onSubmit={handleNewList} 
          onClick={(e) => e.stopPropagation()}
          className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md animate-in fade-in zoom-in duration-300"
        >
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 mb-4 text-center tracking-tight">
            Create New List
          </h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
              List Title
            </label>
            <input
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-2 p-3 text-black rounded-xl border-gray-200/50 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 bg-white/50 backdrop-blur-sm transition-all duration-200 shadow-sm hover:shadow-md"
              placeholder="Enter list title" 
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                Background Color
              </label>
              <div className="relative">
                <input
                  type="color" 
                  value={bg} 
                  onChange={(e) => setBg(e.target.value)}
                  className="w-full h-12 p-1 cursor-pointer rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border-2 border-gray-200/50 focus:outline-none focus:ring-4 focus:ring-purple-500/20 absolute inset-0 opacity-0"
                  title="Pick a background color"
                />
                <div 
                  className="w-full h-12 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border-2 border-gray-200/50 cursor-pointer bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center"
                  style={{ backgroundColor: bg }}
                >
                  <span className="text-sm font-medium">Current: {bg}</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                Text Color
              </label>
              <div className="relative">
                <input
                  type="color" 
                  value={text} 
                  onChange={(e) => setText(e.target.value)}
                  className="w-full h-12 p-1 cursor-pointer rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border-2 border-gray-200/50 focus:outline-none focus:ring-4 focus:ring-pink-500/20 absolute inset-0 opacity-0"
                  title="Pick a text color"
                />
                <div 
                  className="w-full h-12 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border-2 border-gray-200/50 cursor-pointer bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center"
                  style={{ backgroundColor: text, color: bg || '#f5f2f2' }}
                >
                  <span className="text-sm font-medium">Current: {text}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center gap-4 pt-3 border-t border-gray-200/50">
            <button
              type="button"
              onClick={() => setListBox(false)}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 hover:from-gray-300 hover:via-gray-400 hover:to-gray-500 rounded-xl cursor-pointer font-semibold text-gray-700 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm border border-gray-200/30"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 rounded-xl cursor-pointer font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!title.trim()}
            >
              Create List
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
