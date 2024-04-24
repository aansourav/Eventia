export default async function getCoordinates(locationName) {
    const encodedLocation = encodeURIComponent(locationName);
    const apiKey = "63e16c0dcae648d2b40330b1c71b5ed3";

    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodedLocation}&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const lat = data.results[0].geometry.lat;
        const lon = data.results[0].geometry.lng;

        const mapsUrl = `https://www.google.com/maps/embed?&zoom=12&center=${lat},${lon}`;

        return mapsUrl;
    } catch (error) {
        console.error("Error fetching geocoding data:", error);
        return null;
    }
}
