import { library } from '@fortawesome/fontawesome-svg-core';

import {
    faAngleDown,
    faPaperPlane,
    faCheck,
    faBan
} from '@fortawesome/free-solid-svg-icons';

import {
    faArrowAltCircleLeft,
    faArrowAltCircleRight
} from '@fortawesome/free-regular-svg-icons';

import {
    faGithub
} from '@fortawesome/free-brands-svg-icons';

const loadGlobalIcons = () => library.add(
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
    faAngleDown,
    faPaperPlane,
    faGithub,
    faCheck,
    faBan
);

export default loadGlobalIcons ;