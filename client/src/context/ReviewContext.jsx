import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("reviews");

    return savedReviews
      ? JSON.parse(savedReviews)
      : {};
  });

  // Save reviews in localStorage
  useEffect(() => {
    localStorage.setItem(
      "reviews",
      JSON.stringify(reviews)
    );
  }, [reviews]);

  // Add a review
  const addReview = (productId, review) => {
    setReviews((prevReviews) => {
      const productReviews =
        prevReviews[productId] || [];

      return {
        ...prevReviews,

        [productId]: [
          ...productReviews,
          review,
        ],
      };
    });
  };

  // Get reviews for a product
  const getProductReviews = (productId) => {
    return reviews[productId] || [];
  };

  // Calculate average rating
  const getAverageRating = (productId) => {
    const productReviews =
      reviews[productId] || [];

    if (productReviews.length === 0) {
      return 0;
    }

    const total = productReviews.reduce(
      (sum, review) =>
        sum + Number(review.rating),
      0
    );

    return (
      total / productReviews.length
    ).toFixed(1);
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        getAverageRating,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  return useContext(ReviewContext);
};