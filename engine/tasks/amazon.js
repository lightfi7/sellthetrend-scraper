const axios = require("axios");
const cheerio = require("cheerio");
const { makeConnection, makeCollection, makeSchema } = require("../database");
const { parseProduct } = require("../indexers/amazon");
const productSchema = require("../database/schemas/amazon/product");
const chartSchema = require("../database/schemas/amazon/chart");

const Categories = [
  "All Electronics",
  "Amazon Home",
  "Appliances",
  "Baby",
  "Health & Personal Care",
  "Industrial & Scientific",
  "Pet Supplies",
  "Tools & Home Improvement",
  "Air conditioner",
  "Android",
  "Baby",
  "Baby feeding",
  "Backpack",
  "Bathroom Accessories",
  "Beach",
  "Beard Accessories",
  "Beauty",
  "Bodybuilding",
  "Bracelet",
  "Buddhism",
  "Butterfly",
  "Camping",
  "Cars",
  "Cats",
  "Christianity",
  "Christmas",
  "Cleaning",
  "Coffee",
  "Cooking",
  "Couples",
  "Cycling",
  "DIY & Lifehacks",
  "Dogs",
  "Drawing",
  "Fishing",
  "Fitness",
  "Fitness Tracker",
  "Gaming",
  "Gardening",
  "Golf",
  "Gothic fashion",
  "Guitar",
  "Hair Products",
  "Halloween",
  "Heating",
  "Hiking",
  "Home decor",
  "Humidifier",
  "Hunting",
  "Iphone",
  "Iphone screen protector",
  "Jewelry",
  "Kids Toys",
  "Kitchen",
  "Lamp (household item)",
  "Luxury Watches",
  "Massage",
  "Men's Fashion",
  "Microphones",
  "Motorcycle",
  "Music",
  "Nails",
  "Natural health",
  "Necklace",
  "Novelty",
  "Painting",
  "Phone Accessories",
  "Phone cable",
  "Quarantine (Home Essentials)",
  "Robot Cleaner",
  "Scarf",
  "School Bag",
  "Skin Care",
  "Smart Watch",
  "STEM Toys",
  "Storage (holders, containers)",
  "Summer",
  "Tactical",
  "Tea",
  "Teeth Whitening",
  "Travel",
  "Watches",
  "Water Bottles",
  "Weight Loss",
  "Whiskey",
  "Wine",
  "Winter",
  "Women Sunglasses",
  "Women Wallet",
  "Womens Bags",
  "Womens Fashion",
];

class AmazonTask {
  init = async () => {
    this.Product = await makeCollection(
      "amazon_products",
      await makeSchema(productSchema)
    );
    this.Chart = await makeCollection(
      "amazon_charts",
      await makeSchema(chartSchema)
    );
    this.limit = 2;
  };

  fetch = async (category, page) => {
    let keys = [],
      products = [],
      charts = [];
    keys = await this.Product.find({}).distinct("productId");
    try {
      const response = await axios.post(`${process.env.API_URL}/products`, {
        page: page,
        category: category,
      });
      const $ = cheerio.load(response.data);
      const elements = $('div[data-track="product wrapper"]');
      for (let j = 0; j < elements.length; j++) {
        let element = $(elements[j]);
        let product = parseProduct($, element);
        if (
          product.imageURL == null ||
          product.imageURL == "" ||
          product.imageURL == undefined
        )
          continue;
        if (keys.includes(product.productId)) {
          Product.findOne({ productId: product.productId })
            .then(async (product_) => {
              product_.productCategories = [
                ...product_.productCategories,
                category,
              ];
              await product_.save();
            })
            .catch((err) => console.log(err));
          console.log(">>", product.productId);
          continue;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let chart = (
          await axios.post(`${process.env.API_URL}/chart`, {
            productId: product.productId,
          })
        ).data;
        products.push({
          ...product,
          productCategories: [category],
        });
        charts.push({ ...chart, productId: product.productId });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      this.Product.insertMany(products)
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
      this.Chart.insertMany(charts)
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
      return true;
    } catch (err) {
      return false;
    }
  };

  run = async () => {
    for (let i = 1; i < this.limit; i++) {
      for (let c = 0; c < this.limit; c++) {
        console.log(Categories[c], i);
        await this.fetch(Categories[c], i);
      }
    }
    this.limit += 2;
    if (this.limit > 10) this.limit = 0;
  };
}

module.exports = new AmazonTask();
