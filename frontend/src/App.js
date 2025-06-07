import React, { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations] = useState([])

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[#06D9DF] text-center">
            Recomendador de Produtos RD Station
          </h1>
        </div>
      </header>

      <main className="pt-28 pb-16 px-4 flex justify-center">
        <div className="bg-white rounded-xl shadow-xl max-w-6xl p-8 w-5/6">
          <section className="mb-10 text-gray-700 text-lg flex flex-col items-center justify-center">
            <p>
              Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode encontrar uma variedade de produtos da RD Station, cada um projetado para atender às necessidades específicas do seu negócio.
            </p>
            <p className="mt-4">
              Use o formulário abaixo para selecionar suas preferências e funcionalidades desejadas e receba recomendações personalizadas de produtos que melhor atendam às suas necessidades.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
            <Form setRecommendations={setRecommendations} />
            <RecommendationList recommendations={recommendations} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
