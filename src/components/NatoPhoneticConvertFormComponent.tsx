"use client";

import { FaCopy } from "react-icons/fa6";
import { toNatoPhonetic } from "@/lib/natoPhoneticConvert";
import { useState } from "react";
import Link from "next/link";

export default function NatoPhoneticConvertFormComponent() {

    const [convertMessage, setConvertMessage] = useState<string>();

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.target.value;
        const _convertmessage = input.length > 0 ? toNatoPhonetic(input) : "";
        setConvertMessage(_convertmessage);
    }

    async function handleOnClickCopy() {
        if (!convertMessage) return;

        const originalMessage = convertMessage;
        setConvertMessage("Copied!");

        try {
            await navigator.clipboard.writeText(originalMessage);
        } catch (err) {
            console.error("Failed to copy text: ", err);
            setConvertMessage(originalMessage);
            return;
        }

        setTimeout(() => {
            setConvertMessage(originalMessage);
        }, 500);
    }

    return (
        <>

            {/* <div className="flex justify-center">
                <div className="lg:w-[768px] md:w-[585px] w-full p-2"> */}
                    <h1 className="text-xl font-bold">NATO Phonetic</h1>
                    <div className="flex flex-col space-y-2">
                        <div>
                            <p className="text-sm pt-2">Message:</p>
                            <input type="text" placeholder="Type here" className="input input-bordered input-sm w-full" onChange={handleOnChange} />
                        </div>
                        <div>
                            <p className="text-sm">Convert:</p>
                            <div className="flex flex-col text-sm border border-gray-300 rounded-md p-2">
                                <div className="self-end" onClick={handleOnClickCopy}>
                                    <FaCopy />
                                </div>
                                <div className="flex justify-center">
                                    {convertMessage}
                                </div>
                            </div>
                        </div>
                        <div className="pt-2 flex justify-center">
                            <Link className="btn lg:w-40 md:w-40 w-full" href={"/"}>
                                Back
                            </Link>
                        </div>
                    </div>
                {/* </div>
            </div> */}

        </>
    );
}