import React, {ReactElement, ReactNode} from "react";
import styled from "styled-components";
import {Tooltip} from "@mui/material";



/**
 * **Enum: TypographyType**
 *
 * Enum defining the various typography types available.
 * Each type maps to specific font properties like size, weight, color, etc.
 */
export enum TypographyType {
    BigTitle = "BigTitle",
    Title = "Title",
    FooterTitle = "FooterTitle",
    FooterSubtitle = "FooterSubtitle",
    SectionTitle = "SectionTitle",
    Underline_Title = "Underline Title",
    Subtitle = "Subtitle",
    Underline_Subtitle = "Underline Subtitle",
    Paragraph = "Paragraph",
    DeliveryDetail = "DeliveryDetail",
    UnderlineParagraph = "Underline Paragraph",
    Label = "Label",
    Price = "Price",
    Currency = "Currency",
    EmptyCart = "EmptyCart",
    Status = "Status",
    FilterCategory = "FilterCategory",
    Placeholder = "Placeholder",
    CardTitle = "CardTitle",
    ProductTitle = "ProductTitle",
    ProductAuthor = "ProductAuthor",
    BoldParagraph = "BoldParagraph",
}

/**
 * **TypographyMap**
 *
 * Maps `TypographyType` to specific styles for font properties like size, weight, color, etc.
 */
const TypographyMap = {
    [TypographyType.BigTitle]: {
        fontSize: 'clamp(30px, 2vw, 30px)',
        lineHeight: '32px',
        fontWeight: 900,
        color: 'black',
        fontFamily: "inter, sans-serif",
    },
    [TypographyType.Title]: {
        fontSize: 'clamp(20px, 2vw, 24px)',
        lineHeight: '32px',
        fontWeight: 900,
        color: '#aca7a7',
        fontFamily: "inter, sans-serif",
    },
    [TypographyType.FooterTitle]: {
        fontSize: 'clamp(20px, 2vw, 24px)',
        lineHeight: '32px',
        fontWeight: 900,
        color: 'black',
        fontFamily: "inter, sans-serif",
    },

    [TypographyType.EmptyCart]: {
        fontSize: 'clamp(20px, 2vw, 20px)',
        lineHeight: '32px',
        fontWeight: 300,
        color: '#aca7a7',
        fontFamily: "inter, sans-serif",
    },
    [TypographyType.ProductTitle]: {
        fontSize: 'clamp(32px, 2vw, 32px)',
        lineHeight: '32px',
        fontWeight: 900,
        color: 'black',
        fontFamily: "inter, sans-serif",
    },
    [TypographyType.DeliveryDetail]: {
        fontSize: 'clamp(16px, 2vw, 16px)',
        lineHeight: '32px',
        fontWeight: 300,
        color: 'black',
        fontFamily: "inter, sans-serif",
    },
    [TypographyType.ProductAuthor]: {
        fontSize: 'clamp(22px, 2vw, 22px)',
        lineHeight: '32px',
        fontWeight: 400,
        color: 'red',
        fontFamily: "inter, sans-serif",
    },
    [TypographyType.CardTitle]: {
        fontSize: 'clamp(14px, 1.5vw, 15px)',
        lineHeight: '32px',
        fontWeight: 900,
        color: 'black',
        fontFamily: "inter, sans-serif",
    },
    [TypographyType.SectionTitle]: {
        fontSize: 'clamp(20px, 2vw, 24px)',
        lineHeight: '32px',
        fontWeight: 300,
        color: '#aca7a7',
        fontFamily: "inter, sans-serif",
    },
    [TypographyType.Underline_Title]: {
        fontSize: 'clamp(20px, 2vw, 24px)',
        lineHeight: '32px',
        fontWeight: 900,
        color: '#aca7a7',
        fontFamily: "inter, sans-serif",
        textDecoration: 'underline',
    },
    [TypographyType.Subtitle]: {
        fontSize: 'clamp(16px, 1.8vw, 18px)',
        lineHeight: '24px',
        fontWeight: 600,
        color: '#aca7a7',
        fontFamily: "inter, sans-serif",
    },
    [TypographyType.FooterSubtitle]: {
        fontSize: 'clamp(16px, 1.8vw, 18px)',
        lineHeight: '24px',
        fontWeight: 600,
        color: 'black',
        fontFamily: "inter, sans-serif",
    },
    [TypographyType.Underline_Subtitle]: {
        fontSize: 'clamp(16px, 1.8vw, 18px)',
        lineHeight: '24px',
        fontWeight: 600,
        color: '#aca7a7',
        fontFamily: "inter, sans-serif",
        textDecoration: 'underline',
    },
    [TypographyType.Paragraph]: {
        fontSize: 'clamp(12px, 1.5vw, 13px)',
        lineHeight: '20px',
        fontWeight: 400,
        fontFamily: "inter, sans-serif",
    },
    [TypographyType.BoldParagraph]: {
        fontSize: 'clamp(12px, 1.5vw, 13px)',
        lineHeight: '20px',
        fontWeight: 900,
        fontFamily: "inter, sans-serif",
    },
    [TypographyType.UnderlineParagraph]: {
        fontSize: 'clamp(12px, 1.5vw, 13px)',
        lineHeight: '24px',
        fontWeight: 600,
        color: 'rgb(105,105,105)',
        fontFamily: "inter, sans-serif",
        textDecoration: 'underline',
    },
    [TypographyType.Label]: {
        fontSize: 'clamp(12px, 1.5vw, 14px)',
        lineHeight: '18px',
        fontWeight: 500,
        fontFamily: "inter, sans-serif",
    },
    [TypographyType.Price]: {
        fontSize: 'clamp(16px, 2vw, 20px)',
        lineHeight: '24px',
        fontWeight: 700,
        color: 'rgb(155,155,155)',
        fontFamily: "inter, sans-serif",
    },
    [TypographyType.Currency]: {
        fontSize: 'clamp(16px, 2vw, 20px)',
        lineHeight: '24px',
        fontWeight: 300,
        color: 'rgb(155,155,155)',
        fontFamily: "inter, sans-serif",
    },

    [TypographyType.Status]: {
        fontSize: 'clamp(12px, 2vw, 14px)',
        lineHeight: '16px',
        fontWeight: 600,
        color: 'white',
        fontFamily: "inter, sans-serif",
    },
    [TypographyType.FilterCategory]: {
        fontSize: 'clamp(14px, 1.6vw, 16px)',
        lineHeight: '20px',
        fontWeight: 600,
        color: 'black',
        fontFamily: "inter, sans-serif",
    },
    [TypographyType.Placeholder]: {
        fontSize: 'clamp(14px, 1.6vw, 16px)',
        lineHeight: '20px',
        fontWeight: 400,
        color: 'gray',
        fontFamily: "inter, sans-serif",
    },
};

