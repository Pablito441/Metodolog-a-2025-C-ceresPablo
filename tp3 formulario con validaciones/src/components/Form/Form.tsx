import { useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import styles from "./Form.module.css";
import Swal from "sweetalert2";
import * as Yup from "yup";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es obligatorio")
    .min(3, "Debe tener al menos 3 caracteres"),
  email: Yup.string()
    .required("El correo es obligatorio")
    .email("Correo inválido"),
  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(6, "Debe tener al menos 6 caracteres"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirme su contraseña"),
});

export const Form = () => {
  const [formData, setFormData] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    try {
      await validationSchema.validateAt(name, updatedFormData);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      Swal.fire("Formulario enviado correctamente", "", "success");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: FormErrors = {};
        err.inner.forEach((e) => {
          if (e.path) {
            validationErrors[e.path as keyof FormErrors] = e.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  const hasErrors = Object.values(errors).some((error) => error !== undefined);

  return (
    <div className={styles.formContainer}>
      <div className={styles.formContent}>
        <div className={styles.formTitleContainer}>
          <h2 className={styles.formTitle}>FORMULARIO DE MANEJO DE ERRORES</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Nombre:"
            name="name"
            type="text"
            value={formData.name}
            placeholder="Ingrese su nombre"
            handleChange={handleChange}
            error={errors.name}
          />
          <Input
            label="Correo electrónico:"
            name="email"
            type="text"
            value={formData.email}
            placeholder="Ingrese su correo"
            handleChange={handleChange}
            error={errors.email}
          />
          <Input
            label="Contraseña:"
            name="password"
            type="password"
            value={formData.password}
            placeholder="Ingrese una contraseña"
            handleChange={handleChange}
            error={errors.password}
          />
          <Input
            label="Confirmar Contraseña:"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            placeholder="Confirmar contraseña"
            handleChange={handleChange}
            error={errors.confirmPassword}
          />
          <Button disabled={hasErrors} />
        </form>
      </div>
    </div>
  );
};
