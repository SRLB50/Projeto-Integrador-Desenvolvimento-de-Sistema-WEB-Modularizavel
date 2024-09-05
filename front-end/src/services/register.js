class Auth {
    #body
    constructor(body) {
        this.#body = body
    }

    async send() {

        const headers = new Headers({
            "Content-Type": "application/json"
        });

        const request = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(this.#body)
        };

        const saveRequest = new Request(`http://localhost:3000/usuarios`, request);
        
        const saveData = await fetch(saveRequest)
            .then(resp => resp.json())
            .then(json => json)
            .catch(error => {
                alert("Erro ao realizar login: ", error)
                throw error.toString()
            })

        return saveData
    }
}

export default Auth