Since you are nearing the end of your 4-hour limit, here is a complete, professional README.md tailored exactly to the requirements in your exam PDF. This draft assumes you used the local state approach with recipes.json.

Recipe Manager Application
Project Description
A modern, responsive React application built with Vite and Tailwind CSS that allows users to browse, search, and manage recipes. The application features a dual-filtering system (by title or ingredient), a favorites management system, and full CRUD capabilities for custom-added recipes. This project was developed as part of a technical assessment to demonstrate proficiency in React state management, UI/UX design with shadcn/ui, and data persistence.

Setup & Installation
Prerequisites
Node.js (v18 or higher recommended)

npm or yarn

1. Clone the Project
Bash
git clone <your-repo-link>
cd recipe-manager
2. Install Dependencies
Bash
npm install
3. shadcn/ui Installation & Configuration
The project uses shadcn/ui for high-quality, accessible components.

Initialize shadcn:

Bash
npx shadcn-ui@latest init
Add Required Components: The following components were added to the project during development:

Bash
npx shadcn-ui@latest add card button badge tabs input dialog
How to Run the Application
To start the development server, run the following command in your terminal:

Bash
npm run dev
Once started, open your browser to the local URL provided (usually http://localhost:5173).

List of shadcn/ui Components Used
To maintain a professional and consistent UI, the following components were utilized:

Card: Used for displaying individual recipe previews in the grid.

Dialog (Modal): Used for the "Add New Recipe" form and viewing full recipe instructions.

Tabs: Used to switch between the "All Recipes" view and the "Favorites" view.

Button: Used for all interactions including "Save to Favorites" and "Delete."

Input: Used for the search bar and the custom recipe entry form.

Badge: Used for displaying cooking time and recipe categories.

Data Source Approach
The application uses a hybrid data management strategy:

Initial Data: 15 pre-defined recipes are loaded from a local recipes.json file.

State Management: The recipes are loaded into React useState upon initialization.

Persistence: Any changes made by the user (adding recipes, deleting custom recipes, or favoriting) are persisted using Local Storage, ensuring data remains intact after a page refresh.

Deletion Logic: Per requirements, a conditional check is applied to only allow the deletion of recipes marked with an isCustom: true flag.
