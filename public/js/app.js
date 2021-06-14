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
                <h4 class="background blue darken-4 white-text">Add New Items</h4>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="item" class="blue-text">Item</label>
                    <input type="text" id="item" onChange={this.handleChange} value={this.state.item}/>
                    <br/>
                    <label htmlFor="image" class="image blue-text">Image</label>
                    <input type="text" id="image"
                    onChange={this.handleChange} value={this.state.image}/>
                    <br/>
                    <label htmlFor="price" class="blue-text">Price</label>
                    <input type="text" id="price"
                    onChange={this.handleChange} value={this.state.price}/>
                    <br/>
                    <input type="submit" value="Add New Item" />

                </form>
            

                <h2 class="background yellow lighten-1 blue darken-text center-align">For Sale</h2>
                    <ul>
                        {this.state.stores.map((store) => {
                            return (
                                <li key={store._id}>
                                    {store.item}<br/>
                                    <img class="card-panel blue-grey darken-1" src={store.image}
                                     alt={store.item}
                                     />
                                     <br/>
                                     ${store.price}
                                     <details>
                                        <summary class="hoverable">Edit Item</summary>
                                        <form id={store._id} onSubmit={this.updateStore}>
                                        <label htmlFor="item" class="white-text">Item</label>
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
                                        <input type="submit" value="Update Item" class="yellow lighten-1"/>
                                        </form>
                                     </details>
                                     <button value={store._id}
                                     onClick={this.deleteStore} class="red darken-4 white-text">
                                     DELETE
                                     </button>
                                     <button class="blue darken-4 white-text" value={store.id}>BUY</button>
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
