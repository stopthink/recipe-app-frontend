import RecipeForm from './RecipeForm';
import { redirect } from 'next/navigation';

const NewRecipe = async () => {
  // const user = await getCurrentUser();

  // if (!user) {
  //   redirect('/signin')
  // }

  return <RecipeForm />;
};

export default NewRecipe;
