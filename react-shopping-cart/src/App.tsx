import {useState} from 'react'
import axios from 'axios'
import {useQuery} from 'react-query'
// Components
import Item from './Item/Item'
import Cart from './Cart/Cart'
import {Drawer,LinearProgress,Grid,Badge} from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'
// Styles
import {Wrapper,StyledButton} from './app.styles'
// Type
import {CartItemType} from './types/CartItemType'

const getProducts = async (): Promise<CartItemType[]>=>{
  // return await (await fetch('https://fakestoreapi.com/products')).json();}
  const {data} = await axios.get('https://fakestoreapi.com/products')
  return data
}


const App=()=> {
  const [cartOpen,SetCartOpen]=useState(false)
  const [cartItems,setCartItems]=useState([] as CartItemType[])
  // UseQuery to fetch all the products
  const {data,isLoading,error}=useQuery<CartItemType[]>('products',getProducts);
  // console.log(data);
  
  const getTotalItems=(items:CartItemType[])=>{
    return items.reduce((acc:number,item)=>acc+item.amount,0)
  };

  const handleAddToCart=(clickedItem:CartItemType)=>{
    setCartItems(prev=>{
      // Is the item already in cart?
      const isItemInCart = prev.find(item=>item.id===clickedItem.id);
      if(isItemInCart){
        return prev.map(item=>(
          item.id===clickedItem.id?{...item,amount:item.amount+1}:item
        ))
      }
      // First time the item is added
      return [...prev,{...clickedItem,amount:1}];
    })
  };
  ;

  const handleRemoveFromCart=(id:number)=>{
    setCartItems(prev=>(
      prev.reduce((acc,item)=>{
        if(item.id===id){
          if(item.amount===1){
            return acc
          };
          return [...acc,{...item,amount:item.amount-1}]
        }else{
          return [...acc,item]
        }
      },[] as CartItemType[]))
      )
  };
  
  if(isLoading) return <LinearProgress/>
  if(error)return <div>Something went Wrong</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={()=>{SetCartOpen(false)}}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
      </Drawer>
      <StyledButton onClick={()=>{SetCartOpen(true)}}>
        <Badge 
        badgeContent={getTotalItems(cartItems)}
        color='error'>
          <AddShoppingCart/>
        </Badge>
      </StyledButton>
    <Grid container spacing={3}>
      {data?.map(item=>(
        <Grid item key={item.id} xs={12} sm={4}>
          <Item item={item} handleAddToCart={handleAddToCart}/>
        </Grid>
      ))}
    </Grid>
    </Wrapper>
  );
}

export default App;
