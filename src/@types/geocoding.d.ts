type AddressComponentProps = {
  long_name: string;
  short_name: string;
  types: string[];
};

type GeometryProps = {
  location: {
    lat: number;
    lng: number;
  };
};

export type AddressProps = {
  address_components: AddressComponentProps[];
  formatted_address: string;
  geometry: GeometryProps;
  place_id: string;
};
