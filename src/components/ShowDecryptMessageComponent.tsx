type Props = {
    messageDecrypt: string
}

export default function ShowDecryptMessageComponent({messageDecrypt}: Props) {
    return (
        <div className="lg:w-[768px] md:w-[585px] sm:w-96  space-y-3 items-center flex flex-col p-2">
            <div className="w-full border rounded-md">
                <div className="bg-emerald-200 p-2 text-green-800 rounded-t-md">
                    <p>Your message</p>
                </div>

                <div className="m-3">
                    <div className="bg-gray-50 p-2 border border-gray-300 rounded-md break-all">
                        { messageDecrypt }
                    </div>
                </div>
            </div>

            <div className="bg-emerald-200 text-sm p-2 border rounded-md text-green-800">
                <strong>Please note: </strong>Copy the contents of the message somewhere - the message has already been deleted from the server!
            </div>
        </div>
    );
}