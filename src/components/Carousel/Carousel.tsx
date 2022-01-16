import React from "react";
import Slider from "react-slick";
import { slider_settings } from "../../config/slider-config";
import SingleContent from "../SingleContent/SingleContent";
import SingleContentModel from "../../models/single-content-model";

interface Props {
  header: string;
  items: Array<SingleContentModel>;
}

const Carousel: React.FC<Props> = ({ header, items }) => {
  return (
    <>
      <h1 style={{ fontSize: "18px", marginLeft: "7px" }}>{header}</h1>
      <Slider {...slider_settings}>
        {items &&
          items.map(
            (singleContent: any) =>
              singleContent.id && (
                <SingleContent
                  key={singleContent.id}
                  id={singleContent.id}
                  title={singleContent.title || singleContent.name}
                  poster_path={singleContent.poster_path}
                  vote={singleContent.vote_average}
                  media_type={singleContent.media_type}
                />
              )
          )}
      </Slider>
    </>
  );
};

export default Carousel;
