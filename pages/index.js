import axios from "axios";
import { getCookie } from "cookies-next";
import Head from "next/head";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import WithListItem from "../components/withdraw/with-list-item/with-list-item";
import WithModal from "../components/withdraw/with-modal/with-modal";
import styles from "../styles/Home.module.css";
export const getServerSideProps = async (req, res) => {
  let withdraws;
  const token = getCookie("token", req, res);
  const userId = getCookie("userId", req, res);
  if (userId == undefined) {
    withdraws = [];
  } else {
    withdraws = await fetch(`http://localhost:3000/api/with-list/${userId}`);
    withdraws = await withdraws.json();
  }

  console.log(withdraws);
  return {
    props: {
      token: token ? token : false,
      userId: userId ? userId : false,
      withdraws: withdraws != [] ? withdraws : [],
    },
  };
};
export default function Home({ token, userId, withdraws }) {
  const router = useRouter();
  const [list, setList] = useState(withdraws);
  console.log(list);
  const [withdraw, setWithdraw] = useState({ value: 0, description: "" });
  console.log(token);
  useEffect(() => {
    if (token === false) {
      router.replace("/login");
    }
  }, []);
  const changeList = async () => {
    let res = await fetch(`http://localhost:3000/api/with-list/${userId}`);
    res = res.json();
    console.log(res);
    router.replace(router.asPath);
  };
  const addWithDraw = async () => {
    const userId = getCookie("userId");
    axios
      .post("http://localhost:3000/api/with-lists", {
        value: withdraw.value,
        description: withdraw.description,
        category: "n/a",
        type: "WITHDRAW",
        _user: userId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    router.reload();
    // changeList();
  };
  const changeValue = (value) => {
    setWithdraw({ ...withdraw, value: value });
  };
  const changeDescription = (description) => {
    setWithdraw({ ...withdraw, description: description });
  };
  return token ? (
    <Layout>
      <WithModal
        hidden={false}
        changeValue={changeValue}
        changeDescription={changeDescription}
        addWithDraw={addWithDraw}
      />
      <div className="w-2/3 ">
        <div className=" flex justify-center">
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalCenter"
          >
            орлого нэмэх
          </button>
        </div>
        <div>
          {list.length != 0 ? (
            list.map((el, i) => {
              if (el.type == "WITHDRAW") {
                return <WithListItem el={el} key={i} />;
              }
            })
          ) : (
            <div></div>
          )}
          {list.length === 0 ? (
            <div className=" mt-36 text-3xl text-center">
              танд одоогоор орлого байхгүй байна.
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
}
