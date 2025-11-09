import { ToggleTheme } from "@/components/toggle-theme";
import { SearchBar } from "@/components/search-bar";
import { UserIcon } from "@/components/user-icon";
import { Section } from "@/components/section";
// import { UserAlert } from "@/components/user-alert";
// import { Login } from "./user/login";
// import { Signin } from "./user/signin";
// import { Profile } from "./user/profile";
// import { UpdateUser } from "@/components/update-user";

export default function Home() {
  return (
    <>
    <div className="flex flex-row items-start justify-between py-3 px-5 bg-gray-100/30 shadow-md dark:bg-gray-900 dark:shadow-gray-950">
      <Section />
      <SearchBar />
      <div className="flex flex-row gap-4">
        <UserIcon/>
        <ToggleTheme />
      </div>
    </div>
      {/* <UserAlert/>
      <Login/>
      <Signin/>
      <Profile/>
      <UpdateUser/> */}
    </>
  );
}