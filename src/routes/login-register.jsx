import InputText from "../components/form/input-text";
import apiService from "../services/api";

export default function LoginRegister() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [error, setError] = useState(null);

  const formSchema = isRegistering
    ? yup.object({
        username: yup.string().required("Username is required"),
        password: yup
          .string()
          .min(3, "Password must be at least 3 characters long"),

        //  Only validate WHEN the password field has a value
        confirmPassword: yup.string().when("password", {
          // '!!' is a shorthand for using 'Boolean()' to convert a value to a boolean
          is: (val) => !!(val && val.length > 0),
          then: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match"),
        }),
      })
    : yup.object({
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
    // Yup will run for validation as the user types in the form inputs.
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
      .loginOrRegister(submittedUser, isRegistering)
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
        // 'handleSubmit' is what React Hook Form uses for the submission
        // 'handleSubmission' is the function we wrote to be used by React Hook Form
        onSubmit={handleSubmit(handleSubmission)}
        onFocus={() => {
          setError(null);
}}