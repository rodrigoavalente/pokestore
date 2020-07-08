import axios from 'axios';

import React, { Component } from "react";
import PokeContainer, { Pokemon } from './PokeContainer';
import { Grid, Button, Icon, Container, Divider } from 'semantic-ui-react';


type PokeListagemState = {
    data: {
        next: String,
        previous: String,
        results: Array < Pokemon >
    },
    resultsCopy: Array < Pokemon > ,
    loading: Boolean
}

type PokeListagemProps = {
    query: String,
    addCart: Function
}

const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

export default class PokeListagem extends Component < PokeListagemProps, PokeListagemState > {
    constructor(props) {
        super(props);

        this.state = { data: { next: '', previous: '', results: [] }, loading: false, resultsCopy: [] }
    }

    componentDidMount() {
        axios.get(apiUrl)
            .then(response => this.setState({ data: response.data, resultsCopy: response.data.results }))
            .catch(console.error);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.query !== this.props.query) {
            this.searchPokemon(this.props.query)
        }
    }

    searchPokemon(query) {
        if (query) {
            let searched = this.state.resultsCopy
                .filter(pokemon => pokemon.name.startsWith(query.toLocaleLowerCase()));
            let data = this.state.data;
            data.results = searched;
            this.setState({ data: data });
        } else {
            let data = this.state.data;
            data.results = this.state.resultsCopy;
            this.setState({ data: data })
        }

    }

    carregarMais = () => {
        this.setState({ loading: true });
        axios.get(this.state.data.next)
            .then(response => {
                let data = this.state.data;
                data.next = response.data.next;
                data.previous = response.data.previous;
                data.results = this.state.resultsCopy.concat(response.data.results);
                this.setState({ data: data, loading: false, resultsCopy: data.results });
            })
            .catch(e => {
                console.error(e);
                this.setState({ loading: false })
            })
    }

    render() {
        return ( 
            <Container>
                <Grid doubling columns={5}> {
                    this.state.data.results.map(pokemon => <Grid.Column key={pokemon.name}>
                        <PokeContainer pokemon={pokemon} addCart={this.props.addCart}/>
                    </Grid.Column>
                )}
                </Grid>
                <Divider></Divider>
                <Grid>
                    <Grid.Column textAlign="center">
                        <Button secondary loading={this.state.loading} onClick={this.carregarMais}>
                            <Button.Content>
                                Carregar Mais
                                <Icon name = "dropdown" />
                            </Button.Content>
                        </Button>
                    </Grid.Column>
                </Grid>
            </Container>

        )
    }
}