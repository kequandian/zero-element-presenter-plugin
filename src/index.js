import Load from "./utils/Load"; // import { set as APIConfig } from 'zero-element/lib/config/APIConfig';

// import Load from "./utils/Load";
import { set as NamedPresenterSet } from 'zero-element-boot/lib/components/config/NamedPresenterConfig';

// import JarItem from './presenters/JarItem'

NamedPresenterSet({
  'JarItem': Load('presenters/JarItem/index')
});
