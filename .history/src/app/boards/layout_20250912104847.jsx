'use client';
import { useState } from 'react';

export default function BoardsLayout({ children }){
  const [listBox, setListBox] = useState(false);

    return (
        <>
        
        { children }
        </>
    )
}