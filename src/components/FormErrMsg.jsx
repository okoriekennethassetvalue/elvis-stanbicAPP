const FormErrMsg = ({ errors, inputName }) => {
  if (!errors || !errors[inputName]) return null;

  return (
    <p className="text-red-400 text-sm mt-1">{errors[inputName]?.message}</p>
  );
};

export default FormErrMsg;
