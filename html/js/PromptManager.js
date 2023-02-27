window.addEventListener("load", (event) => {
    let oldPrompts = retrieveData();
    oldPrompts.slice().reverse().forEach((item) => {
        addHtmlElement(item);
    });
});

function saveData(data) {
    localStorage.setItem("data", JSON.stringify(data));
}
function retrieveData() {
    return JSON.parse(localStorage.getItem("data"));
}

function generatePrompt(event) {
    event.preventDefault();
    let mode = sessionStorage.getItem("mode");
    let currentPrompt = document.querySelector("#prompt-field").value;
    let modelParameter = getModelParameter();
    let outputParameter = getOutdirParameter();
    //Retrieve old prompts
    let oldPrompts = retrieveData();
    if (oldPrompts == undefined || oldPrompts == null) {
        oldPrompts = new Array();
    }
    if (mode && mode == "ADVANCED") {
        const basicPrompt = "python scripts/txt2img.py --n_iter 1 --n_samples 1 ";
        let dinamycPrompt = `--prompt "${currentPrompt}"${outputParameter}${modelParameter}\
            ${getGridParameter()}${getSkipSaveParameter()}${getLaion400Parameter()}\
            ${getFixedCodeParameter()}${getNsfwProtectionParameter()}${getWatermarkProtectionParameter()}\
            ${getSeedParameter()}${getIterationsParameter()}${getStepsParameter()}\
            ${getWidthParameter()}${getHeightParameter()}${getResizeFactorParameter()}\
            ${getSamplerParameter()}`;
        let result = basicPrompt+dinamycPrompt;
        navigator.clipboard.writeText(result);
        oldPrompts.push(result);
        saveData(oldPrompts);
    } else {
        let result = `python scripts/txt2img.py --prompt "${currentPrompt}" --n_iter 1 --n_samples 1 --ddim_steps 60 --H 512 --W 512 --plms --resize_factor 2 --watermark_protection 1 --nsfw_protection 1${outputParameter}${modelParameter}`;
        navigator.clipboard.writeText(result);
        oldPrompts.push(result);
        saveData(oldPrompts);
    }
    var promptResults = document.querySelector(".prompt-results");
    promptResults.innerHTML = "";
    oldPrompts.slice().reverse().forEach((item) => {
        addHtmlElement(item);
    });
}

//Function to get model parameter
function getModelParameter() {
    let model = document.querySelector("#model-field").value;
    let modelParameter = (model != null && model != undefined && model != "")
        ? " --ckpt " + model + " "
        : "";
    return modelParameter;
}

//Function to get output parameter
function getOutdirParameter() {
    let outdir = document.querySelector("#outdir-field").value;
    let outdirParameter = (outdir != null && outdir != undefined && outdir != "")
        ? " --outdir " + outdir + " "
        : "";
    return outdirParameter;
}

//Function to get grid parameter
function getGridParameter() {
    let grid = document.querySelector("#skip-grid-field:checked");
    let gridParameter = (grid != null && grid != undefined && grid != "" && grid.value == 1)
        ? " --skip_grid "
        : "";
    return gridParameter;
}

//Function to get skip save parameter
function getSkipSaveParameter() {
    //Get skip save field when it is checked
    let skipSave = document.querySelector("#skip-save-field:checked");
    let skipSaveParameter = (skipSave != null && skipSave != undefined && skipSave != "" && skipSave.value == 1)
        ? " --skip_save "
        : "";
    return skipSaveParameter;
}

//Function to get laion400 parameter
function getLaion400Parameter() {
    let laion400 = document.querySelector("#laion400-field:checked");
    let laion400Parameter = (laion400 != null && laion400 != undefined && laion400 != "" && laion400.value == 1)
        ? " --laion400m "
        : "";
    return laion400Parameter;
}

//Function to get fixed code parameter
function getFixedCodeParameter() {
    let fixedCode = document.querySelector("#fixed-code-field:checked");
    let fixedCodeParameter = (fixedCode != null && fixedCode != undefined && fixedCode != "" && fixedCode.value == 1)
        ? " --fixed_code "
        : "";
    return fixedCodeParameter;
}

//Function to get nsfw protection parameter
function getNsfwProtectionParameter() {
    let nsfwProtection = document.querySelector("#nsfw-protection-field:checked");
    let nsfwProtectionParameter = (nsfwProtection != null && nsfwProtection != undefined && nsfwProtection != "" && nsfwProtection.value == 1)
        ? " --nsfw_protection " + nsfwProtection.value + " "
        : "";
    return nsfwProtectionParameter;
}

//Function to get watermark protection parameter
function getWatermarkProtectionParameter() {
    let watermarkProtection = document.querySelector("#watermark-protection-field:checked");
    let watermarkProtectionParameter = (watermarkProtection != null && watermarkProtection != undefined && watermarkProtection != "" && watermarkProtection.value == 1)
        ? " --watermark_protection " + watermarkProtection.value + " "
        : "";
    return watermarkProtectionParameter;
}

//Function to get seed parameter
function getSeedParameter() {
    let seed = document.querySelector("#seed-field").value;
    let seedParameter = (seed != null && seed != undefined && seed != "")
        ? " --seed " + seed + " "
        : "";
    return seedParameter;
}

//Function to get iterations parameter
function getIterationsParameter() {
    let iterations = document.querySelector("#iterations-field").value;
    let iterationsParameter = (iterations != null && iterations != undefined && iterations != "")
        ? " --n_iter " + iterations + " "
        : "";
    return iterationsParameter;
}

//Function to get steps parameter
function getStepsParameter() {
    let steps = document.querySelector("#steps-field").value;
    let stepsParameter = (steps != null && steps != undefined && steps != "")
        ? " --ddim_steps " + steps + " "
        : "";
    return stepsParameter;
}

//Function to get width parameter
function getWidthParameter() {
    let width = document.querySelector("#width-field").value;
    let widthParameter = (width != null && width != undefined && width != "")
        ? " --W " + width + " "
        : "";
    return widthParameter;
}

//Function to get height parameter
function getHeightParameter() {
    let height = document.querySelector("#height-field").value;
    let heightParameter = (height != null && height != undefined && height != "")
        ? " --H " + height + " "
        : "";
    return heightParameter;
}

//Function to get resize factor parameter
function getResizeFactorParameter() {
    let resizeFactor = document.querySelector("#resize-factor-field").value;
    let resizeFactorParameter = (resizeFactor != null && resizeFactor != undefined && resizeFactor != "")
        ? " --resize_factor " + resizeFactor + " "
        : "";
    return resizeFactorParameter;
}

//Function to get sampler parameter
function getSamplerParameter() {
    let sampler = document.querySelector("input[name='sampler-field']:checked").value;
    if(sampler != null && sampler != undefined && sampler != "" && sampler === "ddim"){
        return "";
    } else{
        return " --" + sampler + " ";
    }
}

function changeOptionsVisibility() {
    let options = document.querySelector(".prompt-container .advance-form");
    if (options.classList.contains("d-flex")) {
        options.classList.remove("d-flex");
        options.classList.add("d-none");
        sessionStorage.setItem("mode", "SIMPLE");
    } else {
        options.classList.remove("d-none");
        options.classList.add("d-flex");
        sessionStorage.setItem("mode", "ADVANCED");
    }
}

function addHtmlElement(text) {
    //Append result
    let article = document.createElement("article");
    article.classList.add("prompt-result", "mt-2", "p-2");
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