const conv2number = require("../utils/conv2number");

module.exports = {
  parseProduct: ($, $element) => {
    let imageURL = $($element)
      .find(".product-list-box__header .product-list-box__image img")
      .attr("src");
    let videoURL = $($element)
      .find(".product-list-box__header .product-list-box__video-container")
      .attr("src");
    let productId = $($element)
      .find(".product-list-box__header button.product-list-box__fave")
      .attr("data-productid");
    let productType = $($element)
      .find(".product-list-box__header button.product-list-box__fave")
      .attr("data-producttype");
    let productLink = $($element)
      .find(".product-list-box__content a.product-list-box__link")
      .attr("href");
    let productAmazonLink = $($element)
      .find(
        "footer.product-list-box__footer-detailed.product-list-box-footer > a:nth-child(2)"
      )
      .attr("href");
    let productAliexpressLink = $($element)
      .find(
        "footer.product-list-box__footer-detailed.product-list-box-footer > a:nth-child(3)"
      )
      .attr("href");
    let productName = $($element)
      .find(".product-list-box__content a.product-list-box__link")
      .text()
      .replace("\n", "")
      .trim();
    let productRating = $($element)
      .find(".product-list-box__rating .product-list-box__rating-mark")
      .text()
      .replace("\n", "")
      .trim();
    let productPrice = $($element)
      .find(".product-list-box__price .color_pink")
      .text()
      .replace("\n", "")
      .trim();
    let productOrders = $($element)
      .find(".product-list-box__stats .product-list-box__orders .color_subdued")
      .text()
      .replace("\n", "")
      .trim();
    let productSales = $($element)
      .find(".product-list-box__stats .product-list-box__sales .color_subdued")
      .text()
      .replace("\n", "")
      .trim();
    let productOrdersPrice = $($element)
      .find(
        ".product-list-box__stats-detailed .product-list-box__orders .color_subdued"
      )
      .text()
      .replace("\n", "")
      .trim();
    let productOrdersRanking = $($element)
      .find(
        ".product-list-box__stats-detailed .product-list-box__sales .color_subdued"
      )
      .text()
      .replace("\n", "")
      .trim();
    let productDaily = $($element)
      .find(".product-list-box__stats-detailed .w-100 [data-toggle='helptip']")
      .eq(0)
      .find(".color_green")
      .text()
      .replace("\n", "")
      .trim();
    let productDailyRank = $($element)
      .find(
        "div.product-list-box__stats-detailed > div:nth-child(2) > div.text-right > div"
      )
      .text();
    productDailyRank = productDailyRank[0]
      .replace("Rank_Main", "")
      .replace("\n", "")
      .trim();
    _productDailyRank = conv2number(productDailyRank);
    let productOverall = $($element)
      .find(".product-list-box__stats-detailed .w-100 [data-toggle='helptip']")
      .eq(1)
      .find(".color_critical")
      .text()
      .replace("\n", "")
      .trim();
    let productOverallRank = $($element)
      .find(
        "div.product-list-box__stats-detailed > div:nth-child(3) > div.text-right > div"
      )
      .text()
      .replace("\n", "")
      .replace("Rank_Main", "")
      .trim();
    _productOverallRank = conv2number(productOverallRank);

    return {
      imageURL,
      videoURL,
      productId,
      productType,
      productLink,
      productAmazonLink,
      productAliexpressLink,
      productName,
      productRating,
      productPrice,
      productSales,
      productOrdersPrice,
      productOrdersRanking,
      productDaily,
      productDailyRank,
      productOverall,
      productOverallRank,
      _productPrice: conv2number(productPrice),
      _productSales: conv2number(productSales),
      _productOrdersPrice: conv2number(productOrdersPrice),
      _productOrdersRanking: conv2number(productOrdersRanking),
      _productDaily: conv2number(productDaily),
      _productDailyRank: conv2number(productDailyRank),
      _productOverall: conv2number(productOverall),
      _productOverallRank: conv2number(productOverallRank),
    };
  },
};
