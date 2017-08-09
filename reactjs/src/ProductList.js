import React from "react";
import Product from "./Product";

const Data = [
  { children: 1, id: "581744", name: "1.开篇语", vote: 1 },
  {
    children: [
      { children: null, id: "581745", name: "2.1振动方程和振动周期", vote: 1 },
      { children: null, id: "581746", name: "2.2振动图象" }
    ],
    id: 2,
    name: "2.新知新讲",
    vote: 1
  },
  {
    children: [{ children: null, id: "581747", name: "3.1题一(简谐运动的公式和图像性)" }],
    id: 3,
    name: "3.金题精讲",
    vote: 1
  },
  { children: 4, id: "581748", name: "4.结束语", vote: 1 }
];
const ProductList = React.createClass({
  getInitialState: function() {
    return {
      products: [],
      orderFlag:true,
    };
  },
  componentDidMount: function() {
    this.updateState();
  },
  updateState: function() {
    const products = Data.sort((a, b) => {
        if(this.state.orderFlag){
            return b.vote - a.vote;
        }else{
            return a.vote-b.vote;
        }
    });
    this.setState({ products: products });
  },
  handleProductUpVote: function(productId) {
    Data.forEach(el => {
      if (el.id === productId) {
        el.vote = el.vote + 1;
        return;
      }
    });
    this.updateState();
    console.log(productId + "was upvoted.");
  },
  handleProductDownVote:function(productId){
      Data.forEach((el)=>{
        if(el.id===productId){
            el.vote=el.vote-1;
            return;
        }
      });
      this.updateState();
      console.log(productId+"was downvoted")
  },
  modifyOrde:function(){
    this.setState({ orderFlag:!this.state.orderFlag});
    this.updateState();
  },
  render: function() {
    const products = this.state.products.map((product, i) => {
      return (
        <Product
          name={product.name}
          onVote={this.handleProductUpVote}
          onDownVote={this.handleProductDownVote}
          id={product.id}
          vote={product.vote}
          key={product.id}
        />
      );
    });
    return (
      <div className="">
          <button onClick={this.modifyOrde}>调整排序</button>
        {products}
      </div>
    );
  }
});

export default ProductList;
