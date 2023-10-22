import { createBrowserRouter, redirect } from 'react-router-dom';
import { Code, Error, Main } from '../pages';
import { examples } from '../data';

export default createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                loader: _ => redirect(`/code/${examples[0].id}`)
            },
            {
                path: '/code/:id',
                element: <Code />,
                loader: ({ params }) => {
                    const found = examples.filter(example => example.id == params.id)[0];
                    if (found) return params;
                    throw new Response(`${params.id}`, { status: 404 });
                }
            }
        ]
    }
]);