import { eventModel } from "@/models/event-models";
import { userModel } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";
import {
    replaceMongoIdInArray,
    replaceMongoIdInObject,
} from "@/utils/data-util";
import mongoose from "mongoose";

async function getAllEvents(search) {
    await dbConnect();
    let allEvents = [];
    if (search) {
        const regex = new RegExp(search, "i");
        allEvents = await eventModel
            .find({
                $or: [{ name: regex }, { details: regex }, { location: regex }],
            })
            .lean();
    } else {
        allEvents = await eventModel.find().lean();
    }
    return replaceMongoIdInArray(allEvents);
}
async function getEventById(id) {
    await dbConnect();
    const event = await eventModel.findById(id).lean();
    return replaceMongoIdInObject(event);
}

async function createUser(user) {
    await dbConnect();
    return await userModel.create(user);
}

async function findUser(credentials) {
    await dbConnect();
    const user = await userModel.findOne(credentials).lean();
    if (user) {
        return replaceMongoIdInObject(user);
    }
    return null;
}

async function updateEventInterest(eventId, authId) {
    await dbConnect();
    const event = await eventModel.findById(eventId);
    if (event) {
        const interestedUsers = event.interested_ids.find(
            (id) => id.toString() === authId
        );
        if (interestedUsers) {
            event.interested_ids.pull(new mongoose.Types.ObjectId(authId));
        } else {
            event.interested_ids.push(new mongoose.Types.ObjectId(authId));
        }
        await event.save();
    }
}

async function updateGoing(eventId, authId) {
    await dbConnect();
    const event = await eventModel.findById(eventId);
    event.going_ids.push(new mongoose.Types.ObjectId(authId));
    await event.save();
}

export {
    createUser,
    findUser,
    getAllEvents,
    getEventById,
    updateEventInterest,
    updateGoing,
};
