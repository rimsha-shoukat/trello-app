'use client';

export default function Home() {
  

  return (
    <>
      <section className="w-[100%] flex flex-row justify-between items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-[1rem] px-6 shadow-lg select-none backdrop-blur-sm border-b-2 border-white/20" >
        <MainHeader ={boardBox} setBoardBox={setBoardBox} />
      </section>
      <BoxDialogBox boardBox={boardBox} setBoardBox={setBoardBox} boardList={boardList} setBoardList={setBoardList} />
      <BoxArea boardList={boardList} setBoardList={setBoardList} greeting={greeting} />
    </>
  );
}
