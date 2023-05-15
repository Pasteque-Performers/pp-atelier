// import React, { useState } from 'react';
// // import './StyleSelector.css';

// const StyleSelector = ({ styles }) => {
//   const [selectedStyleId, setSelectedStyleId] = useState(styles.length > 0 ? styles[0].id : null)

//   return (
//     <div className="style-selector">
//       {selectedStyleId && <h2>{styles.find((style) => style.id === selectedStyleId).name}</h2>}
//       <div className="thumbnail-container">
//         {styles.map((style, index) => (
//           <div
//             key={style.id}
//             className={`thumbnail ${index % 4 === 0 ? 'new-row' : ''}`}
//             onClick={() => style.id !== selectedStyleId && setSelectedStyleId(style.id)}
//           >
//             <img src={style.thumbnailUrl} alt={style.name} />
//             {style.id === selectedStyleId && <div className="checkmark">&#10003;</div>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// StyleSelector.defaultProps = {
//   styles: [],
// };

// export default StyleSelector;

// import React, { useState } from 'react';

// const StyleSelector = ({ styles }) => {
//   const [selectedStyle, setSelectedStyle] = useState(styles[0]);

//   return (
//     <div>
//       <h2>{selectedStyle.name}</h2>
//       {styles.map((style, index) => (
//         <div key={style.style_id} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
//           <img
//             src={style.photos[0].thumbnail_url}
//             alt={style.name}
//             onClick={() => setSelectedStyle(style)}
//             style={{ width: '50px', height: '50px' }}
//           />
//           {style.style_id === selectedStyle.style_id &&
//             <div style={{
//               position: 'absolute',
//               top: '0',
//               left: '0',
//               width: '50px',
//               height: '50px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               backgroundColor: 'rgba(255, 255, 255, 0.5)',
//             }}>
//               ✔️
//             </div>
//           }
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StyleSelector;

// import React, { useState } from 'react';

// const StyleSelector = ({ styles }) => {
//   const [selectedStyle, setSelectedStyle] = useState(styles[0]);

//   return (
//     <div>
//       <h2>{selectedStyle.name}</h2>
//       <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//         {styles.map((style, index) => (
//           <div key={style.style_id} style={{
//             position: 'relative', width: '25%', boxSizing: 'border-box', padding: '5px'
//           }}>
//             <img
//               src={style.photos[0].thumbnail_url}
//               alt={style.name}
//               onClick={() => setSelectedStyle(style)}
//               style={{ width: '100%' }}
//             />
//             {style.style_id === selectedStyle.style_id &&
//               <div style={{
//                 position: 'absolute',
//                 top: '0',
//                 left: '0',
//                 width: '100%',
//                 height: '100%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 backgroundColor: 'rgba(255, 255, 255, 0.5)'
//               }}>
//                 ✔️
//               </div>
//             }
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StyleSelector;

import React, { useState } from 'react';

const StyleSelector = ({ styles }) => {
  const [selectedStyle, setSelectedStyle] = useState(styles[0]);

  return (
    <div>
      <h2>{selectedStyle.name}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {styles.map((style, index) => (
          <div key={style.style_id} style={{
            position: 'relative', width: '25%', boxSizing: 'border-box', padding: '5px'
          }}>
            <img
              src={style.photos[0].thumbnail_url}
              alt={style.name}
              onClick={() => setSelectedStyle(style)}
              style={{ width: '60px', height: '60px', borderRadius: '50%' }}
            />
            {style.style_id === selectedStyle.style_id
            && <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '50%',
            }}>
                ✔️
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
