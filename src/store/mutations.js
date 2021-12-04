import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHECK_CLICK,
  ALL_SET_CHECK
} from "./mutation-types";

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    payload.count = 1
    state.cartList.push(payload)
  },
  [CHECK_CLICK](state, payload) {
    let product = state.cartList.find(item => item.iid === payload)
    product.checked = !product.checked
  },
  [ALL_SET_CHECK](state, [payload, TOrF]) {
    console.log(TOrF);
    let product = state.cartList.find(item => item.iid === payload)
    product.checked = TOrF
  }

}