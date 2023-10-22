import { useState } from 'react';
import { highlight, languages } from 'prismjs';
import { highlight_component, highlight_data, selected_file } from './index.module.css';
import { useLoaderData } from 'react-router-dom';
import data from './data';

function Highlight() {
  const
    { id } = useLoaderData(),
    files = data.filter(code => code.id == id)[0].files,
    [selectedState, setSelectedState] = useState(0);

  return (
    <div className={`${highlight_component}`}>
      <header className='flex-ai-jc-center'>
        {
          files.map(file => {
            return (
              <div
                key={file.name}
                className={`${selectedState == file.id ? selected_file : undefined}`}
                onClick={setSelectedState.bind(null, file.id)}
              >
                {file.name}
              </div>
            );
          })
        }
      </header>
      <div className={`${highlight_data}`}>
        {
          files.map((file) => {
            if (selectedState == file.id) {
              return (
                <pre
                  key={file.name}
                  dangerouslySetInnerHTML={{
                    __html: highlight(
                      file.data,
                      languages[file.language],
                      file.language
                    )
                  }}>
                </pre>
              );
            }
          })
        }
      </div>
    </div>
  );
}

export { Highlight };