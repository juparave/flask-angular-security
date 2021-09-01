// import the interface
import { Article } from '../../model/article';
import { ArticleAction, ArticleActionType } from '../actions/article.action';

//create a dummy initial state
const initialState: Array<Article> = [
  {
    id: 1,
    content: 'Computer Engineering',
    user_id: 1,
  },
];

export function articleReducer(
  state: Array<Article> = initialState,
  action: ArticleAction
) {
  switch (action.type) {
    case ArticleActionType.ADD_ITEM:
      return [...state, action.payload];
    default:
      return state;
  }
}