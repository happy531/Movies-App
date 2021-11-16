import React from "react";
import AliceCarousel from "react-alice-carousel";
import Actor from "./Actor";

import { img_300, noPicture } from "../../config/pictures_config";

import "react-alice-carousel/lib/alice-carousel.css";

interface Props {
  cast: Array<any>;
}

const Cast: React.FC<Props> = ({ cast }) => {
  const items = cast && cast.map((c) => (
    <Actor
      profile_path={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
      name={c.name}
      character={c.character}
    />
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  return <AliceCarousel responsive={responsive} items={items} />;
};

export default Cast;
