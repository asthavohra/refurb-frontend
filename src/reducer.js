export const initialState = {
  basket: [],
  user: null,
};
export const getBasketTotal = (basket) => {
  //reduce is a function it maps through basket and then tally up to total
  //everytime it loops through ,item price adds to the total amount and initial amount is going to be zero
  return basket?.reduce((amount, item) => parseFloat(item.price) + amount, 0);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SIGNOUT":
      return {
        ...state,
        basket: [],
        user: null,
      };
    case "SET_BASKET":
      return {
        ...state,
        basket: action.basket,
      };
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product(id:${action.id}) as its not in basket`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        basket: action.basket ?? [],
      };
    default:
      return state;
  }
};
export default reducer;
