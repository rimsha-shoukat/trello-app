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

export function AddBoard({ setAddNewBoard, setAddNewTitle }) {

    return (
        <>
            <section onClick={() => { setAddNewBoard(false) }} className="absolute w-full h-full bg-[#162238]/50 dark:bg-white/20 shadow-sm">
            </section>
            <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <CardHeader>
                    <CardTitle>Create Board</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid gap-2">
                            <Label>Add Board name</Label>
                            <Input
                                id="board"
                                type="text"
                                placeholder="Enter Board name"
                                required
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => { setAddNewBoard(false); setAddNewTitle(true); }} type="submit" className="w-full">
                        Create Board
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}
