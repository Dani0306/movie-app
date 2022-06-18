const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'e9eaa400dfbd94844eaebb68b37c784c',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export default apiConfig