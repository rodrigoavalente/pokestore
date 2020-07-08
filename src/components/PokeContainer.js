import axios from 'axios';

import React, { Component } from 'react';
import { Grid, Card, Label, Image, Button, Icon } from 'semantic-ui-react';

export type Pokemon = {
    name: String,
    url: String
}

type PokemonContainerProps = {
    pokemon: Pokemon,
    addCart: Function
}

type PokemonDetails = {
    id: Number,
    sprites: {
        front_default: String
    },
    weight: Number,
    types: [
        { type: { name: String }, slot: Number }
    ]
}

type PokemonContainerState = {
    details: PokemonDetails
}

export default class PokeContainer extends Component<PokemonContainerProps, PokemonContainerState> {
    constructor(props) {
        super(props)

        this.state = {
            details: {
                id: 0,
                sprites: {
                    front_default: ''
                },
                weight: 0,
                types: []
            }
        }
    }

    componentDidMount() {
        axios.get(this.props.pokemon.url)
            .then(response => this.setState({ details: response.data }))
            .catch(console.error)
    }

    addCart = () => {
        this.props.addCart(this.props.pokemon, this.state.details)
    }

    render() {
        return (
            <Card>
                <Image src={this.state.details.sprites.front_default} wrapped ui={false} />
                <Card.Content>
                    <Card.Header style={{ textTransform: 'capitalize' }}>{this.props.pokemon.name}</Card.Header>
                    <Card.Meta>
                        <span className="date">Número da Pokédex #{this.state.details.id}</span>
                    </Card.Meta>
                    <Card.Description>
                        {this.state.details.types.map(type => <Label as='a' style={{ textTransform: 'capitalize' }} className={'type ' + type.type.name} key={type.slot}>{type.type.name}</Label>)}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Grid verticalAlign="middle" doubling columns={2}>
                        <Grid.Column>
                        <Button primary animated="vertical" onClick={this.addCart}>
                            <Button.Content hidden>Comprar</Button.Content>
                            <Button.Content visible>
                                <Icon name="shop" />
                            </Button.Content>
                        </Button>
                        </Grid.Column>
                        <Grid.Column>                            
                            R$ {this.state.details.weight.toFixed(2)}            
                        </Grid.Column>
                    </Grid>                                        
                </Card.Content>
            </Card>
        )
    }
}