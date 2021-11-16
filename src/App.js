import React from 'react';
import "./index.css";
import { Accordion, AccordionItem } from './Accordion';

export default function App() {
    return (
        <div className="App">
            <h1>Accordion</h1>
            <Accordion defaultExpanded="beer" striped>
                <AccordionItem value="cider">Cider</AccordionItem>
                <AccordionItem value="beer">Beer</AccordionItem>
                <AccordionItem value="wine">Wine</AccordionItem>
                <AccordionItem value="milk">Milk</AccordionItem>
                <AccordionItem value="patron">Café patron</AccordionItem>
            </Accordion>
        </div>
    );
}
