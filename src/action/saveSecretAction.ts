"use server";

import { createClient } from "@supabase/supabase-js";
import { decrypt } from "@/lib/encrypt";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveSecret(messageKey: string, messageEncrypt: string) {
  const { data, error } = await supabase
    .from("message_secret")
    .insert([{ message_key: messageKey, message_encrypt: messageEncrypt }])
    .select();

  if (data) {
    return true;
  } else {
    console.log(error);
    return false;
  }
}

type GetMessageDecryptResult = {
  success: boolean;
  message: string;
};

export async function getMessageDecrypt(
  messageKey: string,
  messageSecretKey: string
): Promise<GetMessageDecryptResult> {
  const { data, error } = await supabase
    .from("message_secret")
    .select("*")
    .eq("message_key", messageKey);

  if (error) {
    console.error("Error fetching message encryption:", error);
    return {
      success: false,
      message: "Message not found.",
    };
  }

  if (data && data.length > 0) {
    const messageDecrypt = await decrypt(
      data[0].message_encrypt,
      messageSecretKey
    );
    return {
      success: true,
      message: messageDecrypt,
    };
  }

  // default return
  return {
    success: false,
    message: "Message not found.",
  };
}
