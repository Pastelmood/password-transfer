"use client";

import { useState, useTransition } from "react";
import QRCodeComponent from "./QRCodeComponent";
import { randomString, encrypt, splitString, replaceDotToHashtag } from "@/lib/encrypt";


export default function InputMessageForm() {

    const [isPending, setIsPending] = useState<boolean>(true);
    const [message, setMessage] = useState<string | null>();
    const [messageEncrypt, setMessageEncrypt] = useState<string>();
    const [messageUrl, setMessageUrl] = useState<string>();
    const [copyButtonText, setCopyButtonText] = useState<string>("Copy");

    function handleOnChangeMessage(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setMessage(event.currentTarget.value)
    }

    async function handleOnSubmit() {
        if (message !== undefined && message !== null) {

            const messageSecretKey = randomString();
            const _messageEncrypt = await encrypt(message, messageSecretKey);
            const [messageRefKey, UnusedMessage] = splitString(_messageEncrypt);
            const _messageUrl = replaceDotToHashtag(_messageEncrypt);

            setMessageEncrypt(_messageEncrypt);
            setMessageUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/${_messageUrl}`);
            setIsPending(false);
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
        setIsPending(true);
        setMessage(null);
        setMessageUrl("");
    }


    return (
        <div className="lg:w-[768px] md:w-[585px] sm:w-96  space-y-3 items-center flex flex-col p-2">
            {isPending ?
                <>
                    {/** Input form for encrypt message */}
                    <h1 className="text-2xl">Transfer passwords and more</h1><p className="text-sm">This service allows you to encrypt and transfer passwords and other sensitive data to a friend. The recipient can view the page only once!</p><div className="space-y-3 w-full">
                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows={7}
                            placeholder="Enter your (short) message here..."
                            onChange={handleOnChangeMessage}>

                        </textarea>

                        <button className="btn bg-green-400 text-white hover:bg-green-500 border-green-600" onClick={handleOnSubmit}>Encrypt & transfer</button>
                    </div>
                </>
                :
                <>
                    {/** Show url to user */}
                    <div role="alert" className="alert bg-green-400 rounded-md gap-0 flex flex-col items-start">
                        <p className="text-green-900 font-bold lg:text-lg">Success, your message has been stored</p>
                        <p className="text-[12px] text-green-900">Copy the link below and send the link to its intended recipient.</p>
                    </div><div className="w-full bg-gray-200 p-4 flex space-x-2 rounded-md items-center">
                        <button className="btn btn-sm" onClick={() => handleOnClickCopy(messageUrl)}>{copyButtonText}</button>
                        <div className="break-all">
                            {messageUrl}
                        </div>
                    </div><p className="text-sm self-start"><strong>Please note: </strong>Do not try to verify the page, as the content is deleted after the first view!</p><p className="text-sm self-start text-sky-500 hover:text-sky-600 hover:underline hover:cursor-pointer" onClick={handleOnClickNewEncrypt}>Encrypt next message.</p><p className="text-sm self-start">Here's a QR code of the link above:</p><div className="self-start">
                        {messageUrl ? <QRCodeComponent value={messageUrl} /> : <div></div>}
                    </div><div className="border-b w-full my-4"></div>
                </>
            }
        </div>




    )
}