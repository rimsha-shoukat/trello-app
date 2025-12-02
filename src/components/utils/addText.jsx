"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function AddText({showList, setAddNewText}) {

  const handleSave = () => {
    setAddNewText(false);
  }

  const handleAddCard = () => {
   
  }
  
  return (
    <>
    <section onClick={ () => {setAddNewText(false)} } className="absolute w-full h-full bg-[#162238]/50 dark:bg-white/20 shadow-sm">
    </section>
    <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CardHeader>
          <CardTitle>Create {showList? "List" : "Note"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="AddNewCardText" className="grid gap-4">
              <div className="grid gap-2 mb-2">
                <Label>Add {showList? "Card" : "Note"} text</Label>
                <textarea className="p-2 rounded-sm border border-gray-500"
                  id={showList? "Card" : "Note"}
                  rows="4"
                  placeholder={showList? "Enter Card text" : "Enter Note text"}
                  required
                />
              </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button onClick={ handleSave } type="submit" className="w-full">
            Save
          </Button>
          { showList && <Button onClick={ handleAddCard } className="w-full mt-2">
                          Add Another Card
                        </Button>}
        </CardFooter>
    </Card>
    </>
  )
}
