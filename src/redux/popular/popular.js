const GET_DATA = 'popularStore/popular/GET_DATA';
const apiUrl = 'https://financialmodelingprep.com/api/v3/actives?apikey=5e87fe6c4fd732f68a02d0cb98866397';
const initialState = [];

const populateState = (payload) => ({
  type: GET_DATA,
  payload,
});

export const getData = () => (dispatch) => fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((company) => {
      const newCompany = {
        name: company.companyName,
        currentPrice: company.price,
        ticker: company.ticker,
        difPercentage: company.changesPercentage,
        changes: company.changes,
      };

      dispatch(populateState(newCompany));
    });
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return [
        ...state, action.payload,
      ];
    default:
      return state;
  }
};

export default reducer;
