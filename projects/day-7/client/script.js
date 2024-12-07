document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('#generateBtn');
    const recipeContainer = document.querySelector('#recipeContainer');
    const recipeContent = document.querySelector('#recipeContent');
    const loadingSpinner = document.querySelector('#loadingSpinner');
    
    button.addEventListener('click', async () => {
        recipeContainer.classList.remove('hidden');
        loadingSpinner.classList.remove('hidden');
        recipeContent.innerHTML = '';
        
        try {
            const response = await fetch('http://localhost:3000/generate-recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                mode: 'cors'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response data:', data);

            if (!data || !data.recipe) {
                throw new Error('No recipe data in response');
            }

            recipeContent.innerHTML = data.recipe.replace(/\n/g, '<br>');
        } catch (error) {
            console.error('Error:', error);
            recipeContent.innerHTML = `Error: ${error.message}`;
        } finally {
            loadingSpinner.classList.add('hidden');
        }
    });
});