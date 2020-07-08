import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";

export default class PokeCart extends Component<{},{}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container text>
                <Header as="h3" block inverted>Carrinho</Header>
            </Container>
            
        )
    }
}