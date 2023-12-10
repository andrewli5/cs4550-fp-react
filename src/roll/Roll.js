import { Alert, Box, Button, Grid, Snackbar, Typography } from "@mui/material";
import { useEffect } from "react";
import { APP_NAME } from "../constants";
import CatSilhouette from "../assets/cat_face_silhouette.png";
import Dice from "../assets/dice.png";
import { importAll } from "../utils/importAll";
import { useState } from "react";
import * as client from "../client";
import { getCurrentUser } from "../client";
import { BREEDID_TO_CATICON, RARITY_TO_COLOR } from "../constants";
import _ from "lodash";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import NotificationSnackbar from "../reusable/NotificationSnackbar";
import Coin from "../assets/coin_icon.png";

const ROLL_COST = 500;
const IMAGE_SIZE = 400;
export default function Roll({ setCoins }) {
  const [isRolling, setIsRolling] = useState(false);
  const [displayedIcon, setDisplayedIcon] = useState(CatSilhouette);
  const [rollResults, setRollResults] = useState({});
  const [displayResults, setDisplayResults] = useState(false);

  const catIcons = importAll(
    require.context("../assets/catIcons", false, /\.(png|jpe?g|svg)$/)
  );

  const handleRoll = async () => {
    setIsRolling(true);
    const results = await client.rollCatForUser(getCurrentUser().username);
    setRollResults(results);
    // {breed: 'toyg', rarity: 'R', duplicate: false, addedCoins: 0}

    const rolledCatBreedId = results["breed"];
    const rolledCatIcon = BREEDID_TO_CATICON[rolledCatBreedId];
    const rolledCatName = rolledCatIcon.replace(".png", "").replace("_", " ");
    updateCoinAmt(getCurrentUser().coins - ROLL_COST);

    // rolling animation
    const interval = setInterval(() => {
      const iconNames = Object.keys(catIcons);
      const randomIcon =
        iconNames[Math.floor(Math.random() * iconNames.length)];
      setDisplayedIcon(catIcons[randomIcon]);
    }, 100);

    setTimeout(() => {
      setIsRolling(false);
      clearInterval(interval);
      setDisplayedIcon(catIcons[rolledCatIcon]);
      setDisplayResults(true);
      updateCoinAmt(getCurrentUser().coins + results["addedCoins"]);
    }, 2000);
  };

  const updateCoinAmt = (newCoinAmt) => {
    setCoins(newCoinAmt); // display new coin amount
    client.storeCurrentUser({ ...getCurrentUser(), coins: newCoinAmt }); // update user in local storage
  };

  useEffect(() => {
    document.title = "roll | " + APP_NAME;
  }, []);

  function getRollResultsMessage() {
    return (
      <>
        <Typography variant="h4" color={"white"}>
          {rollResults["duplicate"] ? "You rolled:" : "New cat unlocked!"}
        </Typography>
        <Typography variant="h4" color={RARITY_TO_COLOR[rollResults["rarity"]]}>
          {BREEDID_TO_CATICON[rollResults["breed"]]
            .replace(".png", "")
            .replace("_", " ")}
          !{" "}
          <StarRateRoundedIcon
            fontSize="large"
            sx={{ color: RARITY_TO_COLOR[rollResults["rarity"]] }}
          />
        </Typography>
        {rollResults["duplicate"] ? (
          <>
            Received: <img src={Coin} width={20} height={20} />x
            {rollResults["addedCoins"]}{" "}
          </>
        ) : (
          <></>
        )}
      </>
    );
  }

  return (
    <>
      {" "}
      {!_.isEmpty(rollResults) ? (
        <NotificationSnackbar
          open={displayResults}
          setOpen={setDisplayResults}
          severity="success"
          message={getRollResultsMessage()}
        />
      ) : (
        <></>
      )}
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Box
          component="img"
          alt="cat-display"
          src={displayedIcon}
          sx={{
            height: IMAGE_SIZE,
            width: IMAGE_SIZE,
            outline: `5px solid ${
              isRolling || rollResults["breed"] === undefined
                ? "white"
                : RARITY_TO_COLOR[rollResults["rarity"]]
            }`,
            borderRadius: "5px",
          }}
        />
      </Box>
      <Button
        variant="contained"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
        }}
        onClick={handleRoll}
      >
        <img
          src={Dice}
          width={30}
          height={30}
          style={{ marginRight: "10px" }}
        />
        {isRolling ? (
          "Rolling..."
        ) : (
          <>
            Roll for{" "}
            <img
              style={{ marginLeft: "5px" }}
              src={Coin}
              width={20}
              height={20}
            />
            x500
          </>
        )}
      </Button>
    </>
  );
}
