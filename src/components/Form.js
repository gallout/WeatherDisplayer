import React, { useState } from "react";

const defaultForm = {
  city: ""
};

const Form = props => {
  const [form, setForm] = useState(defaultForm);

  const handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value
    });
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
      <input
        type="text"
        name="city"
        placeholder="Город..."
        value={form["city"]}
        onChange={handleChange}
      />
      <button type="submit">Поиск</button>
    </form>
  );
};

export default Form;
