import React, {useEffect, useState} from "react";
import AliceCarousel from "react-alice-carousel";
import Actor from "./Actor";

import {img_300, noPicture} from "../../config/pictures_config";

import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";

interface Props {
  detail_path: string;
}

const Cast: React.FC<Props> = ({ detail_path }) => {
  const [cast, setCast] = useState<Array<any>>([]);
  useEffect(() => {
    const fetchCast = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3${detail_path}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setCast(data.cast);
    };
    fetchCast();
  }, [detail_path]);

  const items =
    cast &&
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
