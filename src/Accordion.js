import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo
} from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

const StyledAccordion = styled.div`
    border: solid 1px black;
    border-radius: 4px;
    margin: 10px;
`;

const StyledAccordionItem = styled.button`
    align-items: center;
    background: none;
    border: none;
    display: flex;
    font-weight: normal;
    font-size: 1em;
    justify-content: space-between;
    padding: 10px;
    text-align: left;
    width: 100%;

    &:focus {
        box-shadow: 0 0 2px 1px black;
    }
`;

const Item = styled.div`
    border-top: 1px solid black;

    &:first-child {
        border-top: 0;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    &:nth-child(odd) {
        background-color: ${({ striped }) => (striped ? "#F0F0F0" : "transparent")};
    }
`;

const ExpandableSection = styled.section`
    background: #e8f4f8;
    border-top: solid 1px black;
    padding: 10px;
    padding-left: 20px;
`;

const AccordionContext = createContext();

function useAccordionContext() {
    const context = useContext(AccordionContext);
    if(!context) {
        throw new Error("No context found for Accordion");
    }
    return context;
}

function Accordion({ children, defaultExpanded = "wine", striped = true }) {
    const [activeItem, setActiveItem] = useState(defaultExpanded);
    const setToggle = useCallback(
        value => {
            setActiveItem(() => {
                if(activeItem !== value) return value;
                return "";
            });
        },
        [setActiveItem, activeItem]
    );

    const value = useMemo(
        () => ({
            activeItem,
            setToggle,
            defaultExpanded,
            striped
        }),
        [setToggle, activeItem, striped, defaultExpanded]
    );

    return (
        <AccordionContext.Provider value={value}>
            <StyledAccordion>{children}</StyledAccordion>
        </AccordionContext.Provider>
    );
}

function ChevronComponent({ isExpanded }) {
    return isExpanded ? <Icon name="chevron up"/> : <Icon name="chevron down" />;
}

function AccordionItem({ value, children }) {
    const { activeItem, setToggle, striped } = useAccordionContext();

    return (
        <Item striped={striped}>
            <StyledAccordionItem
                aria-controls={`${value}-panel`}
                aria-disabled="false"
                aria-expanded={value === activeItem}
                id={`${value}-header`}
                onClick={() => setToggle(value)}
                selected={value === activeItem}
                type="button"
                value={value}
            >
                {children}
                <ChevronComponent isExpanded={activeItem === value} />
            </StyledAccordionItem>
            <ExpandableSection
                aria-hidden={activeItem !== value}
                aria-labelledby={`${value}-header`}
                expanded
                hidden={activeItem !== value}
                id={`${value}-panel`}
            >
                Showing expanded content about {value}
            </ExpandableSection>
        </Item>
    );
}

export { Accordion, AccordionItem };