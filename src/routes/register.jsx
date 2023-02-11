import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../components/button";
import Error from "../components/error";
import InputText from "../components/form/input-text";
import apiService from "../services/api";

export default function Register() {
  const { isRegistering, setIsRegistering } = useState(true);
  const [error, setError] = useState(null);

  const formSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .min(3, "Password must be at least 3 characters long")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const handleError = (error) => {
    if (error.response) {
      error.response.json().then((json) => {
        setError(json);
      });
    } else {
      setError({ message: error.message });
    }
  };

  const handleSubmission = (submittedUser) => {
    apiService
      .register(submittedUser, isRegistering)
      .then((response) => {
        if (response.token) {
          localStorage.setItem("token", response.token);
        }
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <main>
      <form
        className="mt-4 flex flex-col items-center gap-y-4"
        onSubmit={handleSubmit(handleSubmission)}
        onFocus={() => {
          setError(null);
        }}
      >
        <InputText label="Name" id="name" register={register} />
        <InputText label="Email" id="email" register={register} />
        <InputText label="Username" id="username" register={register}>
          {errors.username && <Error message={errors.username.message} />}
        </InputText>
        <InputText
          label="Password"
          id="password"
          type="password"
          register={register}
        >
          {errors.password && <Error message={errors.password.message} />}
        </InputText>

        {isRegistering && (
          <InputText
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            register={register}
          >
            {errors.confirmPassword && (
              <Error message={errors.confirmPassword.message} />
            )}
          </InputText>
        )}

        <Button type="submit" text={isRegistering ? "Sign Up" : "Login"} />

        <button
          type="reset"
          className="text-center"
          onClick={() => {
            setIsRegistering((prev) => !prev);
          }}
        >
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}
        </button>

        {/* Conditional rendering: IF error is updated to something truthy (not null)... */}
        {error && <Error message={error.message} />}
      </form>
    </main>
  );
}
