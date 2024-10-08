import * as React from "react";
import Carry from "../../imgs/Carry.svg";
import HardSupport from "../../imgs/HardSupport.svg";
import Midlaner from "../../imgs/Midlaner.svg";
import Offlane from "../../imgs/Offlane.svg";
import SoftSupport from "../../imgs/SoftSupport.svg";

export default function renderRoleIcons(member) {
    switch (member?.role) {
        case "Offlane":
            return <img className="w-6" src={Offlane} alt="Offline Role Icon" />;
        case "Carry":
            return <img className="w-6" src={Carry} alt="Carry Role Icon" />;
        case "HardSupport":
            return (
                <img className="w-6" src={HardSupport} alt="HardSupport Role Icon" />
            );
        case "Midlaner":
            return <img className="w-6" src={Midlaner} alt="Midlaner Role Icon" />;
        case "SoftSupport":
            return (
                <img className="w-6" src={SoftSupport} alt="SoftSupport Role Icon" />
            );
        default:
            return null;
    }
}
