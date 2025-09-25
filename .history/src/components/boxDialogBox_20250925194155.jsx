'use client';
import { useState } from 'react';

export default function boxDialogBox({ boardBox, setBoardBox, boardList, setBoardList }) {
  const [title, setTitle] = useState('');
  const [bg, setBg] = useState("#616060");
  const [text, setText] = useState('#f5f2f2');

  const handleNewBoard = (e) => {
    e.preventDefault();
    const newBoard = { id: Date.now().toString(), title: title, bg: bg, text: text, lists: [] };
    localStorage.setItem('boards', JSON.stringify([...boardList, newBoard]));
    setBoardList([...boardList, newBoard]);
    setTitle('');
    setBg("#616060");
    setText('#f5f2f2');
    setBoardBox(false);
  };

  if (!boardBox) return null;

  return (
    <>
      
      <div className="w-[100%] h-[100%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-0 backdrop-blur-sm z-20 flex items-center justify-center p-4" onClick={() => setBoardBox(false)}>
      
        <form 
          onSubmit={handleNewBoard} 
          onClick={(e) => e.stopPropagation()}
          className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md animate-in fade-in zoom-in duration-300"
        >
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 mb-6 text-center tracking-tight">
            Create New Board
          </h2>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
              Board Title
            </label>
            <input
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-black border-2 p-3 rounded-xl border-gray-200/50 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 bg-white/50 backdrop-blur-sm transition-all duration-200 shadow-sm hover:shadow-md"
              placeholder="Enter board title" 
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm max-[450px]:text-xs uppercase tracking-wide">
                Background
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
                  className="w-full h-12 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border-2 border-gray-200/50 cursor-pointer bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center"
                  style={{ color: bg || 'gray-700' }}
                >
                  <span className="text-sm max-[450px]:text-xs font-medium">Current: {bg}</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm max-[450px]:text-xs uppercase tracking-wide">
                Text
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
                  className="w-full h-12 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border-2 border-gray-200/50 cursor-pointer bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center"
                  style={{ color: text || 'gray-700' }}
                >
                  <span className="text-sm max-[450px]:text-xs font-medium">Current: {text}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center gap-4 pt-4 border-t border-gray-200/50">
            <button
              type="button"
              onClick={() => setBoardBox(false)}
              className="flex-1 py-3 px-6 max-[450px]:text-xs bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 hover:from-gray-300 hover:via-gray-400 hover:to-gray-500 rounded-xl cursor-pointer font-semibold text-gray-700 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm border border-gray-200/30"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 max-[450px]:text-xs px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 rounded-xl cursor-pointer font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!title.trim()}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
