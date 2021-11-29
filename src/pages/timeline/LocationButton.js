import styled from "styled-components";
import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

export default function LocationButton({ newPost, setNewPost }) {
	const [isLocationActive, setIsLocationActive] = useState(false);
	const [position, setPosition] = useState(null);

	function activeLocation() {
		setIsLocationActive(true);
		if (position) {
			setNewPost({
				...newPost,
				geolocation: {
					latitude: position.latitude,
					longitude: position.longitude,
				},
			});
			return;
		}
		navigator.geolocation.watchPosition(
			function (position) {
				setNewPost({
					...newPost,
					geolocation: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					},
				});

				setPosition({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
			},
			function errorCallback() {
				alert("Não foi possível obter sua localização.");
				setIsLocationActive(false);
			}
		);
	}

	function deactivateLocation() {
		setIsLocationActive(false);
		setNewPost({
			...newPost,
			geolocation: {},
		});
	}

	return (
		<LocationButtonContainer
			type="input"
			isLocationActive={isLocationActive}
			onClick={() => {
				isLocationActive ? deactivateLocation() : activeLocation();
			}}
		>
			<IoLocationOutline />
			Localização{isLocationActive ? " ativada" : " desativada"}
		</LocationButtonContainer>
	);
}

const LocationButtonContainer = styled.div`
	border: none;
	background-color: inherit;
	display: flex;
	align-items: center;
	font-size: 13px;
	font-family: "Lato", sans-serif;
	font-weight: 300;
	color: ${(props) => (props.isLocationActive ? "#238700" : "#949494}")};

	svg {
		font-size: 15px;
	}
`;
