"use client";

import { useState, useTransition } from "react";
import QRCodeComponent from "./QRCodeComponent";
import { randomString, encrypt, splitStringInHalf } from "@/lib/encrypt";
import { saveSecret } from "@/action/saveSecretAction";


export default function InputMessageForm() {

    const [isPending, setIsPending] = useState<boolean>(false);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>();
    const [messageUrl, setMessageUrl] = useState<string>();
    const [copyButtonText, setCopyButtonText] = useState<string>("Copy");

    function handleOnChangeMessage(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setMessage(event.currentTarget.value)
    }

    async function handleOnSubmit() {
        if (message !== undefined && message !== null) {

            setIsPending(true);

            const _messageSecretKey = randomString();
            const _messageEncrypt = await encrypt(message, _messageSecretKey);
            const [_firstHalfMessage, _secondHalfMessage] = splitStringInHalf(_messageSecretKey);

            setMessageUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/${_messageSecretKey}`);

            const response = await saveSecret(_firstHalfMessage, _messageEncrypt);
            if (response) {
                setIsSaved(true);
                setIsPending(false);
            }
        }
    }

    async function handleOnClickCopy(message?: string) {
        if (!message) {
            return;
        }
        setCopyButtonText("Copied!");
        await navigator.clipboard.writeText(message);
        setTimeout(() => {
            setCopyButtonText("Copy");
        }, 2000);
    }

    function handleOnClickNewEncrypt() {
        setIsSaved(false);
        setMessage(null);
        setMessageUrl("");
    }


    return (
        <>
            {isSaved ?
                <>
                    {/** Show url to user */}
                    <div className="flex flex-col space-y-2">
                        <div role="alert" className="alert bg-green-400 rounded-md gap-0 flex flex-col items-start">
                            <p className="text-green-900 font-bold lg:text-lg">Success, your message has been stored</p>
                            <p className="text-[12px] text-green-900">Copy the link below and send the link to its intended recipient.</p>
                        </div>
                        <div className="w-full bg-gray-200 p-4 flex space-x-2 rounded-md items-center">
                            <button className="btn btn-sm" onClick={() => handleOnClickCopy(messageUrl)}>{copyButtonText}</button>
                            <div className="break-all text-sm">
                                {messageUrl}
                            </div>
                        </div>
                        <p className="text-sm self-start"><strong>Please note: </strong>Do not try to verify the page, as the content is deleted after the first view!</p><p className="text-sm self-start text-sky-500 hover:text-sky-600 hover:underline hover:cursor-pointer" onClick={handleOnClickNewEncrypt}>Encrypt next message.</p><p className="text-sm self-start">Here&lsquo;s a QR code of the link above:</p>
                        <div className="self-start">
                            {messageUrl ? <QRCodeComponent value={messageUrl} /> : <div></div>}
                        </div>
                        <div className="border-b w-full my-4"></div>
                    </div>
                </>
                :
                <>
                    {/** Input form for encrypt message */}

                    <div className="flex flex-col space-y-2">
                        <h1 className="text-2xl">Transfer passwords and more</h1>
                        <p className="text-sm">This service allows you to encrypt and transfer passwords and other sensitive data to a friend. The recipient can view the page only once!</p>
                        <div className="space-y-3 w-full mt-2">
                            <textarea
                                className="textarea textarea-bordered w-full"
                                rows={7}
                                placeholder="Enter your (short) message here..."
                                onChange={handleOnChangeMessage}>

                            </textarea>

                            {isPending ?
                                <button className="btn bg-green-400 hover:bg-green-400 text-white">
                                    <span className="loading loading-spinner"></span>
                                    loading
                                </button> :
                                <button className="btn bg-green-400 text-white hover:bg-green-500 border-green-600" onClick={handleOnSubmit}>Encrypt & transfer</button>
                            }

                        </div>
                    </div>
                </>
            }
        </>
    )
}