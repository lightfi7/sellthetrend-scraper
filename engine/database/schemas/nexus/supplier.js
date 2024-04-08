module.exports = {
  productId: { type: String, index: true, uniqure: true },
  choosen_shipping_method: String,
  choosen_shipping_method_mandatory: Boolean,
  matchingProducts: [],
  matchingProducts_count: Number,
  products: [],
  products_count: Number,
  shipping_methods: [],
};
