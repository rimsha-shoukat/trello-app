import Link from 'next/link';
export default function Board({ boardList }) {
    return (
        {
                listBox.length > 0 ? <List listBox={ listBox } /> :
                <h1 className="mt-6 text-[2rem] font-bold text-[#b32509]">No list added yet!</h1>
            }
    )
}