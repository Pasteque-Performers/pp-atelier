import React from 'react';
import ComparisonTable from './ComparisonTable.jsx';

const Compare = ({
  features1, features2, name1, name2,
}) => {
  const toPhrase = (obj) => {
    if (!obj.value && obj.feature) {
      return obj.feature;
    }
    if (!obj.feature && obj.value) {
      return obj.value;
    }
    return `${obj.value} ${obj.feature}`;
  };
  const container1 = [];
  const container2 = [];
  features1.forEach((feature) => {
    container1.push(toPhrase(feature));
  });
  features2.forEach((feature) => {
    container2.push(toPhrase(feature));
  });
  const hasFeature1 = [];
  const combinedFeatures = [];
  const hasFeature2 = [];
  container1.forEach((item) => {
    combinedFeatures.push(item);
    hasFeature1.push(true);
    if (container2.includes(item)) {
      hasFeature2.push(true);
    } else {
      hasFeature2.push(false);
    }
  });
  container2.forEach((item) => {
    if (!(container1.includes(item))) {
      hasFeature2.push(true);
      combinedFeatures.push(item);
      hasFeature1.push(false);
    }
  });
  return (
    <div>
      <ComparisonTable hasFeature1={hasFeature1} hasFeature2={hasFeature2}
      combinedFeatures={combinedFeatures} name1={name1} name2={name2} />
    </div>
  );
};

export default Compare;
