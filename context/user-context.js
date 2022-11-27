import { createContext, useState } from "react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import axios from "axios";
const initialState = {
  lastname: "",
  firstname: "",
  email: "",
  password: "",
  bornDate: 18,
  sex: "male",
  phone: "",
};
const UserContext = createContext();
export const UserStore = (props) => {
  const [err, setErr] = useState("");
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [regist, setRegist] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    bornDate: "",
    sex: "male",
    phone: "",
  });
  const setLastName = (k) => {
    setRegist({ ...regist, lastname: k });
    console.log(regist.lastname);
  };
  const setFirstName = (k) => {
    setRegist({ ...regist, firstname: k });
    console.log(regist.firstname);
  };
  const setEmail = (k) => {
    setRegist({ ...regist, email: k });
    console.log(regist.lastname);
  };
  const setPassword = (k) => {
    setRegist({ ...regist, password: k });
    console.log(regist.password);
  };
  const setbornDate = (k) => {
    setRegist({ ...regist, bornDate: k });
    console.log(regist.bornDate);
  };

  const SingUp = () => {
    console.log(regist.firstname.length);
    if (
      regist.firstname.length != 0 &&
      regist.lastname.length != 0 &&
      (regist.email.indexOf("@") != -1 || regist.email.indexOf(".") != -1) &&
      regist.password.length > 5 &&
      regist.bornDate != 0
    ) {
      setErr("");
      axios
        .post("/api/users", {
          name: regist.firstname,
          surname: regist.lastname,
          email: regist.email,
          password: regist.password,
          age: regist.bornDate,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      router.replace("/login");
      return;
    }
    if (regist.firstname.length === 0) {
      setErr("firstname алдаатай байна.");
      return;
    }
    if (regist.lastname.length === 0) {
      setErr("lastname алдаатай байна.");
      return;
    }
    if (regist.email.indexOf("@") === -1 || regist.email.indexOf(".") === -1) {
      setErr("email алдаатай байна.(example@gmail.com)");
      return;
    }

    if (regist.password.length < 5) {
      setErr("нууц үг 5-аас их тэмдэгттэй байх ёстой.");
      return;
    }
    if (regist.bornDate === 0) {
      setErr("төрсөн он сар өдрөө оруулна уу.");
      return;
    }
  };
  return (
    <UserContext.Provider
      value={{
        regist,
        modal,
        regist,
        setErr,
        setRegist,
        setLastName,

        setbornDate,
        setPassword,
        setEmail,
        err,
        setFirstName,
        SingUp,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;
