import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Profile() {
  return (
    <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardAction>
          <Button variant="link">forgot password</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <h1>User name</h1>
              <CardAction>
               <Button variant="link">Edit</Button>
              </CardAction>
            </div>
            <div className="grid gap-2">
              <h1>user@gmail.com</h1>
              <CardAction>
               <Button variant="link">Edit</Button>
              </CardAction>
            </div>
            <div className="grid gap-2">
              <h1>********</h1>
              <CardAction>
               <Button variant="link">Edit</Button>
              </CardAction>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-row gap-2">
        <Button type="submit" className="w-1/2">
          Logout
        </Button>
        <Button variant="outline" className="w-1/2">
          Delete Account
        </Button>
      </CardFooter>
    </Card>
  )
}
