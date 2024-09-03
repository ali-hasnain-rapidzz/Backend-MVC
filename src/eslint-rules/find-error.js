/* eslint-disable no-undef */
module.exports = {
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.name === "new Error") {
          context.report({
            node: node,
            message:
              "Error constructor is deprecated, use new ApiError instead.",
          });
        }
      },
    };
  },
};
