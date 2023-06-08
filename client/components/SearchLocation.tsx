'use client'

import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

type Suggestion = google.maps.places.AutocompletePrediction;

export default function SearchLocation(
    { onChange }: { onChange:any }
) {
    const {
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions
    } = usePlacesAutocomplete({
        // filters the results generated by Places API
        // 'geocode' instructs the service to only return geocoding results, rather than business results
        // alternatively, try '(regions)'
        requestOptions: {
            types: ['geocode']
        }
    });

    const handleSelect = ({ description }: Suggestion) =>
        () => {
            // When user selects a place, we can replace the keyword without request data from API
            // by setting the second parameter to "false"
            setValue(description, false);
            clearSuggestions();

            // Get latitude and longitude via utility functions
            getGeocode({ address: description }).then((results) => {
                const { lat, lng } = getLatLng(results[0]);
                onChange(lat + "," + lng);
            });
        };

    const renderSuggestions = (): any => 
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li 
                    key={place_id} 
                    onClick={handleSelect(suggestion)}
                    className="cursor-pointer hover:bg-neutral-200 m-1 rounded"
                >
                    <strong>{main_text}  </strong> 
                    <small>{secondary_text}</small>
                </li>
            );
        });

    return (
        <div className="inline-block">
            <input
                value={value}
                onChange={(e)=> {
                    setValue(e.target.value)
                }}
                disabled={!ready}
                className="rounded outline-none"
                type="text"
                placeholder="city, zip code, neighborhood..."
            />
            {status === "OK" && (
                <ul className="absolute space-y-2 mt-1 -ml-2 w-48 bg-white shadow-md z-40 rounded p-2">
                    {renderSuggestions()}
                </ul>
            )}
        </div>
    )
}
