import io from "socket.io-client";

// const ENDPOINT = "https://spaceshoot-server.herokuapp.com";
const ENDPOINT = "http://localhost:5000";
const socket = io(ENDPOINT, { forceNew: true });

export default socket;


