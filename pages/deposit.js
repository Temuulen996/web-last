import Layout from "../components/layout/layout";
import { getCookie } from "cookies-next";
import Head from "next/head";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import DepoForm from "../components/depo-form/depo-form";
export const getServerSideProps = async (req, res) => {
  const token = getCookie("token", req, res);
  const userId = getCookie("userId", req, res);
  let deposities = await axios.get(
    `http://localhost:3000/api/depo-list/${userId}`
  );
  deposities = deposities.data;
  return {
    props: {
      token: token ? token : false,
      userId: userId ? userId : false,
      deposities: deposities != [] ? deposities : [],
    },
  };
};
const Deposit = ({ token, userId, deposities }) => {
  const [list, setList] = useState(deposities);
  console.log(list);
  const router = useRouter();
  const [deposit, setDeposit] = useState({
    value: 0,
    description: "",
    category: "",
  });
  console.log(token);
  useEffect(() => {
    if (token === false) {
      router.replace("/login");
    }
  }, []);
  const changeList = async () => {
    axios
      .get(`http://localhost:3000/api/depo-list/${userId}`)
      .then((res) => {
        console.log(res);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addDeposit = async () => {
    const userId = getCookie("userId");
    axios
      .post("http://localhost:3000/api/depo-lists", {
        value: deposit.value,
        description: deposit.description,
        category: deposit.category,
        type: "DEPOSIT",
        _user: userId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    changeList();
  };
  const changeValue = (value) => {
    setDeposit({ ...deposit, value: value });
  };
  const changeDescription = (description) => {
    setDeposit({ ...deposit, description: description });
  };
  const changeCategory = (category) => {
    setDeposit({ ...deposit, category: category });
  };
  return token ? (
    <Layout>
      <div>
        <div className="">
          <DepoForm
            changeCategory={changeCategory}
            changeDescription={changeDescription}
            changeValue={changeValue}
            addDeposit={addDeposit}
            deposit={deposit}
          />
        </div>
        <div>
          {list.map((el, i) => (
            <div key={i} className="flex justify-between">
              <p>{`${i + 1})`}</p>
              <div>{el.value}</div>
              <div>{el.description}</div>
              <div>{el.category}</div>
              <div>{el.description}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  ) : (
    <div></div>
  );
};

export default Deposit;
