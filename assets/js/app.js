const dataDavinci = document.querySelector(".data-davinci");
const dataDavinciTrained = document.querySelector(".data-davinci-trained");

const arr1 = [];
const arr2 = [];

const render = () => {
    const htmlDavinci = arr1.map(item => {
        return `
            <li>${item}</li>
        `
    }).join("")

    const htmlDavinciTrained = arr2.map(item => {
        return `
            <li>${item}</li>
        `
    }).join("")

    dataDavinci.innerHTML = htmlDavinci
    dataDavinciTrained.innerHTML = htmlDavinciTrained
}

document.querySelector("form").onsubmit = async (e) => {
    e.preventDefault();
    const value = document.querySelector("input").value;
    if (value) {
        document.querySelector("input").value = null
        document.querySelector("input").focus()
        arr1.push(value);
        arr2.push(value);

        render()

        await fetch("http://localhost:8080/api/demo-gpt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                str: value,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                arr1.push(data.data["003"])
                arr2.push(data.data.trained)

                render()
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
