import React from 'react';
import loadable from '@loadable/component';
import Loading from 'zero-element-boot/lib/components/loading'


export default (path) => {
  return loadable(() => import(`../${path}`), {
    fallback: null
  });;
}