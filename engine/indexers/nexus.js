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
    let productBadge = $($element)
      .find(".product-list-box__header .product-list-box__badge")
      .text()
      .replace("\n", "")
      .trim();
    let nexusResearchProductId = $($element)
      .find(".product-list-box__content a.nexusResearch")
      .attr("data-product_id");
    let nexusResearchMatchId = $($element)
      .find(".product-list-box__content a.nexusResearch")
      .attr("data-matchid");
    let nexusResearchLocation = $($element)
      .find(".product-list-box__content a.nexusResearch")
      .attr("data-location");
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
    let productFlags = $($element)
      .find(".product-list-box__flags svg")
      .map((i, el) => $(el).attr("title").replace("Ships from ", ""))
      .toArray();
    let ships = $($element).find(".product-list-box__ships svg");
    let productShips = [];
    ships.map((i, el) =>
      productShips.push(
        $(el).attr("data-original-title").replace("Ships from ", "").trim()
      )
    );

    let productSales = $($element)
      .find(".product-list-box__stats .product-list-box__sales .color_subdued")
      .text()
      .replace("\n", "")
      .trim();
    productPrice = $($element)
      .find(
        ".product-list-box__stats-detailed .product-list-box__orders .color_subdued"
      )
      .text()
      .replace("\n", "")
      .trim();
    let productOrders = $($element)
      .find(
        ".product-list-box__stats-detailed .product-list-box__sales .color_subdued"
      )
      .text()
      .replace("\n", "")
      .trim();
    let productSite = $($element)
      .find(".product-list-box__site-link div span")
      .text()
      .trim();

    return {
      imageURL,
      videoURL,
      productId,
      productType,
      productBadge,
      nexusResearchProductId,
      nexusResearchMatchId,
      nexusResearchLocation,
      productName,
      productFlags,
      productShips,
      productRating,
      productPrice,
      productSales,
      productOrders,
      productSite,
      _productPrice: conv2number(productPrice),
      _productSales: conv2number(productSales),
      _productOrders: conv2number(productOrders),
    };
  },
  parseProductDetails: ($, $element) => {
    let videoURL = $(
      "main > div.modal__product > div.modal__product-img.modal__product-img_big > div.modal__product-video-wrap video"
    ).attr("src");
    let videoPosterURL = $(
      "main > div.modal__product > div.modal__product-img.modal__product-img_big > div.modal__product-video-wrap video"
    ).attr("poster");
    let imageURL = $(
      "main > div.modal__product > div.modal__product-img.modal__product-img_big > img"
    ).attr("src");
    let productName = $(
      "main > div.modal__product > div.modal__product-content > div.modal__product-describe > div.modal__product-top > div.modal__product-header.mb-3 > h1"
    )
      .text()
      .replace("\n", "")
      .trim();
    let addedLabel = $(
      "main > div.modal__product > div.modal__product-content > div.modal__product-describe > div.modal__product-top > div.modal__product-header.mb-3 > div > span.modal__product-label.mr-5.d-flex.align-items-center > span"
    )
      .text()
      .replace("\n", "")
      .trim();
    let foundLabel = $(
      "main > div.modal__product > div.modal__product-content > div.modal__product-describe > div.modal__product-top > div.modal__product-header.mb-3 > div > span:nth-child(2)"
    )
      .text()
      .replace("\n", "")
      .trim();
    let productOrders = conv2number(
      $(
        "main > div.modal__product > div.modal__product-content > div.modal__badges > div > div > div:nth-child(1) > div > div:nth-child(2) > h4"
      )
        .text()
        .trim()
    );
    let productPrice = conv2number(
      $(
        "main > div.modal__product > div.modal__product-content > div.modal__badges > div > div > div:nth-child(2) > div > div:nth-child(2) > h4"
      )
        .text()
        .trim()
    );
    let productSellingPrice = conv2number(
      $(
        "main > div.modal__product > div.modal__product-content > div.modal__badges > div > div > div:nth-child(3) > div > div:nth-child(2) > h4"
      )
        .text()
        .trim()
    );
    let productProfitMargin = conv2number(
      $(
        "main > div.modal__product > div.modal__product-content > div.modal__badges > div > div > div:nth-child(4) > div > div:nth-child(2) > h4"
      )
        .text()
        .trim()
    );
    let productTotalSalesCount = conv2number(
      $(
        "main > div.modal__product > div.modal__product-content > div.modal__badges > div > div > div:nth-child(5) > div > div:nth-child(2) > h4"
      )
        .text()
        .trim()
    );
    let productSupplieCount = conv2number(
      $(
        "main > div.modal__product > div.modal__product-content > div.modal__badges > div > div > div:nth-child(6) > div > div:nth-child(2) > h4"
      )
        .text()
        .trim()
    );
    let productStoreSellingCount = conv2number(
      $(
        "main > div.modal__product > div.modal__product-content > div.modal__badges > div > div > div:nth-child(7) > div > div:nth-child(2) > h4"
      )
        .text()
        .trim()
    );
    let productInsightRating = $(
      "main > div.modal__product > div.modal__product-content > div.modal__badges > div > div > div:nth-child(8) > div > div:nth-child(2) > h4"
    )
      .text()
      .trim();
    let productFaceBookAds = $(
      "main > div.modal__product > div.modal__product-content > div.modal__buttons > div > div > div:nth-child(1) > a"
    ).attr("href");

    let productAmazonAds = $(
      "main > div.modal__product > div.modal__product-content > div.modal__buttons > div > div > div:nth-child(2) > a"
    ).attr("href");

    let productYoutubeAds = $(
      "main > div.modal__product > div.modal__product-content > div.modal__buttons > div > div > div:nth-child(3) > a"
    ).attr("href");
    let productOrdersStatistics = {
      month6: {
        v: conv2number(
          $(
            "main > div.container-fluid.p-0 > div > div:nth-child(2) > div > div.modal__card-body > div:nth-child(1) > span.p2.text_size_m"
          )
            .text()
            .trim()
        ),
        m:
          $(
            "main > div.container-fluid.p-0 > div > div:nth-child(2) > div > div.modal__card-body > div:nth-child(1) > span.icon.color_green"
          ).find(".ri-arrow-up-s-fill").length > 0
            ? 1
            : 0,
      },
      days30: {
        v: conv2number(
          $(
            "main > div.container-fluid.p-0 > div > div:nth-child(2) > div > div.modal__card-body > div:nth-child(2) > span.p2.text_size_m"
          )
            .text()
            .trim()
        ),
        m:
          $(
            "main > div.container-fluid.p-0 > div > div:nth-child(2) > div > div.modal__card-body > div:nth-child(2) > span.icon.color_green"
          ).find(".ri-arrow-up-s-fill").length > 0
            ? 1
            : 0,
      },
      days14: {
        v: conv2number(
          $(
            "main > div.container-fluid.p-0 > div > div:nth-child(2) > div > div.modal__card-body > div:nth-child(3) > span.p2.text_size_m"
          )
            .text()
            .trim()
        ),
        m:
          $(
            "main > div.container-fluid.p-0 > div > div:nth-child(2) > div > div.modal__card-body > div:nth-child(3) > span.icon.color_green"
          ).find(".ri-arrow-up-s-fill").length > 0
            ? 1
            : 0,
      },
      days7: {
        v: conv2number(
          $(
            "main > div.container-fluid.p-0 > div > div:nth-child(2) > div > div.modal__card-body > div:nth-child(4) > span.p2.text_size_m"
          )
            .text()
            .trim()
        ),
        m:
          $(
            "main > div.container-fluid.p-0 > div > div:nth-child(2) > div > div.modal__card-body > div:nth-child(4) > span.icon.color_green"
          ).find(".ri-arrow-up-s-fill").length > 0
            ? 1
            : 0,
      },
      daily: {
        v: conv2number(
          $(
            "main > div.container-fluid.p-0 > div > div:nth-child(2) > div > div.modal__card-body > div:nth-child(5) > span.p2.text_size_m"
          )
            .text()
            .trim()
        ),
        m:
          $(
            "main > div.container-fluid.p-0 > div > div:nth-child(2) > div > div.modal__card-body > div:nth-child(5) > span.icon.color_green"
          ).find(".ri-arrow-up-s-fill").length > 0
            ? 1
            : 0,
      },
    };
    let productInsights = [];
    let productInsights_ = $(
      "#product-insights > div > div.modal__card-body > ul"
    ).find("li");
    productInsights_.map((i, el) => {
      let $el = $(el);
      productInsights.push({
        title: $el.text().trim(),
        status: $el.attr("class").includes("modal__card-item_bad")
          ? "bad"
          : "good",
      });
    });
    let productCompetition = $(
      "main > div.container-fluid.p-0 > div > div:nth-child(4) > div > div > div:nth-child(1) > div.modal__half-chart > script"
    ).html();

    let htmlDOM = `
        $.prototype.halfChart = function(d){
          return d
        }
      ${productCompetition}
      
  `;
    productCompetition = eval(htmlDOM);
    let productTopCustomerCountry = $(
      "main > div.container-fluid.p-0 > div > div:nth-child(4) > div > div > div:nth-child(2) > div.modal__donut-chart > script"
    ).html();
    htmlDOM = `
        $.prototype.donutChart = function(d){
          return d
        }
      ${productTopCustomerCountry}
  `;
    productTopCustomerCountry = eval(htmlDOM);
    let productStoresCountryBreakdown = $(
      "main > div.container-fluid.p-0 > div > div:nth-child(5) > div > div.modal__card-part_4 > div.modal__card-body > div > script"
    ).html();
    htmlDOM = `
        $.prototype.donutChart = function(d){
          return d
        }
      ${productStoresCountryBreakdown}
      
  `;
    productStoresCountryBreakdown = eval(htmlDOM);
    let productSellingStores = [];
    let productSellingStores_ = $(
      "main > div.container-fluid.p-0 > div > div:nth-child(5) > div > div.modal__card-part_8 > div.modal__card-body > div:nth-child(1) > div"
    ).find("div.modal__link");
    productSellingStores_.map((i, el) => {
      let $el = $(el);
      if ($el.attr("class").includes("color_muted")) return $el.text().trim();
      let location = $el
        .find("img[data-original-title='Store Location']")
        .attr("src")
        ?.replace("/dashboard/assets/images/flags/", "")
        .replace(".png", "");
      let store = {
        title: $el.find("a span.storeIntel").attr("data-url"),
        link: $el.find("a:nth-child(3)").attr("href"),
      };
      let facebook = $el.find("a:nth-child(4)").attr("href");
      productSellingStores.push({
        location,
        store,
        facebook,
      });
    });
    let productSupplies = [];
    let productSupplies_ = $(
      "main > div.container-fluid.p-0 > div > div:nth-child(5) > div > div.modal__card-part_8 > div.modal__card-body > div:nth-child(2)"
    ).find(".modal__link");
    productSupplies_.map((i, el) => {
      let $el = $(el);
      let location = $el
        .find("img")
        .attr("src")
        ?.replace("/dashboard/assets/images/", "")
        .replace(".png", "");
      let supplier = {
        title: $el.find("a").eq(0).text().trim(),
        link: $el.find("a").eq(0).attr("href"),
      };
      let price = conv2number($el.find(".modal__supplier_price").text());
      let rating = conv2number($el.find(".rating-dynamic").attr("rating"));
      productSupplies.push({
        location,
        supplier,
        price,
        rating,
      });
    });
    return {
      imageURL,
      videoURL,
      videoPosterURL,
      productName,
      addedLabel,
      foundLabel,
      productOrders,
      productPrice,
      productSellingPrice,
      productProfitMargin,
      productTotalSalesCount,
      productSupplieCount,
      productStoreSellingCount,
      productInsightRating,
      productFaceBookAds,
      productAmazonAds,
      productYoutubeAds,
      productOrdersStatistics,
      productInsights,
      productCompetition,
      productTopCustomerCountry,
      productStoresCountryBreakdown,
      productSellingStores,
      productSupplies,
    };
  },
};
