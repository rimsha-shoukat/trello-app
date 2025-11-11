"use client";
import { useState } from "react";
import { ToggleTheme } from "@/components/toggle-theme";
import { SearchBar } from "@/components/search-bar";
import { UserIcon } from "@/components/user-icon";
import { Section } from "@/components/section";
import { Add } from "@/components/add";

import { List } from "./lists/list";
import { Note } from "./notes/note";

import { UserAlert } from "@/components/user-alert";
import { Login } from "./user/login";
import { Signin } from "./user/signin";
import { Profile } from "./user/profile";
import { UpdateUser } from "@/components/update-user";

export default function Home() {
  const [loginUser, setLoginUser] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showUserAlert, setShowUserAlert] = useState(false);
  const [showUserUpdate, setShowUserUpdate] = useState(false);

  return (
    <section className="flex flex-col items-center justify-between min-w-full min-h-screen">
    <navbar className="w-[100%] h-auto flex flex-row items-start justify-between py-3 px-5 bg-gray-200/30 shadow-md dark:bg-gray-900 dark:shadow-gray-950">
      <Section />
      <SearchBar />
      <div className="flex flex-row gap-4">
        <UserIcon loginUser={loginUser} setShowProfile={setShowProfile} setShowSignin={setShowSignin} />
        <ToggleTheme />
      </div>
    </navbar>
    <main className={`${showList ? "columns-3" : "columns-2"} w-[100%] h-auto p-6 mb-6`}>
      { showList && <List /> }
      { showNote && <Note /> }
    </main>
      { showUserAlert && <UserAlert /> }
      { showLogin && <Login /> }
      { showSignin && <Signin /> }
      { showProfile && <Profile /> }
      { showUserUpdate && <UpdateUser /> }
    <Add/>
    </section>
  );
}