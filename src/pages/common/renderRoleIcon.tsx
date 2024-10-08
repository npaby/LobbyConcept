import * as React from "react";
import { Avatar, AvatarImage } from "../../components/ui/avatar.tsx";
import Carry from "../../imgs/Carry.svg";
import HardSupport from "../../imgs/HardSupport.svg";
import Midlaner from "../../imgs/Midlaner.svg";
import Offlane from "../../imgs/Offlane.svg";
import SoftSupport from "../../imgs/SoftSupport.svg";

export default function renderRoleIcons(member) {
	switch (member?.role) {
		case "Offlane":
			return (
				<>
					<Avatar>
						<AvatarImage
							src={Offlane}
							width="128px"
							height="64px"
							className="object-fill"
						/>
					</Avatar>
				</>
			);

		case "Carry":
			return (
				<>
					<Avatar>
						<AvatarImage
							src={Carry}
							width="128px"
							height="64px"
							className="object-fill"
						/>
					</Avatar>
				</>
			);
		case "HardSupport":
			return (
				<>
					<Avatar>
						<AvatarImage
							src={HardSupport}
							width="128px"
							height="64px"
							className="object-fill"
						/>
					</Avatar>
				</>
			);
		case "Midlaner":
			return (
				<>
					<Avatar>
						<AvatarImage
							src={Midlaner}
							width="128px"
							height="64px"
							className="object-fill"
						/>
					</Avatar>
				</>
			);
		case "SoftSupport":
			return (
				<>
					<Avatar>
						<AvatarImage
							src={SoftSupport}
							width="128px"
							height="64px"
							className="object-fill"
						/>
					</Avatar>
				</>
			);
		default:
			return null;
	}
}
