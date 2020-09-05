import { library } from '@fortawesome/fontawesome-svg-core';

import {
    faHome,
    faUsers,
    faUserGraduate,
    faPlusCircle,
    faPenSquare,
    faMinusSquare,
    faEllipsisH,
    faDownload,
    faUpload,
    faCheck
} from '@fortawesome/free-solid-svg-icons';

import {
    faArrowAltCircleLeft,
    faTrashAlt
} from '@fortawesome/free-regular-svg-icons';

export default () => library.add(
    faHome,
    faArrowAltCircleLeft,
    faUsers,
    faUserGraduate,
    faPlusCircle,
    faPenSquare,
    faMinusSquare,
    faEllipsisH,
    faTrashAlt,
    faDownload,
    faUpload,
    faCheck
);