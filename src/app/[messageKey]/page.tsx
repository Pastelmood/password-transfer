import { getMessageDecrypt, deleteMessage } from "@/action/saveSecretAction";
import { splitStringInFirstHalf } from "@/lib/encrypt";
import MessageFoundComponent from "@/components/MessageFoundComponent";
import MessageNotFoundComponent from "@/components/MessageNotFoundComponent";

export default async function TestPage({ params }: { params: { messageKey: string } }) {
    
    const firstHalfMessageKey = splitStringInFirstHalf(params.messageKey);
    const result = await getMessageDecrypt(firstHalfMessageKey, params.messageKey);

    if (result.success) {
        console.log(await deleteMessage(firstHalfMessageKey));
        return (          
            <MessageFoundComponent message={result.message}></MessageFoundComponent>
        );
    }
    
    return (
        <>
            <MessageNotFoundComponent></MessageNotFoundComponent>
        </>
    );
}