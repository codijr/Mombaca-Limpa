import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import {
  AddressButton,
  AddressContainer,
  AddressDescription,
  AddressTitle,
  Divider,
  FocusView,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SearchView,
  WrapperSearchIcon,
} from "./styles";
import { AddressComponentProps, AddressProps } from "../../../../../../@types";
import { searchAddress } from "../../../../../../services";

export function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<AddressProps[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearchAddress = useCallback(async (address: string) => {
    setLoading(true);

    await searchAddress(address)
      .then((res) => {
        const { results } = res;
        const notFoundResult: AddressProps[] = [
          {
            ...results[0],
            place_id: "0",
          },
        ];

        return results
          ? setSearchResult(results)
          : setSearchResult(notFoundResult);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleConcatTitle = useCallback(
    (address_components: AddressComponentProps[]) => {
      return address_components.map((value, index) => {
        const title: string[] = [];

        value.types.includes("route") && title.push(value.long_name);
        value.types.includes("street_number") && title.push(value.long_name);
        value.types.includes("sublocality_level_1") &&
          title.push(value.long_name);

        return `${title[0]}, ${title[1]} - ${title[2]}`;
      });
    },
    []
  );

  const handleConcatDescription = useCallback(
    (address_components: AddressComponentProps[]) => {
      return address_components.map((value) => {
        const description: string[] = [];

        value.types.includes("administrative_area_level_2") &&
          description.push(value.long_name);
        value.types.includes("administrative_area_level_1") &&
          description.push(value.long_name);
        value.types.includes("postal_code") &&
          description.push(value.long_name);

        return `${description[0]} - ${description[1]}, ${description[2]}`;
      });
    },
    []
  );

  return (
    <>
      {isFocused && <FocusView />}
      <SearchContainer>
        <SearchView>
          <SearchInput
            placeholder="Buscar por endereço"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={(text) => setSearch(text)}
            blurOnSubmit={false}
            onSubmitEditing={() => handleSearchAddress(search)}
          />
          <WrapperSearchIcon>
            {loading ? <ActivityIndicator color="#1BB471" /> : <SearchIcon />}
          </WrapperSearchIcon>
        </SearchView>
        <AddressContainer
          style={{
            display: isFocused ? "flex" : "none",
          }}
        >
          <FlatList
            data={searchResult}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item, index }) => (
              <>
                <AddressButton>
                  <AddressTitle>
                    {handleConcatTitle(item.address_components)}
                  </AddressTitle>
                  <AddressDescription>
                    {handleConcatDescription(item.address_components)}
                  </AddressDescription>
                </AddressButton>
                {index !== searchResult.length - 1 && <Divider />}
              </>
            )}
          />
        </AddressContainer>
      </SearchContainer>
    </>
  );
}
