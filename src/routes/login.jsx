import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../components/button";
import Error from "../components/error";
import InputText from "../components/form/input-text";
import apiService from "../services/api";

export default function Login() {
  const [error, setError] = useState(null);

  const formSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .min(3, "Password must be at least 3 characters long"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
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
      .login(submittedUser)
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
    <main className="bg-fuchsia-100">
      <header>
        <h1 className="m-3 py-3 text-center text-4xl font-bold text-fuchsia-800">
          Welcome to Iron Out!
        </h1>
      </header>
      <form
        className="mt-4 flex flex-col items-center gap-y-4"
        onSubmit={handleSubmit(handleSubmission)}
        onFocus={() => {
          setError(null);
        }}
      >
        <InputText label="Username" id="username" register={register}>
          {errors.username && <Error message={errors.username.message} />}
        </InputText>
        <InputText
          label="Password"
          id="password"
          type="password"
          register={register}
        />
        {errors.password && <Error message={errors.password.message} />}

        <Button type="submit" text="Login" />

        {error && <Error message={error.message} />}
      </form>
    </main>
  );
}
