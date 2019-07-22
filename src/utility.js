import React from 'react';

const getInitials = (params) => {
  const title = params || '';
  const name = title.toUpperCase().split(' ');

  let initials = '';

  if (name.length === 1) {
    initials = `${name[0].charAt(0)}`;
  } else if (name.length > 1) {
    initials = `${name[0].charAt(0)}${name[1].charAt(0)}`;
  }

  let sumChars = 0;

  // eslint-disable-next-line
  for (let i = 0; i < title.length; i++) {
    sumChars += title.charCodeAt(i);
  }

  const colors = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#e67e22',
    '#2ecc71',
    '#3498db',
    '#8e44ad',
    '#e74c3c',
    '#1abc9c',
    '#2c3e50',
  ];

  return {
    bgColor: colors[sumChars % colors.length],
    initials,
  };
};

const renderNode = (Component, content, defaultProps) => {
  if (content == null || content === false) {
    return null;
  }
  if (React.isValidElement(content)) {
    return content;
  }
  if (typeof content === 'function') {
    return content();
  }
  // Just in case
  if (content === true) {
    return <Component {...defaultProps} />;
  }
  if (typeof content === 'string' || typeof content === 'number') {
    return <Component {...defaultProps}>{content}</Component>;
  }

  return <Component {...defaultProps} {...content} />;
};

export { getInitials, renderNode };
