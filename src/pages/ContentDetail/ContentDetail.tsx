import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { REACT_APP_API_KEY } from "../../config/env";

interface Props {}

const ContentDetail: React.FC<Props> = () => {
  const [details, setDetails] = useState<Array<any>>([]);

  const detail_path = useLocation().pathname;

  useEffect(() => {
    const fetchDetails = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3${detail_path}?api_key=${REACT_APP_API_KEY}&language=en-US`
      );
      setDetails(data);
      console.log(data);
    };
    fetchDetails();
  }, []);

  return <div>{detail_path}</div>;
};

export default ContentDetail;
