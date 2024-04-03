import styled from "styled-components";

export const InputElement = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  background-color: #444;
  color: #fff;

  &::placeholder {
    color: #bbb;
  }
`;

export const SuggestionsWrapper = styled.ul`
  list-style-type: none;
  background-color: #444;
  border-radius: 4px;
  padding: 0;
  margin: 0;
`;

export const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;
  color: #fff;

  &:hover {
    background-color: #555;
  }

  &.selected {
    background-color: #686767;
  }
`;

export const Highlight = styled.strong`
  font-weight: bold;
`;

export const SpinnerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`;
