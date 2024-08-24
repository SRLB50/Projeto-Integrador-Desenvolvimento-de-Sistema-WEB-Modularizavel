class Auth {
    #mail
    #password
    constructor(mail, password) {
        this.#mail = mail
        this.#password = password
    }

    async send() {
        const body = {
            login: this.#mail,
            password: this.#password
        }

        const headers = new Headers({
            "Content-Type": "application/json"
        });

        const request = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        };

        const saveRequest = new Request(`http://localhost:3000/login`, request);
        
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

export default Auth