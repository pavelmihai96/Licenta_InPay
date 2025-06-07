import React, { JSX } from 'react';
import styled from "styled-components";
import TypographyComponent, {TypographyType} from "./Typography";
import {useAuth} from "../../service/AuthContext";
import { Link } from "react-router-dom";


const StyledLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 8px; /* Spacing between icon and text */
    color: #1d4ed8; /* Default link color (blue) */
    text-decoration: none;
    font-weight: 500;

    &:hover {
        text-decoration: underline; /* Underline on hover */
        color: #2563eb; /* Slightly darker blue on hover */
    }

    &:focus {
        outline: 2px solid #93c5fd; /* Focus ring for accessibility */
        outline-offset: 2px;
    }

    &:active {
        color: #1e40af; /* Darker blue when active */
    }
`;


interface StyledLinkProps {
    href?: string; // Link URL
    to?: string; // Link URL
    children?: JSX.Element; // Content inside the link
    ariaLabel?: string; // Accessible label (optional)
    icon?: JSX.Element; // Icon to display alongside the link text (optional)
    iconPosition?: "left" | "right"; // Icon position (left or right of the text)
    role?: string;
    onClick?: () => void;
}



const LinkButton = (props:StyledLinkProps) => {
    const auth = useAuth();

    //if ((auth.user.role !== props.role) && (props.role !== "TRUE")) return null;

    return(
        <>
        {((auth.role === props.role) || (props.role == "TRUE")) && (
            <StyledLink to={props.to} onClick={props.onClick}>

                {props.icon && props.iconPosition === "left" && <>{props.icon}</>}
                <TypographyComponent type={TypographyType.Paragraph} text={props.ariaLabel}/>
                {props.icon && props.iconPosition === "right" && <>{props.icon}</>}

            </StyledLink>
         )}
        </>
    )
}
//


export default LinkButton