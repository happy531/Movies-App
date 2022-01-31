import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCast } from "../../../redux/cast-slice";

import Actor from "./Actor";
import ActorModel from "../../../models/actor-model";
import Slider from "react-slick";
import { slider_settings } from "../../../config/slider-config";

import { img_300, noPicture } from "../../../config/pictures_config";

import { RootState } from "../../../redux/redux-store";

interface Props {
  detail_path: string;
}

const Cast: React.FC<Props> = ({ detail_path }) => {
  const dispatch = useDispatch();
  const { cast } = useSelector((state: RootState) => state.cast);

  useEffect(() => {
    const url = `${detail_path}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    dispatch(fetchCast(url));
  }, [detail_path, dispatch]);

  const items =
    cast &&
    cast.map(({ id, profile_path, name, character }: ActorModel) => (
      <Actor
        key={id}
        profile_path={profile_path ? `${img_300}/${profile_path}` : noPicture}
        name={name}
        character={character}
      />
    ));

  return (
    <>
      <h1 style={{ fontSize: "18px", marginLeft: "7px" }}>Cast</h1>
      <Slider {...slider_settings} infinite={false}>
        {items}
      </Slider>
    </>
  );
};

export default Cast;
