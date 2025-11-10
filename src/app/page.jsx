import { ToggleTheme } from "@/components/toggle-theme";
import { SearchBar } from "@/components/search-bar";
import { UserIcon } from "@/components/user-icon";
import { Section } from "@/components/section";
import { Add } from "@/components/add";

// import { List } from "./lists/list";
// import { Note } from "./notes/note";

// import { UserAlert } from "@/components/user-alert";
// import { Login } from "./user/login";
// import { Signin } from "./user/signin";
// import { Profile } from "./user/profile";
// import { UpdateUser } from "@/components/update-user";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-between min-w-full min-h-screen">
    <navbar className=" w-[100%] h-auto flex flex-row items-start justify-between py-3 px-5 bg-gray-100/30 shadow-md dark:bg-gray-900 dark:shadow-gray-950">
      <Section />
      <SearchBar />
      <div className="flex flex-row gap-4">
        <UserIcon/>
        <ToggleTheme />
      </div>
    </navbar>
    <main className="w-[100%] flex flex-row gap-8 h-auto p-4">
      {/* <List />
      <List />
      <Note /> */}
    </main>
      {/* <UserAlert/> */}
      {/* <Login/> */}
      {/* <Signin/> */}
      {/* <Profile/> */}
      {/* <UpdateUser/> */}
    <Add/>
    </section>
  );
}