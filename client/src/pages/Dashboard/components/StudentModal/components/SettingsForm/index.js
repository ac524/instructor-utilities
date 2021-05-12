import {
    Button
} from "react-bulma-components";

import { getDashboardAction as gda, useDashboardDispatch } from "pages/Dashboard/store";
import { ADD_STUDENT, ADD_STUDENTS, UPDATE_STUDENT } from "pages/Dashboard/store/actionsNames";
import Form from "components/Form";
import api from "utils/api";
import { useSocket } from "utils/socket.io";

import { validateStudentData, useStudentSettingsFormFields } from "./utils";

export const SettingsForm = ({ roomId, student, afterSubmit, isBulkCreate }) => {

    const dispatch = useDashboardDispatch();
    const fields = useStudentSettingsFormFields( student, isBulkCreate );
    const { _id } = student;
    const socket = useSocket();

    const handleSubmit = async (data, setErrors) => {

        try {

            if( _id ) {

                const dispatchData = gda( UPDATE_STUDENT, { _id, ...data } );

                dispatch(dispatchData);

                await api.updateStudent( _id, data );

                socket.emit( `${roomId}:dispatch`, dispatchData );

            } else {

                if( isBulkCreate ) {

                    const students = data.name.split(/,|\n/).map( name => name.trim() ).filter( name => Boolean(name) ).map( name => ({
                        ...data,
                        name
                    }) );
                    
                    const dispatchData = gda( ADD_STUDENTS, (await api.createStudent( { students, roomId } )).data );
                    dispatch(dispatchData);
                    socket.emit( `${roomId}:dispatch`, dispatchData );

                } else {

                    const dispatchData = gda( ADD_STUDENT, (await api.createStudent( { ...data, roomId } )).data );
                    dispatch(dispatchData);
                    socket.emit( `${roomId}:dispatch`, dispatchData );

                }

            }

            if(afterSubmit) afterSubmit();

        } catch(err) {

            if( err.response ) setErrors( err.response.data );

        }

    }

    const button = <Button color="primary" className="is-light has-shadow-light">{(_id ? "Save" : "Create") + " Student"}</Button>;

    return <Form
            fields={fields}
            fieldValueSource={student._id}
            validation={validateStudentData}
            onSubmit={handleSubmit}
            button={button}
            />;

};