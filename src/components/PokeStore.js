import React, { Component } from 'react';
import { Menu, Container, Input, Image, Header, Button, Icon, Label, Modal, Table } from 'semantic-ui-react';
import PokeListagem from './PokeListagem';

type PokeStoreState = {
    query: String,
    itens: Array<Pokemon>
}

export default class PokeRestore extends Component<{}, PokeStoreState> {


    constructor(props) {
        super(props);
        this.query = '';
        this.state = { itens: [], query: '', confirmaModalOpen: false, cartModalOpen: false, finishModalOpen: false}
    }

    updatePokemonQuery = event => {
        this.setState({ query: event.target.value })
    }

    filter = () => {
        this.setState({ query: this.query })
    }

    addCart = (item, details) => {
        console.log(item);
        let contains = this.state.itens.filter(pokemon => item.name === pokemon.name).length > 0;
        if (!contains) {
            let itens = this.state.itens;
            item.details = details;
            itens.push(item);
            this.setState({ itens: itens });
        }
    }
    
    handleItemQuantity() {
        if (this.state.itens.length > 0)
            return (
                <Label color="red">{this.state.itens.length}</Label>
            )
    }

    removeAt = (index) => {
        console.log(index)
        let itens = this.state.itens;
        itens.splice(index, 1)
        console.log(itens);
        this.setState({itens: itens})
    }

    total() {
        let total = 0;
        this.state.itens.forEach(pokemon => total += pokemon.details.weight)
        return total;
    }

    confirmaCompra() {
        return (
            <Modal basic size="small" trigger={<Button primary onClick={this.confirm}>Finalizar Compra</Button>} open={this.state.confirmaModalOpen} onClose={this.closeConfirm}>
                <Modal.Header>Finalizar Compra?</Modal.Header>
                <Modal.Content>Gostaria de Finalizar a compra?</Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={this.closeConfirm}>
                        <Icon name='remove' /> Não
                    </Button>
                    {this.finish()}
                </Modal.Actions>
            </Modal>
        )
    }

    finish() {                
        return (
            <Modal trigger={<Button color='green' inverted onClick={this.closeFinish} open={this.state.finishModalOpen}>
            <Icon name='checkmark' /> Sim
        </Button>} basic size="small">
            <Modal.Header>Compra Realizada</Modal.Header>
            <Modal.Content>Compra realizada com sucesso!</Modal.Content>
            <Modal.Actions>
                <Button color='green' inverted onClick={this.closeFinish}>
                    <Icon name='checkmark' /> Ok
                </Button>
            </Modal.Actions>
        </Modal>
        )
    }

    cleanCart() {
        this.setState({itens: []})
    }

    openCart = () => {
        this.setState({cartModalOpen: true})
    }

    confirm = () => {
        this.setState({confirmaModalOpen: true})
    }

    closeCart = () => {
        this.setState({cartModalOpen: false})
    }

    closeConfirm = () => {
        this.setState({confirmaModalOpen: false})
    }

    openFinish = () => {
        this.setState({finishModalOpen: true})
    }

    closeFinish = () => {
        this.setState({finishModalOpen: false, confirmaModalOpen: false, cartModalOpen: false, itens: []})
    }

    render() {
        return (
            <div>
                <Menu fixed="top" inverted>
                    <Container>
                        <Menu.Item>
                            <Image size="mini" src="/icon.png" style={{ marginRight: '1.5em' }}></Image>
                        </Menu.Item>
                        <Menu.Item>
                            <Input icon="search" iconPosition="left" placeholder="Pesquisar" onChange={this.updatePokemonQuery}></Input>
                        </Menu.Item>
                        <Modal trigger={<Menu.Item fitted onClick={this.openCart}>
                                <Icon name="shop" />
                                {this.handleItemQuantity()}
                            </Menu.Item>} open={this.state.cartModalOpen} onClose={this.closeCart}>
                            <Modal.Header>Carrinho</Modal.Header>
                            <Modal.Content>
                                <Table>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Imagem</Table.HeaderCell>
                                            <Table.HeaderCell>Nome</Table.HeaderCell>
                                            <Table.HeaderCell>Valor</Table.HeaderCell>
                                            <Table.HeaderCell>Remover</Table.HeaderCell>
                                        </Table.Row>                                        
                                    </Table.Header>
                                    <Table.Body>
                                        {this.state.itens.map((pokemon, index) => 
                                            <Table.Row key={pokemon.name}>
                                                <Table.Cell>
                                                    <Image src={pokemon.details.sprites.front_default}></Image>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <span style={{ textTransform: 'capitalize' }}>{pokemon.name}</span>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    R$ {pokemon.details.weight.toFixed(2)}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Button icon basic color="red" onClick={() => this.removeAt(index)}>
                                                        <Icon name="times circle" />
                                                    </Button>
                                                </Table.Cell>
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                    <Table.Footer>
                                        <Table.Row>
                                            <Table.HeaderCell colSpan="2" textAlign="right">
                                                Total: R$ {this.total()}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell textAlign="center" colSpan="2">
                                                {this.confirmaCompra()}
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Footer>                                                                        
                                </Table>
                            </Modal.Content>
                        </Modal>                        
                    </Container>
                </Menu>
                <Container style={{ marginTop: '7em' }} fluid>
                    <Header as="h1" textAlign="center">Bem Vindo a PokéStore</Header>
                    <PokeListagem query={this.state.query} addCart={this.addCart}></PokeListagem>
                </Container>
            </div >
        )
    }
}