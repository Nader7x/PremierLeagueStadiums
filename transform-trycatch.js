module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Find try/catch blocks
  root.find(j.TryStatement).forEach(path => {
    // Check if it's inside an async function
    let p = path;
    let isAsync = false;
    while (p = p.parentPath) {
      if ((p.node.type === 'FunctionDeclaration' || p.node.type === 'ArrowFunctionExpression' || p.node.type === 'FunctionExpression') && p.node.async) {
        isAsync = true;
        break;
      }
    }

    if (isAsync) {
      // Replace the TryStatement with just the body of the try block
      j(path).replaceWith(path.node.block.body);
    }
  });

  return root.toSource();
};
