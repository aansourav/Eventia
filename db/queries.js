import { eventModel } from "@/models/event-models";
import {
    replaceMongoIdInArray,
    replaceMongoIdInObject,
} from "@/utils/data-util";

async function getAllEvents() {
    const allEvents = await eventModel.find().lean();
    return replaceMongoIdInArray(allEvents);
}
async function getEventById(id) {
    const event = await eventModel.findById(id).lean();
    return replaceMongoIdInObject(event);
}

export { getAllEvents, getEventById };
