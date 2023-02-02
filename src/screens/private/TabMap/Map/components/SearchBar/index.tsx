import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  AddressButton,
  AddressContainer,
  AddressDescription,
  AddressTitle,
  ButtonReturn,
  Divider,
  FocusView,
  LogoIcon,
  ReturnIcon,
  SearchContainer,
  SearchInput,
  SearchView,
  WrapperSearchIcon,
} from "./styles";
import { AddressComponentProps, AddressProps } from "../../../../../../@types";
import { searchAddress } from "../../../../../../services";
import { RootState } from "../../../../../../redux/createStore";
import { setAddress } from "../../../../../../redux/modules/geocoding/reducer";

export function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<AddressProps[]>([]);
  const [loading, setLoading] = useState(false);
  const addressSelected = useSelector((state: RootState) => state.geocoding);
  const dispatch = useDispatch();

  const handleSearchAddress = useCallback(async (address: string) => {
    setSearch(address);

    setTimeout(async () => {
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
    }, 1000);
  }, []);

  const handleConcatTitle = useCallback(
    (address_components: AddressComponentProps[]) => {
      const title = {
        route: "",
        street_number: "S/N",
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

      return `${title.route}, ${title.street_number} - ${title.sublocality}`;
    },
    []
  );

  const handleConcatDescription = useCallback(
    (address_components: AddressComponentProps[]) => {
      const description = {
        city: "",
        state: "",
      };

      address_components.forEach((value) => {
        value.types.includes("administrative_area_level_2") &&
          (description.city = value.long_name);
        value.types.includes("administrative_area_level_1") &&
          (description.state = value.short_name);
      });

      return `${description.city} - ${description.state}`;
    },
    []
  );

  const handleSelectAddress = useCallback(
    (item: AddressProps) => {
      const { address_components, formatted_address, geometry, place_id } =
        item;

      dispatch(
        setAddress({
          address_components,
          formatted_address,
          geometry,
          place_id,
        })
      );
      setIsFocused(false);
    },
    [dispatch]
  );

  useEffect(() => {
    console.log(addressSelected.place_id);
  }, [addressSelected]);

  return (
    <>
      {isFocused && <FocusView />}
      <SearchContainer>
        <SearchView>
          <WrapperSearchIcon>
            {isFocused ? (
              <ButtonReturn
                onPress={() => {
                  setIsFocused(false);
                  Keyboard.dismiss();
                }}
              >
                <ReturnIcon />
              </ButtonReturn>
            ) : (
              <LogoIcon />
            )}
          </WrapperSearchIcon>
          <SearchInput
            placeholder="Buscar por endereço"
            onChangeText={(text) => handleSearchAddress(text)}
            onFocus={() => setIsFocused(true)}
            blurOnSubmit={false}
            onSubmitEditing={() => handleSearchAddress(search)}
          />
        </SearchView>
        <AddressContainer
          style={{
            display: isFocused ? "flex" : "none",
          }}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <FlatList
              data={searchResult}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item, index }) => (
                <>
                  <AddressButton onPress={() => handleSelectAddress(item)}>
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
          )}
        </AddressContainer>
      </SearchContainer>
    </>
  );
}
