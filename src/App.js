import React, { useState } from "react";
import {
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect,
} from "react-router-dom";
import "./App.css";
import ChatRoom from "./ChatRoom";
import Sidebar from "./Sidebar";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
	// state to check if user has logged in
	const [{ user }, dispatch] = useStateValue();
	return (
		// BEM naming convention
		<div className="app">
			{!user ? (
				<Login />
			) : (
				<div className="app__body">
					<Router>
						{/* sidebar is rendered on ALL ROUTES */}
						{/* so its outside the switch and not wrapped inside routes */}
						<Sidebar />
						<Switch>
							<Route path="/rooms/:roomId">
								{/* the above route has a "PARAMETER", roomId which can be grabbed elsewhere using a hook */}
								<ChatRoom />
							</Route>
							<Route>
								<Redirect to="/" />
							</Route>
						</Switch>
					</Router>
				</div>
			)}
		</div>
	);
}

export default App;
