"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Signin({setShowSignin, setShowLogin, setLoginUser}) {

  const handleSignin = () => {
    setShowSignin(false);
    setLoginUser(true);
  }
  return (
    <>
    <section onClick={ () => {setShowSignin(false)} } className="absolute w-[100%] h-[100%] bg-white/20">
    </section>
    <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle>Create new account</CardTitle>
        <CardDescription>
          Provide your name & email below to create new account
        </CardDescription>
        <CardAction>
          <Button onClick={() => {setShowLogin(true); setShowSignin(false)}} variant="link">Log In</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="admin"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={ handleSignin } type="submit" className="w-full">
          SignIn
        </Button>
        <Button variant="outline" className="w-full">
          SignIn with Google
        </Button>
      </CardFooter>
    </Card>
    </>
  )
}
