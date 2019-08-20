import React, { useState } from "react";

const defaultForm = {
  city: ""
};

const Form = props => {
  const [form, setForm] = useState(defaultForm);

  const handleChange = e => {
    e.preventDefault();
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setForm({ ...form, [name]: value });
    props.changeLocationAndImage(value);
  };

  const onSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    if (props.onSubmit) {
      props.onSubmit(form);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div
        width="100px"
        margin-left="auto"
        margin-right="auto"
        className="main-form"
      >
        <input
          type="text"
          name="city"
          placeholder="Город..."
          value={form["city"]}
          onChange={handleChange}
        />

        <button className="add-btn" type="submit">
          Добавить
        </button>
      </div>
    </form>
  );
};

export default Form;
