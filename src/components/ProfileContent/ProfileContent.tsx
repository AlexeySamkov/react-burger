import React, { useEffect, FormEvent,  } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../../services/actions/userActions';
import styles from './ProfileContent.module.css';
import useForm from '../../hooks/useForm';

import { RootState } from '../../services/actions/actions';

const ProfileContent: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.auth.user);
    const { values, handleChange, setValues } = useForm({ name: '', email: '', password: '' });

    useEffect(() => {
        if (user) {
            setValues({ name: user.name, email: user.email, password: '' });
        }
    }, [user, setValues]);

    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUser({ name: values.name, email: values.email, password: values.password }));
    };

    return (
        <form onSubmit={handleSave}>
            <div className={styles.inputs}>
            <div className={styles.emptyDiv} />
                <Input 
                    type="text" 
                    name="name" 
                    size="default" 
                    placeholder="Имя" 
                    value={values.name} 
                    onChange={handleChange} 
                />
                <Input 
                    type="text" 
                    name="email" 
                    size="default" 
                    placeholder="Логин" 
                    value={values.email} 
                    onChange={handleChange} 
                />
                <Input 
                    type="password" 
                    name="password" 
                    size="default" 
                    placeholder="Пароль" 
                    value={values.password} 
                    onChange={handleChange} 
                />
                <div>
                    <Button htmlType="submit" type="primary" size="small">
                        Сохранить
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default ProfileContent;
