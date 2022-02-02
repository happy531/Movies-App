import React, { useEffect } from "react";
import Carousel from "../../../components/Carousel/Carousel";

import { useDispatch, useSelector } from "react-redux";
import { fetchSimilar } from "../../../redux/similar-slice";
import { RootState } from "../../../redux/redux-store";

interface Props {
  detail_path: string;
}

const Similar: React.FC<Props> = ({ detail_path }) => {
  const dispatch = useDispatch();
  const { similar } = useSelector((state: RootState) => state.similar);

  useEffect(() => {
    const url = `${detail_path}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
    dispatch(fetchSimilar(url));
  }, [detail_path, dispatch]);

  return (
    <>
      <Carousel header={"Similar"} items={similar} />
    </>
  );
};

export default Similar;
