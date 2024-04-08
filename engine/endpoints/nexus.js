module.exports = (app, page) => {
  app.post("/api/products", async (req, res) => {
    let params = {
      infinite: true,
      rowsPerPage: 32,
      type: "amz",
      what: "Results",
      location: "",
      category: "",
      currentPagingPage: 1,
      filters: [],
      order: "byDailyRankingChange:most_ranking_increase",
      search: "",
      page: 1,
    };
    params = { ...params, ...req.body };

    let data = {
      params,
    };
    try {
      const respose = await page.evaluate((data) => {
        return new Promise((resolve, reject) => {
          $.ajax({
            method: "POST",
            url: "https://www.sellthetrend.com/dashboard/ajax/producs/list",
            data: data.params,
            success: function (data) {
              resolve(data);
            },
            error: function (err) {
              reject();
            },
          });
        });
      }, data);

      res.send(respose);
    } catch (err) {
      console.log(err);
      res.send();
    }
  });

  app.post("/api/chart", async (req, res) => {
    let params = {
      type: "ali-nexus",
      product_id: "1005005440852891",
      labels: ["Ranking", "Rating", "Price", "Reviews"],
    };
    params = { ...params, ...req.body };
    let data = {
      params,
    };
    try {
      const respose = await page.evaluate((data) => {
        return new Promise((resolve, reject) => {
          $.ajax({
            method: "POST",
            url: "https://www.sellthetrend.com/dashboard/ajax/getBigChart",
            data: data.params,
            success: function (data) {
              resolve(data);
            },
            error: function (err) {
              reject();
            },
          });
        });
      }, data);
      res.send(respose);
    } catch (err) {
      console.log(err);
      res.send();
    }
  });

  app.post("/api/research", async (req, res) => {
    let params = {
      location: "nexus",
      matchid: "B0CNHY6324",
      product_id: "1005004929183488",
      utm_location: null,
    };
    params = { ...params, ...req.body };
    let data = {
      params,
    };
    try {
      const respose = await page.evaluate((data) => {
        return new Promise((resolve, reject) => {
          $.ajax({
            method: "POST",
            url: "https://www.sellthetrend.com/dashboard/ajax/producs/show",
            data: data.params,
            success: function (data) {
              resolve(data);
            },
            error: function (err) {
              reject();
            },
          });
        });
      }, data);

      res.send(respose);
    } catch (err) {
      console.log(err);
      res.send();
    }
  });

  app.post("/api/trends", async (req, res) => {
    let params = {
      type: "stores",
      matchid: "B0CNHY6324",
      date_range: "alltime",
    };
    params = { ...params, ...req.body };
    let data = {
      params,
    };
    try {
      const respose = await page.evaluate((data) => {
        return new Promise((resolve, reject) => {
          $.ajax({
            method: "POST",
            url: "https://www.sellthetrend.com/dashboard/ajax/getStoresTrends",
            data: data.params,
            success: function (data) {
              resolve(data);
            },
            error: function (err) {
              reject();
            },
          });
        });
      }, data);

      res.send(respose);
    } catch (err) {
      console.log(err);
      res.send();
    }
  });

  app.post("/api/suppliers", async (req, res) => {
    let params = {
      image_url:
        "https://cdn.shopify.com/s/files/1/1965/7261/products/Fashion-Women-s-Sunglasses-Square-Sunglasses-Brand-Designer-High-Quality-Retro-Large-Frame-Sunglasses-Retro-Gafas.webp?v=1700129353",
      options: {},
    };
    params = { ...params, ...req.body };
    let data = {
      params,
    };
    try {
      const respose = await page.evaluate((data) => {
        return new Promise((resolve, reject) => {
          $.ajax({
            method: "POST",
            url: "https://www.sellthetrend.com/dashboard/ai_supplier/list",
            data: data.params,
            success: function (data) {
              resolve(data);
            },
            error: function (err) {
              reject();
            },
          });
        });
      }, data);

      res.send(respose);
    } catch (err) {
      console.log(err);
      res.send();
    }
  });
};
