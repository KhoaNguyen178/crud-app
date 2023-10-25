import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    // form.current.validateAll();

    {
      dispatch(login(username, password))
        .then(() => {
          setSuccessful(true);
          toast.success("User Log In successfully !");
          navigate("/"); //redirect to login page (should be)
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="container py-3 mb-3">
      <div className="col-md-6 offset-md-3 my-5 border rounded p-4 mt-2 shadow">
        {/* <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        /> */}

        <form onSubmit={handleRegister} className="row g-3">
          <h2 className="text-center">Log in</h2>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  required
                  minLength={3}
                  maxLength={20}
                  title="Please enter a valid username between 3 and 20 characters"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  required
                  minLength={6}
                  maxLength={40}
                  title="Please enter a valid password between 6 and 40 characters"
                />
              </div>
              <div className="d-grid gap-2 col-6 mx-auto py-3">
                <button className="btn btn-primary" type="submit">
                  Log in
                </button>
                <Link className="btn btn-outline-danger" to="/">
                  Cancel
                </Link>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
