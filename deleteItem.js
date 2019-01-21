module.exports = async function deleteItem(client, item) {
  let result = await client.removeFromWishList({bid: item.beer.bid})
}