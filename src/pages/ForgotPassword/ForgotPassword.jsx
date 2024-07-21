import styles from './ForgotPassword.module.css';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <section className={styles.section}>
            <h2> Восстановление пароля </h2>
            <div className={styles.inputWrapper}>
                <Input
                    type="email"
                    name="email"
                    size="default"
                    placeholder="укажите e-mail"
                />
            </div>
          
            <div className={styles.inputWrapper}>
                <Button htmlType="button" type="primary" size="small" extraClass="ml-2">
                    Восстановить
                </Button>
            </div>
            <div className={styles.othWrapper}>
                <p className={styles.paragraph}>Вспомнили пароль? <Button htmlType="button" type="secondary" size="small" onClick={handleLogin} >Войти</Button> </p>
            </div>
        </section>
    )
}

export default ForgotPassword;
