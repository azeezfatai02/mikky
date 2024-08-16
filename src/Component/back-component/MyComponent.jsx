"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import TurndownService from "turndown";

// Register additional modules
ReactQuill.Quill.register("modules/imageUploader", ImageUploader);

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
  ],
  imageUploader: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    },
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "background",
  "align",
];

const MyComponent = () => {
  const [value, setValue] = useState("");
  const turndownService = new TurndownService();

  const handleSaveMarkdown = () => {
    const markdown = turndownService.turndown(value);
    console.log(markdown); // This will output the Markdown version of the editor content
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
      />
      <button onClick={handleSaveMarkdown}></button>
    </div>
  );
};

export default MyComponent;
