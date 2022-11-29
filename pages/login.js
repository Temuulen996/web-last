import Link from "next/link";
import { Router } from "next/router";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user-context";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const userCtx = useContext(UserContext);
  const [log, setLog] = useState({ username: "", password: "" });
  const setUser = (k) => {
    setLog({ ...log, username: k });
  };
  const setPassword = (k) => {
    setLog({ ...log, password: k });
  };
  const login = async () => {
    log;
    const isExist = await axios.post("http://localhost:3000/api/check", {
      email: log.username,
      password: log.password,
    });
    isExist;
    if (isExist.data.user) {
      ("amjilttaii");
      let token = await axios.post("http://localhost:3000/api/session", {
        _user: isExist.data.user._id,
      });
      token;
      setCookie("token", token.data.token);
      setCookie("userId", token.data._user);
      userCtx.setErr("");
      router.replace("/");
    } else {
      userCtx.setErr("email эсвэл password буруу байна.");
    }
  };
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-no-repeat bg-cover bg-[url(https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80)]">
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <form>
            <div className="form-group mb-6">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Email address
              </label>
              <input
                onChange={(e) => {
                  setUser(e.target.value);
                }}
                type="email"
                className="form-control
  block
  w-full
  px-3
  py-1.5
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Password
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control block
  w-full
  px-3
  py-1.5
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>

            <div className="w-full flex justify-center items-center">
              <p className="text-red-600">{userCtx.err}</p>
            </div>

            <p
              onClick={() => {
                login();
              }}
              className="cursor-pointer 
px-6
py-2.5
bg-blue-600
text-white
font-medium
text-xs
flex justify-center
w-full
leading-tight
uppercase
rounded
shadow-md
hover:bg-blue-700 hover:shadow-lg
focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
active:bg-blue-800 active:shadow-lg
transition
duration-150
ease-in-out"
            >
              log in
            </p>

            <Link href="/register">
              <p
                className="
px-6
py-2.5
bg-blue-600
text-white
font-medium
flex justify-center
text-xs
w-full
leading-tight
uppercase
rounded
shadow-md
mt-4
hover:bg-blue-700 hover:shadow-lg
focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
active:bg-blue-800 active:shadow-lg
transition
duration-150
ease-in-out"
              >
                sign up
              </p>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
