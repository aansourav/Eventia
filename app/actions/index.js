"use server";

import { revalidatePath } from "next/cache";

const { createUser, findUser, updateEventInterest } = require("@/db/queries");
const { redirect } = require("next/navigation");

async function registerUser(formData) {
    const user = Object.fromEntries(formData);
    const createdUser = await createUser(user);
    redirect("/login");
}

async function loginUser(formData) {
    try {
        const credentials = {};
        credentials.email = formData.get("email");
        credentials.password = formData.get("password");
        const user = await findUser(credentials);
        return user;
    } catch (error) {
        throw new Error("Invalid credentials");
    }
}

async function toggleEventInterested(eventId, authId) {
    try {
        await updateEventInterest(eventId, authId);
    } catch (error) {
        throw error;
    }
    revalidatePath("/");
}

export { loginUser, registerUser, toggleEventInterested };
