import { supabase } from "./supabase";

export async function createEvent(data: {
    title: string;
    description: string;
    location: string;
    event_date: string;
}) {
    return await supabase
        .from("events")
        .insert([data]);
}

export async function getEvents() {
    return await supabase
        .from("events")
        .select("*")
        .order("created_at", {
            ascending: false,
        });
}

export async function getEventById(id: string) {
    return await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();
}
