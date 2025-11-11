import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function Note(){
    return (
        <div className="break-inside-avoid mb-4 w-[100%] h-auto p-4 rounded-md border-1 border-gray-400">
            <span className="w-[100%] flex flex-row items-center justify-between mb-4">
                <span>
                    <h1>Note Name</h1>
                    <p className="text-xs">Created at: 01/04</p>
                </span>
                <Button variant="ghost"><ChevronDown /></Button>
            </span>
            <section className="w-[100%] h-auto flex flex-col items-start justify-center gap-2">
                <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eaque nesciunt iusto, voluptas iure corporis quod, repellendus consequuntur repellat fuga, beatae sed voluptatem? Voluptas incidunt, impedit laborum accusantium possimus cupiditate!
                Delectus odio tenetur architecto hic, nesciunt quod, voluptates libero animi, rem praesentium quos sapiente distinctio. Quam rerum quo, voluptatem sunt perferendis, accusantium nulla voluptate veniam adipisci aspernatur cupiditate rem voluptatum.
                Saepe tenetur quasi iste sit numquam, sunt accusantium natus neque hic a corporis officia in molestiae dolor dolore vero? Iste tempore laudantium porro totam. Quos commodi sapiente saepe quas quo!</p>
            </section>
        </div>
    )
}