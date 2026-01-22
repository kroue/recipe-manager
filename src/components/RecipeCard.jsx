import { Card, CardContent, CardHeader, CardTitle, CardFooter} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription} from "@/components/ui/dialog";

const RecipeCard = ({ recipe, isFavorite, onToggleFavorite, onDelete}) =>{
    return(
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <img src={recipe.image} alt={recipe.title} className="h-48 w-full object-cover rounded-t-lg"/>
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{recipe.title}</CardTitle>
                <Badge variant="outline">{recipe.category}</Badge>
            </div>
            <p className="text-sm text-gray-500">{recipe.cookingTime}mins</p>
        </CardHeader>

        <CardFooter className="mt-auto flex justify-between">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">View Details</Button>  
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{recipe.title}</DialogTitle>
                    </DialogHeader>
                        <div className="space-y-4">
                            <img src={recipe.image} alt={recipe.title} className="h-64 w-full object-cover rounded-md"/>
                            <div>
                                <h3 className="font-bold">Ingredients:</h3>
                                <ul className="list-disc pl-5">{recipe.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
                            </div>
                            <div>
                                <h3 className="font-bold">Instructions:</h3>
                                <ol className="list-disc pl-5">{recipe.instructions.map((i, idx) => <li key={idx}>{i}</li>)}</ol>
                            </div>
                        </div>
                </DialogContent>
            </Dialog>
            
            <div className="flex gap-2">
                <Button
                    variant={isFavorite ? "default" : "outline"}
                    onClick={() =>  onToggleFavorite(recipe.id)}
                >
                    {isFavorite ? "❤️ Favorited" : "🤍 Favorite"}
                </Button>
                {recipe.isCustom && (
                    <Button variant="destructive" onClick={() => onDelete(recipe.id)}>
                        🗑️ Delete
                    </Button>
                )}

            </div>
        </CardFooter>
        </Card>
    );
};

export default RecipeCard;