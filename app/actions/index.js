"use server";

import EmailTemplate from "@/components/EmailTemplate";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const {
    createUser,
    findUser,
    updateEventInterest,
    updateGoing,
    getEventById,
} = require("@/db/queries");
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

async function addGoingEvent(eventId, user) {
    try {
        await updateGoing(eventId, user.id);
        sendEmail(eventId, user);
    } catch (error) {
        throw error;
    }
    revalidatePath("/");
    redirect("/");
}

async function sendEmail(eventId, user) {
    try {
        const event = await getEventById(eventId);
        const resend = new Resend(process.env.RESEND_API_KEY);
        const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;
        const sent = await resend.emails.send({
            from: "noreply@aansourav.netlify.app",
            to: user?.email,
            subject: "Successfully Registered for the event!",
            react: EmailTemplate({ message }),
        });
    } catch (error) {
        throw error;
    }
}

export { addGoingEvent, loginUser, registerUser, toggleEventInterested };
