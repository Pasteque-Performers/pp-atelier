import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const ComparisonTable = ({
  hasFeature1, hasFeature2, combinedFeatures, name1, name2,
}) => (
  <div>
    <h3>Comparing</h3>
  <table data-testid="comparison-table" color='white' style={{ textAlign: 'center' }}>
    <tbody>
    <tr>
      <th>{name1}</th>
      <th></th>
      <th>{name2}</th>
    </tr>
    {combinedFeatures.map((feature, index) => (<tr key={index}>
      <td>{hasFeature1[index] && <FontAwesomeIcon icon={faCheck} style={{ color: '#23ae19' }} />}</td>
      <td>{feature}</td>
      <td>{hasFeature2[index] && <FontAwesomeIcon icon={faCheck} style={{ color: '#23ae19' }} />}</td>
    </tr>))}
    </tbody>
  </table>
  </div>
);

export default ComparisonTable;
