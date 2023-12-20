import {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {Box} from "@mui/material";
import Image from "../CustomNativeComponents/Image/Image.jsx";

const SeriesCard = ({ seriesData, seriesIndex ,selectedIndex, key, onSelectedSeriesChange }) => {

    const theme = useTheme();
    const [seriesImage, setSeriesImage] = useState(null);

    useEffect(() => {
        seriesData.seriesThumbnail.then((imageBlob) => {
            let imageUrl = URL.createObjectURL(imageBlob);
            setSeriesImage(imageUrl);
        });
    }, [seriesData]);

    return (
        <Box
            className="flex-col p-2"
            sx={{ backgroundColor: theme.palette.primary.light}}>

            <Box className={"flex justify-between items-center mb-1"}>

                <Box className={"flex items-center w-11/12 "}>

                    <Box className={"text-lg font-bold text-AAprimary w-2/12"}>
                        {seriesData.modality}
                    </Box>
                    <Box className={"text-sm w-10/12 whitespace-nowrap truncate"}>
                        {seriesData.seriesDescription}
                    </Box>
                </Box>

                <Box className={"w-1/12"}>
                    {seriesData.numberOfInstances}
                </Box>

            </Box>

            <Box>
                {
                    seriesImage &&
                    <Image
                        width={100}
                        height={100}
                        className={`border cursor-pointer ${selectedIndex === seriesIndex ? "border-AAprimary": "" }`}
                        src={seriesImage}
                        alt="Series Image"
                        onClick={() => {
                            onSelectedSeriesChange(seriesIndex);
                        }}
                    />
                }
            </Box>
        </Box>
    );
};

export default SeriesCard;
