import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

function Form({ setRecommendations }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const { getRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      (formData.selectedPreferences.length === 0 && formData.selectedFeatures.length === 0) ||
      !formData.selectedRecommendationType
    ) {
      alert('Por favor, selecione pelo menos uma preferência ou uma feature e escolha o tipo de recomendação');
      return;
    }

    const dataRecommendations = getRecommendations(formData);

    setRecommendations(dataRecommendations);
  };

  return (
    <div className="flex flex-col gap-4">
      <form
        className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <Preferences
          preferences={preferences}
          onPreferenceChange={(selected) =>
            handleChange('selectedPreferences', selected)
          }
        />
        <Features
          features={features}
          onFeatureChange={(selected) =>
            handleChange('selectedFeatures', selected)
          }
        />
        <RecommendationType
          onRecommendationTypeChange={(selected) =>
            handleChange('selectedRecommendationType', selected)
          }
        />
        <SubmitButton text="Obter recomendação" />
      </form>
    </div>
  );
}

export default Form;
