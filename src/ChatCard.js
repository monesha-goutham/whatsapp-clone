import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ChatCard.css";
import db from "./firebase";

function ChatCard({ addChat, id, name }) {
	// generating random seed for avatars
	const [seed, setSeed] = useState("");

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);

	const addChatRoom = () => {
		const roomName = prompt("Enter the room's name : ");

		if (roomName) {
			// do database stuff
			db.collection("rooms").add({
				name: roomName,
			});
		}
	};

	// fetching last message from the db and getting the last message to be shown on the chatcard
	const [messages, setMessages] = useState([]);

	// update the last message for everychange in the roomId
	useEffect(() => {
		// fetching all the messages inside a "messages" state
		db.collection("rooms")
			.doc(id)
			.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) =>
				setMessages(snapshot.docs.map((doc) => doc.data()))
			);
	}, [id]);

	// if prop "addchat" does not exist
	return !addChat ? (
		<Link to={`/rooms/${id}`}>
			<div className="chatcard">
				<Avatar
					src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`}
					alt="avatar"
				/>
				<div className="chatcard__info">
					<h2>{name}</h2>
					{/* setting the last message */}
					{/* TODO : add a functionality to shorten the length of this
					 message to 20 chars, and replace rest of the chars with "..." */}
					<p className="chatcard__last-msg">{messages[0]?.message}</p>
				</div>
			</div>
		</Link>
	) : (
		// if prop "addchat" exists
		<div className="chatcard" onClick={addChatRoom}>
			<h1>Add new chat</h1>
		</div>
	);
}

export default ChatCard;
