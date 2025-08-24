import React from "react";

const commentsData = [
  {
    name: "Amarnath",
    text: "asdasd adasasdas asd asda sdas asd as asd",
    replies: [],
  },
  {
    name: "Amarnath",
    text: "asdasd adasasdas asd asda sdas asd as asd",
    replies: [
      {
        name: "Amarnath",
        text: "asdasd adasasdas asd asda sdas asd as asd",
        replies: [],
      },
      {
        name: "Amarnath",
        text: "asdasd adasasdas asd asda sdas asd as asd",
        replies: [
          {
            name: "Amarnath",
            text: "asdasd adasasdas asd asda sdas asd as asd",
            replies: [],
          },
          {
            name: "Amarnath",
            text: "asdasd adasasdas asd asda sdas asd as asd",
            replies: [],
          },
        ],
      },
    ],
  },
];

const CommentList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div>
      <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg my-2">
        <img
          className="w-14 h-12"
          src="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"
          alt="user"
        />
        <div className="px-3">
          <p className="font-bold">{comment.name}</p>
          <p>{comment.text}</p>
          <div className="ml-15">
            {/* CommentList recursion.replies are the list of comments. We are reusing CommentList component but we are passing replies as a prop to it. => N level nested comments*/}
            <CommentList comments={comment.replies} />
          </div>
        </div>
      </div>
    </div>
  ));
};

const CommentsContainer = () => {
  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold">Comments</h1>
      <CommentList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
