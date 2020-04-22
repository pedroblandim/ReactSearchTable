import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function categorize(data){
  var cats = {}
  var cat
  for (let idx in data){
      let obj = data[idx];
      cat = obj.category;
      let {price, stocked, name} = obj;
      let partialObj = {price, stocked, name}
      if (cat in cats){
          cats[cat].push(partialObj);
      }
      else{
          cats[cat] = [partialObj];
      }
  }
  return cats;
}

function ProductCategoryRow(props){
  return (
    <tr>
      <th colSpan="2" >{props.category}</th>
    </tr>
  )
}

class ProductRow extends React.Component{
  constructor(props){
    super(props);
    this.name = props.product.name;
    this.price = props.product.price;
    this.stocked = props.product.stocked;
  }

  render(){
    return(
    <tr>
      <td style={{color:this.stocked ? 'black' : 'red' }} >{this.name}</td> 
      <td>{this.price}</td>
    </tr>
    )
  }
}

class ProductTable extends React.Component{
  render(){
    let items = categorize(this.props.products)
    var filter = this.props.filter

    var rows = (items => {
      let rows = []
      for (let cat in items){
        rows.push(<ProductCategoryRow category={cat} key={cat} />)
        let products = items[cat]
        .filter(item =>  ((item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) && (item.stocked || !this.props.stock)))
        .map(product =>  <ProductRow product={product} key={product.name} />);
        rows.push(products);
      }
      return rows
    })(items);

    return(
      <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço</th>
          <th>{this.props.search}</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
      </table>
    )
    
  }
}



class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleSearch(event){
    this.props.search(event.target.value)
  }
  handleCheck(event){
    this.props.filterStock(event.target.checked)
  }



  render(){
    return(
      <form className='search'>
        <input type='text' placeholder="Search..." value={this.props.texto} onChange={this.handleSearch} />
        <div>
        <input value={this.props.stock} onChange={this.handleCheck} type="checkbox"/>
        {' '}
        Only show products in stock
        </div>
      </form>
    )
  }
}

const data = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];



class FilterableProductTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {'search': '', 'stock': false};
    this.search = this.search.bind(this);
    this.filterStock = this.filterStock.bind(this);
  }
  search(value){
    this.setState({'search': value})
  }
  filterStock(value){
    this.setState({'stock': value})
  }

  render(){
    return(
    <div className='table' >
      <SearchBar texto={this.state.search} search={this.search} filterStock={this.filterStock} />
      <ProductTable products={data} filter={this.state.search} stock={this.state.stock} />
    </div>
    )}
}

function App(){

    return(
      <FilterableProductTable />
    )
  }


ReactDOM.render(<App />, document.getElementById('root'));