import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NavigationComponent() {
	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 95) {
				setIsSticky(true);
			} else {
				setIsSticky(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div id="container">
			<nav className={`d-flex justify-content-center py-3 ${isSticky ? "navbar-sticky" : "navbar-normal"}`}>
				<ul className="nav">
					<li className="nav-item">
						<Link className="nav-link text-white" aria-current="page" to="/homepage">
							The Furama
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white" aria-current="page" to="/rooms">
							Rooms & suites
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white">Culinary</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white">Services</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white">About Us</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default NavigationComponent;
