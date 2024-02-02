import axios from "axios";
import {useEffect, useState} from "react";
import {getAllStudies, parseStudiesMetadata} from "../../helpers/getMetadata";


// MUI
import {Box, Button, Typography} from "@mui/material";

// Components
import StudiesDataTable from "../../components/StudiesDataTable/StudiesDataTable.jsx";

import Logo from "../../components/Logo/Logo";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeDisplayedDataTable, setIsDataLoading} from "../../redux/reducers/homepageReducer.js"



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

    const dispatch = useDispatch();
    const {
        isDisplayingDicom,
    } = useSelector((store) => store.homepage)

    useEffect(() => {

        getAllStudies().then((data) => {
            let hima = parseStudiesMetadata(data);
        });
        const fetchStudies = async () => {
            dispatch(setIsDataLoading(true))

            let studiesFullDataMirror = [];
            const studiesIds = await GetStudiesIds();

            for (const studyId of studiesIds) {
                const studyData = await GetStudy(studyId);
                studiesFullDataMirror.push(studyData);
            }

            const concat = [...studiesFullDataMirror];

            setStudiesFullData(concat);
            dispatch(setIsDataLoading(false))
        };

        fetchStudies();
    }, []);


    const tabChangeHandler = () => {
        dispatch(changeDisplayedDataTable())
    }

    return (
        <Box className={"h-screen flex-col mt-4 space-y-5"}>

            <Box className={"flex items-center space-x-2 h-1/12"}>
                <Typography variant={"h4"}>Studies List</Typography>

                <Button variant={isDisplayingDicom? "contained": "outlined"} color={"secondary"} onClick={tabChangeHandler}>
                    DICOM
                </Button>
                <Button variant={isDisplayingDicom? "outlined" :"contained"} color={"secondary"} onClick={tabChangeHandler}>
                    NIFTI
                </Button>

            </Box>

            <Box className={"h-3/4"}>
                {
                   isDisplayingDicom? (
                       studiesFullData.length > 0 &&
                       <StudiesDataTable data={studiesFullData}/>
                   ):(
                       <Typography>
                           NIFTI TABLE
                       </Typography>
                   )
                }
            </Box>

            <Box className={"h-1/12 mt-5"}>
                   <Box className={"flex h-12 justify-center"}>
                       <Logo/>
                   </Box>
            </Box>
        </Box>
    );
};

export default Home;