/**
 * **Interface: TypographyProps**
 *
 * Defines the properties for the `TypographyComponent`.
 */
interface TypographyProps {
    type: TypographyType;
    text: string;
    truncated: string;
    minWidth?: string;
    maxWidth?: string;
    width?: string;
}

const StyledText = styled.div<{
    type: TypographyType;
    truncated: string;
    minWidth?: string;
    maxWidth?: string;
    width?: string;
}>`
    font-family: ${({ type }) => TypographyMap[type]?.fontFamily || "inherit"};
    font-size: ${({ type }) => TypographyMap[type]?.fontSize || "inherit"};
    line-height: ${({ type }) => TypographyMap[type]?.lineHeight || "normal"};
    font-weight: ${({ type }) => TypographyMap[type]?.fontWeight || "normal"};
    color: ${({ type }) => "inherit"};
    text-decoration: ${({ type }) => "none"};

    width: ${({ width }) => width || "auto"};
    min-width: ${({ minWidth }) => minWidth || "none"};
    max-width: ${({ maxWidth }) => maxWidth || "100%"};

    white-space: ${({ truncated }) => (truncated === "true" ? "nowrap" : "normal")};
    overflow: ${({ truncated }) => (truncated === "true" ? "hidden" : "visible")};
    text-overflow: ${({ truncated }) => (truncated === "true" ? "ellipsis" : "clip")};

    @media (max-width: 768px) {
        font-size: ${({ type }) => TypographyMap[type]?.fontSize};
        line-height: ${({ type }) => TypographyMap[type]?.lineHeight};
    }
`;


const TypographyComponent = (props: TypographyProps): ReactElement => {
    const { type, text, truncated = "false", minWidth, maxWidth, width } = props;
    return (
        <Tooltip title={text}>
            <StyledText
                type={type}
                truncated={truncated}
                minWidth={minWidth}
                maxWidth={maxWidth}
                width={width}
            >
                {text}
            </StyledText>
        </Tooltip>
    ) as ReactElement;
};

export default TypographyComponent;
