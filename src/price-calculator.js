"use strict";

const users = [
  {
    type: "private",
    discount: 0,
  },
  {
    type: "corporate",
    discount: 5,
  },
];

const products = [
  {
    type: "new",
    additionalPrice: 25,
  },
  {
    type: "existing",
    additionalPrice: 35,
  },
];

const calculatePrice = (userType, productType, price, publishedDate) => {
  const productDetails = findItemByType(products, productType);
  const userDetails = findItemByType(users, userType);

  if (!productDetails || !userDetails) return 0;

  const { type, additionalPrice } = productDetails;

  const firstDateDiscount =
    checkIfNewProduct(type) && checkIfDateToday(publishedDate) ? 10 : 0;
  const finalDiscount = firstDateDiscount + userDetails.discount;

  return price + additionalPrice - finalDiscount;
};

// Helpers
function findItemByType(items, type) {
  return items.find((item) => item.type === type);
}

function checkIfNewProduct(type) {
  return type === "new";
}

function checkIfDateToday(date) {
  return date.toDateString() === new Date().toDateString();
}
