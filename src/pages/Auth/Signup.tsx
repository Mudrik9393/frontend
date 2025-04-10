import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const signupData = {
            fullName,
            email,
            password
        };

        try {
            const response = await fetch("http://localhost:8096/api/v1/logins", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signupData)
            });

            if (response.ok) {
                // Handle successful signup
                alert("Signup successful!");
                navigate("./login"); // Redirect to login page
                // Clear form data
                setFullName("");
                setEmail("");
                setPassword("");
            } else {
                // Handle signup error
                alert("Signup failed!");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred during signup.");
        }
    };

    return (
        <div className="container">
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <div className="mb-3">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="form-control"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="button">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;