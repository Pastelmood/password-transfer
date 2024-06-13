import ShowDecryptMessageComponent from "@/components/ShowDecryptMessageComponent";

export default async function MessageKeyPage({ params }: { params: { messageKey: string } }) {

    // const messageSecretKey = params.messageKey;
    // const [_firstHalfMessage, _secondHalfMessage] = splitStringInHalf(messageSecretKey);

    // const message = await getMessageEncrypt(_firstHalfMessage);

    // let messageDecrypt = "";

    // if (message) {

    // } else {
    //     messageDecrypt = ""
    // }

    

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <ShowDecryptMessageComponent messageSecretKey={params.messageKey}></ShowDecryptMessageComponent>
        </main>
    );
}