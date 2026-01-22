import { useState, useEffect } from 'react';
import initialData from '../data/recipes.json';

export const useRecipeManager = () => {
    const [recipes, setRecipes] = useState(() => {
        const saved = localStorage.getItem('my-recipes');
        return saved ? JSON.parse(saved) : initialData.recipes;
    });

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('my-favorites');
        return saved ? JSON.parse(saved) : [];
    });

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        localStorage.setItem('my-recipes', JSON.stringify(recipes));
    }, [recipes]);

    useEffect(() => {
        localStorage.setItem('my-favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addRecipe = (newRecipe) => {
        const recipewithId = {...newRecipe, id: Date.now(), isCustom: true };
        setRecipes([...recipes, recipewithId]);
    };

    const deleteRecipe = (id) => {
        const recipeToDelete = recipes.find(recipe => recipe.id === id);
        if (recipeToDelete?.isCustom) {
            setRecipes(recipes.filter(r => r.id !== id));
            setFavorites(favorites.filter(favId => favId !== id));
        }else{
            alert('You cannot delete a default recipe');
        }
    };

    const toggleFavorite = (id) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter(favId => favId !== id));
        }
    else{
        setFavorites([...favorites, id]);
    }
};

    const filteredRecipes = recipes.filter(recipe => {
        const searchLower = searchTerm.toLowerCase();
        const titleMatch = recipe.title.toLowerCase().includes(searchLower);
        const ingredientMatch = recipe.ingredients.some(ing => ing.toLowerCase().includes(searchLower));
        return titleMatch || ingredientMatch;
    });
    
    return {
        recipes,
        filteredRecipes,
        favorites,
        searchTerm,
        setSearchTerm,
        addRecipe,
        deleteRecipe,
        toggleFavorite,
    };
};
