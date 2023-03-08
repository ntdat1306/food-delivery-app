import React, { useEffect, useRef, useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import NotFound from '../img/NotFound.svg'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const RowContainer = ({ flag, data, scrollValue }) => {
    const rowContainer = useRef()
    const [{ cartItems }, dispatch] = useStateValue()
    const [items, setItems] = useState([])

    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue
    })

    // Set time out and hide + show to update quantity when cart is open
    const addToCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items,
        })
        localStorage.setItem('cartItems', JSON.stringify(items))
    }

    const hideCart = () => {
        setTimeout(() => {
            dispatch({
                type: actionType.SET_CART_SHOW,
                cartShow: false,
            })
        })
    }

    const showCart = () => {
        setTimeout(() => {
            dispatch({
                type: actionType.SET_CART_SHOW,
                cartShow: true,
            })
        })
    }

    const updateQuantityItem = (item) => {
        var checkExist = false
        if (cartItems.length === 0) {
            return [...cartItems, item]
        } else {
            for (let i = 0; i < cartItems.length; i++) {
                if (cartItems[i].id === item.id) {
                    cartItems[i].qty = parseInt(cartItems[i].qty) + 1
                    checkExist = true
                }
            }
            if (checkExist) return cartItems
            else return [...cartItems, item]
        }
    }

    const reRenderCartContainer = (item) => {
        setItems(updateQuantityItem(item))
        hideCart()
        showCart()
    }

    useEffect(() => {
        addToCart()
    }, [items])

    return (
        <div
            ref={rowContainer}
            className={`w-full flex items-center gap-3 my-12 scroll-smooth ${
                flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'
            }`}
        >
            {data && data.length > 0 ? ( // If have data
                data.map((item) => (
                    <div
                        key={item?.id}
                        className="h-fit w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px] bg-cardOverlay rounded-lg py-2 px-4 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
                    >
                        <div className="w-full flex items-center justify-between">
                            <motion.div className="w-40 h-40 -mt-12 drop-shadow-2xl" whileHover={{ scale: 1.2 }}>
                                <img src={item?.imageUrl} alt="" className="w-full h-full object-contain" />
                            </motion.div>
                            <motion.div
                                whileTap={{ scale: 0.75 }}
                                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
                                onClick={() => reRenderCartContainer(item)}
                            >
                                <MdShoppingBasket className="text-white" />
                            </motion.div>
                        </div>

                        <div className="w-full flex flex-col items-end justify-end">
                            <p className="text-headingColor font-semibold text-base md:text-lg">{item?.title}</p>
                            <p className="mt-1 text-sm text-gray-500">{item?.calories} Calories</p>
                            <div className="flex items-center gap-8">
                                <p className="text-lg text-headingColor font-semibold">
                                    <span className="text-sm text-red-500">$</span> {item?.price}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                // If data empty
                <div className="w-full flex flex-col items-center justify-center">
                    <img src={NotFound} alt="" className="h-340" />
                    <p className="text-xl text-headingColor font-semibold">Item Not Available</p>
                </div>
            )}
        </div>
    )
}

export default RowContainer
