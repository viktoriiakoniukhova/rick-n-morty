import classes from "./index.module.scss";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className={classes.main}>
      <div className={classes.error}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <p>
          Return
          <a href="/">
            <i>
              <b>home</b>
            </i>
          </a>
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
