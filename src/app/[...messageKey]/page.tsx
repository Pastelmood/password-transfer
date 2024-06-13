import ShowDecryptMessageComponent from "@/components/ShowDecryptMessageComponent";
import { headers } from "next/headers";

export default function MessageKeyPage({ params }: { params: { messageKey: string } }) {

    const messageDecrypt = params.messageKey;
    console.log(params)
    console.log(headers())

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <ShowDecryptMessageComponent messageDecrypt={messageDecrypt}></ShowDecryptMessageComponent>
        </main>
    );
}