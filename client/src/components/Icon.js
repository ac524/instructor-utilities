
import {
    Icon as BulmaIcon
} from "react-bulma-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ icon, ...props }) => {
    return <BulmaIcon {...props}><FontAwesomeIcon icon={icon} /></BulmaIcon>
}

export default Icon;