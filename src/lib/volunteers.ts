import { supabase } from "./supabase";

export async function createVolunteer(data: {
    name: string;
    email: string;
    skills: string[];
}) {
    return await supabase
        .from("volunteers")
        .insert([data]);
}

export async function getVolunteers() {
    return await supabase
        .from("volunteers")
        .select("*")
        .order("points", {
            ascending: false,
        });
}

export async function getVolunteerById(id: string) {
    return await supabase
        .from("volunteers")
        .select("*")
        .eq("id", id)
        .single();
}
