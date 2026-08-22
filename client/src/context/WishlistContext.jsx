import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // Load wishlist from localStorage
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];
  });

  // Save wishlist whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // Add product
  const addToWishlist = (product) => {
    const alreadyExists = wishlist.find(
      (item) => item._id === product._id
    );

    if (alreadyExists) {
      return;
    }

    setWishlist((prevWishlist) => [
      ...prevWishlist,
      product,
    ]);
  };

  // Remove product
  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter(
        (item) => item._id !== id
      )
    );
  };

  // Check product
  const isInWishlist = (id) => {
    return wishlist.some(
      (item) => item._id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};