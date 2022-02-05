import React, { useEffect, useState } from "react";

import Input from "../../components/UI/Input";

interface Props {
  keyword?: string;
}

const SearchBar: React.FC<Props> = (props) => {
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");
  const enterKey = 13;

  useEffect(() => {
    const enterEvent = (e: any) => {
      e.preventDefault();
      if (e.keyCode === enterKey) {
        console.log(keyword);
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setKeyword(e.target.value)
        }
      />
    </div>
  );
};

export default SearchBar;
