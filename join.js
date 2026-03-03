// ===== 生年自動生成 =====
const ageSelect = document.getElementById("ageSelect");
for (let y = 2026; y >= 1950; y--) {
  const option = document.createElement("option");
  option.value = y;
  option.textContent = y;
  ageSelect.appendChild(option);
}

// ===== ポジション選択 =====
const positionInput = document.getElementById("positionInput");
const modal = document.getElementById("positionModal");
const posButtons = document.querySelectorAll(".pos");
const doneBtn = document.getElementById("positionDone");

let selectedPositions = [];

positionInput.addEventListener("click", () => {
  modal.style.display = "flex";
});

posButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
  });
});

doneBtn.addEventListener("click", () => {
  selectedPositions = [];
  document.querySelectorAll(".pos.active").forEach(el => {
    selectedPositions.push(el.textContent);
  });
  positionInput.value = selectedPositions.join(" / ");
  modal.style.display = "none";
});

// ===== 送信処理 =====
const form = document.getElementById("joinForm");
const button = document.querySelector(".join-btn");

// ローディングオーバーレイ作成
const overlay = document.createElement("div");
overlay.className = "overlay";
overlay.innerHTML = "送信中...";
document.body.appendChild(overlay);

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let valid = true;
  const requiredFields = form.querySelectorAll("input[required], select[required]");

  requiredFields.forEach(field => {
    if (!field.value) {
      field.classList.add("error");
      valid = false;
    } else {
      field.classList.remove("error");
    }
  });

  if (!valid) return;

  button.classList.add("loading");
  overlay.style.display = "flex";

  setTimeout(() => {
    window.location.href = "success.html";
  }, 2000);
});

const ageDisplay = document.getElementById("ageDisplay");

ageSelect.addEventListener("change", () => {
  const birthYear = parseInt(ageSelect.value);
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  ageDisplay.textContent = `現在 ${age} 歳`;
});

const field = document.getElementById("field");
const formationBtns = document.querySelectorAll(".formation-btn");

const formations = {
  433: [
    ["LW",20,15],["CF",20,50],["RW",20,85],
    ["CM",45,30],["CM",50,50],["CM",45,70],
    ["CB",75,35],["CB",75,65],
    ["GK",90,50]
  ],
  352: [
    ["CF",20,40],["CF",20,60],
    ["LM",40,15],["CM",50,40],["CM",50,60],["RM",40,85],
    ["CB",75,30],["CB",75,50],["CB",75,70],
    ["GK",90,50]
  ]
};

function loadFormation(type){
  field.innerHTML="";
  formations[type].forEach(pos=>{
    const div=document.createElement("div");
    div.className="pos";
    div.dataset.pos=pos[0];
    div.textContent=pos[0];
    div.style.top=pos[1]+"%";
    div.style.left=pos[2]+"%";
    field.appendChild(div);
  });
}

formationBtns.forEach(btn=>{
  btn.addEventListener("click",()=>{
    formationBtns.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    loadFormation(btn.dataset.formation);
  });
});

loadFormation("433");

