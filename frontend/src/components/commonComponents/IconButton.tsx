import React, { JSX } from 'react';
import styled from "styled-components";
import TypographyComponent, {TypographyType} from "./Typography";
import {useAuth} from "../../service/AuthContext";
import { Link } from "react-router-dom";


const StyledLink = styled(Link)<{ isActive?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 8px; /* Spacing between icon and text */
    color: #1d4ed8; /* Default link color (blue) */
    text-decoration: none;
    font-weight: 500;
    background-color: ${(props) => (props.isActive ? "royalblue" : "transparent")}; /* Light blue when active */
    border-radius: ${(props) => (props.isActive ? "9999px" : "")};
    padding: ${(props) => (props.isActive ? "5px 5px 5px 5px" : "")};
    
    &:hover {
        text-decoration: underline; /* Underline on hover */
        color: #2563eb; /* Slightly darker blue on hover */
    }
    
    &:active {
        background-color: royalblue; /* Darker blue when active */
    }
    
    &:visited {
        background-color: royalblue;
    }
`;


interface StyledLinkProps {
    to: string; // Link URL
    children?: JSX.Element; // Content inside the link
    ariaLabel: string; // Accessible label (optional)
    icon?: JSX.Element; // Icon to display alongside the link text (optional)
    iconPosition?: "left" | "right"; // Icon position (left or right of the text)
    role?: string;
    onClick: () => void;
    className: string;
    isActive?: boolean;
}



const LinkButton = (props:StyledLinkProps) => {
    const auth = useAuth();

    //if ((auth.user.role !== props.role) && (props.role !== "TRUE")) return null;

    return(
        <>
        {((auth.role === props.role) || (props.role == "TRUE")) && (
            <StyledLink to={props.to || "#"} onClick={props.onClick} className={props.className} isActive={props.isActive}>

                {props.icon && props.iconPosition === "left" && <>{props.icon}</>}
                <TypographyComponent type={TypographyType.Paragraph} text={props.ariaLabel || ""}/>
                {props.icon && props.iconPosition === "right" && <>{props.icon}</>}

            </StyledLink>
         )}
        </>
    )
}
//


export default LinkButton