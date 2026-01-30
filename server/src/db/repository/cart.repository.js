import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { cartTable } from "../schema/carts.schema.js";
import { cartItemsTable } from "../schema/cartItems.schema.js";

export const getOrCreateCart = async (userId) => {
  const [cart] = await db
    .select()
    .from(cartTable)
    .where(eq(cartTable.userId, userId));

  if (cart) return cart;

  const [newCart] = await db.insert(cartTable).values({ userId }).returning();

  return newCart;
};

export const getCartItems = async (userId) => {
  const cart = await getOrCreateCart(userId);

  const cartItems = await db
    .select()
    .from(cartItemsTable)
    .where(eq(cartItemsTable.cartId, cart.id));
  return { ...cart, cartItems };
};

export const addItemToCart = async (userId, productId, quantity) => {
  const cart = await getOrCreateCart(userId);

  await db
    .insert(cartItemsTable)
    .values({
      cartId: cart.id,
      productId,
      quantity,
    })
    .onConflictDoUpdate({
      target: [cartItemsTable.cartId, cartItemsTable.productId],
      set: {
        quantity: quantity,
      },
    });

  return getCartItems(userId);
};

export const updateCartItem = async (userId, productId, quantity) => {
  const cart = await getOrCreateCart(userId);

  if (quantity <= 0) {
    return removeCartItem(userId, productId);
  }

  await db
    .update(cartItemsTable)
    .set({ quantity })
    .where(
      and(
        eq(cartItemsTable.cartId, cart.id),
        eq(cartItemsTable.productId, productId),
      ),
    );

  return getCartItems(userId);
};

export const removeCartItem = async (userId, productId) => {
  const cart = await getOrCreateCart(userId);

  await db
    .delete(cartItemsTable)
    .where(
      and(
        eq(cartItemsTable.cartId, cart.id),
        eq(cartItemsTable.productId, productId),
      ),
    );

  return getCartItems(userId);
};

export const clearUserCart = async (userId) => {
  const cart = await getOrCreateCart(userId);

  await db.delete(cartItemsTable).where(eq(cartItemsTable.cartId, cart.id));
};
