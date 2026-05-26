import { supabase } from "./supabase";

export async function createTask(data: {
    title: string;
    description: string;
    volunteer_id: string;
}) {
    return await supabase
        .from("tasks")
        .insert([data]);
}

export async function getTasks() {
    return await supabase
        .from("tasks")
        .select("*");
}