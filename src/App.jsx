import { useRecipeManager } from "./hooks/useRecipeManager.js";
import RecipeCard from "./components/RecipeCard.jsx";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

function App() {
  const {
    filteredRecipes, favorites, searchTerm, setSearchTerm, deleteRecipe, toggleFavorite, addRecipe, recipes } = useRecipeManager();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    category: "",
    cookingTime: "",
    image: "",
    ingredients: "",
    instructions: ""
  });

  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));

  const handleAddRecipe = () => {
    if (!newRecipe.title || !newRecipe.category || !newRecipe.cookingTime) {
      alert("Please fill in at least title, category, and cooking time");
      return;
    }
    
    const recipeToAdd = {
      title: newRecipe.title,
      category: newRecipe.category,
      cookingTime: parseInt(newRecipe.cookingTime) || 0,
      image: newRecipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
      ingredients: newRecipe.ingredients.split("\n").filter(i => i.trim()),
      instructions: newRecipe.instructions.split("\n").filter(i => i.trim())
    };
    
    addRecipe(recipeToAdd);
    setNewRecipe({
      title: "",
      category: "",
      cookingTime: "",
      image: "",
      ingredients: "",
      instructions: ""
    });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Recipe Manager</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">➕ Add Recipe</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">👨‍🍳 Add New Recipe</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">📝 Title *</label>
                <Input
                  value={newRecipe.title}
                  onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})}
                  placeholder="Recipe title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">🏷️ Category *</label>
                <Input
                  value={newRecipe.category}
                  onChange={(e) => setNewRecipe({...newRecipe, category: e.target.value})}
                  placeholder="e.g., Italian, Mexican, Dessert"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">⏱️ Cooking Time (minutes) *</label>
                <Input
                  type="number"
                  value={newRecipe.cookingTime}
                  onChange={(e) => setNewRecipe({...newRecipe, cookingTime: e.target.value})}
                  placeholder="30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">🖼️ Image URL (optional)</label>
                <Input
                  value={newRecipe.image}
                  onChange={(e) => setNewRecipe({...newRecipe, image: e.target.value})}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">🥘 Ingredients (one per line)</label>
                <textarea
                  className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                  value={newRecipe.ingredients}
                  onChange={(e) => setNewRecipe({...newRecipe, ingredients: e.target.value})}
                  placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">📋 Instructions (one per line)</label>
                <textarea
                  className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                  value={newRecipe.instructions}
                  onChange={(e) => setNewRecipe({...newRecipe, instructions: e.target.value})}
                  placeholder="Preheat oven to 350°F&#10;Mix ingredients&#10;Bake for 30 minutes"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>❌ Cancel</Button>
                <Button onClick={handleAddRecipe}>✅ Add Recipe</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="mb-6">
        <Input
          placeholder="Search by name or ingredient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Recipes</TabsTrigger>
          <TabsTrigger value="favorites">Favorites ({favorites.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.length === 0 ? (
              <p className="text-gray-500 text-center col-span-full py-12">No recipes found matching your search.</p>
            ) : (
              filteredRecipes.map(recipe => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe}
                  isFavorite={favorites.includes(recipe.id)}
                  onToggleFavorite={toggleFavorite}
                  onDelete={deleteRecipe}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteRecipes.length === 0 ? (
              <div className="text-center col-span-full py-12">
                <p className="text-gray-500 text-lg">No favorites yet!</p>
                <p className="text-gray-400 text-sm mt-2">Click the Favorite button on recipes to save them here.</p>
              </div>
            ) : (
              favoriteRecipes.map(recipe => (
                <RecipeCard 
                  key={recipe.id}
                  recipe={recipe}
                  isFavorite={favorites.includes(recipe.id)}
                  onToggleFavorite={toggleFavorite}
                  onDelete={deleteRecipe}
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
      </div>

  );
}

export default App;
