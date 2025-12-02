"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UserAlert({alert}) {

  return (
    <>
    <section onClick={ () => alert.onCancel() } className="absolute w-full h-full bg-[#162238]/50 dark:bg-white/20 shadow-sm">
    </section>
    <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle>{alert.title}</CardTitle>
        <CardDescription>{alert.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex-row gap-2">
        <Button onClick={ () => alert.onCancel() } variant="outline" className="w-1/2">
          cancel
        </Button>
        <Button onClick={ () => alert.onContinue() } type="submit" className="w-1/2">
          continue
        </Button>
      </CardFooter>
    </Card>
    </>
  )
}
