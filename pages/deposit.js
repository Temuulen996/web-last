import Layout from "../components/layout/layout";
import { getCookie } from "cookies-next";
import Head from "next/head";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import DepoForm from "../components/deposit/depo-form/depo-form";
import DepoListItem from "../components/deposit/depo-list-item/depo-list-item";
import DepoModal from "../components/deposit/depo-modal/depo-modal";
export const getServerSideProps = async (req, res) => {
  const token = getCookie("token", req, res);
  const userId = getCookie("userId", req, res);
  let deposities = await fetch(`http://localhost:3000/api/depo-list/${userId}`);
  deposities = await deposities.json();
  return {
    props: {
      token: token ? token : false,
      userId: userId ? userId : false,
      deposities: deposities == [] ? [] : deposities,
    },
  };
};
const Deposit = ({ token, userId, deposities }) => {
  const [list, setList] = useState(deposities);
  const router = useRouter();
  const [deposit, setDeposit] = useState({
    value: 0,
    description: "n/a",
    category: "",
    date: "",
  });
  useEffect(() => {
    if (token === false) {
      router.replace("/login");
    }
  }, []);
  const changeList = async () => {
    let res;
    res = await fetch(`http://localhost:3000/api/depo-list/${userId}`);
    res = await res.json();
    console.log(res);
    setList(res);
  };
  const addDeposit = async () => {
    const userId = getCookie("userId");
    if (deposit.value === 0 || deposit.category === "" || deposit.date === "") {
      alert("zarlaga nemehed aldaa garlaa");
      return;
    }
    axios
      .post("http://localhost:3000/api/depo-lists", {
        value: deposit.value,
        description: deposit.description,
        category: deposit.category,
        type: "DEPOSIT",
        inserted: deposit.date,
        _user: userId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    await changeList();
  };
  const changeValue = (value) => {
    setDeposit({ ...deposit, value: value });
  };
  const changeDescription = (description) => {
    setDeposit({ ...deposit, description: description });
  };
  const changeCategory = (category) => {
    setDeposit({ ...deposit, category: category });
    console.log(deposit.category);
  };
  const changeDate = (date) => {
    setDeposit({ ...deposit, date: date });
    console.log(deposit.date);
  };
  return token ? (
    <Layout>
      <DepoModal
        changeDate={changeDate}
        changeCategory={changeCategory}
        changeDescription={changeDescription}
        changeValue={changeValue}
        addDeposit={addDeposit}
        deposit={deposit}
      />
      <div className="w-2/3">
        <div className=" flex justify-center">
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalCenter"
          >
            зарлага нэмэх
          </button>
        </div>
        <div>
          {list.length != 0 ? (
            list.map((el, i) => <DepoListItem el={el} key={i} />)
          ) : (
            <div></div>
          )}
          {list.length === 0 ? (
            <div className=" mt-36 text-3xl text-center">
              танд одоогоор зарлага байхгүй байна.
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Layout>
  ) : (
    <div></div>
  );
};

export default Deposit;
