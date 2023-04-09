import {createContext,useReducer} from 'react'

export const Store=createContext();

const initialState={
    
        userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null,
    cart:{
        // itemsPrice:0,shippingPrice:0,taxPrice:0, 
        paymentMethod:localStorage.getItem('paymentMethod')?(localStorage.getItem('paymentMethod')):'',
        shippingAddress:localStorage.getItem('SHIPPING_ADDRESS')?JSON.parse(localStorage.getItem('SHIPPING_ADDRESS')):{},
        cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
    },
};

const reducer=(state,action)=>{
    switch(action.type)
    {
        case 'CART_ADD_ITEM':

            const newItem=action.payload;

            const existItem=state.cart.cartItems.find((item)=>item._id===newItem._id);
 
            const cartItems=existItem?state.cart.cartItems.map((item)=>
            item._id===existItem._id?newItem:item):[...state.cart.cartItems,newItem];
            localStorage.setItem('cartItems',JSON.stringify(cartItems));
            return {...state,cart:{...state.cart,cartItems}};
            
        case 'CART_REMOVE_ITEM':{
            const removeItem=action.payload;
            const cartItems=state.cart.cartItems.filter((item)=>item._id!==action.payload._id);
            localStorage.setItem('cartItems',JSON.stringify(cartItems));
                return {...state,cart:{...state.cart,cartItems}};
        };
        case 'CART_CLEAR':{

            return {...state,cart:{...state.cart,cartItems:[]}};  
        }
        case 'USER_SIGNIN':{
            // const data=action.payload;
            return {...state,userInfo:action.payload}
        };
        case 'USER_SIGN_OUT':{
            // console.log(userInfo)
            return {...state,userInfo:null,
            cart:{
                cartItems:[],
                shippingAddress:{},
                paymentMethod:'', 
            }};
        };
        case 'SAVE_SHIPPING_ADDRESS':{
            console.log('Saving shipping address')
            console.log(action.payload);
            return {
                ...state,
                cart: {
                  ...state.cart,
                  shippingAddress: action.payload,
                },
              };

        }
        case 'SAVE_PAYMENT_METHOD':{
            return{
                 ...state,
                 cart:{
                    ...state.cart,
                    paymentMethod:action.payload
                },
            };
        }
        default:
            return state;

    }
}
export function StoreProvider(props)
{
    const [state,dispatch]=useReducer(reducer,initialState);
    const value={state,dispatch};

    return <Store.Provider value={value}>{props.children}</Store.Provider>;

}