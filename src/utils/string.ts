import { AddressComponentProps } from "../@types";

export function concatAddressTitle(
  address_components: AddressComponentProps[]
): string {
  const title = {
    route: "",
    street_number: "",
    sublocality: "",
  };

  address_components.forEach((value, index) => {
    value.types.includes("route") && (title.route = value.long_name);
    value.types.includes("street_number") &&
      (title.street_number = value.long_name);
    value.types.includes("administrative_area_level_4") ||
      (value.types.includes("sublocality") &&
        (title.sublocality = value.long_name));
  });

  return `${title.route} ${title.street_number} - ${title.sublocality}`;
}

export function concatAddressSubtitle(
  address_components: AddressComponentProps[]
) {
  const subtitle = {
    city: "",
    state: "",
  };

  address_components.forEach((value) => {
    value.types.includes("administrative_area_level_2") &&
      (subtitle.city = value.long_name);
    value.types.includes("administrative_area_level_1") &&
      (subtitle.state = value.short_name);
  });

  return `${subtitle.city} - ${subtitle.state}`;
}
