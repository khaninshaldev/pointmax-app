import React, { useMemo, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useUser } from "../../../contexts/UserContext";
import { HashLoader } from "react-spinners";

import styles from "./AllLists.module.scss";
import Link from "next/link";
import { useLists } from "../../../contexts/ListsContext";

const AllLists = () => {
  const { lists } = useLists();

  return (
    <>
      {lists ? (
        <section className={styles.lists}>
          <section className={styles.lists_top_section}>
            <h1>Your lists</h1>
            <button>Add another list</button>
          </section>
          {lists.map((list) => {
            const pathName = list.id.includes("default_daily_")
              ? "/home"
              : `/lists/${list.id}`;
            return (
              <Link key={list.id} href={pathName}>
                <article className={styles.list_item}>
                  <h3>{list.name}</h3>
                </article>
              </Link>
            );
          })}
        </section>
      ) : (
        <section className={styles.lists_loading_section}>
          <section className={styles.lists_loading}>
            <HashLoader size={64} color="#ffffff" />
          </section>
        </section>
      )}
    </>
  );
};

export default AllLists;
