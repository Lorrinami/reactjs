const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
import  {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID} from 'graphql';
const bodyParser = require('body-parser');

const RootQuery = new GraphQLObjectType({//创建一个类型实例
  name:'RootQuery',
  description:'The root query',//描述其作用，可选
  fields:{
    viewer:{
      type: GraphQLString,
      resolve(){                //函数的返回字段
        return 'viewer!';
      }
    },
    node:{
      type: GraphQLString,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(source, args){
        return inMemoryStore[args.key]
      }
    }
  }
});
let inMemoryStore = {};
const RootMutation = new GraphQLObjectType({
  name:"RootMutation",
  description: 'The root mutation',
  fields:{
    setNode: {
      type: GraphQLString,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        value: {
          type: new GraphQLNonNull(GraphQLString),
        }
      },
      resolve(source, args) {
        console.log("test")
        inMemoryStore[args.key] = args.value;
        return inMemoryStore[args.key];
      }
    }
  }
});
const Schema = new GraphQLSchema({//两个类型，query和mutation 另外注意声明顺序，const不会提升
  query:RootQuery,
  mutation:RootMutation,
});



app.use('/graphql',graphqlHTTP({schema:Schema, graphiql:true}));


app.listen(3000,() => {
   console.log({running:true})
});