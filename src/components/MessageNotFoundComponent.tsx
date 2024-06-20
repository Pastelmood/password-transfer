
export default function MessageNotFoundComponent() {
    return (
        <>
            <div className="flex flex-col space-y-2">
                <div className="bg-yellow-100 w-full px-2 py-5 text-xl text-yellow-800 font-bold rounded-md">
                    This message does not exist
                </div><div className="rounded-md border border-red-300">
                    <div className="bg-red-200 p-2 text-red-700 rounded-t-md border-b border-red-300">What should you do now?</div>
                    <div className="text-sm p-2">
                        <p className="pb-2">There are four possible reasons, why this message does not exist:</p>
                        <ol className="list-decimal pl-9">
                            <li><strong>The URL is wrong:</strong> check the URL again and make sure, you have not made any mistakes.</li>
                            <li><strong>The message has expired:</strong> we only store messages for about 30 days. If your URL is older, we may have deleted the message already.</li>
                            <li><strong>You try to view the message a second time:</strong> sorry, we delete the message immediately after the first access. Only this ensures the confidentiality of the message.</li>
                            <li><strong>Some else viewed the message before you:</strong> if you are trying to view the message for the first time, are using the correct URL all within 30 days, then this means that someone else viewed the message before you. You should immediately take steps in order to mitigate any consequences that may arise from someone else having read the message. We suggest you contact the sender of the message in order to inform him or her about the breach of confidentiality.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
}