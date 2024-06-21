// cart-helper.js

export const handleItemAdded = (item) => {
    console.log("-->> item = ", item);
    console.warn(`${item.name} added to cart!`);
};

export const handleItemUpdated = (item) => {
    console.warn(`${item.name} updated in cart!`);
};

export const handleItemRemoved = (item) => {
    console.warn(`${item.name} removed from cart!`);
};
