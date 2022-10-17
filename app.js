const entityClassMap = {
  person: "bg-orange-200",
  orgnz: "bg-yellow-200",
  product: "bg-lime-200",
  date: "bg-cyan-200",
  place: "bg-blue-200",
  slang: "bg-purple-200",
  none: "bg-transparent",
};
const passage = document.querySelector("#passage");
const tagList = document.querySelector(".tag-list");
const fileImportBtn = document.querySelector(".file-import-btn");
let selectedTagEl = document.querySelector(".tag.active");
let currentTag = selectedTagEl.innerText.toLowerCase();
let currentTarget = "";

function adjustText(holder) {
  text = holder.innerText.split(" ");
  holder.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    text[i] = text[i].replace("\n", "");
    let newText = document.createElement("span");
    let leadSpace = document.createTextNode(" ");
    let endSpace = document.createTextNode(" ");
    newText.innerHTML = text[i];
    newText.dataset.entity = "none";
    newText.classList.add("rounded-sm", "p-0.5", "bg-transparent");
    holder.appendChild(leadSpace);
    holder.appendChild(newText);
    holder.appendChild(endSpace);
  }
}

function handleTagClick(e) {
  if (e.target.tagName == "BUTTON") {
    selectedTagEl.classList.remove("active");
    selectedTagEl = e.target;
    selectedTagEl.classList.add("active");
    currentTag = selectedTagEl.innerText.toLowerCase();
  }
}

function handleWordClick(e) {
  if (e.target.tagName == "SPAN" && e.target.innerHTML) {
    // based on the current tag selected, update the span
    currentTarget = e.target;
    currentTarget.classList.remove(
      entityClassMap[currentTarget.dataset.entity]
    );
    currentTarget.dataset.entity = currentTag;
    currentTarget.classList.add(entityClassMap[currentTag]);
  }
}

function handleFileImport() {
  document.getElementById("fileImport").click();
}

function init() {
  passage.addEventListener("click", handleWordClick);
  tagList.addEventListener("click", handleTagClick);
  fileImportBtn.addEventListener("click", handleFileImport);
  adjustText(passage);
}

init();
