import axios from "axios";
import { getCookie } from "cookies-next";
import Head from "next/head";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import styles from "../styles/Home.module.css";
export const getServerSideProps = async (req, res) => {
  let withdraws;
  const token = getCookie("token", req, res);
  const userId = getCookie("userId", req, res);
  if (userId == undefined) {
    withdraws = [];
  } else {
    withdraws = await axios.get(
      `http://localhost:3000/api/with-list/${userId}`
    );
    withdraws = withdraws.data;
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
    axios
      .get(`http://localhost:3000/api/with-list/${userId}`)
      .then((res) => {
        console.log(res);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
    changeList();
  };
  const changeValue = (value) => {
    setWithdraw({ ...withdraw, value: value });
  };
  const changeDescription = (description) => {
    setWithdraw({ ...withdraw, description: description });
  };
  return token ? (
    <Layout>
      <div className="">
        <input
          onChange={(e) => {
            changeValue(e.target.value);
          }}
          placeholder="value"
          type={"number"}
        />
        <input
          onChange={(e) => {
            changeDescription(e.target.value);
          }}
          type={"text"}
          placeholder="description"
        />
        <input
          onClick={() => {
            addWithDraw();
          }}
          className="cursor-pointer"
          type={"button"}
          value="Add to favorites"
        />
      </div>
      <div>
        {list.map((el, i) => {
          if (el.type == "WITHDRAW") {
            return <div key={i}>{el.description}</div>;
          }
        })}
      </div>
    </Layout>
  ) : (
    <div></div>
  );
}
