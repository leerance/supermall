import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve) => {
      let oldProduct = null;
      if (context.state.cartList.length > 0)
        oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve("当前的商品数量+1")
      } else {
        payload.count = 1
        payload.checked = true
        context.commit(ADD_TO_CART, payload)
        resolve("添加了新的商品")
      }
    })
  }
}
