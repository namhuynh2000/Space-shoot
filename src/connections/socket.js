import io from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_BACK_END_URL || "http://localhost:5000";
const socket = io(ENDPOINT, { forceNew: true });

export default socket;
