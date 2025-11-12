"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UserAlert({setShowUserAlert}) {

  const handleCancel = () => {
    setShowUserAlert(false);
  }

  const handleContinue = () => {
    setShowUserAlert(false);
  }

  return (
    <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle>Are you absolutely sure?</CardTitle>
        <CardDescription>
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex-row gap-2">
        <Button onClick={ handleCancel } variant="outline" className="w-1/2">
          cancel
        </Button>
        <Button onClick={ handleContinue } type="submit" className="w-1/2">
          continue
        </Button>
      </CardFooter>
    </Card>
  )
}
