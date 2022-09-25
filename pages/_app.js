import TasksContext from "../contexts/TasksContext";
import UserContext from "../contexts/UserContext";
import Layout from "../layouts/Layout";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <UserContext>
      <TasksContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TasksContext>
    </UserContext>
  );
}

export default MyApp;
