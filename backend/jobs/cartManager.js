const cron = require("node-cron");
const moment = require("moment-timezone");
const { Cart, Product } = require("../models");

exports.initScheduledJobs = () => {
  // Job to remove all expired carts and manage inventory
  const expiredCartsJob = cron.schedule(
    "0 */2 * * *",
    async () => {
      // Current date/time in unix format
      const current = moment().tz("America/Chicago").unix();
      console.log(current, "running expired carts task every 2 hours");

      // Calculate the time to filter cart query
      const seventyTwoHoursAgo = current - 259200; // 259200 seconds in 72h
      const expiredTime = moment.unix(seventyTwoHoursAgo).format();

      // Query for all carts to be expired
      const carts = await Cart.find({
        status: "active",
        updatedAt: { $lte: expiredTime },
      })
        .select(["status", "items.totalProductQuantity"])
        .populate({
          path: "items.product",
          select: ["stockRemaining"],
        })
        .exec();

      // Loop through all carts and set status to expired
      for (const cart of carts) {
        cart.status = "expired";
        // Loops through all items and unreserves the products
        for (const { product, totalProductQuantity } of cart.items) {
          console.log(product);
          console.log(totalProductQuantity);
          await Product.findByIdAndUpdate(product.id, {
            $inc: { stockRemaining: totalProductQuantity },
          });
        }
        await cart.save();
      }
    },
    {
      timezone: "America/Chicago",
    }
  );

  // Start Jobs
  expiredCartsJob.start();
};
