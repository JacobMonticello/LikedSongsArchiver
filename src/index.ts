import axios from "axios";
import { getBearerToken } from "./auth";
import { createPlaylist } from "./services/playlistService";

const main = async () => {
    const bearerToken = await getBearerToken();
    createPlaylist(bearerToken)

    console.log(bearerToken);
};

main();
