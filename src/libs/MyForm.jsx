import React, {useEffect, useState, useContext, useRef} from 'react';

export const useForm= ({initialValues, validate,onSubmit}) =>{
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) =>{
    setValues({
      ...values,
      [e.target.name]:e.target.value
    })
  }
  const handleBlur = (e) =>{
    setTouched({
      ...touched,
      [e.target.name]: true
    })
  }
  const handleSubmit = (e) =>{
    e.preventDefault();

    const nextTouched=Object.keys(values).reduce((touched, field)=>{
     touched[field] = true;
     return touched;
    }, {});

    setTouched(nextTouched);

    const errors = validate(values);
    setErrors(errors);
    if(Object.values(errors).some(Boolean)) return;

    onSubmit(values);
  }

  const getFieldProps = (name) => {
    const value = values[name];
    const onBlur = handleBlur;
    const onChange = handleChange;
    return {
      name,
      value,
      onBlur,
      onChange
    }
  }
  React.useEffect(()=>{
    setErrors(validate(values));
  },[values])

  return {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    getFieldProps
  }
}

const formContext = React.createContext({})
formContext.displayName = 'FormContext';

export const Form = ({id, className,children, ...rest}) =>{
  const formValue = useForm(rest)
  return (<formContext.Provider value={formValue}>
    <form noValidate id={id} className={className} onSubmit={formValue.handleSubmit}>
    {children}
    </form></formContext.Provider>)
}

export const Field = ({as="input", children, ...rest}) =>{
  const {getFieldProps} = React.useContext(formContext);
  return React.createElement(as, {...rest, ...getFieldProps(rest.name)},children)
}
export const ErrorMessage = ({name}) =>{
  const {touched, errors} = React.useContext(formContext);
  if(!touched[name] || !errors[name]) return null;
  return (<p style={{"fontSize":"14px", "margin":"10px 0 0 0"}}>{errors[name]}</p>)
}
