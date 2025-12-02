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
import React, { useState, useEffect } from "react";

export function UpdateUser({form}) {
  const[user, setUser] = useState({fieldI: "", fieldII: ""});
  const[error, setError] = useState(null);

  useEffect( () => {
    if (user.fieldI.trim() === "" || user.fieldII.trim() === "") {
      setError("Missing required fields!!");
    } else {
      setError(null);
    }
  },[user]);

  return (
    <>
    <section onClick={ () => form.onCancel() } className="absolute w-full h-full bg-[#162238]/50 dark:bg-white/20 shadow-sm">
    </section>
    <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle>{form.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-2 mb-4">
            <div className="grid gap-2 mb-4">
              <Label htmlFor={form.inputI}>{form.inputI}</Label>
              <Input
              onChange={ (e) => {setUser({...user, fieldI: e.target.value})} }
                id={form.inputI}
                type={form.inputIType}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor={form.inputII}>{form.inputII}</Label>
              <Input
              onChange={ (e) => {setUser({...user, fieldII: e.target.value})} }
                id={form.inputII}
                type={form.inputIIType}
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={!error ? () => form.onSave(user) : null} disabled={!!error} type="submit" className="w-full">
          {form.action}
        </Button>
      </CardFooter>
    </Card>
    </>
  )
}
