const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");


navLinks.forEach((link) => {
   link.addEventListener("click", (e) => {
       e.preventDefault();
       const targetId = link.id.replace("-link", "");
       sections.forEach((section) => section.classList.remove("active"));
       document.getElementById(targetId).classList.add("active");
   });
});


function loadContent(topic) {
   const topicContent = {
       algebra: `<h3>Algebra</h3>
                 <ul>
                     <li>Quadratic Formula: x = (-b ± √(b²-4ac)) / 2a <button onclick="saveToVault('Quadratic Formula')">Save</button></li>
                     <li>Linear Equation: ax + b = 0 <button onclick="saveToVault('Linear Equation')">Save</button></li>
                     <li>Exponential Growth: y = a(1 + r)^t <button onclick="saveToVault('Exponential Growth')">Save</button></li>
                 </ul>`,
       geometry: `<h3>Geometry</h3>
                  <ul>
                      <li>Area of Circle: A = πr² <button onclick="saveToVault('Area of Circle')">Save</button></li>
                      <li>Volume of Sphere: V = 4/3πr³ <button onclick="saveToVault('Volume of Sphere')">Save</button></li>
                      <li>Pythagoras Theorem: a² + b² = c² <button onclick="saveToVault('Pythagoras Theorem')">Save</button></li>
                  </ul>`,
       calculus: `<h3>Calculus</h3>
                  <ul>
                      <li>Derivative of f(x): f'(x) = lim(h→0) [f(x+h) - f(x)] / h <button onclick="saveToVault('Derivative of f(x)')">Save</button></li>
                      <li>Integration: ∫f(x) dx <button onclick="saveToVault('Integration')">Save</button></li>
                      <li>Chain Rule: dy/dx = dy/du * du/dx <button onclick="saveToVault('Chain Rule')">Save</button></li>
                  </ul>`,  trigonometry: `<h3>Trigonometry</h3>
                  <ul>
                      <li>Sine Rule: sin(A)/a = sin(B)/b = sin(C)/c <button onclick="saveToVault('Sine Rule')">Save</button></li>
                      <li>Cosine Rule: cos(C) = a² + b² - c² / 2ab <button onclick="saveToVault('Cosine Rule')">Save</button></li>
                      <li>tan(θ) = sin(θ)/cos(θ) <button onclick="saveToVault('tan(θ)')">Save</button></li>
                  </ul>`,
};


document.getElementById("topic-content").innerHTML = topicContent[topic];
}


// Formula Vault
const vaultList = document.getElementById("vault-list");
const formulaDetails = document.getElementById("formula-details");


// Load saved formulas from local storage
window.onload = function () {
const savedFormulas = JSON.parse(localStorage.getItem("vault")) || [];
savedFormulas.forEach((item) => addToVaultDOM(item));
};


function saveToVault(name, formula) {
const date = new Date().toLocaleString();
const savedFormulas = JSON.parse(localStorage.getItem("vault")) || [];
if (!savedFormulas.find((item) => item.name === name)) {
   savedFormulas.push({ name, formula, date });
   localStorage.setItem("vault", JSON.stringify(savedFormulas));
   addToVaultDOM({ name, formula, date });
}
}


function addToVaultDOM(item) {
const listItem = document.createElement("li");
listItem.innerHTML = `
   ${item.name}
   <span>Saved on: ${item.date}</span>
   <button onclick="deleteFromVault('${item.name}', this)">Delete</button>
`;
listItem.addEventListener("click", () => {
   formulaDetails.textContent = `Formula: ${item.formula}`;
});
vaultList.appendChild(listItem);


if (vaultList.children[0].tagName === "P") {
   vaultList.children[0].remove();
}
}


function deleteFromVault(name, button) {
const savedFormulas = JSON.parse(localStorage.getItem("vault")) || [];
const updatedFormulas = savedFormulas.filter((item) => item.name !== name);
localStorage.setItem("vault", JSON.stringify(updatedFormulas));
button.parentElement.remove();


if (!vaultList.children.length) {
   vaultList.innerHTML = "<p>No formulas saved yet!</p>";
   formulaDetails.textContent = "Click a formula to view details.";
}
}
