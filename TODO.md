# Fix "Add to Cart" Error - TODO

## Steps

- [x] Step 0: Analyze codebase and identify issues
- [x] Step 1: Fix missing Cart model import in `server/controllers/cartController.js`
- [x] Step 2: Remove duplicate `/cart` route in `client/src/App.jsx`
- [x] Step 3: Add `removeFromCart`, `updateQuantity`, `clearCart` to `client/src/context/CartContext.jsx` and corresponding server routes/controllers
- [x] Step 4: Complete `client/src/pages/Cart.jsx` to display actual cart items with quantity controls and remove functionality
- [x] Step 5: Verify all changes are consistent

