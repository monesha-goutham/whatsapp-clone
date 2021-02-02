import "./ChatRoom.css";
import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
	AttachFile,
	InsertEmoticon,
	Mic,
	SearchOutlined,
} from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import firebase from "firebase";

function ChatRoom() {
	const [seed, setSeed] = useState("");

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);

	// import the "user" state from the datalayer
	const [{ user }, dispatch] = useStateValue();
	// create a state for carrying input messages
	const [input, setInput] = useState("");

	// sending the user's message to the DB
	const sendMessage = (e) => {
		// preventDefault prevents the page from reloading
		e.preventDefault();
		db.collection("rooms").doc(roomId).collection("messages").add({
			message: input,
			name: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		console.log(input);
		// after input is stored in DB, we need to clear the input
		setInput("");
	};

	const [roomName, setRoomName] = useState();

	// state for the array of messages
	const [messages, setMessages] = useState([]);

	const { roomId } = useParams();
	// for any change in the roomID, we update the Room's name which is attached to that Id in the DB
	useEffect(() => {
		if (roomId) {
			db.collection("rooms")
				.doc(roomId)
				.onSnapshot((snapshot) => setRoomName(snapshot.data().name));

			db.collection("rooms")
				.doc(roomId)
				.collection("messages")
				.orderBy("timestamp", "asc")
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [roomId]);

	return (
		<div className="chatroom">
			<div className="chatroom__header">
				<Avatar
					src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`}
					alt="avatar"
				/>
				<div className="chatroom__header-info">
					<h3>{roomName}</h3>
					<p>
						{/* setting the last seen at time */}
						Last seen at :{" "}
						{new Date(
							messages[messages.length - 1]?.timestamp?.toDate()
						).toUTCString()}
					</p>
				</div>
				<div className="chatroom__header-right">
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className="chatroom__body">
				{messages.map((message) => {
					return (
						<div>
							<p
								className={`chatroom__message ${
									user.displayName === message.name && "chatroom__usermsg"
								}`}
							>
								<span className="chatroom__user-name">{message.name}</span>
								{message.message}
								<span className="chatroom__timestamp">
									{new Date(message.timestamp?.toDate()).toUTCString()}
								</span>
							</p>
						</div>
					);
				})}
			</div>
			<div className="chatroom__footer">
				<IconButton>
					<InsertEmoticon />
				</IconButton>
				{/* <IconButton>
					<AttachFile />
				</IconButton> */}

				<form action="">
					<input
						value={input}
						type="text"
						placeholder="type something here..."
						onChange={(e) => setInput(e.target.value)}
					/>
					<button onClick={sendMessage}>submit</button>
				</form>
				<IconButton>
					<Mic />
				</IconButton>
			</div>
		</div>
	);
}

export default ChatRoom;
