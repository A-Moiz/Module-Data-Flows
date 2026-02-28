let order = [
  { itemName: "Hot cakes", quantity: 1, unitPricePence: 232 },
  { itemName: "Apple Pie", quantity: 2, unitPricePence: 139 },
  { itemName: "Egg McMuffin", quantity: 1, unitPricePence: 280 },
  { itemName: "Sausage McMuffin", quantity: 1, unitPricePence: 300 },
  { itemName: "Hot Coffee", quantity: 2, unitPricePence: 100 },
  { itemName: "Hash Brown", quantity: 4, unitPricePence: 40 },
];

function orderReceipt({ quantity, itemName, unitPricePence }) {
  let total = ((unitPricePence * quantity) / 100).toFixed(2);
  console.log(
    String(quantity).padEnd(9),
    itemName.padEnd(18),
    total.padEnd(20)
  );
}

console.log("QTY".padEnd(10) + "ITEM".padEnd(20) + "TOTAL".padEnd(20));
order.forEach(orderReceipt);
