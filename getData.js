const getData = async () => {
    try{
        const response = await fetch("/productos.json")
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("HUBO UN ERROR");
    }
}

export {getData};