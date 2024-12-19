async function returnCoffees() {
    try {
        const response = await fetch('http://localhost:3000/coffee');
        if (!response.ok) {
            throw new Error(`Erro ao carregar o JSON: ${response.statusText}`);
        }
        const coffees = await response.json();
        return coffees;
    } catch (error) {
        console.error("Erro: ", error);
    }
}

export { returnCoffees };