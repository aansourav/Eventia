import getCoordinates from "@/utils/get-coordinates";

const EventVenue = async ({ location }) => {
    let mapLocation = await getCoordinates(location);

    return (
        <div className="overflow-hidden rounded-lg col-span-2 bg-[#242526]">
            <div className="w-full">
                <iframe
                    src={mapLocation && mapLocation}
                    width="600"
                    height="450"
                    style={{ border: "0" }}
                    allowFullscreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className="p-4">
                <p className="text-[#9C9C9C] text-base mt-1">{location}</p>
            </div>
        </div>
    );
};

export default EventVenue;
