import Link from "next/link";

export default function OtherToolsComponent() {
    return (
        <div className="flex flex-col space-y-2 pt-4">

            <h2 className="text-lg font-bold">Other Tools</h2>

            <Link href={"/tools/convert"} className="text-sm hover:underline hover:text-green-700">
                NATO Phonetic Convert
            </Link>

        </div>
    );
}