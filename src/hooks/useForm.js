const { useState } = require('react');

const useForm = (initialState = {}) => {
  const [formState, setFormState] = useState(initialState);
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  const resetForm = () => {
    setFormState(initialState);
  };

  return { formState, onChangeHandler, resetForm };
};

export default useForm;
