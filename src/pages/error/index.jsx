import { useRouteError } from 'react-router-dom';
import { container, link, message, error } from './index.module.css';

function Error() {
  const { data } = useRouteError();

  return (
    <div className={`${container} flex-ai-center`}>
      <p className={`${error}`}>------ Error ------</p>
      <p>Code Example:</p>
      <p className={`${message}`}>{data}</p>
      <p>was not found.</p>
      <a className={`${link}`} href='/'>Home Page</a>
    </div>
  );
}

export { Error };