import  {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLEnumType} from 'graphql';
import { NodeInterface, UserType, PostType } from "./src/type";
import * as loaders from "./src/loader";
import basicAuth from 'basic-auth-connect';
const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');

// const RootQuery = new GraphQLObjectType({//未添加用户验证
//     name: 'RootQuery',
//     description: 'The root query',
//     fields:{
//         node:{
//           type: NodeInterface,
//           args: {
//             id: {
//               type: new GraphQLNonNull(GraphQLID)
//             }
//           },
//           resolve(source, args){
//             return loaders.getNodeById(args.id)
//           }



//           //遍历抽象的语法树，性能优化逻辑
//           // resolve(source, args, context, info){
//           //   let includeFriends = false;
//           //   const selectionFragments = info.fieldNodes[0].selectionSet.selections;
//           //   const userSelections = selectionFragments.filter((selection) => {
//           //     return selection.kind === 'InlineFragment' && selection.typeCondition.name.value === 'User';
//           //   })
//           //   console.log(userSelections);
//           //   userSelections.forEach((selection) => {
//           //     selection.selectionSet.selections.forEach((innerSelection) => {
//           //       if(innerSelection.name.value === 'friends'){
//           //         includeFriends = true;
//           //       }
//           //     });
//           //   });
//           //   if(includeFriends) {
//           //     return loaders.getUserNodeWithFriends(args.id);
//           //   }else{
//           //     return loaders.getNodeById(args.id);
//           //   }
//           // }
//         }
//     }
// })

const LevelEnum = new GraphQLEnumType({
  name: 'PrivacyLevel',
  values: {
    PUBLIC: {
      value: 'public'
    },
    ACQUAINTANCE: {
      value: 'acquaintance'
    },
    FRIEND: {
      value: 'friend'
    },
    TOP: {
      value: 'top'
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'The root mutation',
  fields: {
    createPost: {
      type: PostType,
      args: {
        body: {
          type: new GraphQLNonNull(GraphQLString)
        },
        level: {
          type: new GraphQLNonNull(LevelEnum)
        }
      },
      resolve(source, args, context) {
        return loaders.createPost(args.body, args.level, context).then((nodeId) => {
          return loaders.getNodeById(nodeId);
        });
      }
    }
  }
})

const RootQuery = new GraphQLObjectType({//带验证用户的
  name: 'RootQuery',
  description: 'The root query',
  fields:{
      node:{
        type: NodeInterface,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve(source, args, context){
          return loaders.getNodeById(args.id)
        }
      },
  }
})



// const RootQuery = new GraphQLObjectType({//创建一个类型实例
//   name:'RootQuery',
//   description:'The root query',//描述其作用，可选
//   fields:{
//     viewer:{
//       type: GraphQLString,
//       resolve(){                //函数的返回字段
//         return 'viewer!';
//       }
//     },
//     node:{
      // type: GraphQLString,
      // args: {
      //   id: {
      //     type: new GraphQLNonNull(GraphQLID)
      //   }
      // },
      // resolve(source, args){
      //   return inMemoryStore[args.key]
      // }
//     }
//   }
// });
// let inMemoryStore = {};
// const RootMutation = new GraphQLObjectType({
//   name:"RootMutation",
//   description: 'The root mutation',
//   fields:{
//     setNode: {
//       type: GraphQLString,
//       args: {
//         id: {
//           type: new GraphQLNonNull(GraphQLID)
//         },
//         value: {
//           type: new GraphQLNonNull(GraphQLString),
//         }
//       },
//       resolve(source, args) {
//         console.log("test")
//         inMemoryStore[args.key] = args.value;
//         return inMemoryStore[args.key];
//       }
//     }
//   }
// });
// const Schema = new GraphQLSchema({//两个类型，query和mutation 另外注意声明顺序，const不会提升
//   query:RootQuery,
//   mutation:RootMutation,
// });

const Schema = new GraphQLSchema({//两个类型，query和mutation 另外注意声明顺序，const不会提升
  types:[UserType, PostType],
  query:RootQuery,
  mutation:RootMutation
});

app.use(basicAuth(function(user, pass){
  return user === '2' && pass === 'mypassword1';
}))
app.use('/graphql',graphqlHTTP((req) => {
  const context = 'users:' + req.user;

  return{schema:Schema, graphiql:true, context: context, pretty: true};
}));

// app.use('/graphql',graphqlHTTP({schema:Schema, graphiql:true}));//不能验证用户信息


app.listen(3000,() => {
   console.log({running:true})
});