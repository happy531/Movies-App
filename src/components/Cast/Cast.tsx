import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCast } from "../../redux/cast-slice";

import AliceCarousel from "react-alice-carousel";
import Actor from "./Actor";

import { img_300, noPicture } from "../../config/pictures_config";

import "react-alice-carousel/lib/alice-carousel.css";

interface Props {
  detail_path: string;
}

const Cast: React.FC<Props> = ({ detail_path }) => {
  const dispatch = useDispatch();
  //@ts-ignore
  const { cast } = useSelector((state) => state.cast);

  useEffect(() => {
    const url = `${detail_path}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    dispatch(fetchCast(url));
  }, [detail_path, dispatch]);

  const items =
    cast &&
    //@ts-ignore
    cast.map(({ profile_path, name, character }) => (
      <Actor
        profile_path={profile_path ? `${img_300}/${profile_path}` : noPicture}
        name={name}
        character={character}
      />
    ));

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
    1024: {
      items: 6,
    },
  };

  return (
    <AliceCarousel
      responsive={responsive}
      items={items}
      disableButtonsControls
    />
  );
};

export default Cast;
