import { Cart } from '../models/cart.model.js';
import { Product } from '../models/product.model.js';

export async function getCart(req , res){
    try{
        let cart = await Cart.findOne({ clerkId: req.user.clerkId}).populate('items.product');

        if(!cart){
            const user = req.user;

            cart = await Cart.create({
                user: user._id,
                clerkId: user.clerkId,
                items: [],
            });
        }

        res.status(200).json({cart});

    }catch(error){
        console.error('Error in getCart controller' , error);
        res.status(500).json({error : 'internal server error'});

    }
}

export async function addToCart(req , res){
    try{
        const { productId , quantity} = req.body;

        //validar producto existente 
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({ error: 'Product not found'});
        }
        
        if(product.stock < quantity){
            return res.status(400).json({ error: 'Insufficient stock'});
        }

        let cart = await Cart.findOne({ clerkId: req.user.clerkId});

        if(!cart){
             cart = await Cart.create({
            user: user._id,
            clerkId: user.clerkId,
            items: [],
        });
    }

        //chequear si el producto ya esta en el carrito
        const existingItem = cart.items.find( (item) => item.product.toString() === productId );

        if(existingItem){
            //incrementar cantidad en 1
            const newQuantity = existingItem.quantity + 1;
            if(newQuantity > product.stock){
                return res.status(400).json({ error: 'Insufficient stock'});
            }
            existingItem.quantity = newQuantity;
        }else{
            //agregar nuevo item al carrito
            cart.items.push({product: productId,quantity: 1,});  
        }

        await cart.save();
        res.status(200).json({ message:'Item agregado al carrito',cart });

        //obtener carrito del usuario
       // let cart = await Cart.findOne({ clerkId: req.user.clerkId});
    }catch(error){
        console.error('Error in addToCart controller' , error);
        res.status(500).json({error : 'internal server error'});
    }

}

export async function updateCartItem(req , res){
    try{
        const { productId}  = req.params;
        const { quantity} = req.body;

        if(quantity < 1){
            return res.status(400).json({ error: 'Quantity must be at least 1'});
        }
        
        const cart = await Cart.findOne({ clerkId: req.user.clerkId});
        if(!cart){
            return res.status(404).json({ error: 'Cart not found'});
        }
        
        const itemIndex = cart.items.findIndex( (item) => item.product.toString() === productId);
        if(itemIndex === -1){
            return res.status(404).json({ error: 'Product not found in cart'});
        }

        //validar stock  y chequear si el pructo existe
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({ error: 'Product not found'});
        }
        if(product.stock < quantity){
            return res.status(400).json({ error: 'Insufficient stock'});
        }

        cart.items[itemIndex].quantity = quantity;

        await cart.save();

        res.status(200).json({message:'Cart updated', cart});
    }catch(error){
        console.error('Error in updateCartItem controller' , error);
        res.status(500).json({error : 'internal server error'});
    }

}

export async function removeFromCart(req , res){
    try{
        const { productId}  = req.params;
        
        const cart = await Cart.findOne({ clerkId: req.user.clerkId});
        if(!cart){
            return res.status(404).json({ error: 'Cart not found'});
        }
        cart.items = cart.items.filter( (item) => item.product.toString() !== productId);
        
        await cart.save();

    }catch(error){
        console.error('Error in removeFromCart controller' , error);
        res.status(500).json({error : 'internal server error'});
    }

}

export async function clearCart(req , res){
    try{
        const cart = await Cart.findOne({ clerkId: req.user.clerkId});
        if(!cart){
            return res.status(404).json({ error: 'Cart not found'});
        }
        cart.items = [];
        await cart.save();
        res.status(200).json({ message: 'Cart cleared', cart});

    }catch(error){
        console.error('Error in clearCart controller' , error);
        res.status(500).json({error : 'internal server error'});
    }
}