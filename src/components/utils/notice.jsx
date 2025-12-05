import { PopcornIcon } from "lucide-react"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useEffect } from "react";

export function Notice({ notice, setNotice }) {
    useEffect(() => {
        setTimeout(() => {
            setNotice(null);
        }, 3000);
    }, [notice]);

    return (
        <>
            <section className="absolute w-full h-full">
            </section>
            <Alert variant="default" className="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <PopcornIcon />
                <AlertTitle>{notice}</AlertTitle>
            </Alert>
        </>
    )
}