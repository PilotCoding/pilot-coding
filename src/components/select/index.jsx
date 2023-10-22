import { useRef } from 'react';
import { useClickAway } from 'react-use';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { select_variants } from './variants';
import { select_component, selected_item } from './index.module.css';
import examples from './data';

function Select({ state, toggle }) {
  const
    { id } = useParams(),
    select_ref = useRef();

  useClickAway(select_ref, event => {
    event.target.dataset.selectToggle ?
      undefined :
      state && toggle()
  });

  return (
    <motion.ul
      ref={select_ref}
      className={`${select_component}`}
      variants={select_variants}
      initial='closed'
      animate={state ? 'opened' : 'closed'}
      transition={{ duration: .5, ease: 'easeInOut' }}
    >
      {
        examples.map(example => {
          return (
            <li
              key={example.id}
              className={example.id == id ? selected_item : undefined}
            >
              <Link to={`/code/${example.id}`}>
                <p>{example.name}:</p>
                <p>{example.description}</p>
              </Link>
            </li>
          );
        })
      }
      <li><p>More coming soon...</p></li>
    </motion.ul>
  );
}

export { Select };