"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";

export function AddText({ showList, setAddNewText, setNotice, activeBoardId, activeListId, activeNoteId }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (text.trim() === "") {
      setError(`${showList ? "Card" : "Note"} text cannot be empty!`);
      return;
    }
    try {
      let res = await axios.patch("/api/user/add-text", { text, boardId: showList ? activeBoardId : null, listId: showList ? activeListId : null, noteId: showList ? null : activeNoteId, showList });
      setAddNewText(false);
      setText("");
      setNotice(res.data.message || `${showList ? "Card" : "Note"} created successfully!`);
    } catch (error) {
      let errorMessage = "An unknown error occurred!!";
      if (error.response) {
        if (typeof error.response.data.message === 'string') {
          errorMessage = error.response.data.message;
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data && typeof error.response.data === 'object' && error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      } else if (error.request) {
        errorMessage = "Network Error!! please check your internet connection.";
      } else {
        errorMessage = error.message;
      }
      setError(errorMessage);
      setText("");
    }
  }

  const handleAddCard = async () => {
    if (text.trim() === "") {
      setError("card text cannot be empty!");
      return;
    }
    try {
      await axios.patch("/api/user/add-text", { text, boardId: showList ? activeBoardId : null, listId: showList ? activeListId : null, noteId: showList ? null : activeNoteId, showList });
      setText("");
    } catch (error) {
      let errorMessage = "An unknown error occurred!!";
      if (error.response) {
        if (typeof error.response.data.message === 'string') {
          errorMessage = error.response.data.message;
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data && typeof error.response.data === 'object' && error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      } else if (error.request) {
        errorMessage = "Network Error!! please check your internet connection.";
      } else {
        errorMessage = error.message;
      }
      setError(errorMessage);
    }
  }

  return (
    <>
      <section onClick={() => { setAddNewText(false) }} className="absolute w-full h-full bg-[#162238]/50 dark:bg-white/20 shadow-sm">
      </section>
      <Card className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CardHeader>
          <CardTitle>Create {showList ? "List" : "Note"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="AddNewCardText" className="grid gap-4">
            <div className="grid gap-2 mb-2">
              <Label>Add {showList ? "Card" : "Note"} text</Label>
              <textarea className="p-2 rounded-sm border border-gray-500"
                onChange={(e) => setText(e.target.value)} value={text}
                id={showList ? "Card" : "Note"}
                rows="4"
                placeholder={showList ? "Enter Card text" : "Enter Note text"}
                required
              />
            </div>
            {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button onClick={handleSave} type="submit" className="w-full">
            Save
          </Button>
          {showList && <Button onClick={handleAddCard} className="w-full mt-2">
            Add Another Card
          </Button>}
        </CardFooter>
      </Card>
    </>
  )
}
