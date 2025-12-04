"use client";
import React, { useState, useEffect } from "react";
import { ToggleTheme } from "@/components/utils/toggle-theme.jsx";
import { SearchBar } from "@/components/utils/search-bar.jsx";
import { UserIcon } from "@/components/utils/user-icon.jsx";
import { Section } from "@/components/utils/section.jsx";
import { Add } from "@/components/utils/add.jsx";
import { List } from "./[boards]/board.jsx";
import { Note } from "./notes/note.jsx";
import { Login } from "./user/login.jsx";
import { Signup } from "./user/signup.jsx";
import { Profile } from "./user/profile.jsx";
import { AddText } from "@/components/utils/addText.jsx";
import { AddTitle } from "@/components/utils/addTitle.jsx";
import axios from "axios";
import { Notice } from "@/components/utils/notice.jsx";
import { Landing } from "@/components/utils/landing.jsx";

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

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      let res = await axios.get("api/user/profile");
      setUser(res.data || null);
    } catch (error) {
      setError("Network error!! please try again.")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  useEffect(() => {
  }, [showList]);

  return (
    <section className="flex flex-col items-start justify-start min-w-full h-screen">
      <nav className="w-full h-auto flex flex-row items-start justify-between py-3 px-5 text-white shadow-md dark:shadow-md dark:shadow-black">
        {user && <Section showList={showList} setShowList={setShowList} setAddNewTitle={setAddNewTitle} />}
        <SearchBar />
        <div className="flex flex-row gap-4">
          <UserIcon setShowLogin={setShowLogin} setShowProfile={setShowProfile} user={user} />
          <ToggleTheme />
        </div>
      </nav>
      <main className="w-full h-full p-6 my-6">
        {loading ? (
          <div className="w-full h-screen text-center text-blue-800 text-2xl">Loading....</div>
        ) : error ? (
          <div className="w-full h-screen text-center text-red-800 text-2xl">{error}</div>
        ) : !user ? (
          <Landing setShowLogin={setShowLogin} />
        ) : showList ? (
          <List setAddNewTitle={setAddNewTitle} />
        ) : (
          <Note setAddNewTitle={setAddNewTitle} />
        )}
      </main>
      {!loading && showLogin && !user && <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup} fetchUser={fetchUser} setNotice={setNotice} />}
      {showSignup && <Signup setShowSignup={setShowSignup} setShowLogin={setShowLogin} fetchUser={fetchUser} />}
      {!loading && showProfile && user && <Profile setShowProfile={setShowProfile} fetchUser={fetchUser} user={user} setNotice={setNotice} />}
      {addNewTitle && <AddTitle showList={showList} setAddNewText={setAddNewText} setAddNewTitle={setAddNewTitle} />}
      {addNewText && <AddText showList={showList} setAddNewText={setAddNewText} />}
      {notice && <Notice notice={notice} setNotice={setNotice} />}
      {user && <Add setAddNewTitle={setAddNewTitle} />}
    </section>
  );
}