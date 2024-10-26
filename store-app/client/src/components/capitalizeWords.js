export const capitalizeWords = (str) => {
  return str
    .split(" ") // Split the string by spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(" "); // Join the words back with spaces
};
