import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';

const EllipsisText = ({ text, maxLines, ellipsis }) => {
  return (
    <LinesEllipsis
      text={text}
      maxLine={maxLines}
      ellipsis={ellipsis}
      trimRight
    />
  );
};

export default EllipsisText;
