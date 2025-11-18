"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Profile({setShowUserUpdate, setShowProfile, setShowUserAlert}) {

  const handleLogout = () => {
    setShowProfile(false);
    setShowUserAlert(true);
  }

  const handleDelete = () => {
    setShowProfile(false);
    setShowUserAlert(true);
  }

  return (
    <>
    <section onClick={ () => {setShowProfile(false)} } className="absolute w-[100%] h-[100%] bg-white/20">
    </section>
    <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardAction>
          <Button variant="link">user123456</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <h1>User name</h1>
              <CardAction>
               <Button onClick={() => {setShowUserUpdate(true); setShowProfile(false)}} variant="link">Edit</Button>
              </CardAction>
            </div>
            <div className="grid gap-2">
              <h1>user@gmail.com</h1>
              <CardAction>
               <Button onClick={() => {setShowUserUpdate(true); setShowProfile(false)}} variant="link">Edit</Button>
              </CardAction>
            </div>
            <div className="grid gap-2">
              <h1>********</h1>
              <CardAction>
               <Button onClick={() => {setShowUserUpdate(true); setShowProfile(false)}} variant="link">Edit</Button>
              </CardAction>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <h1>Notes: none</h1>
              <h1>Boards: none</h1>
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex-row gap-2">
        <Button onClick={ handleLogout } type="submit" className="w-1/2">
          Logout
        </Button>
        <Button onClick={ handleDelete } variant="outline" className="w-1/2">
          Delete Account
        </Button>
      </CardFooter>
    </Card>
    </>
  )
}
