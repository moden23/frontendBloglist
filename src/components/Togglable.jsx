import { useState } from "react";

export default function Togglable(props) {
  const [visible, setVisible] = useState(false);

  const hideForm = { display: visible ? "none" : "" };
  const showForm = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <button
        className="create-new-blog"
        style={hideForm}
        onClick={toggleVisibility}
      >
        {props.buttonLabel}
      </button>
      <div style={showForm}>
        {props.children}
        <button
          className="create"
          type="submit"
          onClick={toggleVisibility}
          form="blog-add-form"
        >
          create
        </button>
        <button type="button" onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </>
  );
}
