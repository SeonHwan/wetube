import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteCommentForm = document.getElementById("jsDeleteComment");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML) + 1;
};
const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML) - 1;
};

const addComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li);
  increaseNumber();
};
const deleteComment = (commentId) => {
  const removeElmt = document.getElementById(commentId);
  commentList.removeChild(removeElmt);
  decreaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/addComment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) addComment(comment);
  console.log(response);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

const handleDeleteComment = async (evt) => {
  const commentId = evt.currentTarget.getAttribute("commentId");

  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/deleteComment`,
    method: "POST",
    data: {
      commentId,
    },
  });
  if (response.status === 200) deleteComment(commentId);
  console.log(response);
};

if (addCommentForm) {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (deleteCommentForm) {
  deleteCommentForm.addEventListener("click", handleDeleteComment);
}
