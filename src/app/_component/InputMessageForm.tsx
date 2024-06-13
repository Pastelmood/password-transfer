"use client";

import { useState, useTransition } from "react";
import { randomString, encrypt, decrypt, splitString } from "@/lib/encrypt";


export default function InputMessageForm() {

    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<string>();

    function handleOnChangeMessage(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setMessage(event.currentTarget.value)
        console.log(message);
    }

    async function handleOnSubmit() {
        if (message !== undefined) {

            startTransition(async () => {
                const messageSecretKey = randomString();
                const messageEncrypt = await encrypt(message, messageSecretKey);
                const messageDecrypt = await decrypt(messageEncrypt, messageSecretKey);
                const [messageRefKey, UnusedMessage] = splitString(messageEncrypt);


            });
        }
    }




    return (
        <div className="lg:w-[768px] md:w-[585px] sm:w-96  space-y-3 items-center flex flex-col p-2">
            <h1 className="text-2xl">Transfer passwords and more</h1>
            <p className="text-sm">This service allows you to encrypt and transfer passwords and other sensitive data to a friend. The recipient can view the page only once!</p>
            <div className="space-y-3 w-full">
                <textarea
                    className="textarea textarea-bordered w-full"
                    rows={7}
                    placeholder="Enter your (short) message here..."
                    onChange={handleOnChangeMessage}>

                </textarea>


                {isPending ? <button className="btn">
                    <span className="loading loading-spinner"></span>
                    loading
                </button> : <button className="btn bg-green-400 text-white hover:bg-green-500 border-green-600" onClick={handleOnSubmit}>Encrypt & transfer</button>}
            </div>

            {/** Show url to user */}
            <div role="alert" className="alert bg-green-400 rounded-md gap-0 flex flex-col items-start">
                <p className="text-green-900 font-bold lg:text-lg">Success, your message has been stored</p>
                <p className="text-[12px] text-green-900">Copy the link below and send the link to its intended recipient.</p>
            </div>
            <div className="w-full bg-gray-200 p-4 flex space-x-2 rounded-md">
                <button className="btn h-full">Copy</button>
                <div className="break-all">
                    https://transfer.pw/3uiTs9EUpBiSsZVTlNdlZ2Egl#KryD18cnFHNJSGcUKV6j6p064evdsvwsvcdsvsadcs
                </div>
            </div>
            <p className="text-sm self-start"><strong>Please note: </strong>Do not try to verify the page, as the content is deleted after the first view!</p>
            <p className="text-sm self-start text-sky-500 hover:text-sky-600 hover:underline hover:cursor-pointer">Encrypt next message.</p>
        </div>
    )
}