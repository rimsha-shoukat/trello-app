import { ToggleTheme } from "@/components/toggle-theme";
import { SearchBar } from "@/components/search-bar";
import { UserIcon } from "@/components/user-icon";
import { Section } from "@/components/section"

export default function Home() {
  return (
    <>
    <div className="flex flex-row items-start justify-between py-3 px-5 bg-gray-300/30 shadow-md">
      <Section />
      <SearchBar />
      <UserIcon />
      <ToggleTheme />
    </div>
    </>
  );
}