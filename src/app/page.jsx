"use client";
import React, { useState, useEffect } from "react";
import { ToggleTheme } from "@/components/utils/toggle-theme.jsx";
import { SearchBar } from "@/components/utils/search-bar.jsx";
import { UserIcon } from "@/components/utils/user-icon.jsx";
import { Section } from "@/components/utils/section.jsx";
import { Add } from "@/components/utils/add.jsx";
import { Board } from "./[boards]/board.jsx";
import { Note } from "./notes/note.jsx";
import { Login } from "./user/login.jsx";
import { Signup } from "./user/signup.jsx";
import { Profile } from "./user/profile.jsx";
import { AddText } from "@/components/utils/addText.jsx";
import { AddTitle } from "@/components/utils/addTitle.jsx";
import axios from "axios";
import { Notice } from "@/components/utils/notice.jsx";
import { Landing } from "@/components/utils/landing.jsx";
import { AddBoard } from "@/components/utils/addBoard.jsx";

export default function Home() {
  const [user, setUser] = useState(null);
  const [showList, setShowList] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [addNewTitle, setAddNewTitle] = useState(false);
  const [addNewText, setAddNewText] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [addNewBoard, setAddNewBoard] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [activeListId, setActiveListId] = useState(null);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [boards, setBoards] = useState([]);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      let res = await axios.get("/api/user/profile");
      setUser(res.data || null);
    } catch (error) {
      setError(error.message || "Network error!! please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fetchBoards = async () => {
    try {
      let res = await axios.get("/api/user/get-boards");
      setBoards(res.data || []);
    } catch (error) {
      let errorMessage = "An unknown error occurred!!";
      if (error.response) {
        if (typeof error.response.data.message === 'string') {
          errorMessage = error.response.data.message;
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data && typeof error.response.data === 'object' && error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      } else if (error.request) {
        errorMessage = "Network Error!! please check your internet connection.";
      } else {
        errorMessage = error.message;
      }
      setNotice(errorMessage);
    }
  }

  const fetchNotes = async () => {
    try {
      let res = await axios.get("/api/user/get-notes");
      setNotes(res.data || []);
    } catch (error) {
      let errorMessage = "An unknown error occurred!!";
      if (error.response) {
        if (typeof error.response.data.message === 'string') {
          errorMessage = error.response.data.message;
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data && typeof error.response.data === 'object' && error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      } else if (error.request) {
        errorMessage = "Network Error!! please check your internet connection.";
      } else {
        errorMessage = error.message;
      }
      setNotice(errorMessage);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchBoards();
    fetchNotes();
  }, []);

  useEffect(() => {
  }, [showList]);

  return (
    <section className="flex flex-col items-start justify-start min-w-full h-screen overflow-hidden light:bg-gray-100">
      <nav className=" max-[750px]:hidden w-full h-auto flex flex-row items-start justify-between py-3 px-5 text-white shadow-md dark:shadow-md dark:shadow-black">
        {user && <Section showList={showList} setShowList={setShowList} setAddNewTitle={setAddNewTitle} setAddNewBoard={setAddNewBoard} setActiveBoardId={setActiveBoardId} setActiveNoteId={setActiveNoteId} notes={notes} boards={boards} />}
        <SearchBar user={user} showList={showList} notes={notes} boards={boards} activeBoardId={activeBoardId} setNotes={setNotes} setBoards={setBoards} fetchNotes={fetchNotes} fetchBoards={fetchBoards} />
        <div className="flex flex-row gap-4">
          <UserIcon setShowLogin={setShowLogin} setShowProfile={setShowProfile} user={user} />
          <ToggleTheme />
        </div>
      </nav>
      <nav className="min-[750px]:hidden w-full h-auto py-3 px-5 flex flex-col items-center justify-center text-white shadow-md dark:shadow-md dark:shadow-black">
        <div className="w-full flex flex-row items-start justify-between mb-3">
          {user && <Section showList={showList} setShowList={setShowList} setAddNewTitle={setAddNewTitle} setAddNewBoard={setAddNewBoard} setActiveBoardId={setActiveBoardId} setActiveNoteId={setActiveNoteId} notes={notes} boards={boards} />}
          <div className="flex flex-row gap-4">
            <UserIcon setShowLogin={setShowLogin} setShowProfile={setShowProfile} user={user} />
            <ToggleTheme />
          </div>
        </div>
        <SearchBar user={user} showList={showList} notes={notes} boards={boards} activeBoardId={activeBoardId} setNotes={setNotes} setBoards={setBoards} fetchNotes={fetchNotes} fetchBoards={fetchBoards} />
      </nav>
      <main className="w-full h-full p-6 overflow-x-hidden overflow-y-scroll">
        {loading ? (
          <div className="w-full h-screen text-center text-blue-800 text-2xl">Loading....</div>
        ) : error ? (
          <div className="w-full h-screen text-center text-red-800 text-2xl">{error}</div>
        ) : !user ? (
          <Landing setShowLogin={setShowLogin} />
        ) : showList ? (
          <Board user={user} setAddNewBoard={setAddNewBoard} setActiveListId={setActiveListId} activeBoardId={activeBoardId} setActiveBoardId={setActiveBoardId} setNotice={setNotice} boards={boards} fetchBoards={fetchBoards} setAddNewText={setAddNewText} />
        ) : (
          <Note setAddNewTitle={setAddNewTitle} user={user} setNotice={setNotice} notes={notes} fetchNotes={fetchNotes} />
        )}
      </main>
      {!loading && showLogin && !user && <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup} fetchUser={fetchUser} setNotice={setNotice} />}
      {showSignup && <Signup setShowSignup={setShowSignup} setShowLogin={setShowLogin} fetchUser={fetchUser} />}
      {!loading && showProfile && user && <Profile setShowProfile={setShowProfile} fetchUser={fetchUser} user={user} setNotice={setNotice} />}
      {addNewTitle && <AddTitle showList={showList} setAddNewText={setAddNewText} setAddNewTitle={setAddNewTitle} activeBoardId={activeBoardId} setActiveListId={setActiveListId} setActiveNoteId={setActiveNoteId} notes={notes} boards={boards} fetchNotes={fetchNotes} fetchBoards={fetchBoards} />}
      {addNewText && <AddText showList={showList} setAddNewText={setAddNewText} setNotice={setNotice} activeBoardId={activeBoardId} activeListId={activeListId} activeNoteId={activeNoteId} fetchNotes={fetchNotes} fetchBoards={fetchBoards} />}
      {addNewBoard && <AddBoard setAddNewBoard={setAddNewBoard} setAddNewTitle={setAddNewTitle} setActiveBoardId={setActiveBoardId} fetchBoards={fetchBoards} />}
      {notice && <Notice notice={notice} setNotice={setNotice} />}
      {user && <Add showList={showList} setAddNewTitle={setAddNewTitle} setAddNewBoard={setAddNewBoard} user={user} activeBoardId={activeBoardId} />}
    </section>
  );
}