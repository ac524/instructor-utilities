import { library } from '@fortawesome/fontawesome-svg-core';

import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const loadGlobalIcons = () => library.add( faArrowAltCircleLeft, faArrowAltCircleRight, faAngleDown, faGithub );

export default loadGlobalIcons ;