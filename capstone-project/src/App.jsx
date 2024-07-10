import AppRouter from "./appRouter";
import NavBar from "./pages/NavBar";
import { RecipesProvider } from "./hooks/AddToRecipes";

function App() {
  return (
    <div>
      <RecipesProvider>
        <AppRouter>
          <NavBar></NavBar>
        </AppRouter>
      </RecipesProvider>
    </div>
  );
}

export default App;
