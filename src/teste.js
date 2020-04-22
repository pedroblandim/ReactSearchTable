let data = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];
function categorize(item){
    let cats = {}
    let cat
    for (idx in item){
        obj = item[idx];
        cat = obj.category;
        let {price, stocked, name} = obj;
        partialObj = {price, stocked, name}
        if (cat in cats){
            cats[cat].push(partialObj);
        }
        else{
            cats[cat] = [partialObj];
        }
    }
    return cats;
  }
let cat = categorize(data);
console.log(cat)
// cat.map(item => console.log(item))
