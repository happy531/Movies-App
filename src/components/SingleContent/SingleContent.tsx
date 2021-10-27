import React from "react";

import {SingleContentModel} from '../../models/single-content-model'

const SingleContent: React.FC<SingleContentModel> = (props) => {
  return <div>{props.title}</div>;
};

export default SingleContent;
