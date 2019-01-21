const Untappd = require("untappd-js");
let client = new Untappd(process.env.ACCESS_TOKEN);
const deleteItem = require('./deleteItem');
const doIt = async function() {
  try {
    console.log(new Date(), 'Requesting wishlist')
    let wishlist = await client.userWishList({USERNAME: 'orkj'})
    if (!wishlist.response.beers.items || !wishlist.response.beers.items.length) {
      throw new Error('No things on the wishlist!')
    }
    wishlist.response.beers.items.map(deleteItem.bind(null, client))
    return setTimeout(doIt, 1000)
  }
  catch (err) {
    if (err.response && err.response.status && err.response.status == 429) {
      console.log(new Date(), 'Waiting for an hour')
      return setTimeout(doIt, 60000 * 60)
    }
    throw err
  }
}
doIt()