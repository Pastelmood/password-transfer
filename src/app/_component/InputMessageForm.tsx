"use client";

import { ReactEventHandler, ReactHTMLElement, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

export default function InputMessageForm() {

    const [message, setMessage] = useState<string>();

    function handleOnChangeMessage(event: { target: { value: SetStateAction<string | undefined>; }; }) {
        setMessage(event.target.value)
        console.log(message);
    }

    async function handleOnSubmit() {
        if (message !== undefined) {
            const messageUuid = uuidv4();
            const messageSecretKey = CryptoJS.lib.WordArray.random(8).toString();
            const messageEncrypt = encrypt(message, messageSecretKey);

            console.log(messageUuid);
            console.log(messageSecretKey);
            console.log(messageEncrypt);
        }
    }

    function encrypt(message: string, secretKey: string): string {
        const iv = CryptoJS.lib.WordArray.random(16);
        const key = CryptoJS.PBKDF2(secretKey, CryptoJS.enc.Hex.parse('73616c74'), {
            keySize: 256 / 32,
        });

        const encrypted = CryptoJS.AES.encrypt(message, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        return iv.toString() + ':' + encrypted.toString();
    }


    return (
        <div className="lg:w-[585px] md:w-[585px] sm:w-96  space-y-3 items-center flex flex-col p-2">
            <h1 className="text-2xl">Transfer passwords and more</h1>
            <p className="text-sm">This service allows you to encrypt and transfer passwords and other sensitive data to a friend. The recipient can view the page only once!</p>
            <form className="space-y-3 w-full">
                <textarea
                    className="textarea textarea-bordered w-full"
                    rows={7}
                    placeholder="Enter your (short) message here..."
                    onChange={handleOnChangeMessage}>

                </textarea>
                <button className="btn bg-green-400 text-white hover:bg-green-500 border-green-600" onClick={handleOnSubmit}>Encrypt & transfer</button>
            </form>
        </div>
    )
}