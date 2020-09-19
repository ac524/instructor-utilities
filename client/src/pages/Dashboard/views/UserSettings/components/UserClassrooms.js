import React from "react";

import {
    Box,
    Heading,
    Button
} from "react-bulma-components";

import { useUserRoomsInfoByRole } from "utils/user";
import Icon from "components/Icon";

const UserClassrooms = () => {

    const roomsByRole = useUserRoomsInfoByRole();

    return (
        <Box className="is-shadowless">
            <Heading renderAs="h2" size={4}>Classrooms</Heading>
            {
                roomsByRole.instructor && roomsByRole.instructor.length

                ? (
                    <div className="mt-5">
                        <Heading renderAs="h3" size={6} className="is-primary">Instructor Rooms</Heading>
                        <div className="has-flex-rows is-bordered">
                        {
                            roomsByRole.instructor.map( room => (
                                <p key={room._id} className="is-flex" style={{alignItems:"center"}}>
                                    <span style={{flexGrow:1}} className="px-2">{room.name}</span>
                                    <Button>
                                        <Icon icon="sign-out-alt" />
                                        <span>Leave</span>
                                    </Button>
                                </p>
                            ) )
                        }
                        </div>
                    </div>
                )

                : null
            }
            {
                roomsByRole.ta && roomsByRole.ta.length

                ? (
                    <div className="mt-5">
                        <Heading renderAs="h3" size={6} className="is-primary">TA Rooms</Heading>
                        <div className="has-flex-rows is-bordered">
                        {
                            roomsByRole.ta.map( room => (
                                <p key={room._id} className="is-flex" style={{alignItems:"center"}}>
                                    <span style={{flexGrow:1}} className="px-2">{room.name}</span>
                                    <Button>
                                        <Icon icon="sign-out-alt" />
                                        <span>Leave</span>
                                    </Button>
                                </p>
                            ) )
                        }
                        </div>
                    </div>
                )

                : null
            }
        </Box>
    );

}

export default UserClassrooms;