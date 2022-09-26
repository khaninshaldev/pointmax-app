import React, { useMemo, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useUser } from "../../contexts/UserContext";

const AllLists = () => {
  const [lists, setLists] = useState(null);

  const { user } = useUser();

  useMemo(() => {
    if (user) {
      const fetchLists = async () => {
        let listsArray = [];
        const listDocs = await getDocs(
          query(collection(db, "lists"), where("userUID", "==", user.uid))
        );

        listDocs.forEach((list) => {
          listsArray.push({ id: list.id, ...list.data() });
        });

        console.log(listsArray);
        setLists(listsArray);
      };

      fetchLists();
    }
  }, [user]);

  return (
    <section>
      {lists?.map((list) => {
        return (
          <article key={list.id}>
            <h2>{list.name}</h2>
          </article>
        );
      })}
    </section>
  );
};

export default AllLists;
