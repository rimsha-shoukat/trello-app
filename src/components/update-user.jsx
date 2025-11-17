"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function UpdateUser({setShowUserAlert, setShowUserUpdate}) {

  const handleUpdate = () => {
    setShowUserUpdate(false);
    setShowUserAlert(true);
  }
  
  return (
    <>
    <section onClick={ () => {setShowUserUpdate(false)} } className="absolute w-[100%] h-[100%] bg-white/20">
    </section>
    <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle>Update Email</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-2 mb-4">
            <div className="grid gap-2 mb-4">
              <Label htmlFor="email">Old Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">New Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <p className="underline">forgot password</p>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={ handleUpdate } type="submit" className="w-full">
          Save Changes
        </Button>
      </CardFooter>
    </Card>
    </>
  )
}
