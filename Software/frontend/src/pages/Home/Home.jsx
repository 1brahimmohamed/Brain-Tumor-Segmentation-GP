import axios from "axios";
import {useEffect, useState} from "react";
import {getAllStudies, parseStudiesMetadata} from "../../helpers/getMetadata";


// MUI
import {Box, Button, Typography} from "@mui/material";

// Components
import StudiesDataTable from "../../components/StudiesDataTable/StudiesDataTable.jsx";

import Logo from "../../components/Logo/Logo";
import {useLoading} from "../../hooks/LoadingProvider.jsx";
import {useNavigate} from "react-router-dom";



const baseUrl = "http://localhost:4000";
const targetUrl = "http://orthanc:8042";
const username = "ibrahim";
const password = "orthanc_ibrahim_pass";
const base64Credentials = btoa(`${username}:${password}`);


const GetStudiesIds = async () => {
    const studiesIdsResponse = await axios.get(`${baseUrl}/proxy/?target=${encodeURIComponent(targetUrl + "/studies")}`, {
        headers: {
            'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/json',
        }
    });

    return studiesIdsResponse.data;
};
const GetStudy = async (studyId) => {
    const studyDataresponse = await axios.get(`${baseUrl}/proxy/?target=${encodeURIComponent(`${targetUrl}/studies/${studyId}`)}`, {
        headers: {
            'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/json',
        }
    });

    return studyDataresponse.data;
};


const Home = () => {

    const [studiesFullData, setStudiesFullData] = useState([]);

    const navigate = useNavigate();

    const {isLoading, setIsLoading} = useLoading();

    useEffect(() => {

        getAllStudies().then((data) => {
            let hima = parseStudiesMetadata(data);
            console.log(hima)
        });
        const fetchStudies = async () => {
            setIsLoading(true);
            let studiesFullDataMirror = [];
            const studiesIds = await GetStudiesIds();

            for (const studyId of studiesIds) {
                const studyData = await GetStudy(studyId);
                studiesFullDataMirror.push(studyData);
            }
            console.log(studiesFullDataMirror)
            setStudiesFullData(studiesFullDataMirror);
            setIsLoading(false);

        };

        fetchStudies();
    }, []);

    const handleDataChange = (event) => {
        let files = [...event.target.files];
        navigate("/viewer", {state: {files}});
    }

    return (
        <div className={"mt-4 space-y-5"}>

            <Box>
                <Typography variant={"h4"}>Studies List</Typography>
            </Box>

            <Box>
                {
                    studiesFullData.length > 0 &&
                    <StudiesDataTable data={studiesFullData}/>
                }
            </Box>

            <Box className={"flex mt-5 h-14 justify-center"}>
                <Logo/>
            </Box>
        </div>
    );
};

export default Home;
