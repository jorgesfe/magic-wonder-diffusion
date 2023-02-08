window.addEventListener("load", (event) => {
    let oldPrompts = retrieveData();
    for (oldPrompt in oldPrompts) {
        addHtmlElement(oldPrompts[oldPrompt])
    }
});

function saveData(data) {
    localStorage.setItem("data", JSON.stringify(data));
}
function retrieveData() {
    return JSON.parse(localStorage.getItem("data"));
}

function generatePrompt() {
    let mode = sessionStorage.getItem("prompt_mode");
    let currentPrompt = document.querySelector("#simple-prompt-text-area").value;
    let model = document.querySelector("#model").value;
    let modelParameter = (model != null && model != undefined && model != "")
        ? " --ckpt " + model + " "
        : "";
    let output = document.querySelector("#outdir").value;
    let outputParameter = (output != null && output != undefined && output != "")
        ? " --outdir " + output + " "
        : "";
    let grid = document.querySelector("#outdir").value;
    let gridParameter = (grid != null && grid != undefined && grid != "")
        ? " --outdir " + output + " "
        : "";
    //Retrieve old prompts
    let oldPrompts = retrieveData();
    if (oldPrompts == undefined || oldPrompts == null) {
        oldPrompts = new Array();
    }
    if (mode && mode == "COMPLEX") {
        let result = `--prompt ${currentPrompt}${outputParameter}--n_iter 1 --n_samples 1${gridParameter}${modelParameter}--ddim_steps 60 --H 512 --W 512 --plms --resize_factor 2 --watermark_protection 0`;
        navigator.clipboard.writeText(result);
        oldPrompts.push(result);
        saveData(oldPrompts);
        addHtmlElement(result);
    } else {
        let result = `--prompt ${currentPrompt}${outputParameter}--n_iter 1 --n_samples 1${modelParameter}--ddim_steps 60 --H 512 --W 512 --plms --resize_factor 2 --watermark_protection 1 --nsfw_protection 1`;
        navigator.clipboard.writeText(result);
        oldPrompts.push(result);
        saveData(oldPrompts);
        addHtmlElement(result);
    }
}

function changeOptionsVisibility() {
    let options = document.querySelector(".prompt-container .advance-form");
    if (options.classList.contains("d-flex")) {
        options.classList.remove("d-flex");
        options.classList.add("d-none");
    } else {
        options.classList.remove("d-none");
        options.classList.add("d-flex");
    }
}

function addHtmlElement(text) {
    //Append result
    let article = document.createElement("article");
    article.classList.add("prompt-result", "bg-success", "mt-2", "p-2");
    let p = document.createElement("p");
    p.innerHTML = text;
    article.appendChild(p);
    let promptResults = document.querySelector(".prompt-results");
    promptResults.appendChild(article);
}

function removeAll() {
    // Find the element with the class "prompt-results"
    var promptResults = document.querySelector(".prompt-results");
    promptResults.innerHTML = "";
    localStorage.removeItem("data");
}

function copyToClipboard() {
    let oldPrompts = retrieveData();
    navigator.clipboard.writeText(oldPrompts);
}