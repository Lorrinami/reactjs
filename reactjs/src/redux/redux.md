Redux’s key ideas  Redux是Flux的实现，应用于Redux的概念也适用于Flux
1.所有应用程序的数据都在一个称为state的单一数据结构被store持有
2.应用读取store中的state
3.在store之外，state从未发生过改变
4.view发出actions描述发生了什么
5.一个新的state是通过旧的state和一个被称为reducer函数的action生成
Reducers必须是纯函数

incrementAction->Dispatcher->Store->View

在Redux中，store负责维护state和接受view中的操作。只有store才有权使用reducer:

createStore():提供两个方法
dispatch:我们如何向store发送操作
getState:读取当前的state值