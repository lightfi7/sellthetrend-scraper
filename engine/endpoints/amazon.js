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
      res.status(500).send(err);
    }
  });
  app.post("/api/chart", async (req, res) => {
    let params = {
      type: "amz",
      product_id: "B0CN2K4796",
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
      res.status(500).send(err);
    }
  });
};
