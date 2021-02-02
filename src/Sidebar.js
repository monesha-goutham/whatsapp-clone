import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import db from "./firebase";

import ChatCard from "./ChatCard";
import { useStateValue } from "./StateProvider";

function Sidebar() {
	// create state for "chat rooms" - which is a list
	// the rooms will be derived from the firebase DB for every time the sidebar
	// component mounts
	const [rooms, setRooms] = useState([]);

	// to get a picture for my sidebar avatar
	const [{ user }, dispatch] = useStateValue();

	// so we use useeffct
	useEffect(() => {
		// for every changes in snapshot (photo of the docs in collection)
		const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
			// we set the rooms with the update
			setRooms(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);

		return () => {
			unsubscribe();
		};
	}, []);
	return (
		<div className="sidebar">
			<div className="sidebar__header">
				{/* sets my google account's dp for the sidebar avatar */}
				<Avatar src={user?.photoURL} />
				<div className="sidebar__header__right">
					{/* TODO : the icon needs to be sized down a bit */}
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className="sidebar__search">
				<div className="sidebar__search__container">
					<SearchOutlined />
					<input type="text" placeholder="type the name to chat" />
				</div>
			</div>
			<div className="sidebar__chats">
				<ChatCard addChat />
				{rooms.map((room) => (
					<ChatCard key={room.id} id={room.id} name={room.data.name} />
				))}
			</div>
		</div>
	);
}

export default Sidebar;
