export const productValidation = (product: {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  colors: string[];
}) => {
  const errors: {
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    colors: string[];
  } = {
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    colors: [],
  };

  if (
    product.title.trim() === "" ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title =
      "Title is required and should be between 10 and 80 characters.";
  }
  if (
    product.description.trim() === "" ||
    product.description.length < 20 ||
    product.description.length > 200
  ) {
    errors.description =
      "Description is required and should be between 20 and 200 characters.";
  }
  if (product.price.trim() === "" || isNaN(Number(product.price))) {
    errors.price = "Price is required and should be a valid number.";
  }
  if (product.imageUrl.trim() === "") {
    errors.imageUrl = "Image URL is required.";
  }
    if (!product.colors || product.colors.length === 0) {
      errors.colors = ["At least one color must be selected."];
    }

  return errors;
};
