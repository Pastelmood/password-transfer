"use server";

import { createClient } from "@supabase/supabase-js";
import { decrypt } from "@/lib/encrypt";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Saves an encrypted message in the database.
 *
 * @param {string} messageKey - The key identifying the message to be saved.
 * @param {string} messageEncrypt - The encrypted message to be saved.
 * @returns {Promise<boolean>} A boolean indicating whether the operation was successful.
 */
export async function saveSecret(
  messageKey: string,
  messageEncrypt: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("message_secret")
      .insert([{ message_key: messageKey, message_encrypt: messageEncrypt }])
      .select();

    if (error) {
      console.error("Error saving secret:", error);
      return false;
    }

    return data !== null;
  } catch (err) {
    console.error("Unexpected error:", err);
    return false;
  }
}

type GetMessageDecryptResult = {
  success: boolean;
  message: string;
};

/**
 * Fetches and decrypts a message from the database.
 *
 * @param {string} messageKey - The key identifying the message to be decrypted.
 * @param {string} messageSecretKey - The secret key used to decrypt the message.
 * @returns {Promise<GetMessageDecryptResult>} An object containing the success status and the decrypted message or an error message.
 */
export async function getMessageDecrypt(
  messageKey: string,
  messageSecretKey: string
): Promise<GetMessageDecryptResult> {
  try {
    // Fetch message data from the database
    const { data, error } = await supabase
      .from("message_secret")
      .select("*")
      .eq("message_key", messageKey);

    // Revalidate the path for the message
    revalidatePath("/[messageKey]", "page");

    if (error || !data || data.length === 0) {
      console.error(
        "Error fetching message encryption:",
        error || "No data found"
      );
      return {
        success: false,
        message: "Message not found.",
      };
    }

    // Decrypt the message
    const messageDecrypt = await decrypt(
      data[0].message_encrypt,
      messageSecretKey
    );
    return {
      success: true,
      message: messageDecrypt,
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
}

/**
 * Deletes a message from the "message_secret" table in the Supabase database based on the provided message key.
 *
 * @param {string} messageKey - The key of the message to be deleted.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the message was successfully deleted, or `false` if there was an error.
 */
export async function deleteMessage(messageKey: string): Promise<boolean> {
  const { error } = await supabase
    .from("message_secret")
    .delete()
    .eq("message_key", messageKey);

  revalidatePath("/[messageKey]", "page");

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}
