import {useEffect, useState} from "react";
import axios from "axios";


// MUI
import {Box} from "@mui/material";

// Components
import CustomDataTable from "../../components/CustomNativeComponents/CustomDataTable/CustomDataTable";

import Logo from "../../components/Logo/Logo";
import {useLoading} from "../../hooks/LoadingProvider.jsx";



const baseUrl = "http://localhost:4000";
const targetUrl = "http://orthanc:8042";
const username = "ibra";
const password = "ibraeltop";
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

    const {isLoading, setIsLoading} = useLoading();

    useEffect(() => {
        const fetchStudies = async () => {
            setIsLoading(true);
            let studiesFullDataMirror = [];
            const studiesIds = await GetStudiesIds();

            for (const studyId of studiesIds) {
                const studyData = await GetStudy(studyId);
                studiesFullDataMirror.push(studyData);
            }

            setStudiesFullData(studiesFullDataMirror);
            setIsLoading(false);

        };

        fetchStudies();
    }, []);


    return (
        <div className={"mt-4"}>

            <Box>
                {
                    studiesFullData.length > 0 &&
                    <CustomDataTable data={studiesFullData}/>
                }
            </Box>

            <Box className={"flex mt-5 h-14 justify-center"}>
                <Logo/>
            </Box>
        </div>
    );
};

export default Home;
