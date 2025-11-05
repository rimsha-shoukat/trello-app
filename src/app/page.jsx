
import { ToggleTheme } from "@/components/toggle-theme";
import { SearchBar } from "@/components/search-bar";
import { UserIcon } from "@/components/user-icon";
import { SectionTitle } from "@/components/section-title"
import { SectionDetail } from "@/components/section-detail"
export default function Home() {
  return (
    <div className="flex flex-row items-center justify-between p-3">
      <SectionTitle />
      <SectionDetail />
      <SearchBar />
      <UserIcon />
      <ToggleTheme />
    </div>
  );
}