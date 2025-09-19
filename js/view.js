document.querySelector(".action-row .buy").addEventListener("click", function(){
  if(confirm("주문하시겠습니까?")){
    alert("주문되었습니다");
  }
  else{
    alert("취소되었습니다")
  }
})

document.querySelector(".action-row .delete").addEventListener("click", function(){
  if(confirm("게시물을 삭제할까요?")){
    alert("삭제되었습니다");
    location.href = "../index.html";
  }
  else{
    alert("취소되었습니다");
  }
})
