import React from "react";

import Input from "../../components/UI/Input";

interface Props {
  keyword: string;
  onSetKeyword: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ keyword, onSetKeyword }) => {
  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Search by keyword"
        value={keyword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onSetKeyword(e.target.value)
        }
      />
    </div>
  );
};

export default SearchBar;
