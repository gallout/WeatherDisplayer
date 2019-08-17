import React, { useState } from "react";

const defaultForm = {
  city: "",
  temperature: "",
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
    <form onSubmit={onSubmit} >
      <div  width = "100px"
            margin-left = "auto"
            margin-right = "auto">
      <input
        type="text"
        name="city"
        placeholder="Город..."
        value={form["city"]}
        onChange={handleChange}
      />
      
      <button type="submit">Поиск</button>
      </div>
    </form>
  );
};

export default Form;
