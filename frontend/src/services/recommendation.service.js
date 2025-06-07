const recommendationService = {
  getRecommendations: (
    formData = { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: '' },
    products
  ) => {
    const { selectedFeatures, selectedPreferences, selectedRecommendationType } = formData;

    const scoredProducts = products.map((product, index) => {
      const preferenceMatches = product.preferences.filter(p =>
        selectedPreferences.includes(p)
      ).length;

      const featureMatches = product.features.filter(f =>
        selectedFeatures.includes(f)
      ).length;

      const score = preferenceMatches + featureMatches;

      return { ...product, score, originalIndex: index };
    });

    if (selectedRecommendationType === 'SingleProduct') {
      const validProducts = scoredProducts.filter(p => p.score > 0);
      if (validProducts.length === 0) return [];

      const maxScore = Math.max(...validProducts.map(p => p.score));

      const topProducts = validProducts.filter(p => p.score === maxScore);

      const lastProduct = topProducts.reduce((last, current) =>
        current.originalIndex > last.originalIndex ? current : last
      , topProducts[0]);

      return [lastProduct];
    }

    return scoredProducts
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score);
  }
};

export default recommendationService;
