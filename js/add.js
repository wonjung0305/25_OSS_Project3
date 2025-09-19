window.onload = function () {
  const form = document.getElementById("addForm");
  const brand = document.getElementById("brand");
  const nameInput = document.getElementById("name");
  const category = document.getElementById("category");
  const price = document.getElementById("price");
  const salePrice = document.getElementById("salePrice");
  const image = document.getElementById("image");
  const desc = document.getElementById("desc");

  // 브라우저 검증 팝업을 끄고 JS로 검증하기 (required)
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

    // 검증 통과할 경우 -> 추가 된다고 alert
    alert("게시물이 추가됩니다.");
    location.href = "../index.html";
  });

};
