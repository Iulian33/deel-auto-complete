import React, { useState, useEffect, useRef } from "react";
import {
  Highlight,
  InputElement,
  SpinnerWrapper,
  SuggestionItem,
  SuggestionsWrapper,
} from "./styled.ts";
import { useDebounce } from "../../hooks/useDebounce.ts";
import { LoadingSpinner } from "../LoadingSpinner";

interface AutoCompleteInputProps {
  placeholder?: string;
  debounceTime?: number;
  searchRequestData: () => Promise<string[]>;
}

export const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  placeholder = "Search...",
  debounceTime = 400,
  searchRequestData,
}) => {
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSearchValue = useDebounce(searchValue, debounceTime);

  useEffect(() => {
    searchRequestData().then((data) => {
      setFetchedData(data);
    });
  }, [searchRequestData]);

  useEffect(() => {
    setLoading(true);
  }, [searchValue]);

  useEffect(() => {
    if (searchValue.length > 0) {
      const filteredSuggestions = fetchedData.filter((item) =>
        item.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
    setLoading(false);
  }, [debouncedSearchValue, fetchedData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setSelectedSuggestionIndex(-1);
    setIsSuggestionSelected(false);
  };

  const handleSuggestionSelected = (suggestion: string) => {
    setSearchValue(suggestion);
    setIsSuggestionSelected(true);
  };

  const highlightSuggestion = (suggestion: string) => {
    const regexValue = new RegExp(`(${searchValue})`, "gi");

    return suggestion
      .split(regexValue)
      .map((part, idx) =>
        regexValue.test(part) ? <Highlight key={idx}>{part}</Highlight> : part,
      );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (selectedSuggestionIndex > 0) {
        setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (selectedSuggestionIndex < suggestions.length - 1) {
        setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
      }
    } else if (event.key === "Enter") {
      if (selectedSuggestionIndex !== -1) {
        handleSuggestionSelected(suggestions[selectedSuggestionIndex]);
      }
    }
  };

  return (
    <>
      <InputElement
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        ref={inputRef}
      />
      {!isSuggestionSelected && suggestions.length > 0 && (
        <SuggestionsWrapper>
          {loading ? (
            <SpinnerWrapper>
              <LoadingSpinner />
            </SpinnerWrapper>
          ) : (
            suggestions.map((suggestion, idx) => (
              <SuggestionItem
                key={idx}
                onClick={() => handleSuggestionSelected(suggestion)}
                className={selectedSuggestionIndex === idx ? "selected" : ""}
              >
                {highlightSuggestion(suggestion)}
              </SuggestionItem>
            ))
          )}
        </SuggestionsWrapper>
      )}
    </>
  );
};
