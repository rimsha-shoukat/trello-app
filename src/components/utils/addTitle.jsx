"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddTitle({ showList, setAddNewText, setAddNewTitle }) {

    return (
        <>
            <section onClick={() => { setAddNewTitle(false) }} className="absolute w-[100%] h-[100%] bg-[#162238]/50 dark:bg-white/20 shadow-sm">
            </section>
            <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <CardHeader>
                    <CardTitle>Create {showList ? "List" : "Note"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        {
                            showList &&
                            <div className="grid gap-2 mb-2">
                                <Label>Board name</Label>
                                <Input
                                    id="board"
                                    type="text"
                                    placeholder="Enter Board name"
                                    required
                                />
                            </div>
                        }
                        <div className="grid gap-2">
                            <Label>Add {showList ? "List" : "Note"} title</Label>
                            <Input
                                id={showList ? "List" : "Note"}
                                type={showList ? "List" : "Note"}
                                placeholder={showList ? "List title" : "Note title"}
                                required
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => { setAddNewText(true); setAddNewTitle(false); }} type="submit" className="w-full">
                        Next
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}
