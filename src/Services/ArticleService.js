//Declarations
const API_KEY = "e4f629e10b1a4dc1aeb7d2bcaa3d430a";

//Functions
export const getArticlesByCity = async (city) => {
    const searchCity = city.toLowerCase()
    const url = `https://newsapi.org/v2/everything?q=${searchCity}&apiKey=${API_KEY}`;
    const articles = await fetch(url);
    return articles;

} 