import { lazy, Suspense, useRef } from 'react';
import { useLoaderData } from "react-router-dom";
import { Highlight, Loader } from '../../components';
import { example, live } from './index.module.css';

function Code() {
  const
    { id } = useLoaderData(),
    live_ref = useRef(),
    Live = lazy(_ => import(`./examples/${id}/index.jsx`));

  return (
    <div className={`${example}`}>
      <div ref={live_ref} className={`${live} flex-ai-jc-center`}>
        <Suspense fallback={<Loader />}>
          <Live parent={live_ref} />
        </Suspense>
      </div>
      <Highlight />
    </div>
  );
}

export { Code };