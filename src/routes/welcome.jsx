import { useState } from "react";
import apiService from "../services/api";

export default function welcomePage() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [error, setError] = useState(null);
  return (
    <div>
      <h1>Welcome to the Welcome Page!</h1>
      <p>Here you can register or login.</p>
    </div>
  );
}
