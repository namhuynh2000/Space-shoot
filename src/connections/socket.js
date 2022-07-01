import io from "socket.io-client";

const ENDPOINT = "https://spaceshoot-server.herokuapp.com";
const socket = io(ENDPOINT, { forceNew: true });

export default socket;
