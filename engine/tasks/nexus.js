const axios = require("axios");
const cheerio = require("cheerio");
const { makeConnection, makeCollection, makeSchema } = require("../database");
const { parseProduct, parseProductDetails } = require("../indexers/nexus");
const productSchema = require("../database/schemas/nexus/product");
const chartSchema = require("../database/schemas/nexus/chart");
const supplierSchema = require("../database/schemas/nexus/supplier");
const trendSchema = require("../database/schemas/nexus/trend");

const Categories = [
  "Automobiles &amp; Motorcycles",
  "Beauty &amp; Health",
  "Consumer Electronics &amp; Accessories",
  "General Clothing &amp; Accessories",
  "Hobbies &amp; Toys",
  "Home &amp; Garden",
  "Jewelry",
  "Men's Clothing &amp; Accessories",
  "Mother &amp; Kids",
  "Other",
  "Pets Products",
  "Seasonal",
  "Sports &amp; Entertainment",
  "Watches",
  "Women's Clothing &amp; Accessories",
];

const Subjects = [
  "hotproducts",
  "trendingproducts",
  "ontherise",
  "newproducts",
  "nexus",
];

class NexusTask {
  init = async () => {
    this.Product = await makeCollection(
      "nexus_products",
      await makeSchema(productSchema)
    );
    this.Chart = await makeCollection(
      "nexus_charts",
      await makeSchema(chartSchema)
    );
    this.Trend = await makeCollection(
      "nexus_trends",
      await makeSchema(trendSchema)
    );
    this.Supplier = await makeCollection(
      "nexus_suppliers",
      await makeSchema(supplierSchema)
    );
    this.limit = 2;
  };

  fetch = async (_subject = "nexus", category, page = 1) => {
    let keys = [],
      products = [],
      charts = [],
      trends = [],
      suppliers = [];
    const subject = {};
    switch (_subject) {
      case "newproducts":
        subject.new = true;
        break;
      case "ontherise":
        subject.rise = true;
        break;
      case "trendingproducts":
        subject.trend = true;
        break;
      case "hotproducts":
        subject.hot = true;
        break;
      default:
        break;
    }
    keys = await this.Product.find({}).distinct("productId");
    try {
      let response = await axios.post(`${process.env.API_URL}/products`, {
        page: page,
        currentPagingPage: page,
        category,
        amode: "",
        type: "shp-" + _subject,
        sub: _subject,
        infinite: true,
        location: "nexus",
        order: "byNexusRank:desc",
        shippingFrom: [],
        extraSearch: {
          sub: "shp-hotproducts,shp-trendingproducts,shp-ontherise,shp-newproducts",
          where: "shp-nexus",
        },
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
        response = await axios.post(`${process.env.API_URL}/research`, {
          matchid: product.nexusResearchMatchId,
          product_id: product.nexusResearchProductId,
        });
        const productDetails = parseProductDetails(cheerio.load(response.data));
        products.push({
          ...product,
          ...productDetails,
          productCategories: [category],
          ...subject,
        });
        let chart = (
          await axios.post(`${process.env.API_URL}/chart`, {
            productId: product.productId,
          })
        ).data;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        response = await axios.post(`${process.env.API_URL}/chart`, {
          product_id: product?.nexusResearchProductId,
        });
        charts.push({ ...response.data, productId: product?.productId });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        response = await axios.post(`${process.env.API_URL}/trends`, {
          matchid: product.nexusResearchMatchId,
        });
        if (!response) continue;
        trends.push({ ...response.data, productId: product?.productId });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        response = await axios.post(`${process.env.API_URL}/suppliers`, {
          image_url: product.imageURL,
          options: JSON.stringify({}),
        });
        suppliers.push({
          ...response.data?.data,
          productId: product?.productId,
        });
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
      this.Trend.insertMany(trends)
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
      this.Supplier.insertMany(suppliers)
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
      for (let j = 0; j < Subjects.length; j++) {
        for (let k = 0; k < Categories.length; k++) {
          console.log(Subjectsubjects[j], Categories[k], i);
          await fetch(Subjects[j], Categories[k], i);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
    this.limit += 2;
    if (this.limit > 10) this.limit = 0;
  };
}

module.exports = new NexusTask();
