class App extends React.Component {
    state = {
        item: '',
        image: '',
        price: '',
        stores: []
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/store', this.state).then((response) => this.setState({stores: response.data, name: '', image: '', price: '' })
        )
    }

    updateStore = (event) => {
        event.preventDefault()
        const id = event.target.id
        axios.put('/store/' + id, this.state).then((response) => {
            this.setState({
                stores: response.data,
                item: '',
                image: '',
                price: '',
            })
        })
    }

    deleteStore = (event) => {
        axios.delete('/store/' + event.target.value).then(response => {
            this.setState({
                stores: response.data
            })
        })
    }

    componentDidMount = () => {
        axios.get('/store').then((response) => {
            this.setState({
                stores: response.data,
            })
        })
    }

    render = () => {
        return (
            <div>
                <h2>Add New Items</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="item">Item</label>
                    <input type="text" id="item" onChange={this.handleChange} value={this.state.item}/>
                    <br/>
                    <label htmlFor="image">Image</label>
                    <input type="text" id="image"
                    onChange={this.handleChange} value={this.state.image}/>
                    <br/>
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price"
                    onChange={this.handleChange} value={this.state.price}/>
                    <br/>
                    <input type="submit" value="Add New Item" />

                </form>
                <h2>Inventory</h2>
                    <ul>
                        {this.state.stores.map((store) => {
                            return (
                                <li key={store._id}>
                                    {store.item}<br/>
                                    <img src={store.image} alt={store.item}
                                     />
                                     {store.price}
                                     <details>
                                        <summary>Edit Item</summary>
                                        <form id={store._id} onSubmit={this.updateStore}>
                                        <label htmlFor="item">Item</label>
                                        <br/>
                                        <input type="text" id="item" onChange={this.handleChange} />
                                        <br/>
                                        <label htmlFor="image">Image</label>
                                        <br />
                                        <input
                                          type="text"
                                          id="image"
                                          onChange={this.handleChange}
                                        />
                                        <br/>
                                        <label htmlFor="price">Price</label>
                                        <br/>
                                        <input type="text" id="price" onChange={this.handleChange} />
                                        <br/>
                                        <input type="submit" value="Update Item"/>
                                        </form>
                                     </details>
                                     <button value={store._id}
                                     onClick={this.deleteStore}>
                                     DELETE
                                     </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>

        )
    }
}

ReactDOM.render(<App></App>,
document.querySelector('main'))
