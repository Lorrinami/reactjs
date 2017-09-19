import React from 'react';
import './Product.css';
import '../src/semantic/semantic.css';
const Product = React.createClass({
    handUpVote:function(){
        this.props.onVote(this.props.id);
    },
    handDownVote:function(){
        this.props.onDownVote(this.props.id);
    },
    render(){
        return(
        <div>
            {this.props.name}
            <a className="blueText" onClick={this.handUpVote}>
            增加票数
            </a>
            <a className="redText" onClick={this.handDownVote}>
            减少票数
            </a>
            <span>  投票数为{this.props.vote}</span>
        </div>
        );
    }
});

export default Product;