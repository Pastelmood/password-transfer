"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function save(messageKey: string, messageSecret: string) {
  const { data, error } = await supabase
    .from("message_secret")
    .insert([{ message_key: messageKey, message_secret_key: messageSecret }])
    .select();

    if (data) {
        return true;
    } else {
        console.log(error);
        return false;
    }
}
