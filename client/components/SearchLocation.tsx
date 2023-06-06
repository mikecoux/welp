'use client'

import usePlacesAutoComplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
	ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function SearchLocation({ register, name, setSelected }) {
    const {
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions
    } = usePlacesAutoComplete();

    const handleSelect = async (address:string) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0])
        setSelected({ lat, lng })
    } 

    return (
        <Combobox onSelect={handleSelect} {...register(name)}>
            <ComboboxInput value={value} onChange={(e)=> setValue(e.target.value)} disabled={!ready}
            className="" placeholder=" city, zip code, ..."/>
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                        <ComboboxOption key={place_id} value={description} />
                    ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    )
}

