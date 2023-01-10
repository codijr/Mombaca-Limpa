import React from "react";
import {
  FocusView,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SearchView,
} from "./styles";

export function SearchBar() {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <>
      {isFocused && <FocusView />}
      <SearchContainer>
        <SearchView>
          <SearchInput
            placeholder="Buscar por endereço"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <SearchIcon />
        </SearchView>
      </SearchContainer>
    </>
  );
}
