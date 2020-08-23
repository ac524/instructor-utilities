import React, { useState, useEffect } from "react";
import MainWithLogin from "../../layouts/MainWithLogin";
import githubApi from "../../utils/githubApi";


function Developers() {

    // const [ lead, setLead ] = useState({});
    // const [ contributors, setContributors ] = useState([]);

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {

        const contributorsRes = await githubApi.getRepoContributors( "ac524", "instructor-utilities" );

        console.log( contributorsRes.data );

    };

    return (
        <MainWithLogin>
            Test
        </MainWithLogin>
    )
}

export default Developers;