import React from 'react';

const ComparisonTable = ({ hasFeature1, hasFeature2, combinedFeatures, name1, name2 }) => (
  <table data-testid="comparison-table">
    <tbody>
    <tr>
      <th>{name1}</th>
      <th></th>
      <th>{name2}</th>
    </tr>
    {combinedFeatures.map((feature, index) => (<tr key={index}>
      <td>{hasFeature1[index].toString()}</td>
      <td>{feature}</td>
      <td>{hasFeature2[index].toString()}</td>
    </tr>))}
    </tbody>
  </table>
);

export default ComparisonTable;
