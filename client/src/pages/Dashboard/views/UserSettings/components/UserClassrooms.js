import { useState } from "react";
import {
    Box,
    Heading,
    Button
} from "react-bulma-components";

import { useUserRoomsInfoByRole } from "utils/user";
import Icon from "components/Icon";
import Dropdown from "components/Dropdown";
import api from "utils/api";
import { useStoreDispatch, getStoreAction as gsa } from "store";
import { REMOVE_USER_ROOM_ID } from "store/actions";
import {
	useClassroomModal,
	ClassroomModalButton
} from "./ClassroomModal/ClassroomModal.js";
import { useUpdateRoomKey } from "components/Modal/utils.js";

const InstructorRoomsList = ( { rooms, roomId, ...props } ) => {

    const dispatch = useStoreDispatch();

    if( !rooms.length ) return;

    const handleArchiveRoom = async roomId => {

        try {

            await api.userArchiveRoom( roomId );
            dispatch(gsa( REMOVE_USER_ROOM_ID, roomId ));

        } catch(err) {

            console.log(err);

        }

    }

    return (
      <div {...props}>
        <Heading renderAs="h3" size={6} className="is-primary is-flex is-justify-content-space-between">
          Instructor Rooms
        </Heading>

        <div className="has-flex-rows is-bordered">
          {
            rooms.map((room) => (
              <div key={room._id} className="is-flex p-2" style={{ alignItems: "center" }}>
                <span>{room.name}</span>
                <Dropdown label={<Icon icon="ellipsis-h" />} labelClassName="is-small" className="ml-auto is-right">
                  {
                    roomId && (
                      <ClassroomModalButton size="small" className="dropdown-item" roomId={room._id}>
                        <Icon icon="cog" />
                        <span>Manage</span>
                      </ClassroomModalButton>
                    )
                  }
                  <Button size="small" className="dropdown-item" onClick={() => handleArchiveRoom(room._id)}>
                    <Icon icon="archive" />
                    <span>Archive</span>
                  </Button>
                </Dropdown>
              </div>
            ) )
          }
        </div>
      </div>
    );

}

const TaRoomsList = ( { rooms, ...props } ) => {

    const dispatch = useStoreDispatch();

    const handleLeaveRoom = async roomId => {

        try {

            await api.userLeaveRoom( roomId );
            dispatch(gsa( REMOVE_USER_ROOM_ID, roomId ));

        } catch(err) {

            console.log(err);

        }

    }

    return (
        <div  {...props}>
            <Heading renderAs="h3" size={6} className="is-primary">TA Rooms</Heading>
            <div className="has-flex-rows is-bordered">
            {
                rooms.map( room => (
                    <div key={room._id} className="is-flex p-2" style={{alignItems:"center"}}>
                        <span>{room.name}</span>
                        <Dropdown label={<Icon icon="ellipsis-h" />} labelClassName="is-small" className="ml-auto is-right">
                            <Button size="small" className="dropdown-item" onClick={()=>handleLeaveRoom(room._id)}>
                                <Icon icon="sign-out-alt" />
                                <span>Leave</span>
                            </Button>
                        </Dropdown>
                    </div>
                ) )
            }
            </div>
        </div>
    );

}

const UserClassrooms = () => {

    const roomsByRole = useUserRoomsInfoByRole();

    const updateRoomKey = useUpdateRoomKey(false);

    useClassroomModal({
      roomId: false,
      onClose: () => updateRoomKey()
	  });

    return (
		<Box className="is-shadowless">
			<Heading
				renderAs="h2"
				size={4}
				className="is-flex is-justify-content-space-between">
				<span>Classrooms</span>
				<ClassroomModalButton
					size="small"
					className="is-primary button is-small"
					roomId={null}>
					<Icon icon="plus-circle" />
					<span>Create Classroom</span>
				</ClassroomModalButton>
			</Heading>
			{roomsByRole.instructor && (
				<InstructorRoomsList
					className="mt-5"
					rooms={roomsByRole.instructor}
					roomId={"Edit Room"}
				/>
			)}
			{roomsByRole.ta && (
				<TaRoomsList className="mt-5" rooms={roomsByRole.ta} />
			)}
		</Box>
	);

}

export default UserClassrooms;