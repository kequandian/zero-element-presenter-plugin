import React from 'react';
import loadable from '@loadable/component';
export default (path => {
  return loadable(() => import(`../${path}`), {
    fallback: /*#__PURE__*/React.createElement("div", null, "loading")
  });
  ;
});