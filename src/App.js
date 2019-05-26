import React, { Component } from 'react';
import store from './store';
import { 
  Button,
  ButtonGroup,
  ButtonToolbar,
  Alert, } from 'reactstrap';

import { connect } from 'react-redux';
import { updateItem } from './actions/home-actions';
import logo from './logo.svg';
import './App.css';
import classicTee from './asset/classic-tee.jpg';

class App extends Component {
  constructor(props) {
      super(props);
      this.state= {
          toggleSuccess: false,
          toggleAlert: false,
          dropdownOpen: false,
          currentCart: [],
          cartItem: {
            itemId: null,
            itemName: "Classic Tee",
            itemSize: "",
            itemDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            itemQuantity: 1,
            itemPrice: 75,
          }
      }
      this.toggle = this.toggle.bind(this);
      this.onUpdateItem = this.onUpdateItem.bind(this);
      // this.toggleItemSize = this.toggleItemSize.bind(this);
  }
  componentDidMount() {
    this.assignInitial();
  }
  assignInitial = async () => {
    const storeData = store.getState();
    this.setState({currentCart:storeData.cart}, () => {
      console.log('result: ', this.state.currentCart)
      this.forceUpdate();
    })
  }
  onUpdateItem = () => {
    console.log('updating...')
    if (this.state.cartItem.itemSize === "") {
      this.setState({toggleAlert:true}, () =>{
        setTimeout(()=>{this.setState({toggleAlert:false})}, 4000);        
      })
    } else {
      const storeData = store.getState();
      var currentCart = storeData.cart;
      var itemAddedToCart = false;
      currentCart.map((item) => {
        if (item.itemName === this.state.cartItem.itemName && item.itemSize === this.state.cartItem.itemSize) {
          item.itemQuantity = item.itemQuantity + 1;
          itemAddedToCart = true;
        } 
      })
      if (!itemAddedToCart) {
        currentCart.push(this.state.cartItem)
      }
      this.setState({cartItem:{
        itemId: null,
        itemName: "Classic Tee",
        itemSize: "",
        itemDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        itemQuantity: 1,
        itemPrice: 75,
      }})
      this.props.onUpdateItem(currentCart)
      this.setState({toggleSuccess:true}, () =>{
        setTimeout(()=>{this.setState({toggleSuccess:false})}, 4000);        
      })
      this.assignInitial()
    }
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  cartItem = (cartItem, index) => {
    return (
      <div key={index} className="Cart-Item">
        <img src={classicTee} className="App-small-image" alt="logo" />
        <div className="Cart-Item-Text">
          <p style={{fontSize:15, fontWeight:'lighter'}}>{cartItem.itemName}</p>
          <p style={{fontSize:15, fontWeight:'lighter'}}>{cartItem.itemQuantity} X <span style={{fontWeight:600}}>$ {cartItem.itemPrice}</span></p>
          <p style={{fontSize:15, fontWeight:'lighter' }}>Size: <span className="To-Upper">{cartItem.itemSize}</span></p>
        </div>
      </div>
    )
  }
  toggleItemSize = async (e) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    const cartItem = this.state.cartItem;
    if (this.state.cartItem.itemSize !== "" && this.state.cartItem.itemSize === value) {
      cartItem[name] = "";
      await this.setState({cartItem});
    } else {
      cartItem[name] = value;
      await this.setState({cartItem});
    }
  }
  // addToCart = async () => {
  //   this.onUpdateItem.bind(this);
  // }
  render() {
    var totalItem = 0;
    this.state.currentCart.map((item) => {
      totalItem = totalItem + item.itemQuantity
    })
    return (
      <div className="App">
        <div className="App-header">
          <p className={this.state.dropdownOpen?"ToggleOpen":"Toggle"} onMouseOver={this.toggle} onMouseOut={this.toggle}>My Cart ({totalItem})</p>
        </div>
        {this.state.dropdownOpen?
          <div className="Cart-Item-Container">
            {this.state.currentCart.length === 0 ?
            <div className="Cart-Item">
              <div className="Cart-Item-Text">
              <p style={{fontSize:15, }}>No Item Selected</p>
                <p style={{fontSize:13, color:'#888888' }}>Add Item to the cart!</p>
              </div>
            </div>
            :
            this.state.currentCart.map((item, index) => {
              return (
                this.cartItem(item, index)
              )
            })
            }
          </div>
          :
          null
        }
        
        {/* <p className="App-intro"> */}
        <div className="App-Body">
          <div className="App-Body-Image-Container">
            <img src={classicTee} className="Big-Item-Image" alt="logo" />
          </div>
          <div className="App-Body-Text-Container">
            <p style={{fontSize:30, fontWeight:'lighter' }}>{this.state.cartItem.itemName}</p>
            <p style={{fontSize:15, fontWeight:'bolder' }}>$ {this.state.cartItem.itemPrice}</p>
            <p style={{fontSize:15, color:'#888888', fontWeight:'lighter', lineHeight: 1.8 }}>{this.state.cartItem.itemDescription}</p>
            <p style={{fontSize:15, }}>Size<span style={{color: '#C90000'}}>*</span></p>
            <ButtonToolbar>
              <ButtonGroup className="mr-2">
                <Button style={this.state.cartItem.itemSize==="s"?{backgroundColor:'white', color:'black', borderWidth:2, borderColor:'black'}
                              :
                              {backgroundColor:'white', color:'#888888', borderColor:'#888888'}} 
                        onClick={(e) => this.toggleItemSize(e)} name="itemSize" value="s">S</Button>
              </ButtonGroup>
              <ButtonGroup className="mr-2">
                <Button style={this.state.cartItem.itemSize==="m"?{backgroundColor:'white', color:'black', borderWidth:2, borderColor:'black'}
                              :
                              {backgroundColor:'white', color:'#888888', borderColor:'#888888'}} 
                        onClick={(e) => this.toggleItemSize(e)} name="itemSize" value="m" >M</Button>
              </ButtonGroup>
              <ButtonGroup >
                <Button style={this.state.cartItem.itemSize==="l"?{backgroundColor:'white', color:'black', borderWidth:2, borderColor:'black'}
                              :
                              {backgroundColor:'white', color:'#888888', borderColor:'#888888'}} 
                        onClick={(e) => this.toggleItemSize(e)} name="itemSize" value="l" >L</Button>
              </ButtonGroup>
            </ButtonToolbar>

            <Button className="colorTrans" style={{width: 150, marginTop: 15, }} block outline color="dark" onClick={() => this.onUpdateItem()}>ADD TO CART</Button>
            {this.state.toggleAlert?
              <Alert style={{marginTop:15}} color="danger">
                Please Select The Size Of Item!
              </Alert>
              :
              null
            }
            {this.state.toggleSuccess?
              <Alert style={{marginTop:15}} color="success">
                Item Successfully Added!
              </Alert>
              :
              null
            }
          </div>
        </div>
        {/* </p> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state
}
const mapActionToProps = {
    onUpdateItem: updateItem,
}
export default connect(mapStateToProps, mapActionToProps)(App);

// export default App;
