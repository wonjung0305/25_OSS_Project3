// 초기값 제공
window.onload = function () {
  const data = {
    brand: "바이오더마",
    name: "바이오더마 하이드라비오 토너 500ml 2입 기획",
    category: "toner",
    price: 59000,
    salePrice: 38710,
    benefit: ["sale", "today"],
    gender: "male",
    desc: "올리브영 판매랭킹 1위 No.1 수분장벽토너",
  };

  fillForm(data);

  const form = document.getElementById("editForm");
  const brand = document.getElementById("brand");
  const nameInput = document.getElementById("name");
  const category = document.getElementById("category");
  const price = document.getElementById("price");
  const salePrice = document.getElementById("salePrice");
  const image = document.getElementById("image");
  const desc = document.getElementById("desc");

  form.setAttribute("novalidate", "");

  // Validation Check Javascript
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // JS로 검증

    // Validation Check (브랜드)
    if (brand.value.trim() === "") {
      alert("브랜드를 입력하세요");
      brand.focus();
      return;
    }

    // Validation Check (상품명)
    const nameLength = nameInput.value.trim().length;
    if (nameLength < 2 || nameLength > 50) {
      alert("상품명은 2~50자로 입력해주세요.");
      nameInput.focus();
      return;
    }

    // Validation Check (카테고리)
    if (!category.value) {
      alert("카테고리를 선택하세요.");
      category.focus();
      return;
    }

    // Validation Check (가격)
    const priceVal = parseInt(price.value, 10); // 10진수 정수로 바꿈
    if (isNaN(priceVal) || priceVal < 1) {
      // Not a number, 음수일 경우
      alert("가격은 1 이상의 정수로 입력하세요.");
      price.focus();
      return;
    }

    // Validation Check (할인 가격 있는 경우, 잘못된 값이 아닌지)
    if (salePrice.value.trim() !== "") {
      const sp = parseInt(salePrice.value, 10);
      if (isNaN(sp) || sp < 0) {
        alert("할인가는 0 이상의 정수여야 합니다.");
        salePrice.focus();
        return;
      }
      if (sp >= priceVal) {
        alert("할인가는 정상가보다 작게 입력하세요.");
        salePrice.focus();
        return;
      }
    }

    // Validation Check (이미지)
    if (!image.files || image.files.length === 0) {
      alert("이미지를 선택해주세요.");
      image.focus();
      return;
    } else {
      // 이미지 확장자 확인
      const fname = image.files[0].name.toLowerCase();
      const okExt =
        fname.endsWith(".jpg") ||
        fname.endsWith(".jpeg") ||
        fname.endsWith(".png") ||
        fname.endsWith(".webp");
      if (!okExt) {
        alert("이미지는 jpg, jpeg, png, webp 형식으로 골라주세요.");
        image.focus();
        return;
      }
    }

    // Validation Check (상세설명 - 10자 이상으로)
    if (desc.value.trim().length < 10) {
      alert("상세설명은 최소 10자 이상으로 작성해주세요.");
      desc.focus();
      return;
    }

    if (confirm("수정하시겠습니까?")) {
      alert("수정되었습니다.");
      location.href = "./view.html";
      return;
    } else {
      alert("수정을 취소하였습니다.");
    }
  });
};

function fillForm(d) {
  // function(sel){return document.querySelector(Sel)}
  const $ = (sel) => document.querySelector(sel);

  // input 값 채워 넣기
  // 값 ?? 기본값 => 값이 null 또는 undefined일 때 기본 값을 사용
  $("#brand").value = d.brand ?? "";
  $("#name").value = d.name ?? "";
  $("#category").value = d.category ?? "";
  $("#price").value = d.price ?? "";
  $("#salePrice").value = d.salePrice ?? "";
  $("#desc").value = d.desc ?? "";

  // 체크 박스 내용 채워넣기
  document.querySelectorAll('input[name="benefit"]').forEach((cb) => {
    cb.checked = Array.isArray(d.benefit) && d.benefit.includes(cb.value);
  });

  // 라디오 버튼
  document
    .querySelectorAll('input[name="gender"]')
    .forEach((r) => (r.checked = false));
  const g = d.gender ?? "";
  const target = g
    ? document.querySelector(`input[name="gender"][value="${g}"]`)
    : null;
  if (target) target.checked = true;
}
