const initialState = {
	articles: [],
	article: {}
};

export default (state = initialState, action) => {
	switch(action.type){
		case 'GET_ARTICLES':
			return {
				...state,
				articles: action.articles
			}
		case 'GET_ARTICLE':
			return {
				...state,
				article: action.article
			}
		case 'CLAP_ARTICLE':
			let article = Object.assign({}, state.article);
			article.claps++;
			return {
				...state,
				article: article
			}
		default:
			return state;
	}
};