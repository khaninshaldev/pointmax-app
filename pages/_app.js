import ListsContext from "../contexts/ListsContext";
import TasksContext from "../contexts/TasksContext";
import UserContext from "../contexts/UserContext";
import Layout from "../layouts/Layout";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <UserContext>
      <ListsContext>
        <TasksContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </TasksContext>
      </ListsContext>
    </UserContext>
  );
}

export default MyApp;
