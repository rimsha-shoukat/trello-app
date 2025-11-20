"use client";
import React, { useState, useEffect } from "react";
import { ToggleTheme } from "@/components/toggle-theme";
import { SearchBar } from "@/components/search-bar";
import { UserIcon } from "@/components/user-icon";
import { Section } from "@/components/section";
import { Add } from "@/components/add";
import { List } from "./[boards]/lists/list";
import { Note } from "./notes/note";
import { UserAlert } from "@/components/user-alert";
import { Login } from "./user/login";
import { Signup } from "./user/signup";
import { Profile } from "./user/profile";
import { UpdateUser } from "@/components/update-user";
import { AddText } from "@/components/addText";
import { AddTitle } from "@/components/addTitle";

export default function Home() {
  const [loginUser, setLoginUser] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showUserAlert, setShowUserAlert] = useState(false);
  const [showUserUpdate, setShowUserUpdate] = useState(false);
  const [addNewTitle, setAddNewTitle] = useState(false);
  const [addNewText, setAddNewText] = useState(false);

  useEffect(()=>{
  },[showList]);

  return (
    <section className="flex flex-col items-start justify-start min-w-full h-screen">
      <nav className="w-[100%] h-auto flex flex-row items-start justify-between py-3 px-5 bg-[#18243c] text-white shadow-md dark:bg-gray-900 dark:shadow-gray-950">
        <Section showList={showList} setShowList={setShowList} setAddNewTitle={setAddNewTitle} />
        <SearchBar />
        <div className="flex flex-row gap-4">
          <UserIcon loginUser={loginUser} setShowProfile={setShowProfile} setShowSignup={setShowSignup} />
          <ToggleTheme />
        </div>
      </nav>
      <main className="w-[100%] h-[100%] p-6 my-6">
        { showList?  <List setAddNewTitle={setAddNewTitle} /> : <Note setAddNewTitle={setAddNewTitle} /> }
      </main>
      { showLogin && <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup} setLoginUser={setLoginUser} /> }
      { showSignup && <Signup setShowSignup={setShowSignup} setShowLogin={setShowLogin} /> }
      { showProfile && <Profile setShowUserUpdate={setShowUserUpdate} setShowProfile={setShowProfile} setShowUserAlert={setShowUserAlert} /> }
      { showUserUpdate && <UpdateUser setShowUserAlert={setShowUserAlert} setShowUserUpdate={setShowUserUpdate} /> }
      { showUserAlert && <UserAlert setShowUserAlert={setShowUserAlert} /> }
      { addNewTitle && <AddTitle showList={showList} setAddNewText={setAddNewText} setAddNewTitle={setAddNewTitle} /> }
      { addNewText && <AddText showList={showList} setAddNewText={setAddNewText} /> }
      <Add setAddNewTitle={setAddNewTitle} />
    </section>
  );
}