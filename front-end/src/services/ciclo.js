class Ciclo{
    constructor(id){
        this.id = id
    }

    async get(){
        const body = {
            id : this.id
        }

        const headers = new Headers({
            "Content-Type": "application/json"
        });

        const request = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        };

        const saveRequest = new Request(`http://localhost:3000/dias-ciclo`, request);
        
        const saveData = await fetch(saveRequest)
            .then(resp => resp.json())
            .then(json => json)
            .catch(error => {
                return {
                    response : "erro",
                    erro: error
                }               
            })

        return saveData
    }
}

export default Ciclo