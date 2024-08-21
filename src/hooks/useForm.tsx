import { useState } from 'react';
import { IProfileFormValues, ILoginFormValues, IForgotPasswordFormValues, IResetPasswordFormValues } from '../utils/types';

const useForm = <T extends IProfileFormValues | ILoginFormValues | IForgotPasswordFormValues| IResetPasswordFormValues>(initialState: T) => {
  const [values, setValues] = useState<T>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return { values, handleChange, setValues };
};

export default useForm;
